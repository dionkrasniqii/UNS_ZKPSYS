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
    <div className='container-fluid p-0'>
      <div className='container rbt-buy-now-area top-news mt-5'>
        <div className='rbt-blog-details-area rbt-section-gapBottom breadcrumb-style-max-width'>
          <div className='blog-content-wrapper rbt-article-content-wrapper'>
            <div className='content'>
              <form onSubmit={handleSubmit}>
                <div className='row row--10 mt--10'>
                  <div className='col-lg-6'>
                    <span className='fs-1'>Te dhenat e lajmit</span>
                  </div>
                  <div className='col-lg-6 text-end'>
                    <div className='d-flex justify-content-end align-top'>
                      <Upload
                        type='button'
                        multiple={false}
                        maxCount='1'
                        accept='.png, .jpeg, . jpg ,.pdf'
                        onChange={(e) => {
                          setData({
                            ...data,
                            DokumentiId: e.file.originFileObj,
                          });
                        }}
                      >
                        <Button type='button' icon={<UploadOutlined />}>
                          Foto
                        </Button>
                      </Upload>
                      <div className='form-group pt-1'>
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
                      </div>
                    </div>
                  </div>

                  <div className='col-lg-12'>
                    <div className='row'>
                      <div className='col-lg-12 mt-4'>
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
                      <div className='col-lg-12 mt-4'></div>
                      <div className='col-lg-6'></div>
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label className='fs-5 pb-4'>Detajet</label>
                      <textarea
                        className='mt-4 shadow-3-strong mt-5 p-3'
                        name='RevistaPershkrimi'
                        type='text'
                        rows={15}
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
                </div>
                <div className='col-lg-12'>
                  <div className='col-lg-1 col-sm-12 d-flex justify-content-start'>
                    <button
                      className='rbt-btn btn-primary radius-round btn-sm'
                      type='submit'
                    >
                      Ruaj
                    </button>
                    <Link
                      className='rbt-btn btn-danger btn-sm radius-round'
                      to={"/news/index"}
                    >
                      Kthehu
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
