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
import SecondForm3 from "./form3/SecondForm3";

const CreateApplications = () => {
  const { id } = useParams();
  const decryptedId = atob(id);

  return (
    <div className="container mt-5">
      {decryptedId && decryptedId == 1 && <SecondForm />}
      {decryptedId && decryptedId == 2 && <SecondForm2 />}
      {decryptedId && decryptedId == 3 && <SecondForm3 />}
    </div>
  );
};
export default CreateApplications;
