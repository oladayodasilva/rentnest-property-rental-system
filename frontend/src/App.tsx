import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import EnquirySuccess from "./pages/EnquirySuccess";
import BackendTest from "./pages/BackendTest";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProperties from "./pages/admin/AdminProperties";
import AddProperty from "./pages/admin/AddProperty";
import EditProperty from "./pages/admin/EditProperty";
import AdminEnquiries from "./pages/admin/AdminEnquiries";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/enquiry-success" element={<EnquirySuccess />} />
        <Route path="/test-backend" element={<BackendTest />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/properties"
          element={
            <ProtectedRoute>
              <AdminProperties />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/properties/new"
          element={
            <ProtectedRoute>
              <AddProperty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/properties/:id/edit"
          element={
            <ProtectedRoute>
              <EditProperty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/enquiries"
          element={
            <ProtectedRoute>
              <AdminEnquiries />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;