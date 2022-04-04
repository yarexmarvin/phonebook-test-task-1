import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { auth } from "./store/slices/userSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigator from "./components/Navigator";
import Login from "./components/Login";
import Contacts from "./components/Contacts";

function App() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // useEffect(()=>{
  //   if(!user.isLogged){
  //     dispatch(auth({
  //       login: 'test',
  //       password: 'test12345',
  //     }));
  //   }
  // },[])

  console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigator />}>
          <Route index element={<Contacts />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
