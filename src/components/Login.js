import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  const [helperText, setHelperText] = useState({
    username: "",
    password: "",
  });

  const [showPass, setShowPass] = useState({
    password: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const isFormEmpty = Object.values(values).some((value) => value === "");

    if (
      !isFormEmpty &&
      Object.values(errors).every((error) => error === false)
    ) {
      axios
        .post("https://express-t4.onrender.com/api/login", values)
        .then(() => {
          navigate("/profiles");
        })
        .catch((err) => {
          alert(
            "The Username/Email or Password you entered is incorrect. Please try again."
          );
        });
    } else {
      alert(
        "There are errors in the form. Please correct them before submitting."
      );
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let errorState = false;
    let helperState = "";

    if (!value) {
      errorState = true;
      helperState = "This field is required";
    } else if (name === "username") {
      const regex = /^[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*\.[A-Z|a-z]{0,}$/;
      if (value && !regex.test(value)) {
        errorState = true;
        helperState = "Please enter a valid email address";
      }
    } else if (name === "password") {
      const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!regex.test(value)) {
        errorState = true;
        helperState =
          "Password should be minimum eight characters, at least one letter, one number and one special character";
      }
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: errorState });
    setHelperText({ ...helperText, [name]: helperState });
  };

  const handleTogglePass = (name) => {
    setShowPass({
      ...showPass,
      [name]: !showPass[name],
    });
  };

  return (
    <>
      <Container maxWidth="sm">
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Paper elevation={2} sx={{ padding: 5 }}>
            <Typography variant="h4" component="h4" align="center" gutterBottom>
              Login Page
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container direction={"column"} spacing={2}>
                <Grid item key="username">
                  <TextField
                    fullWidth
                    label={"Email"}
                    variant="outlined"
                    value={values.username}
                    onChange={handleChange}
                    name="username"
                    type="text"
                    error={errors.username}
                    helperText={helperText.username}
                  />
                </Grid>
                <Grid item key="password">
                  <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                    type={showPass.password ? "text" : "password"}
                    error={errors.password}
                    helperText={helperText.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleTogglePass("password")}
                            edge="end"
                          >
                            {showPass.password ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button fullWidth variant="contained" type="submit">
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Container>
      {/* <NavLink to="/profiles">Profiles</NavLink> */}
    </>
  );
}
