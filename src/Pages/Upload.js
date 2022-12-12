import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ToolBar from "../Components/ToolBar";
import CardItem from "../Components/Card";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagName: "",
      search: "",
      file: null,
      fileName: "",
      type: "",
      size: 0,
      collections: [],
      collectionFiles: [],
      downloadLinks: []
    };
    this.getCollections = this.getCollections.bind(this);
  }
  backend_url = "http://34.136.149.23:8080/api/v1/"

  componentDidMount() {
    this.getCollections()
  }

  getCollections = () => {
    axios({
      method: "get",
      url: this.backend_url + "getCollectionsForUser",
      params: {
        userName: "Erlic Bachman"
      }
    })
    .then((response) => {
      console.log("Got Collection Success", response);
      this.setState({collections: response.data})
    })
    .catch((error) => {
      console.log("Error Failed", error);
    });
  }

  getFilesForCollections = () => {
    axios({
      method: "get",
      url: this.backend_url + "getFilesForCollection",
      params: {
        userName: "Erlic Bachman",
        collection: this.state.search
      }
    })
    .then((response) => {
      console.log("Collection Fetched", response);
      this.setState({collectionFiles: response.data}, this.downloadFile)
    })
    .catch((error) => {
      console.log("Error Failed", error);
    });
  }

  downloadFile = () => {
    const url = this.backend_url + "downloadAudioFile";
    const downloadUrls = this.state.collectionFiles.map((item, index) => {
      const collection = this.state.search;
      const userName = "Erlic Bachman";
      const fileName = item["fileName"]
      const params = new URLSearchParams({
         collection,
         userName,
         fileName
      });
      item["download"] =  url + "?" + params;
      return item["download"]
    })
    this.setState({collectionFiles: [...this.state.collectionFiles]})
    console.log("Download urls are ", downloadUrls, this.state.collectionFiles); 
  }


  uploadFile = () => {
    axios({
      method: "post",
      url:  this.backend_url + "uploadImageAndProcess",
      params: {
        fileName: this.state.fileName,
        collection: this.state.tagName,
        userName: "Erlic Bachman",
      },
      data: {
        file: this.state.file,
      },
      headers: {
        ContentDisposition: `attachment; filename=${this.state.fileName}`,
        ContentLength: this.state.size,
        "Content-Type": "multipart/form-data"
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

  searchNameChanged = (e) => {
    this.setState({ search: e.target.value});
  }


  upload = () => {
    var fileDetails = document.getElementById("file").files[0];
    var fname = document.getElementById("file").files[0].name;
    var type = 'multipart/form-data';
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
      this.uploadFile()
    } else {
      console.log("No File Is Uploaded : ");
    }
  };

  searchClicked = () => {
    this.getFilesForCollections();
    this.getDownloadLinks();
  };

  render() {
    return (
      <>
      <ToolBar isLoggedIn={true}/>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <div style={{padding: 50}}>
          <TextField
            required
            id="standard-required"
            label="Tag Name"
            defaultValue=""
            variant="standard"
            sx={{ marginRight: 10}}
            value={this.state.tagName}
            onChange={(e) => {
              this.tagNameChanged(e);
            }}
          />
        </div>
        <div>
          <Button variant="contained" component="label">
            <UploadFileIcon />
            Upload
            <input
              hidden
              id="file"
              accept="image/*,application/pdf"
              multiple
              type="file"
              sx={{ padding: 10}}
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
            <CheckCircleOutlineIcon />
            Submit
          </Button>
        </div>
      </Stack>
      
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <div>
        <TextField
            id="search-required"
            label="Search"
            defaultValue=""
            variant="standard"
            sx={{ marginLeft: 3}}
            value={this.state.search}
            onChange={(e) => {
              this.searchNameChanged(e);
            }}
          />
          <Button 
            variant="contained"
            component="label"
            onClick={() => this.searchClicked()}
            sx={{marginLeft: 2}}
          >
            <SearchOutlinedIcon /> Search
          </Button>
        </div>
      </Stack>

      <Stack
        direction="row"
        justifyContent="left"
        alignItems="left"
        spacing={2}
        paddingLeft={10}
      >
        <CardItem collections={this.state.collections} behaviour={"tag"} width={300}/>
        <CardItem collections={this.state.collectionFiles} behaviour={"files"} width={900}/>

      </Stack>
      </>
    );
  }
}

export default Upload;
