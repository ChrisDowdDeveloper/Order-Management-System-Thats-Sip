import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './layout/Login/Login';
import AddItem from './layout/AddItem/AddItem';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/items/new"
          element={<AddItem />}
        />
      </Routes>
    </BrowserRouter >
  );
}

export default App;