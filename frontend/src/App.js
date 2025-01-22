import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setData(response.data); // Set the returned list of objects
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    }
  };

  const downloadCSV = () => {
    if (data.length === 0) return;

    // Create CSV content
    const csvHeaders = ["Name", "Phone", "Address", "Other"];
    const csvRows = data.map((person) =>
      [person.Name || "N/A", person.Phone || "N/A", person.Address || "N/A", person.Other || "N/A"].join(",")
    );
    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");

    // Create a Blob and download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "extracted_data.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadJSON = () => {
    if (data.length === 0) return;

    // Create JSON content
    const jsonContent = JSON.stringify(data, null, 2);

    // Create a Blob and download
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "extracted_data.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="display-4">PDF Data Extraction</h1>
        <p className="lead">Upload a PDF to extract structured data and display it in a table.</p>
      </div>

      <div className="card p-4 shadow-lg">
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            accept=".pdf"
          />
        </div>
        <button
          className="btn btn-primary w-100"
          onClick={handleUpload}
          disabled={!file}
        >
          Upload and Process PDF
        </button>
      </div>

      {data.length > 0 && (
        <div className="mt-5">
          <h3 className="text-center mb-4">Extracted Data</h3>
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-success me-2" onClick={downloadCSV}>
              Download CSV
            </button>
            <button className="btn btn-warning" onClick={downloadJSON}>
              Download JSON
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Other</th>
                </tr>
              </thead>
              <tbody>
                {data.map((person, index) => (
                  <tr key={index}>
                    <td>{person.Name || "N/A"}</td>
                    <td>{person.Phone || "N/A"}</td>
                    <td>{person.Address || "N/A"}</td>
                    <td>{person.Other || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
