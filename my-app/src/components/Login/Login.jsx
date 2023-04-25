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
    <div className='container '>
      <div className='row justify-content-center'>
        <div className='col-lg-12 text-center my-5'>
          {/* <img src={logoUP} alt="" className="login-img" /> */}
        </div>
        <div className='col-lg-5'>
          <div className='rbt-contact-form contact-form-style-1 w-100'>
            {/* <div className='col-xxl-12 text-center'>
              <img src={logo} width='500px' height='250px' />
            </div> */}
            <h3 className='title'>{t("Login")}</h3>
            <form className='max-width-auto' onSubmit={handleLogin}>
              <div className='form-group'>
                <input name='username' type='text' autoComplete='off' />
                <label>{t("Username")}</label>
                <span className='focus-border' />
              </div>
              <div className='form-group'>
                <input name='password' autoComplete='off' type='password' />
                <label>{t("Password")}</label>
                <span className='focus-border' />
              </div>
              <div className='form-submit-group'>
                {showLoad === false ? (
                  <button
                    type='submit'
                    className='rbt-btn btn-md btn-gradient btn-gradient-4 hover-icon-reverse w-100'
                  >
                    <span className='icon-reverse-wrapper'>
                      <span className='btn-text'>Log In</span>
                      <span className='btn-icon'>
                        <i className='feather-arrow-right' />
                      </span>
                      <span className='btn-icon'>
                        <i className='feather-arrow-right' />
                      </span>
                    </span>
                  </button>
                ) : (
                  <div className='col-xxl-12 col-lg-12 col-sm-12 d-flex justify-content-center align-items-center'>
                    <LineWave
                      height='100'
                      width='100'
                      color='red'
                      ariaLabel='line-wave'
                      wrapperStyle={{}}
                      wrapperClass=''
                      visible={true}
                      firstLineColor=''
                      middleLineColor=''
                      lastLineColor=''
                    />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
