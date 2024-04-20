import React from "react";
import Home from "./components/Home";
import { Routes,Route, Link, useLocation } from "react-router-dom";
import Details from "./components/Details";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  const {search,pathname}=useLocation();
  return (
    <div className="w-screem h-screen flex">
      {(pathname!="/" || search.length>0) && <Link to="/" className="text-red-500 absolute left-[17%] top-[2%] text-xl font-semibold hover:text-sky-600">Home</Link>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/details/:id" element={<Details/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
      </Routes>

      
    </div>
  );
}

export default App;
