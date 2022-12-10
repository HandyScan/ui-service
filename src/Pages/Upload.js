import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagName: "",
      file: null,
      fileName: "",
      type: "",
      size: 0,
    };
  }

  uploadFile = () => {
    axios({
      method: "post",
      url: "http://localhost:8080/backend-service/api/v1/uploadImageAndProcess",
      params: {
        fileName: this.state.fileName,
        collection: this.state.tagName,
        userName: "default",
      },
      data: {
        file: this.state.file,
      },
      headers: {
        ContentDisposition: `attachment; filename=${this.state.fileName}`,
        ContentLength: this.state.size,
        ContentType: this.state.type,
      },
    })
      .then(function (response) {
        console.log("Upload Success", response);
      })
      .catch(function (error) {
        console.log("Upload Failed", error);
      });
  };

  tagNameChanged = (e) => {
    this.setState({ tagName: e.target.value });
  };

  upload = () => {
    var fileDetails = document.getElementById("file").files[0];
    var fname = document.getElementById("file").files[0].name;
    var type = document.getElementById("file").files[0].type;
    var size = document.getElementById("file").files[0].size;
    this.setState({
      fileName: fname,
      file: fileDetails,
      type: type,
      size: size,
    });
    console.log("fname : ", fname);
    console.log("fileDetails : ", fileDetails);
  };

  submitClicked = () => {
    if (this.state.file && this.state.size > 0) {
      this.upload();
    } else {
      console.log("No File Is Uploaded : ");
    }
  };

  render() {
    return (
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <div style={{ marginBottom: 20 }}>
          <TextField
            required
            id="standard-required"
            label="Tag Name"
            defaultValue=""
            variant="standard"
            sx={{ marginRight: 10 }}
            value={this.state.tagName}
            onChange={(e) => {
              this.tagNameChanged(e);
            }}
          />
          <Button variant="contained" component="label">
            Upload
            <input
              hidden
              id="file"
              accept="image/*,application/pdf"
              multiple
              type="file"
              onChange={(e) => this.upload(e)}
            />
          </Button>
          {this.state.fileName ? (
            <Typography variant="caption" display="block" gutterBottom>
              {"Uploaded File Name : " + this.state.fileName}
            </Typography>
          ) : null}
        </div>
        <div>
          <Button
            variant="contained"
            component="label"
            onClick={() => this.submitClicked()}
          >
            Submit
          </Button>
        </div>
      </Stack>
    );
  }
}

export default Upload;
