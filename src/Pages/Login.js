import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: "", password: "" };
  }

  userNameChanged = (e) => {
    this.setState({ userName: e.target.value });
  };

  passwordChanged = (e) => {
    this.setState({ password: e.target.value });
  };

  onSubmitClicked = () => {
    this.props.onSubmit({
      userName: this.state.userName,
      password: this.state.password,
    });
  };

  render() {
    const { userName, password } = this.state;
    return (
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              required
              id="standard-required"
              label="User Name"
              defaultValue=""
              variant="standard"
              value={userName}
              onChange={(e) => {
                this.userNameChanged(e);
              }}
            />

            <TextField
              required
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
              value={password}
              onChange={(e) => this.passwordChanged(e)}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Link to="/dashboard" style={{textDecoration: "none"}}>
            <Button
              onClick={() => {
                this.onSubmitClicked();
              }}
              variant="contained"
            >
            Login
            </Button>
            </Link>
          </div>
        </div>
      </Box>
    );
  }
}

export default Login;
