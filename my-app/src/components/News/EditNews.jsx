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
    <div className="container-fluid p-0">
      <div className="rbt-buy-now-area rbt-section-gap bg-gradient-1 header-transperent-spacer px-5">
        <div className="px--40">
          <div className="row">
            <div className="col-lg-10">
              <div className=" title-wrapper">
                <h1 className="title mb--0">Të gjitha lajmrimet</h1>
              </div>
              <p className="description mt-1">
                Blogu i lajmëve paraqet standarde që njofton të gjithë
                përdoruesit në mënyren sa më të shpejt dhe korrekte.
              </p>
            </div>
            <div className="col-lg-2">
              <Link className="rbt-btn btn-gradient" to={"/news/create"}>
                Krijoni Lajmrimin
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container rbt-buy-now-area top-news">
        <div className="rbt-blog-details-area rbt-section-gapBottom breadcrumb-style-max-width">
          <div className="blog-content-wrapper rbt-article-content-wrapper">
            <div className="content">
              {Object.keys(data).length > 0 && (
                <>
                  <div className="post-thumbnail mb--30 position-relative wp-block-image alignwide">
                    <figure>
                      <img
                        src="http://192.168.0.110:8888/Documents/dd9a218d-6e5b-4372-b318-ab17c0ccba6c.jpg"
                        alt="Blog Images"
                      />
                      {/* <figcaption>
                    Business and core management app are for enterprise.
                  </figcaption> */}
                    </figure>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="row row--10 mt--10">
                      <div className="col-lg-6">
                        <span className="fs-1">Te dhenat e lajmit</span>
                      </div>
                      <div className="col-lg-6 text-end">
                        <div className="d-flex justify-content-end align-top">
                          <Upload
                            type="button"
                            multiple={false}
                            maxCount="1"
                            accept=".png, .jpeg, . jpg ,.pdf"
                            onChange={(e) => {
                              setData({
                                ...data,
                                Document: e.file.originFileObj,
                              });
                            }}
                          >
                            <Button type="button" icon={<UploadOutlined />}>
                              Foto
                            </Button>
                          </Upload>

                          <div className="form-group pt-1">
                            <input
                              id="Aktiv"
                              name="Aktiv"
                              defaultChecked={data.Aktiv}
                              type="checkbox"
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  Aktiv: e.target.checked,
                                })
                              }
                            />
                            <label htmlFor="Aktiv">Aktiv</label>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-12 mt-4">
                            <div className="form-group">
                              <label className="fs-5">Titulli</label>
                              <input
                                name="RevistaPershkrimi"
                                type="text"
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
                          <div className="col-lg-12 mt-4"></div>
                          <div className="col-lg-6"></div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="fs-5 pb-4">Detajet</label>
                          <textarea
                            className="mt-4 shadow-3-strong mt-5 p-3"
                            name="RevistaPershkrimi"
                            type="text"
                            rows={15}
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
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-1 col-sm-12 d-flex justify-content-start">
                            <button
                              className="rbt-btn btn-primary  radius-round btn-sm"
                              type="submit"
                            >
                              <span className="btn-text">Ruaj</span>
                              {/* <i className='feather-arrow-right'></i> */}
                              <span className="btn-icon"></span>
                            </button>
                            <Link
                              className="rbt-btn btn-danger btn-sm radius-round"
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
          </div>
        </div>
        <div className="row"></div>
      </div>
    </div>
  );
}
