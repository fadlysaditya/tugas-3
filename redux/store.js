import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import cartReducer from "./reducers/cart";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
    cart: cartReducer
});

const middlewares = applyMiddleware(thunk);

const stores = createStore(
    reducers,
    undefined,
    composeWithDevTools(middlewares) //buat check di devtool chrome jadi keliatan redux nya
);

export default stores;
