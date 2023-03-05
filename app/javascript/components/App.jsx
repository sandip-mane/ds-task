import React from "react";
import Routes from "./Routes";
import { ToastContainer } from 'react-toastify';

export default (props) => {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes />
    </>
  );
};