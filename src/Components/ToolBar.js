import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ScannerIcon from "@mui/icons-material/Scanner";
import Button from "@mui/material/Button";
import PersonIcon from '@mui/icons-material/Person';

class ToolBar extends React.Component {
  render() {
    let toolbarDetail;
    if(this.props.isLoggedIn) {
      toolbarDetail = 
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div>
          <Button
            variant="contained"
          >
            <PersonIcon /> 
            Welcome Erlic Bachman
          </Button>
        </div>
      </div>
    } else {
    toolbarDetail =  
      <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
      >
        <div>
          <Button
            onClick={() => {
              this.props.onSignInClicked();
            }}
            variant="contained"
          >
            Sign In
          </Button>
        </div>
        <div style={{ marginLeft: 10 }}>
          <Button onClick={() => {
              this.props.onSignUPClicked();
          }} variant="contained">
            Sign UP
          </Button>
        </div>
      </div>
    }
    return (
      <AppBar color={"secondary"} position="sticky">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ScannerIcon fontSize={"large"} style={{ marginRight: 20 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Handy Scan
          </Typography>
          {toolbarDetail}
         
        </Toolbar>
      </AppBar>
    );
  }
}

export default ToolBar;
