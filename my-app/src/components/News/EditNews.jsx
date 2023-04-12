import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function EditNews() {
  const { id } = useParams();
  const decryptedId = atob(id);
  const navigate = useNavigate();

  const [data, setData] = useState({
    NjoftimiId: "",
    Titulli: "",
    Detajet: "",
    Aktiv: false,
    DokumentiId: "",
    Document: "",
  });
  useEffect(() => {
    CrudProvider.getItemById("NjoftimetAPI/GetNjoftimet", decryptedId).then(
      (res) => {
        if (res) {
          if (res.statusCode === 200) {
            setData({
              ...data,
              NjoftimiId: res.result.njoftimiId,
              Titulli: res.result.titulli,
              Detajet: res.result.detajet,
              DokumentiId: res.result.document.dokumentiId,
              Aktiv: res.result.aktiv,
            });
          } else {
            navigate("/news/index");
          }
        } else {
          navigate("/news/index");
        }
      }
    );
  }, [decryptedId]);

  async function handleSubmit(event) {
    event.preventDefault();
    let model = new FormData();
    Object.keys(data).forEach((key) => {
      model.append(key, data[key]);
    });
    for (let pair of model.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    // await CrudProvider.updateItemWithFile("NjoftimetAPI", model).then((res) => {
    //   if (res) {
    //     if (res.statusCode === 200) {
    //       toast.success("Te dhenat u ruajten me sukses");
    //       navigate("/news/index");
    //     }
    //   }
    // });
  }
  return (
    <div className='container mt-5'>
      {Object.keys(data).length > 0 && (
        <>
          <span className='fs-1'>Te dhenat e lajmit</span>
          <form onSubmit={handleSubmit}>
            <div className='row row--10 mt--10'>
              <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                <div className='form-group'>
                  <label className='fs-5'>Detajet</label>
                  <textarea
                    className='mt-4'
                    name='RevistaPershkrimi'
                    type='text'
                    defaultValue={data.Detajet}
                    onChange={(e) =>
                      setData({
                        ...data,
                        Detajet: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className='col-lg-5 col-md-8 col-sm-12 col-12'>
                <div className='row'>
                  <div className='col-lg-8 col-md-4 col-sm-12 col-12'>
                    <div className='form-group'>
                      <label className='fs-5'>Titulli</label>
                      <input
                        name='RevistaPershkrimi'
                        type='text'
                        defaultValue={data.Titulli}
                        onChange={(e) =>
                          setData({
                            ...data,
                            Titulli: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className='col-xxl-5 col-lg-6 col-sm-10 d-flex align-items-center mt-4'>
                    <Upload
                      type='button'
                      multiple={false}
                      maxCount='1'
                      accept='.png, .jpeg, . jpg ,.pdf'
                      onChange={(e) => {
                        setData({
                          ...data,
                          Document: e.file.originFileObj,
                        });
                      }}
                    >
                      <Button type='button' icon={<UploadOutlined />}>
                        Foto
                      </Button>
                    </Upload>
                  </div>
                  <div className='col-lg-6 d-flex align-items-center mt-3'>
                    <p className='comment-form-cookies-consent'>
                      <input
                        id='Aktiv'
                        name='Aktiv'
                        defaultChecked={data.Aktiv}
                        type='checkbox'
                        onChange={(e) =>
                          setData({
                            ...data,
                            Aktiv: e.target.checked,
                          })
                        }
                      />
                      <label htmlFor='Aktiv'>Aktiv</label>
                    </p>
                  </div>
                </div>
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
                      to={"/news/index"}
                    >
                      Kthehu
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
