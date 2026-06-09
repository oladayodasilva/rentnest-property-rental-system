import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BackendTest from "./pages/BackendTest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test-backend" element={<BackendTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;