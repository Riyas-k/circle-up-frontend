import { Navigate,Outlet } from "react-router-dom";

const PrivateComponent =()=>{
    const auth = localStorage.getItem('token')
    return auth ?<Outlet />:<Navigate to='/sign-in'/>
}
export const AdminPrivateComponent = ()=>{
    const auth = localStorage.getItem('admin')
    return auth?<Outlet />:<Navigate to='/admin/login'/>
}
export default PrivateComponent