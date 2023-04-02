import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import "./App.scss";
import Private from "./Routes/Private";
import Public from "./Routes/Public";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Private />}>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<Public />}>
        </Route>
      </Routes>
    </>
  );
}

export default App;
