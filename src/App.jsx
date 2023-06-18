import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/user/auth/SignIn";
import SignUp from "./components/user/auth/Signup";
import Home from "./pages/user/Home";
import Error from "./Error";
import  PrivateComponent, { AdminPrivateComponent } from "./components/PrivateComponent";
import AdminLogin from "./components/admin/auth/login";
import AdminHome from "./pages/admin/AdminHome";
import ViewUsersPage from "./pages/admin/ViewUsers";

function App() {

  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* user */}
        
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Home />} />
         </Route>
        
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* admin */}
        <Route element={<AdminPrivateComponent />}>
        <Route  path="/admin" element={<AdminHome/>}/>
        <Route  path="/admin/view-users" element={<ViewUsersPage/>}/>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
