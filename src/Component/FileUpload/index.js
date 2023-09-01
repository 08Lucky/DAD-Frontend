import React, { useState } from "react";
import axios from "axios";
import "../Dashboard/Dashboard.css";

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const token = localStorage.getItem("jwtToken"); // Retrieve the token

      axios
        .post("http://localhost:8080/upload/load-excel-data", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        })
        .then((response) => {
          setUploadStatus("Excel data loading initiated.");
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          setUploadStatus("Error uploading file.");
        });
    }
  };

    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            <input
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
                style={{marginBottom:"10px", marginTop:"20px"}}
            />
            <div>
                <button 
                className="chart-button" 
                onClick={handleFileUpload}
                style={{marginBottom:"10px"}}>
                    Upload
                </button>
            </div>
            <p style={{marginBottom:"30px"}}>{uploadStatus}</p>
        </div>
    );
};

export default FileUpload