import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom";
const PrivateComponent =()=>{
    const auth = useSelector((state)=>state.user.payload)
    return auth ?<Outlet />:<Navigate to='/sign-in' replace/>
}
export const AdminPrivateComponent = ()=>{
    const auth =  useSelector((state)=>state.admin.payload)
    return auth?<Outlet />:<Navigate to='/admin/login' replace/>
}
export default PrivateComponent