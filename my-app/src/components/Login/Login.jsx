import jwtDecode from "jwt-decode";
import React from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import CrudProvider from "../../provider/CrudProvider";
import logo from "../../photos/logo.png";
import logoUP from "../../assets/images/icons/up.png";
import { useTranslation } from "react-i18next";

const Login = (props) => {
  const login = {
    Username: "",
    Password: "",
  };
  const navigate = useNavigate();
  const { t } = useTranslation();
  async function handleLogin(data) {
    data.preventDefault();
    let username = document.querySelector("input[name=username]").value;
    let password = document.querySelector("input[name=password]").value;
    if (username && password) {
      login.Username = username;
      login.Password = password;
      await CrudProvider.login(login).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            props.login(res);
            toast.success("Qasja juaj u realizua me sukses");
            navigate("/");
          }
        } else {
          toast.error("Te dhenat e juaja jane te pasakta");
        }
      });
    } else {
      toast.error("Mbushni te dhenat e kerkuara");
    }
  }
  return (
    <div className="container">
      <div className="h-100vh">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-12 text-center my-5">
            {/* <img src={logoUP} alt="" className="login-img" /> */}
          </div>
          <div className="col-lg-5">
            <div className="rbt-contact-form contact-form-style-1 w-100">
              {/* <div className='col-xxl-12 text-center'>
              <img src={logo} width='500px' height='250px' />
            </div> */}
              <h3 className="title fw-bold mb-3">{t("Login")}</h3>
              <form className="max-width-auto" onSubmit={handleLogin}>
                <div className="form-group">
                  <input name="username" type="text" autoComplete="off" />
                  <label>{t("Username")}</label>
                  <span className="focus-border" />
                </div>
                <div className="form-group">
                  <input name="password" autoComplete="off" type="password" />
                  <label>{t("Password")}</label>
                  <span className="focus-border" />
                </div>
                <div className="form-submit-group">
                  <button
                    type="submit"
                    className="rbt-btn btn-md btn-gradient btn-gradient-3 hover-icon-reverse w-100"
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text text-uppercase">Log In</span>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
