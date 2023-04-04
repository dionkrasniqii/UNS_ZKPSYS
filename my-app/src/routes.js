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
    ZKPSADMIN: "61",
  };
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/login' element={<Login login={props.login} />} />

        {/* REVISTAT */}
        <Route
          path='/magazine/index'
          element={
            <PrivateRoute
              allowedRoles={[ROLES.ZKPSADMIN]}
              component={Magazine}
            />
          }
        />
        <Route
          path='/magazine/create'
          element={
            <PrivateRoute
              allowedRoles={[ROLES.ZKPSADMIN]}
              component={CreateMagazine}
            />
          }
        />
        <Route
          path='/magazine/edit/:id'
          element={
            <PrivateRoute
              allowedRoles={[ROLES.ZKPSADMIN]}
              component={EditMagazine}
            />
          }
        />
        <Route
          path='/magazine/search'
          element={
            <PrivateRoute
              allowedRoles={[ROLES.ZKPSADMIN]}
              component={SearchMagazine}
            />
          }
        />

        {/* APLIKIMET */}
        <Route
          path='/application/index'
          element={
            <PrivateRoute
              allowedRoles={[ROLES.ZKPS, ROLES.ZKPSADMIN]}
              component={Applications}
            />
          }
        />

        <Route
          path='/application/create/:id'
          element={
            <PrivateRoute
              allowedRoles={[ROLES.PROFESOR]}
              component={CreateApplications}
            />
          }
        />
        <Route
          path='/application/edit/:id'
          element={
            <PrivateRoute
              allowedRoles={[ROLES.ZKPS, ROLES.ZKPSADMIN]}
              component={EditApplications}
            />
          }
        />
        {/* APLIKIMET E PROFESORIT */}
        <Route
          path='/myapplications/search'
          element={
            <PrivateRoute
              allowedRoles={[ROLES.PROFESOR]}
              component={ProfessorApplications}
            />
          }
        />
        <Route
          path='/application/editprofessor/:id'
          element={
            <PrivateRoute
              allowedRoles={[ROLES.PROFESOR]}
              component={ApplicationEditProfessor}
            />
          }
        />
        <Route
          path='/myapplications/list'
          element={
            <PrivateRoute
              allowedRoles={[ROLES.PROFESOR]}
              component={ProfessorApplications}
            />
          }
        />

        {/* FORMULARET */}
        <Route
          path='/formular/index'
          element={
            <PrivateRoute
              allowedRoles={[ROLES.ZKPSADMIN]}
              component={Formulars}
            />
          }
        />
        <Route
          path='/formular/create'
          element={
            <PrivateRoute
              allowedRoles={[ROLES.ZKPSADMIN]}
              component={CreateFormular}
            />
          }
        />
        <Route
          path='/formular/edit/:id'
          element={
            <PrivateRoute
              allowedRoles={[ROLES.ZKPSADMIN]}
              component={EditFormular}
            />
          }
        />
      </Routes>
    </>
  );
};
export default AppRoutes;
