import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/Home';
import Contacto from './components/Contacto';

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route  exact path="/" element={<Home />} />
          <Route exact path="/contacto" element={<Contacto />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;