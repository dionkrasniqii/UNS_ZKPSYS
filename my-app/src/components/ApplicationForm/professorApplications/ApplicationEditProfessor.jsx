import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CrudProvider from "../../../provider/CrudProvider";
import Encryption from "../../../Auth/Encryption";
import { useSelector } from "react-redux";
import { Triangle } from "react-loader-spinner";
import ApplicationEditProfessorForm1 from "./ApplicationEditProfessorForm1";
import ApplicationEditProfessorForm2 from "./ApplicationEditProfessorForm2";

const ApplicationEditProfessor = () => {
  const { id } = useParams();
  const decryptedId = atob(id);
  const [applicant, setApplicant] = useState({});
  const professorList = useSelector((state) => state.professorList.professors);

  useEffect(() => {
    Promise.all([
      CrudProvider.getItemById(
        "AplikimiShqyrtimiAPI/GetAplikiminById",
        decryptedId
      ).then((res) => {
        console.log(res);
        if (res) {
          if (res.statusCode === 200) {
            setApplicant(res.result[0]);
          }
        }
      }),
    ]);
  }, [id]);
  return (
    <div className='container'>
      {professorList.length > 0 ? (
        <>
          {applicant?.formulari?.formulariId === 1 ? (
            <ApplicationEditProfessorForm1 />
          ) : applicant.formulari.formulariId === 2 ? (
            <ApplicationEditProfessorForm2 />
          ) : null}
        </>
      ) : (
        <div className='d-flex justify-content-center align-items-center'>
          <Triangle height='80' width='80' color='#ff6969' visible={true} />
        </div>
      )}
    </div>
  );
};
export default ApplicationEditProfessor;
