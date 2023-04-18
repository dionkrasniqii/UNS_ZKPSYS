import Encryption from "../Auth/Encryption";

export const setProfessors = (professors) => ({
  type: "SET_PROFESSORS",
  payload: JSON.parse(Encryption.Decrypt(professors)),
});

export const addProfessor = (professor) => ({
  type: "ADD_PROFESSOR",
  payload: professor,
});

export const updateProfessor = (id, professor) => ({
  type: "UPDATE_PROFESSOR",
  payload: { id, professor },
});

export const deleteProfessor = (id) => ({
  type: "DELETE_PROFESSOR",
  payload: id,
});
