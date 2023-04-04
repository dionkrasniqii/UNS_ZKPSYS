import logo from "./logo.svg";
import "./style.css";
import { Router, useNavigate } from "react-router";
import AppRoutes from "./routes";
import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Home/Navbar.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Encryption from "./Auth/Encryption";
import jwtDecode from "jwt-decode";
import CrudProvider from "./provider/CrudProvider";
import { Provider, useDispatch, useSelector } from "react-redux";
import { setProfessors } from "./store/actions";
import store from "./store/store";

function App() {
  const dispatch = useDispatch();
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
  });
  let navigate = useNavigate();
  const oldSession = localStorage.getItem("token");
  useEffect(() => {
    if (oldSession !== null) {
      const decodedToken = jwtDecode(oldSession);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        navigate("/login");
        setAuthState({ isAuthenticated: false, token: null });
        toast.info("Sessioni juaj ka mbaruar qasuni perseri");
        return;
      }
      setAuthState({ isAuthenticated: true, token: oldSession });
    } else {
      navigate("/login");
      setAuthState({ isAuthenticated: false, token: null });
    }
  }, [oldSession]);

  useEffect(() => {
    CrudProvider.getAll("GeneralAPIController/GetProfesoret").then((res) => {
      if (res) {
        dispatch(setProfessors(res));
      }
    });
  }, []);

  function handleLogin(res) {
    localStorage.setItem("token", res.token);
    let profesor = Encryption.Encrypt(JSON.stringify(res.result));
    localStorage.setItem("profesor", profesor);
    setAuthState({ isAuthenticated: true, token: res.token });
  }
  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("profesor");
    setAuthState({ isAuthenticated: false, token: null });
    toast.warning("You're logged out!");
  };
  return (
    <div className='App'>
      <ToastContainer
        position='top-right'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        style={{ fontSize: "14px" }}
      />
      <Navbar logout={handleLogout} isAuth={authState} />
      <AppRoutes login={handleLogin} />
    </div>
  );
}

export default App;
