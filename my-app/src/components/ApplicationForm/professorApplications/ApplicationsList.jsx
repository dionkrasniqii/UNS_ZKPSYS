import { Input, Table } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const { Search } = Input;

export default function ApplicationsList(props) {
  const { t } = useTranslation();
  const data = props.data;
  const columns = [
    {
      title: t("TitleOfPaper"),
      dataIndex: "titulliPunimit",
      key: "aplikimiId",
      width: "20%",
      filterDropdown: ({ setSelectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Search
            placeholder={t("Search") + " " + t("Title")}
            onSearch={(value) => {
              setSelectedKeys([value]);
              confirm();
            }}
            className='custom-search'
          />
        </div>
      ),
      onFilter: (value, record) =>
        record.titulliPunimit.toLowerCase().includes(value.toLowerCase()),
    },
    // {
    //   title: "DOI",
    //   dataIndex: "doi",
    //   key: "aplikimiId",
    //   width: "20%",
    // },
    {
      title: t("Status"),
      dataIndex: "statusiKerkesesId",
      width: "20%",
      key: "aplikimiId",
      render: (value) => {
        return (
          <div className='text-start'>
            {value === 4 && (
              <span>
                <label className='pe-2 mt-2'>{t("Approved")}</label>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width={25}
                  height={25}
                  fill='currentColor'
                  className='bi bi-file-check-fill'
                  viewBox='0 0 16 16'
                  style={{ color: "green" }}
                >
                  <path d='M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1.146 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708.708z' />
                </svg>
              </span>
            )}
            {value === 1 && (
              <span>
                <label className='pe-2 mt-2'>{t("Process")}</label>
                <svg
                  viewBox='64 64 896 896'
                  focusable='false'
                  data-icon='exclamation-circle'
                  width={25}
                  height={25}
                  fill='currentColor'
                  aria-hidden='true'
                  style={{ color: "orange" }}
                >
                  <path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z' />
                </svg>
              </span>
            )}
            {value === 2 && (
              <span>
                <label className='pe-2 mt-2'>{t("Relapse")}</label>
                <svg
                  viewBox='64 64 896 896'
                  focusable='false'
                  data-icon='exclamation-circle'
                  width={25}
                  height={25}
                  fill='currentColor'
                  aria-hidden='true'
                  style={{ color: "orange" }}
                >
                  <path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z' />
                </svg>
              </span>
            )}
            {value === 3 && (
              <span>
                <label className='pe-2 mt-2'>{t("Verified")}</label>
                <svg
                  viewBox='64 64 896 896'
                  focusable='false'
                  data-icon='exclamation-circle'
                  width={25}
                  height={25}
                  fill='currentColor'
                  aria-hidden='true'
                  style={{ color: "blue" }}
                >
                  <path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z' />
                </svg>
              </span>
            )}
            {value === 5 && (
              <span>
                <label className='pe-2 mt-2'>{t("Rejected")}</label>
                <svg
                  viewBox='64 64 896 896'
                  focusable='false'
                  data-icon='exclamation-circle'
                  width={25}
                  height={25}
                  fill='currentColor'
                  aria-hidden='true'
                  style={{ color: "red" }}
                >
                  <path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z' />
                </svg>
              </span>
            )}
          </div>
        );
      },
      width: "20%",
    },
    {
      title: t("Actions"),
      dataIndex: "statusiKerkesesId",
      key: "aplikimiId",
      render: (value, record) => {
        if (value === 2) {
          return (
            <div className='col-lg-3 col-xxl-3'>
              <Link
                className='rbt-btn btn-secondary btn-sm'
                to={`/application/editprofessor/${btoa(record.aplikimiId)}`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width={16}
                  height={16}
                  fill='currentColor'
                  className='bi bi-pencil-square'
                  viewBox='0 0 16 16'
                >
                  <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                  <path
                    fillRule='evenodd'
                    d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
                  />
                </svg>
              </Link>
            </div>
          );
        }
        return null;
      },
      width: "20%",
    },
  ];

  return (
    <div className='container'>
      <div className='rbt-card-body '>
        <Table columns={columns} rowKey='aplikimiId' dataSource={data} />
      </div>
    </div>
  );
}
