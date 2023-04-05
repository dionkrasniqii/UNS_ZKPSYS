import { UploadOutlined } from "@mui/icons-material";
import { Button } from "antd";
import Upload from "antd/es/upload/Upload";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CrudProvider from "../../provider/CrudProvider";

export default function CreateNews() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    Njoftimet: {
      Titulli: "",
      Detajet: "",
      Aktiv: false,
    },
    DokumentiId: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    let model = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "Njoftimet") {
        Object.keys(data[key]).forEach((nestedKey) => {
          model.append(`Njoftimet[${nestedKey}]`, data[key][nestedKey]);
        });
      } else {
        model.append(key, data[key]);
      }
    });
    // for (let pair of model.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    await CrudProvider.createItemWithFile("NjoftimetAPI", model).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success("Te dhenat u ruajten me sukses");
          navigate("/news/index");
        }
      }
    });
  }
  return (
    <div className='container mt-5'>
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
                onChange={(e) =>
                  setData({
                    ...data,
                    Njoftimet: {
                      ...data.Njoftimet,
                      Detajet: e.target.value,
                    },
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
                    onChange={(e) =>
                      setData({
                        ...data,
                        Njoftimet: {
                          ...data.Njoftimet,
                          Titulli: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div className='col-xxl-5 col-lg-6 col-sm-10 d-flex align-items-center mt-4'>
                {/* <label className='fs-4 pe-2'>Foto</label> */}
                <Upload
                  multiple={false}
                  onChange={(e) => {
                    setData({
                      ...data,
                      DokumentiId: e.file.originFileObj,
                    });
                  }}
                >
                  <Button type='text' icon={<UploadOutlined />}>
                    Foto
                  </Button>
                </Upload>
              </div>
              <div className='col-lg-6 d-flex align-items-center mt-3'>
                <p className='comment-form-cookies-consent'>
                  <input
                    id='Aktiv'
                    name='Aktiv'
                    type='checkbox'
                    onChange={(e) =>
                      setData({
                        ...data,
                        Njoftimet: {
                          ...data.Njoftimet,
                          Aktiv: e.target.checked,
                        },
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
    </div>
  );
}
