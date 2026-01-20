import SignUpForm from "./SignUpForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Newmaps from "./Newmaps";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/newmaps" element={<Newmaps />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
    
