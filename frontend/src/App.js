import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    Name: "",
    Phone: "",
    Address: "",
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please upload a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log('try block')
      const response = await axios.post(
        "http://127.0.0.1:5000/upload-pdf",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log('request posted');
      //console.log(response);
      setData(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to extract data from the PDF.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>PDF Data Extraction</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload PDF</button>
      </form>
      <h2>Extracted Data</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={data.Name} readOnly />
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" value={data.Phone} readOnly />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" value={data.Address} readOnly />
      </div>
    </div>
  );
}

export default App;
