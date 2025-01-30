import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import BookTable from "./components/BookTable";
import BookForm from "./components/BookForm";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<BookTable />} />
        <Route path="/add-book" element={<BookForm />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
