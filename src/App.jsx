import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/user/auth/SignIn";
import SignUp from "./components/user/auth/Signup";
import Home from "./pages/user/Home";
import Error from "./Error";
import PrivateComponent, { AdminPrivateComponent } from "./components/PrivateComponent";
import AdminLogin from "./components/admin/auth/login";
import AdminHome from "./pages/admin/AdminHome";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminPrivateComponent />}>
        <Route  path="/admin" element={<AdminHome/>}/>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
