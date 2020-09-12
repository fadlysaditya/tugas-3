import { useRouter } from 'next/router'
import { useQuery, gql  } from "@apollo/client";
import { withApollo } from "../../lib/apollo";
import Link from "next/link";

import { Cart } from '../../redux/actions/cart';
import React , { useState, Component, useEffect } from 'react';
import { useDispatch , connect} from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';


//material-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const Post = () => {
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();

    const router = useRouter()
    var params= router.query.index
    params = params.split("_");
    const pid = params[0].toString();
    const id_product = params[1].toString();

    const CATEGORY_LIST = gql`
    query Category {
        categoryList(filters: { ids: { eq: "${pid}" } }){
            products{
                items{
                    id
                    name
                    sale
                    description{
                        html
                    }
                    price_range{
                        maximum_price{
                        final_price{
                            value
                        }
                        }
                    }
                    thumbnail{
                        url
                    }
                }
            }
        }
    }

    `;

    const { loading, error, data } = useQuery(CATEGORY_LIST, {
    });
  
    if (loading) {
      return <div>loading...</div>;
    }
    const product = data.categoryList[0].products.items;

    const Save = async (idx) => {
        const value = {
            id_item : idx,
            name : document.getElementById("itemName").value,
            qty : document.getElementById("qty").value,
            price: document.getElementById("price").value
        }
        const wait = await dispatch(Cart(value));
        toast.info("Cart Updated");
    }

    return (
        <div>
          <div className="container-fluid">
            <h1>List Product</h1>
    
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row text-center">
                    {
                        product.map((val, idx) => {
                            if(val.id == id_product){

                                var id = val.id;
                                var name = val.name;
                                var img_path = val.thumbnail.url
                                var price_awal= val?.price_range?.maximum_price?.final_price?.value ?? 0;
                                var price = val?.price_range?.maximum_price?.final_price?.value ?? 0;
                                price = parseInt(price)*1000;
                                price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                                var desc = val?.description?.html ?? "";


                                if(img_path == "" || img_path == null){
                                    img_path = "https://dummyimage.com/80x80/2c9e7e/f50000.png&text=Items+Dummy"
                                }
                                return (
                                    <div key={idx} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <input type="hidden" id="itemName" value={name} />
                                        <input type="hidden" id="price" value={price_awal} />

                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <h3 className="product_name">{name}</h3>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <img src={img_path} className="img_small2 margin-top-10" />
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div dangerouslySetInnerHTML={{ __html: desc}}></div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <p>Price : Rp {price}</p>
                                        </div>
                                        <div className="row margin-top-10 text-center col-xs-offset-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <Button variant="contained" color="primary" onClick={() =>
                                                    setCount(count + 1)}
                                                > + </Button>
                                            </div>
                                            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                                <input id="qty" type="text" className="input-special" min="0" value={count} readOnly/>
                                            </div>
                                            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                                <Button variant="contained" color="primary" onClick={() =>
                                                    {if(count> 0) {
                                                        setCount(count - 1)
                                                    }}
                                                }> - </Button>
                                            </div>

                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 margin-top-10 margin-bottom-10">
                                                {/* <button className="btn-special margin-top-10 margin-bottom-10 form-control" onClick={() => */}
                                                <Button className="margin-top-10 margin-bottom-10 form-control" variant="contained" color="primary" onClick={() =>
                                                    {
                                                        Save(id);
                                                    }    
                                                }
                                                >
                                                    Add To Cart
                                                    {/* <Link className="color-black" to={`/Cart`}>Buy</Link> */}
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                );

                            }
                        })
                    } 
                </div>
              </div>
    
          </div>
          <ToastContainer />
        </div>
      );

}


export default withApollo({ ssr: true }) (Post);