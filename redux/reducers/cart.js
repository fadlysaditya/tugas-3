const initalState = {
    Cart: [],
};

const cartReducer = (state = initalState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'AddCart':
            let idAlreadyExists = false;
            let Cart = state.Cart.slice();

            state.Cart.map((item,key)=>{
                
                if(item.id_item === payload.id_item){
                    idAlreadyExists = true
                }
                
            })

            if(idAlreadyExists) {
                // // Cart = Cart.filter(id => id != payload.id_item);       
                // let objIndex = state.Cart.findIndex((obj => obj.id_item == payload.id_item));
                // state.Cart[objIndex].qty = payload.qty;

                if(payload.qty == 0){
                    let idx = null;
                    
                    for (let index = 0; index < state.length; index++) {
                        const element = state[index];
                        if (element.id === payload.id_item) {
                            idx = index;
                        }
                    }
                    state.Cart.splice(idx, 1);
                    return Object.assign([], state);

                }else{
                    let objIndex = state.Cart.findIndex((obj => obj.id_item == payload.id_item));
                    state.Cart[objIndex].qty = payload.qty;
                }
            }

            else {
                Cart.push(payload);            
            }      
            return {
                ...state,
                Cart
            };

        default:
            return state;
    }
}

export default cartReducer;

