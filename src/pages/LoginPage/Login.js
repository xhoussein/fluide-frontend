import {
  Box,
  FormControl,
  Typography,
  Button,
  Avatar,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MailIcon from "../../assets/images/mailIcon.svg";
import loginUserIcon from "../../assets/images/loginUserIcon.svg";
import googleIcon from "../../assets/images/googleIcon.svg";
import padlock from "../../assets/icons/padlock.svg";
import { useMediaQuery } from "../../hook/useMediaQuery";
import { mobile, styles } from "./style";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  userLogin,
  loginSuccess,
  googleLoginAction,
} from "../../redux/actions/Login/LoginAction";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  // const isLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn);

  const isLoggedIn = useSelector((state) => {
    return state.LoginReducer?.isLoggedIn;
  });

  const googleHandler = () => {
    dispatch(googleLoginAction())
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isEmailValid = validator.isEmail(email);

    if (!isEmailValid) {
      setEmailErr("Please enter a valid email");
    } else {
      setEmailErr("");
    }

    if (!password) {
      setPasswordErr("Password is required");
    } else {
      setPasswordErr("");
    }

    if (isEmailValid && password) {
      const data = {
        email: email,
        password: password,
      };

      try {
        const response = await dispatch(userLogin(data));
        const { token } = response.data;
        dispatch(loginSuccess(response.data));
        localStorage.setItem("token", token.accessToken);

        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={isMobile ? mobile.loginContainer : styles.loginContainer}>
        <Typography sx={styles.formHeading}>
          <img
            style={styles.loginUserIcon}
            src={loginUserIcon}
            alt="loginUserIcon"
          />
          Login
        </Typography>

        <FormControl sx={styles.inputField} fullWidth variant="outlined">
          <TextField
            id="outlined-basic"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            InputLabelProps={{ shrink: true, focused: false }}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src={MailIcon} alt="mail icon" style={styles.labelIcon} />
                Email
              </Box>
            }
            variant="outlined"
          />

          {emailErr && (
            <Typography variant="h6" style={{ color: "red" }}>
              {emailErr}
            </Typography>
          )}
        </FormControl>
        <FormControl sx={styles.inputField} fullWidth variant="outlined">
          <TextField
            id="outlined-basic"
            placeholder="Enter your password"
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            InputLabelProps={{ shrink: true, focused: false }}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src={padlock} alt="mail icon" style={styles.labelIcon} />
                Enter password
              </Box>
            }
            variant="outlined"
          />
          {passwordErr && (
            <Typography variant="h6" style={{ color: "red" }}>
              {passwordErr}
            </Typography>
          )}
        </FormControl>
        <Typography variant="h6">or</Typography>
        <Button
          onClick={googleHandler}
          variant="contained"
          sx={styles.Googlebutton}
        >
          <Avatar
            sx={{
              width: "31px",
              height: "31px",
              marginRight: "25px",
            }}
            alt="Button Image"
            src={googleIcon}
          />
          Connect with google
        </Button>
        
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={styles.Loginbutton}
        >
          Login
        </Button>
        <Box>
          {" "}
          <Typography variant="h6" sx={{ marginTop: "9px" }}>
            Don't have an account?
            <span
              type="button"
              onClick={() => navigate("/signup")}
              style={{
                color: "#6C8EA5",
                cursor: "pointer",
                paddingLeft: "5px",
              }}
            >
              Signup
            </span>
          </Typography>
        </Box>
      </Box>
    </form>
  );
};

export default Login;
