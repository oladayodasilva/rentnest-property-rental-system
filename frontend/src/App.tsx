import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import EnquirySuccess from "./pages/EnquirySuccess";
import BackendTest from "./pages/BackendTest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/enquiry-success" element={<EnquirySuccess />} />
        <Route path="/test-backend" element={<BackendTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;