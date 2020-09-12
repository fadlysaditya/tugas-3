import { useRouter } from 'next/router'

import { useQuery, gql  } from "@apollo/client";
import { withApollo } from "../../lib/apollo";
import Link from "next/link";


const Post = () => {
    const router = useRouter()
    const pid = router.query.index
    
    const CATEGORY_LIST = gql`

    query Category {
        categoryList(filters: { ids: { eq: "${pid}" } }){
            products{
                items{
                    id
                    name
                    sale
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
    return (
        <div>
          <div className="container-fluid">
            <h1>List Product</h1>
    
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row text-center">
                    {
                        product.map((val, idx) => {
                        var id = val.id;
                        var name = val.name;
                        var img_path = val.thumbnail.url
                        var price = val?.price_range?.maximum_price?.final_price?.value ?? 0;
                        price = parseInt(price)*1000;
                        price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

                        if(img_path == "" || img_path == null){
                            img_path = "https://dummyimage.com/80x80/2c9e7e/f50000.png&text=Items+Dummy"
                        }
                        return (
                            <Link key={idx} href="/product_detail/[index]" as={`/product_detail/${pid}_${id}`}>
                            <a className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <h3 className="product_name">{name}</h3>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <img src={img_path} className="img_small2 margin-top-10"/>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <p>Price : Rp {price}</p>
                                    </div>
                                </div>
                            </a>
                            </Link>
                        );
                        })
                    } 
    
                </div>
              </div>
    
          </div>
        </div>
      );

}


export default withApollo({ ssr: true }) (Post);