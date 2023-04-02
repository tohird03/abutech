import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Form from "./Form/Form";
import bgImg from "../../assets/imgs/form.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [checkUser, setCheckUser] = React.useState(false)
  const notify = () => toast("Tekshiryapmiz! Kutib turing");

  useEffect(() => {
    if(checkUser) {
      notify()
    }
  }, [checkUser])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Form checkUser={setCheckUser} />
      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default Login;
