import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuList from "./components/menu/MenuList";
import SaveMenuItem from "./components/menu/SaveMenuItem";
import Cart from "./components/menu/Cart";
import Login from "./components/Login";
import { UserContextProvider } from "./UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Login />} />
          <Route path="/menu-items" element={<MenuList />} />
          <Route path="/menu-save/:menuItemId" element={<SaveMenuItem />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </UserContextProvider>
  </BrowserRouter>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
