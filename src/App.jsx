import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Loader from "./components/Loader";

// Lazy load the pages
const Home = lazy(() => import("./Pages/Home"));
const BookForm = lazy(() => import("./components/BookForm"));
const BookDetail = lazy(() => import("./Pages/DetailPage"));

function App() {
  return (
    <Router>
      <Header />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-book" element={<BookForm />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </Router>
  );
}

export default App;
