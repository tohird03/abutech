import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import { useSelector } from "react-redux";
import { TokenInterface } from "../ts/interface/reducer.interface";
export default function Private() {
  let tokenAuth = useSelector((state: TokenInterface) => state.token);
  let tokenLocal = window.localStorage.getItem("access_token");
  let [token, setToken] = useState<string>(tokenLocal || "");

  useEffect(() => {
    setToken(tokenLocal || "");
  }, [tokenAuth]);

  if (token) {
    return <Home />;
  } else {
    return <Login />;
  }
}
