import {configureStore} from "@reduxjs/toolkit";
import loginReducers from "./loginReducers";
import userReducer from "./userSlice";
import singleUser from './singlereducer';
import AdminAuth from './adminAuthReducer';

const store = configureStore({
    reducer:{
        login:loginReducers,
        users:userReducer,
        user:singleUser,
        admin:AdminAuth
    }
})
export default store