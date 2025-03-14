import React, { useState } from "react";
import { Button, Card, CardContent, Typography, Stack, Box, InputLabel } from "@mui/material";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const UploadDownload = ({ onDataProcessed }) => {
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [questionPaperFile, setQuestionPaperFile] = useState(null);

  const handleFileChange = (e, type) => {
    if (type === "syllabus") setSyllabusFile(e.target.files[0]);
    if (type === "previous_qp") setQuestionPaperFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!syllabusFile || !questionPaperFile) {
      alert("Please upload both files");
      return;
    }

    const formData = new FormData();
    formData.append("syllabus", syllabusFile);
    formData.append("previous_qp", questionPaperFile);

    try {
      const response = await axios.post(`${backendUrl}/extractText/extract`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onDataProcessed(response.data);
      alert("file uploaded, Chat to the botS") // Pass extracted text to parent component
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh", // Ensures it's centered properly
        paddingTop: "80px", // Prevents overlapping with navbar
      }}
    >
      <Card sx={{ width: 400, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center" }}>
            Upload Files
          </Typography>

          <Stack spacing={2}>
            {/* Upload Syllabus File */}
            <Box>
              <InputLabel sx={{ fontWeight: "bold" }}>Upload Syllabus</InputLabel>
              <input type="file" onChange={(e) => handleFileChange(e, "syllabus")} />
            </Box>

            {/* Upload Previous Question Paper */}
            <Box>
              <InputLabel sx={{ fontWeight: "bold" }}>Upload Previous Question Paper</InputLabel>
              <input type="file" onChange={(e) => handleFileChange(e, "previous_qp")} />
            </Box>

            {/* Upload Button */}
            <Button variant="contained" color="primary" onClick={handleUpload} fullWidth>
              Upload & Process
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UploadDownload;
