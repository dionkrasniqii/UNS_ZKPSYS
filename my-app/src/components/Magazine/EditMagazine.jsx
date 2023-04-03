import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import CrudProvider from "../../provider/CrudProvider.js";
import { Alert, AlertTitle } from "@mui/material";
import { Link } from "react-router-dom";
import Encryption from "../../Auth/Encryption.js";

const EditMagazine = () => {
  const { id } = useParams();
  let decryptedId = atob(id);
  const [magazine, setMagazine] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    CrudProvider.getItemById("RevistaAPI/GetRevistat", decryptedId).then(
      (res) => {
        if (res !== undefined) {
          setMagazine(res.result);
        } else {
          toast.error("Ka ndodhur nje problem, provoni serish");
          navigate("/magazine/index");
        }
      }
    );
  }, []);

  async function handleSubmit(data) {
    data.preventDefault();
    const model = {
      RevistaId: decryptedId,
      RevistaPershkrimi: magazine["revistaPershkrimi"],
      Aktiv: magazine["aktiv"],
    };
    await CrudProvider.updateItem("RevistaAPI", JSON.stringify(model)).then(
      (res) => {
        if (res !== undefined) {
          if (res.statusCode === 200) {
            toast.success("Te dhenat u perditsuan me sukses");
            navigate("/magazine/index");
          } else {
            toast.error("Perditesimi i te dhenave deshtoi provoni perseri");
          }
        } else {
          navigate("/magazine/index");
          toast.error("Provoni perseri probleme ne server");
        }
      }
    );
  }
  return (
    <div className='container'>
      <span className='fs-1'>Te dhenat e revistes</span>
      {Object.keys(magazine).length > 0 ? (
        <form onSubmit={handleSubmit}>
          <div className='row row--10 mt--10'>
            <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
              <label className='fs-5' htmlFor='RevistaPershkrimi'>
                Pershkrimi
              </label>
              <div className='form-group'>
                <input
                  type='text'
                  defaultValue={magazine["revistaPershkrimi"]}
                  onChange={(e) =>
                    setMagazine({
                      ...magazine,
                      revistaPershkrimi: e.target.value,
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
                  defaultChecked={magazine["aktiv"]}
                  onChange={(e) =>
                    setMagazine({ ...magazine, aktiv: e.target.checked })
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
                    to={"/magazine/index"}
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
export default EditMagazine;
