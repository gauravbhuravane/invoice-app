import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Login";
import About from "./pages/About";
import InvoiceForm from "./pages/InvoiceForm";
import InvoiceView from "./pages/InvoiceView";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

function App() {

  // Demo behavior: clear token on refresh
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>

          {/* 🌐 HOME */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
              </>
            }
          />

          {/* 🔓 LOGIN (NOW WITH NAVBAR) */}
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
              </>
            }
          />

          {/* 🌐 ABOUT */}
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <About />
              </>
            }
          />

          {/* 🔐 INVOICE FORM */}
          <Route
            path="/invoice"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <InvoiceForm />
                </>
              </ProtectedRoute>
            }
          />

          {/* 🔐 INVOICE VIEW */}
          <Route
            path="/invoice/view"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <InvoiceView />
                </>
              </ProtectedRoute>
            }
          />

          {/* 🔄 FALLBACK */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>

        {/* ✅ FOOTER ON ALL PAGES */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
