
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  NavHeader,
  Home,
  Employees,
  CrudTemplate,
  AddEmp,
  Update,
  Details,
} from "./components";

ReactDOM.render(
  <Router>
    <NavHeader />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/employee/" element={<CrudTemplate />}>
        <Route path=":id" element={<Details />} />
        <Route path="create" element={<AddEmp />} />
        <Route path="update/:id" element={<Update />} />
      </Route>
    </Routes>
  </Router>,

  document.getElementById("root")
);

