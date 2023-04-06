import axios from "axios";

//const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_LOCAL;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_STAGING;
//const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_PRODUCTION;

//const API_BASE_URL_DOC = process.env.REACT_APP_API_BASE_URL_LOCAL_DOCS;
const API_BASE_URL_DOC = process.env.REACT_APP_API_BASE_URL_STAGING_DOCS;
//const API_BASE_URL_DOC = process.env.REACT_APP_API_BASE_URL_PRODUCTION_DOCS;

async function login(login) {
  const loginDTO = JSON.stringify(login);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/LoginAPI/login`,
      loginDTO,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
// Get all items
async function getAll(controller) {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(`${API_BASE_URL}/${controller}`, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}
// Get a single item by ID
async function getItemById(controller, itemId) {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${API_BASE_URL}/${controller}/${itemId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

// Create a new item
async function createItem(controller, itemData) {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_BASE_URL}/${controller}`,
      itemData,
      {
        headers: {
          Authorization: "Bearer" + token,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}
// CREATE OBJECT WITH FORM FILE
async function createItemWithFile(controller, itemData) {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_BASE_URL}/${controller}`,
      itemData,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "Multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}
// Update an existing item by ID
async function updateItem(controller, itemData) {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.put(
      `${API_BASE_URL}/${controller}`,
      itemData,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function updateItemWithFile(controller, itemData) {
  try {
    let token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_BASE_URL}/${controller}`,
      itemData,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "Multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function deleteItemById(controller, itemId) {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.delete(
      `${API_BASE_URL}/${controller}/${itemId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}
async function getMagazinesPrice(formId, magazineId, facultyId) {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${API_BASE_URL}/RevistaShumaAPI/GetRevistaShuma/${formId}/${magazineId}/${facultyId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}
async function getProfessorApplications(FormulariId, ProfesorId) {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${API_BASE_URL}/AplikimiAPI/GetAplikimetProfesori/${FormulariId}/${ProfesorId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}
function documentPath(filePath) {
  return `${API_BASE_URL_DOC}/${filePath}`;
}
// async function getBankSMC(personalNumber) {
//   try {
//     let token = localStorage.getItem("token");

//     const response = await axios.get(
//       `${process.env.REACT_APP_API_PERSONEL_PRODUCTION}${personalNumber}`
//     );
//     return response.data;
//   } catch (error) {
//     handleRequestError(error);
//   }
// }
async function handleRequestError(error) {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
}

export default {
  login,
  getAll,
  getItemById,
  createItem,
  updateItem,
  getMagazinesPrice,
  deleteItemById,
  createItemWithFile,
  getProfessorApplications,
  updateItemWithFile,
  documentPath,
  // getBankSMC,
};