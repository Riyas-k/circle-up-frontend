import {configureStore} from "@reduxjs/toolkit";
import loginReducers from "./loginReducers";

const store = configureStore({
    reducer:{
        login:loginReducers
    }
})
export default store