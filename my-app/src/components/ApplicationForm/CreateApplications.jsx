import { Select } from "antd";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Encryption from "../../Auth/Encryption";
import CrudProvider from "../../provider/CrudProvider";
import FifthForm from "./form1/FifthForm";
import FourthForm from "./form1/FourthForm";
import SecondForm from "./form1/SecondForm";
import ThirdForm from "./form1/ThirdForm";
import SecondForm2 from "./form2/SecondForm2";
import { useTranslation } from "react-i18next";

const CreateApplications = () => {
  const { id } = useParams();
  const decryptedId = atob(id);

  return (
    <div className='container mt-5'>
      {decryptedId && decryptedId == 1 && (
        <>
          <div className='col-xxl-12 col-lg-10 col-sm-12 d-flex justify-content-center'>
            <SecondForm />
          </div>
          {/* <div className='col-xxl-12 col-lg-10 col-sm-12  d-flex justify-content-center mt-4'>
            {showForm3 === true ? (
              <ThirdForm
                applicationDTO={applicationDTO}
                setApplicationDTO={setApplicationDTO}
                showForm4={setShowForm4}
              />
            ) : (
              <p></p>
            )}
          </div>
          <div className='col-xxl-12 col-lg-10 col-sm-12 d-flex justify-content-center mt-4'>
            {showForm4 === true ? (
              <FourthForm
                applicationDTO={applicationDTO}
                setApplicationDTO={setApplicationDTO}
                showForm5={setShowForm5}
              />
            ) : (
              <p></p>
            )}
          </div>
          <div className='col-xxl-12 col-lg-10 col-sm-12 d-flex justify-content-center mt-4 mb-4 '>
            {showForm5 === true ? (
              <FifthForm
                applicationDTO={applicationDTO}
                setApplicationDTO={setApplicationDTO}
                showForm5={setShowForm5}
                submit={handleSubmit}
              />
            ) : (
              <p></p>
            )} */}
          {/* </div> */}
        </>
      )}
      {decryptedId && decryptedId == 2 && <SecondForm2 />}
    </div>
  );
};
export default CreateApplications;
