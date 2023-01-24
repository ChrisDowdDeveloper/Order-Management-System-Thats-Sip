import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './layout/Login/Login';
import OrderScreen from "./layout/OrderScreen/OrderScreen";

function App() {
  const { login, setLogin } = useState();

  console.log(login)

  if (!login) {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            exact path={'/'}
            element={<Login setLogin={setLogin} />}
          />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/items"
          element={<OrderScreen login={login} />}
        />
      </Routes>
    </BrowserRouter >
  );
}

export default App;