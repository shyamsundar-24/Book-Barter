import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import BookDetails from "./pages/BookDetails";
import Dashboard from "./pages/Dashboard";
import Protected from "./components/Protected";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Protected><Home /></Protected>} />
        <Route path="/addbook" element={<Protected><AddBook /></Protected>} />
        <Route path="/book/:id" element={<Protected><BookDetails /></Protected>} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />

        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
