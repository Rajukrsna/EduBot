import React, { useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import UploadDownload from "../components/UploadDownlaod";
import QAList from "../components/QAList";
import QPPreview from "../components/QPpreview";

const Home = () => {
 // const [generatedQP, setGeneratedQP] = useState("Wait for qp to be generated");
  const [pdfDownloadLink, setPdfDownloadLink] = useState("");
  const [extractedData, setExtractedData] = useState({ syllabusText: "", previousQPText: "" });

  return (
    <Container maxWidth="lg" sx={{ width: "100%", textAlign: "center", flexGrow: 1 }}>
      <Typography variant="h5">Upload the Docs to Start the Chat</Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Question papers prepared by the bot will be based on the docs you upload.
      </Typography>
      <UploadDownload onDataProcessed={setExtractedData}  />

      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <QAList syllabusText={extractedData.syllabusText} previousQPText={extractedData.previousQPText} onLinkData={setPdfDownloadLink} />
        </Grid>
        <Grid item>
          <QPPreview pdfDownloadLink={pdfDownloadLink}  />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
