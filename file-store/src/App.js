import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import storage from "./firebase.store";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


function App() {

  const [userName, setUsername] = useState();

  const [file, setfile] = useState();

  const [data, setData] = useState([])

  useEffect(() => {

    fetchData()
  }, [])
  const onChangeHandler = (event) => {
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          addData(downloadURL)
        });
      }
    );
  };

  const fetchData = () => {
    axios.get('http://localhost:4000/files/files').then(res => {
      console.log(res.data.data);
      setData(res.data.data)
      console.log(data);
    })

  }
  const addData = (downloadURL) => {
    const data = {
      fileName: file.name
      , fileUrl: downloadURL,
      fileUploadedBy: userName
    }
    axios.post('http://localhost:4000/files/add-files', data).then(res => {
      console.log(res.data);
      setUsername('');
      setfile(null);
      fetchData()
    })
  }

  return (
    <div className="App">
      <div className="row col-12">
        <div className="d-flex flex-column justify-content-center align-items-center col-12">
          <div className="input" style={{ marginTop: '10px' }}>
            <h2>Upload File with Name</h2>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="User's name " aria-label="Username" aria-describedby="basic-addon1" value={userName} onChange={(event) => { setUsername(event.target.value) }} />
            </div>
            <div class="custom-file">
              <input onChange={(event) => setfile(event.target.files[0])} type="file" class="custom-file-input" id="inputGroupFile01" />
              <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
            </div>

            <button onClick={onChangeHandler} className="mt-3 mb-3 btn btn-primary">Upload</button>
          </div>
        </div>
      </div>
      {/* table */}
      <h3>Files:</h3>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">File Uploaded By</th>
              <th scope="col">File Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((res, index) => <tr>
              <th scope="row">{index + 1}</th>

              <td>{res.fileUploadedBy}</td>
              <td style={{ cursor: 'pointer' }} onClick={() => { window.open(res.fileUrl) }}>{res.fileName}</td>
            </tr>)}


          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;