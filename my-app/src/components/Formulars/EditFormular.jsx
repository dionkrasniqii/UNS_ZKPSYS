import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Encryption from "../../Auth/Encryption";
import CrudProvider from "../../provider/CrudProvider";
const EditFormular = () => {
  const { id } = useParams();
  const [formular, setFormular] = useState({});
  const decryptedId = atob(id);

  const navigate = useNavigate();
  useEffect(() => {
    CrudProvider.getItemById("FormulariAPI/GetFormulari", decryptedId).then(
      (res) => {
        if (res !== undefined) {
          setFormular(res.result);
        } else {
          toast.error("Ka ndodhur nje problem, provoni serish");
          navigate("/formular/index");
        }
      }
    );
  }, []);
  async function handleSubmit(data) {
    data.preventDefault();
    const model = {
      FormulariId: decryptedId,
      Pershkrimi: formular["pershkrimi"],
      Aktiv: formular["aktiv"],
    };
    console.log("Update", model);
    await CrudProvider.updateItem("FormulariAPI", JSON.stringify(model)).then(
      (res) => {
        if (res !== undefined) {
          if (res.statusCode === 200) {
            toast.success("Te dhenat u perditsuan me sukses");
            navigate("/formular/index");
          } else {
            toast.error("Perditesimi i te dhenave deshtoi provoni perseri");
          }
        } else {
          navigate("/formular/index");
          toast.error("Provoni perseri probleme ne server");
        }
      }
    );
  }
  return (
    <div className='container mt-5'>
      <span className='fs-1'>Te dhenat e formularit</span>
      {Object.keys(formular).length > 0 ? (
        <form onSubmit={handleSubmit}>
          <div className='row row--10 mt--10'>
            <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
              <label className='fs-5' htmlFor='RevistaPershkrimi'>
                Pershkrimi
              </label>
              <div className='form-group'>
                <input
                  type='text'
                  defaultValue={formular["pershkrimi"]}
                  onChange={(e) =>
                    setFormular({
                      ...formular,
                      pershkrimi: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className='col-lg-6 d-flex align-items-center'>
              <p className='comment-form-cookies-consent'>
                <input
                  id='Aktiv'
                  name='Aktiv'
                  type='checkbox'
                  defaultChecked={formular["aktiv"]}
                  onChange={(e) =>
                    setFormular({ ...formular, aktiv: e.target.checked })
                  }
                />
                <label htmlFor='Aktiv'>Aktiv</label>
              </p>
            </div>
            <div className='col-lg-12'>
              <div className='row'>
                <div className='col-lg-1 col-sm-12 d-flex justify-content-start'>
                  <button
                    className='rbt-btn btn-primary  radius-round btn-sm'
                    type='submit'
                  >
                    <span className='btn-text'>Ruaj</span>
                    {/* <i className='feather-arrow-right'></i> */}
                    <span className='btn-icon'></span>
                  </button>
                  <Link
                    className='rbt-btn btn-danger btn-sm radius-round'
                    to={"/formular/index"}
                  >
                    Kthehu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <Alert severity='info' className='fs-3'>
          Nuk ka te dhena
        </Alert>
      )}
    </div>
  );
};
export default EditFormular;
