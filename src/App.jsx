import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/Home";
import BookForm from "./components/BookForm";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<BookForm />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
