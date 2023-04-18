import { Select } from "antd";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Encryption from "../../../Auth/Encryption";
import CrudProvider from "../../../provider/CrudProvider";
import ApplicationsList from "./ApplicationsList";

export default function ProfessorApplications() {
  const [formulars, setFormulars] = useState([]);
  const [formId, setFormId] = useState("");
  const [data, setData] = useState([]);
  const token = jwtDecode(localStorage.getItem("token"));
  const profesor = JSON.parse(
    Encryption.Decrypt(localStorage.getItem("profesor"))
  );
  let selectVal = sessionStorage.getItem("selectValProfessor");
  useEffect(() => {
    CrudProvider.getAll("FormulariAPI").then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setFormulars(res.result);
        }
      }
    });
  }, []);

  let formularsList =
    formulars.length > 0 &&
    formulars.map((obj, index) => {
      return { label: `${obj.pershkrimi}`, value: `${obj.formulariId}` };
    });

  function saveSelectValueOnSessionStorage(value) {
    sessionStorage.setItem("selectValProfessor", value);
  }

  useEffect(() => {
    if (selectVal) {
      Submit(selectVal);
    }
  }, []);

  async function Submit(e) {
    CrudProvider.getProfessorApplications(e, profesor.profesoriID).then(
      (res) => {
        if (res) {
          if (res.statusCode === 200) {
            res.result.length === 0
              ? toast.warning("Nuk keni asnje aplikim me kete formular")
              : setData(res.result);
          }
        }
      }
    );
  }

  return (
    <div className='container mt-5'>
      <div className='rbt-card '>
        <div className='rbt-card-body'>
          <div className='col-xxl-2 col-md-3 col-lg-2 col-sm-12'>
            <Select
              placeholder='Zgjedhni formularin'
              options={formularsList}
              showSearch
              optionFilterProp='children'
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              style={{ width: "100%" }}
              onChange={(e) => {
                Submit(e);
                saveSelectValueOnSessionStorage(e);
                setData([]);
              }}
            />
          </div>
        </div>
        {data.length > 0 && <ApplicationsList data={data} />}
      </div>
    </div>
  );
}
