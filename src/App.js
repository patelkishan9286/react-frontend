import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ProfileListing from "./components/ProfileListing";
import ProfileInfo from "./components/ProfileInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profiles" element={<ProfileListing />} />
        <Route path="/profilesinfo" element={<ProfileInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
