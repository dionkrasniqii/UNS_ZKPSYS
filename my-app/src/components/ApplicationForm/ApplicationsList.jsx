import { Table, Input, Alert } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Encryption from "../../Auth/Encryption";
const { Search } = Input;

export default function ApplicationsList(props) {
  const columns = [
    {
      title: "Emri",
      dataIndex: ["aplikimi", "emri"],
      key: "aplikimiId",
      width: "20%",
      filterDropdown: ({ setSelectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Search
            placeholder='Kërko Emrin'
            onSearch={(value) => {
              setSelectedKeys([value]);
              confirm();
            }}
            className='custom-search'
          />
        </div>
      ),
      onFilter: (value, record) =>
        record.aplikimi.emri.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Mbiemri",
      dataIndex: ["aplikimi", "mbiemri"],
      key: "aplikimiId",
      width: "20%",
    },
    {
      title: "Vendi",
      dataIndex: ["aplikimi", "vendi"],
      key: "aplikimiId",
      width: "20%",
    },
    {
      title: "Data aplikimit",
      dataIndex: ["aplikimi", "dataAplikimit"],
      render: (value, row, index) => {
        let newDate = new Date(value);
        return <span>{newDate.toLocaleDateString("en-GB")}</span>;
      },
      key: "aplikimiId",
      width: "20%",
    },
    {
      title: "Statusi",
      dataIndex: ["statusiKerkeses", "pershkrimi"],
      width: "20%",
      key: "aplikimiId",
      render: (value) => {
        return (
          
          <div className='text-start'>
            {value === "Aprovim" && (
              <span>
                <label className='pe-2 mt-2'>Aprovuar</label>
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
            {value === "Proces" && (
              <span>
                <label className='pe-2 mt-2'>Proces</label>
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
            {value === "Rikthim" && (
              <span>
                <label className='pe-2 mt-2'>Rikthim</label>
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
      title: "Veprime",
      key: "aplikimiId",
      dataIndex: "aplikimiId",
      fixed: "right",
      width: 100,
      render: (value) => {
        const id = btoa(value);
        return (
          <Link
            className='rbt-btn btn-secondary btn-sm'
            to={`/application/edit/${id}`}
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
        );
      },
    },
  ];
  return (
    <>
      {props.data.length > 0 ? (
        <Table columns={columns} rowKey='aplikimiId' dataSource={props.data} />
      ) : (
        <>
          <Alert
            style={{
              fontSize: "19px",
            }}
            message='Nuk ka asnje aplikant ne kete fakultet'
            showIcon
            type='info'
          />
        </>
      )}
    </>
  );
}
