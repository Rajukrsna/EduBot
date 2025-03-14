import React, { useState, useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const QPPreview = ({ pdfDownloadLink }) => {
  const [pdfPreview, setPdfPreview] = useState(null);

  useEffect(() => {
    if (pdfDownloadLink) {
      console.log("PDF Link:", pdfDownloadLink);

      // Fetch the PDF and convert it to a Blob URL for preview
      fetch(pdfDownloadLink)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setPdfPreview(url);
        })
        .catch((error) => console.error("Error fetching PDF:", error));
    }
  }, [pdfDownloadLink]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: 400,
        borderRadius: 3,
        padding: 2,
        height: 500,
        display: "flex",
        flexDirection: "column",
        marginTop: 2,
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
        QP Preview
      </Typography>

      {/* Display PDF preview */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: 2,
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {pdfPreview ? (
          <iframe
            src={pdfPreview}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="PDF Preview"
          />
        ) : (
          <Typography variant="body2" color="textSecondary">
            No QP generated yet.
          </Typography>
        )}
      </Box>

      {/* Download Button */}
      {pdfPreview && (
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          startIcon={<DownloadIcon />}
          href={pdfPreview}
          download="question_paper.pdf"
        >
          Download QP
        </Button>
      )}
    </Paper>
  );
};

export default QPPreview;
