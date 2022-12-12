import React from "react";
import SignUP from "../Components/SignUp";
import ToolBar from "../Components/ToolBar";
import Login from "./Login";
import Upload from "./Upload";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      loginPage: false,
      signUp: false,
    };
  }


  onSignInClicked = () => {
    this.setState({ loginPage: true, signUp: false });
  };

  onSignUPClicked = () => {
    this.setState({ signUp: true, loginPage: false });
  };

  loginSubmit = (data) => {
    // alert("login " + data.userName + data.password);
    this.props.history.push("/dashboard");
  };

  onCreate = (data) => {
    // alert("Create " + data.userName + data.password);
    // call Cretae api here
  };


  render() {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", overflow: "auto" }}
      >
        <ToolBar
          onSignInClicked={() => {
            this.onSignInClicked();
          }}
          onSignUPClicked={() => {
            this.onSignUPClicked();
          }}
          isLoggedIn={false}
        />
        <div style={{ marginTop: 190 }}>
          {this.state.loginPage ? (
            <Login
              onSubmit={(data) => {
                this.loginSubmit(data);
              }}
            />
          ) : null}
          {this.state.signUp ? (
            <SignUP
              onCreate={(data) => {
                this.onCreate(data);
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
