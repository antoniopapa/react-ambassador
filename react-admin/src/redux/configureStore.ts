import {createStore} from "redux";
import {setUserReducer} from "./reducers/setUserReducer";


export const configureStore = () => createStore(setUserReducer)
