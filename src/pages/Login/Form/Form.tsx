import React from "react";
import { useNavigate, useHref } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import {
  FormSubmitEvt,
  IconMouseEvt,
  InputChangeEvt,
  InputFocusEvt,
} from "../../../ts/types/const.types";
import { Box } from "@mui/system";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { instanceLogin } from "../../../api/instance";
import { propsForm } from "../../../ts/interface/data.interface";

const Form = (props: propsForm) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
  });
  const [inputError, setInputError] = React.useState({
    emailInputError: false,
    passwordInputError: false,
  });
  const [inputErrorText, setInputErrorText] = React.useState({
    emailErrorText: "",
    passwordErrorText: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);

  // INPUTS CHANGE
  const handleChangeInput = (evt: InputChangeEvt) => {
    if (evt.target.name == "email") {
      setFormState({ ...formState, email: evt.target.value });

      // Check Email
      setInputErrorText({
        ...inputErrorText,
        emailErrorText: "",
      });
      setInputError({
        ...inputError,
        emailInputError: false,
      });
    } else if (evt.target.name == "password") {
      setFormState({ ...formState, password: evt.target.value });

      // Check Password
      setInputErrorText({
        ...inputErrorText,
        passwordErrorText: "",
      });
      setInputError({
        ...inputError,
        passwordInputError: false,
      });
    }
  };

  // INPUTS CHECK
  const handleBlurCheck = (evt: InputFocusEvt) => {
    if (evt.target.name == "email") {
      let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
      if (evt.target.value == "") {
        setInputErrorText({
          ...inputErrorText,
          emailErrorText: "This email is required",
        });
        setInputError({
          ...inputError,
          emailInputError: true,
        });
      } else if (!regex.test(evt.target.value)) {
        setInputErrorText({
          ...inputErrorText,
          emailErrorText: "You have entered an invalid email address!",
        });
        setInputError({
          ...inputError,
          emailInputError: true,
        });
      }
    } else if (evt.target.name == "password") {
      if (evt.target.value == "") {
        // Check Password
        setInputErrorText({
          ...inputErrorText,
          passwordErrorText: "This password is required",
        });
        setInputError({
          ...inputError,
          passwordInputError: true,
        });
      }
    }
  };

  // PASWORD SHOW OR NOT SHOW
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (evt: IconMouseEvt) => {
    evt.preventDefault();
  };

  // FORM SUBMIT POST
  const handleSubmit = (evt: FormSubmitEvt) => {
    evt.preventDefault();
    instanceLogin
      .post("/api/login", {
        email: formState.email,
        password: formState.password,
      })
      .then((res) => {
        if (res.data.token) {
          setInputErrorText({
            ...inputErrorText,
            emailErrorText: "",
            passwordErrorText: "",
          });
          setInputError({
            ...inputError,
            emailInputError: false,
            passwordInputError: false,
          });

          props.checkUser(true)
          window.localStorage.setItem("access_token", res.data.token);
          navigate("/home");
          dispatch({ type: "AUTH", payload: true });
        }
      })
      .catch((err) => {
        if (err.response.data.error) {
          props.checkUser(true)
          setInputErrorText({
            ...inputErrorText,
            emailErrorText: "Email is not defined",
            passwordErrorText: "Password Invalid",
          });
          setInputError({
            ...inputError,
            emailInputError: true,
            passwordInputError: true,
          });
        }
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
        alignItems: "stretch",
        gap: "20px",
        backdropFilter: "blur(10px)",
        backgroundColor: "#ffffff99",
        padding: "50px 20px",
        borderRadius: "5px"
      }}
    >
      <TextField
        onChange={handleChangeInput}
        onBlur={handleBlurCheck}
        id="outlined-basic"
        label="Email"
        variant="outlined"
        name="email"
        type="email"
        error={inputError.emailInputError}
        helperText={inputErrorText.emailErrorText}
        required
      />

      <FormControl variant="outlined">
        <InputLabel
          htmlFor="outlined-adornment-password"
          error={inputError.passwordInputError}
        >
          Password
        </InputLabel>

        <OutlinedInput
          onChange={handleChangeInput}
          onBlur={handleBlurCheck}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          required
          name="password"
          error={inputError.passwordInputError}
        />
        <FormHelperText error={inputError.passwordInputError}>
          {inputErrorText.passwordErrorText}
        </FormHelperText>
      </FormControl>

      <Button
        sx={{ width: "25ch", padding: "0, 10px" }}
        type="submit"
        variant="contained"
      >
        Login
      </Button>
    </Box>
  );
};

export default Form;
