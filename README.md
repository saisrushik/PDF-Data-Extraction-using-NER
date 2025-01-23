# **PDF Data Extraction using NER (SpaCy)**

This project is a Full-Stack NLP based application that extracts structured data (Name, Phone Number, Address, and Job) from PDF files, displays the data in a user-friendly HTML table, and allows users to download the extracted data in **CSV** and **JSON** formats.

---

## **Demo Video**

<p align="center">
  <video width="720" height="400" controls>
    <source src="./" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</p>

---

## **Features**
- Extracts details like Name, Phone Number, Address, and others from PDF files using NLP.
- Processes raw data with **spaCy** for Named Entity Recognition (NER).
- Displays extracted data in a responsive, styled HTML table.
- Provides options to download extracted data in CSV and JSON formats.
- Uses a **Flask** backend for PDF processing and a **React** frontend for UI.

---

## **Technologies Used**
- **Frontend**:
  - React
  - Bootstrap for UI styling
- **Backend**:
  - Flask
  - spaCy for Named Entity Recognition (NER)
- **Additional Libraries**:
  - pdfplumber for PDF text extraction
  - Axios for API calls

---

## **Setup and Installation**

### **Prerequisites**
1. Node.js and npm installed on your system.
2. Python (3.8 or later) installed on your system.
3. pip for Python package installation.

---

### **Backend Setup**
1. Navigate to the `backend` directory:
   ```bash
   cd Backend
2. Work on Virtual Environment
   ```bash
   python -m venv venv
   source venv\Scripts\activate
3. install required Libraries for Backend
   ```bash
   pip install flask pdfplumber transformers spacy numpy pandas gunicorn tensorflow torch
4. Start Flask Server
   ```bash
   python app.py
The app will be accessible at http://localhost:5000.

---

### **Frontend Setup**
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
2. Install Node.js dependencies:
   ```bash
   npm install
3. Start React development server:
   ```bash
   npm start
The app will be accessible at http://localhost:3000.

---

### **How to Use**
1. Open the application in your browser at http://localhost:3000.
2. Upload a PDF containing structured data (e.g., Name, Phone Number, Address).
3. View the extracted data in the table.
4. Use the "Download CSV" or "Download JSON" buttons to save the extracted data.

---

### **Contact**
For any questions or support, feel free to reach out:

Email: saisrushik98@gmail.com
<br/>
GitHub: [Link] (https://github.com/saisrushik)
