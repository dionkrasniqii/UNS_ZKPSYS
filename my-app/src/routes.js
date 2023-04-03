import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Magazine from "./components/Magazine/Magazine";
import CreateMagazine from "./components/Magazine/CreateMagazine";
import EditMagazine from "./components/Magazine/EditMagazine";
import Applications from "./components/ApplicationForm/Applications";
import CreateApplications from "./components/ApplicationForm/CreateApplications";
import EditApplications from "./components/ApplicationForm/EditApplications";
import SearchMagazine from "./components/Magazine/magazinePrices/SearchMagazine";
import Formulars from "./components/Formulars/Formulars";
import CreateFormular from "./components/Formulars/CreateFormular";
import EditFormular from "./components/Formulars/EditFormular";
import Login from "./components/Login/Login";
import PrivateRoute from "./Auth/PrivateRoute";
import ProfessorApplications from "./components/ApplicationForm/professorApplications/ProfessorApplications";
import ApplicationEditProfessor from "./components/ApplicationForm/professorApplications/ApplicationEditProfessor";
const AppRoutes = (props) => {
  const ROLES = {
    ZKPS: "35",
    PROFESOR: "5",
  };
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/login' element={<Login login={props.login} />} />

        {/* REVISTAT */}
        <Route path='/magazine/index' element={<Magazine />} />
        <Route path='/magazine/create' element={<CreateMagazine />} />
        <Route path='/magazine/edit/:id' element={<EditMagazine />} />
        <Route path='/magazine/search' element={<SearchMagazine />} />

        {/* APLIKIMET */}
        <Route
          path='/application/index'
          element={
            <PrivateRoute
              allowedRoles={[ROLES.ZKPS]}
              component={Applications}
            />
          }
        />

        <Route path='/application/create' element={<CreateApplications />} />
        <Route path='/application/edit/:id' element={<EditApplications />} />
        {/* APLIKIMET E PROFESORIT */}
        <Route
          path='/myapplications/search'
          element={<ProfessorApplications />}
        />
        <Route
          path='/application/editprofessor/:id'
          element={<ApplicationEditProfessor />}
        />
        <Route
          path='/myapplications/list'
          element={<ProfessorApplications />}
        />

        {/* FORMULARET */}
        <Route path='/formular/index' element={<Formulars />} />
        <Route path='/formular/create' element={<CreateFormular />} />
        <Route path='/formular/edit/:id' element={<EditFormular />} />
      </Routes>
    </>
  );
};
export default AppRoutes;
