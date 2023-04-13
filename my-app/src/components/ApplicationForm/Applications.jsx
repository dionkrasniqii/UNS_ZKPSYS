import { width } from "@mui/system";
import { Select } from "antd";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CrudProvider from "../../provider/CrudProvider";
import ApplicationsList from "./ApplicationsList";

const Applications = () => {
  const [faculties, setFaculties] = useState([]);
  const [forms, setForms] = useState([]);
  const [data, setData] = useState([]);
  const [facultyId, setFacultyId] = useState("");
  const [formId, setFormId] = useState("");
  const user = localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : null;

  // let selectValFaculty = sessionStorage.getItem("selectValFaculty");
  // let selectValForm = sessionStorage.getItem("selectValForm");

  useEffect(() => {
    Promise.all([
      CrudProvider.getAll("GeneralAPIController/GetFaculties").then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setFaculties(res.result);
          }
        }
      }),
      CrudProvider.getAll("FormulariAPI").then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setForms(res.result);
          }
        }
      }),
    ]);
  }, []);

  // useEffect(() => {
  //   if (selectValFaculty && selectValForm) {
  //     user?.role === "61"
  //       ? CrudProvider.getApplicantFinalList(
  //           selectValFaculty,
  //           selectValForm
  //         ).then((res) => {
  //           if (res) {
  //             if (res.statusCode === 200) {
  //               setData(res.result);
  //             }
  //           }
  //         })
  //       : CrudProvider.getApplicantList(selectValFaculty, selectValForm).then(
  //           (res) => {
  //             if (res) {
  //               if (res.statusCode === 200) {
  //                 setData(res.result);
  //               }
  //             }
  //           }
  //         );
  //   }
  // }, []);

  let facultiesList =
    faculties.length > 0 &&
    faculties.map((obj, index) => {
      return {
        label: `${obj.fakultetiPershkrimi}`,
        value: `${obj.fakultetiId}`,
      };
    });

  let formsList =
    forms.length > 0 &&
    forms.map((obj, index) => {
      return {
        label: `${obj.pershkrimi}`,
        value: `${obj.formulariId}`,
      };
    });

  // function saveSelectValueFacultyOnSessionStorage(value) {
  //   sessionStorage.setItem("selectValFaculty", value);
  // }

  // function saveSelectValueFormOnSessionStorage(value) {
  //   sessionStorage.setItem("selectValForm", value);
  // }

  async function Submit() {
    {
      user?.role === "61"
        ? await CrudProvider.getApplicantFinalList(facultyId, formId).then(
            (res) => {
              if (res) {
                if (res.statusCode === 200) {
                  setData(res.result);
                }
              }
            }
          )
        : await CrudProvider.getApplicantList(facultyId, formId).then((res) => {
            if (res) {
              if (res.statusCode === 200) {
                setData(res.result);
              }
            }
          });
    }
  }
  return (
    <div className='container mt-5'>
      <div className='rbt-card rbt-card-body '>
        <div className='row'>
          <div className='col-lg-3 col-sm-12 mt-2'>
            <Select
              placeholder='Zgjedhni fakultetin'
              style={{ width: "100%" }}
              mode='single'
              options={facultiesList}
              // defaultValue={selectValFaculty}
              onChange={(e) => {
                setFacultyId(e);
                // saveSelectValueFacultyOnSessionStorage(e);
              }}
            />
          </div>
          <div className='col-lg-3 col-sm-12 mt-2'>
            <Select
              placeholder='Zgjedhni formularin'
              style={{ width: "100%" }}
              mode='single'
              options={formsList}
              // defaultValue={selectValForm}
              onChange={(e) => {
                setFormId(e);
                // saveSelectValueFormOnSessionStorage(e);
              }}
            />
          </div>
          <div className='col-lg-3 col-sm-12 d-flex justify-content-start'>
            <a
              className='rbt-btn btn-sm btn-border radius-round'
              onClick={Submit}
            >
              Kerko
            </a>
          </div>
        </div>
      </div>
      <div className='rbt-card rbt-card-body  mt-3'>
        <ApplicationsList data={data} />
      </div>
    </div>
  );
};
export default Applications;
