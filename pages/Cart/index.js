import { useSelector , useDispatch} from 'react-redux';

export const Theme = React.createContext({})
export const Provider = Theme.Provider;


function Cart ()
{
    const data = useSelector((state) => state.cart);
    var arr = [];
    var price = 0;
    var total_price = 0;
    data.Cart.map((i,key)=>(
        
        price = i.price,
        price = price.replace("Rp", ''),
        price = price.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''),
        price = parseInt(price) * parseInt(1000),
        price = parseInt(i.qty) * parseInt(price),
        total_price = total_price + price,

        arr.push({
            name: i.name,
            qty: i.qty,
            price: i.price,
            total: price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
        })      
    ))

    return(
        <div style={{overflowX:"hidden"}}>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 margin-top-10 text-center" >
                <div className="row">
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-center">
                        <h4>Product Name</h4>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-center">
                        <h4>Product Detail</h4>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-center">
                        <h4>Qty</h4>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-center">
                        <h4>Price</h4>
                    </div>
                </div>
            </div>

            <div className="row">
                {
                    arr.map((i,key)=>
                        {
                            if(i.qty > 0 ){   
                                return(
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 margin-top-10 text-center">
                                        <div className="row">
                                            {/* <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-center">
                                                <img src={i.img} className="img_small2"/>
                                            </div> */}
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-center">
                                                <h4>{i.name}</h4>
                                            </div>
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-center">
                                                <p>Esse ex minim pariatur laboris aliqua.</p>
                                            </div>
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-center">
                                                <p className="bold">{i.qty}</p>
                                            </div>
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-center">
                                                <p className="bold">Rp. {i.total}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    )
                }
            </div>
            <hr/>
            <div className="row">
                <div className="col-xs-offset-10 col-xs-2">
                    <p className="bold">
                        Total: Rp. {total_price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                    </p>
                </div>
            </div>

            
        </div>
    );
}

export default Cart;