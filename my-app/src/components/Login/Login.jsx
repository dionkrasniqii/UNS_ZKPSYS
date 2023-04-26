import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import CrudProvider from "../../provider/CrudProvider";
import logo from "../../photos/logo.png";
import logoUP from "../../assets/images/icons/up.png";
import { useTranslation } from "react-i18next";
import { LineWave } from "react-loader-spinner";

const Login = (props) => {
  const login = {
    Username: "",
    Password: "",
  };
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showLoad, setLoad] = useState(false);

  async function handleLogin(data) {
    data.preventDefault();
    setLoad(true);
    let username = document.querySelector("input[name=username]").value;
    let password = document.querySelector("input[name=password]").value;
    if (username && password) {
      login.Username = username;
      login.Password = password;
      await CrudProvider.login(login).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            props.login(res);
            setLoad(false);
            toast.success("Qasja juaj u realizua me sukses");
            navigate("/");
          }
        } else {
          setLoad(false);
          toast.error("Probleme ne server, ju lutem provoni me vone");
        }
      });
    } else {
      setLoad(false);
      toast.error("Mbushni te dhenat e kerkuara");
    }
  }
  return (
    <div className="container">
      <div className="h-100vh">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-12 text-center my-5">
            <img src={logoUP} alt="" className="login-img" />
          </div>
          <div className="col-lg-5 d-flex justify-content-center align-items-center">
            <div className="rbt-contact-form contact-form-style-1 w-100">
              <h3 className="title fw-bold mb-3">{t("Login")}</h3>
              <form className="max-width-auto" onSubmit={handleLogin}>
                <div className="form-group mt-5">
                  <input name="username" type="text" autoComplete="off" />
                  <label className="mb-1">{t("Username")}</label>
                  <span className="focus-border" />
                </div>
                <div className="form-group">
                  <input name="password" autoComplete="off" type="password" />
                  <label className="mb-1">{t("Password")}</label>
                  <span className="focus-border" />
                </div>
                <div className="form-submit-group">
                  {showLoad === false ? (
                    <button
                      type="submit"
                      className="rbt-btn btn-md btn-gradient btn-gradient-4 hover-icon-reverse w-100"
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">Identifikimi</span>
                        <span className="btn-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-arrow-right-short"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                            />
                          </svg>
                        </span>
                        <span className="btn-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-arrow-right-short"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                            />
                          </svg>
                        </span>
                      </span>
                    </button>
                  ) : (
                    <div className="col-xxl-12 col-lg-12 col-sm-12 d-flex justify-content-center align-items-center">
                      <LineWave
                        height="100"
                        width="100"
                        color="red"
                        ariaLabel="line-wave"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        firstLineColor=""
                        middleLineColor=""
                        lastLineColor=""
                      />
                    </div>
                  )}
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
