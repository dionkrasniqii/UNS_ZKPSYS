import { Select } from "antd";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Encryption from "../../Auth/Encryption";
import CrudProvider from "../../provider/CrudProvider";
import FifthForm from "./forms/FifthForm";
import FourthForm from "./forms/FourthForm";
import SecondForm from "./forms/SecondForm";
import ThirdForm from "./forms/ThirdForm";

const CreateApplications = () => {
  const { id } = useParams();
  const decryptedId = atob(id);
  const profesor = JSON.parse(
    Encryption.Decrypt(localStorage.getItem("profesor"))
  );
  const [applicationDTO, setApplicationDTO] = useState({
    Aplikimi: {
      FormulariId: decryptedId,
      DataAplikimit: new Date().toLocaleString(),
      ProfesoriId: profesor.profesoriID,
      Emri: profesor.emri,
      Mbiemri: profesor.mbiemri,
      FakultetiId: profesor.fakultetiID,
      ThirrjaShkencoreId: "",
      ThirrjaAkademikeId: "",
      BankaId: "",
      NumriLlogarisBankare: "",
      // ME KALU  NE DINAMIKE MASNEJ
      ShumaKerkuar: "250",
      Vendi: "",
    },
    BankName: "",
    ThirrjaShkencoreEmri: "",
    ThirrjaAkademikeEmri: "",
    AutoriKryesorId: "",
    AplikimiDetajetPublikimi: {
      PerkatesiaAutorit: "",
      TitulliPunimit: "",
      DOI: "",
      ShtepiaBotuese: "",
      RevistaId: "",
      ImpaktFaktori: "",
      DataPranimit: "",
      LinkuPublikimit: "",
      DataPublikimit: "",
    },
    AplikuesiPrezantimi: {
      Konference: false,
      NjesiAkademike: false,
      SqaroMenyrenPrezantimit: "",
    },
    AplikimiDekaniRaportiDocumentId: "",
    KonferenceDokumentiId: "",
    NjesiAkademikeDokumentiId: "",
    AplikimiBashkeAutorId: [],
    AutoriKorrespodentId: [],
  });
  const [showForm3, setShowForm3] = useState(false);
  const [showForm4, setShowForm4] = useState(false);
  const [showForm5, setShowForm5] = useState(false);
  useEffect(() => {
    Promise.all([
      CrudProvider.getBankSMC(`${profesor.numriPersonal}`),
      CrudProvider.getItemById(
        "GeneralAPIController/GetProfesoriGrade",
        profesor.profesoriID
      ),
    ]).then((res) => {
      setApplicationDTO({
        ...applicationDTO,
        Aplikimi: {
          ...applicationDTO.Aplikimi,
          BankaId: res[0].BankId,
          NumriLlogarisBankare: res[0].AccountNumber,
          BankName: res[0].BankName,
          ThirrjaAkademikeId: res[1][0].GradaMesimoreID,
          ThirrjaShkencoreId: res[1][0].GradaShkencoreID,
        },
        ThirrjaAkademikeEmri: res[1][0].GradaMesimore,
        ThirrjaShkencoreEmri: res[1][0].GradaShkencore,
      });
    });
  }, []);

  async function handleSubmit() {
    const formData = new FormData();
    Object.keys(applicationDTO).forEach((key) => {
      if (
        key === "Aplikimi" ||
        key === "AplikimiDetajetPublikimi" ||
        key === "AplikuesiPrezantimi"
      ) {
        Object.keys(applicationDTO[key]).forEach((subKey) => {
          formData.append(`${key}.${subKey}`, applicationDTO[key][subKey]);
        });
      } else if (
        typeof applicationDTO[key] === "object" &&
        applicationDTO[key] !== null &&
        applicationDTO[key].constructor === Array
      ) {
        applicationDTO[key].forEach((value) => {
          formData.append(`${key}[]`, value.toString());
        });
      } else {
        formData.append(key, applicationDTO[key]);
      }
    });

    await CrudProvider.createItemWithFile("AplikimiAPI", formData).then(
      (res) => {
        if (res !== undefined) {
          if (res.statusCode === 200) {
            toast.success("Aplikimi u regjistrua me sukses");
          } else if (res.statusCode === 0) {
            toast.error("Probleme ne server ju lutemi provoni perseri");
          } else if (res.statusCode === 409) {
            toast.error("Ju keni aplikuar me heret me kete email");
          } else {
            toast.error("Probleme ne server ju lutemi provoni perseri");
          }
        }
      }
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <div className='container mt-5'>
      <div className='col-xxl-12 col-lg-10 col-sm-12 d-flex justify-content-center'>
        <SecondForm
          applicationDTO={applicationDTO}
          setApplicationDTO={setApplicationDTO}
          showForm3={setShowForm3}
        />
      </div>
      <div className='col-xxl-12 col-lg-10 col-sm-12  d-flex justify-content-center mt-4'>
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
        )}
      </div>
    </div>
  );
};
export default CreateApplications;
