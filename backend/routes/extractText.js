// Set up OpenAI API

const express = require("express");

const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");

// Configure file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to upload syllabus & QPs
router.post("/extract", upload.fields([{ name: "syllabus" }, { name: "previous_qp" }]), async (req, res) => {
    try {
        if (!req.files || !req.files["syllabus"] || !req.files["previous_qp"]) {
            return res.status(400).json({ error: "Both syllabus and previous QP are required." });
        }
        // Extract text from uploaded PDFs
        const syllabusText = await pdfParse(req.files["syllabus"][0].buffer).then(data => data.text);
        const previousQPText = await pdfParse(req.files["previous_qp"][0].buffer).then(data => data.text);
        res.json({ message: "Syllabus and previous QP uploaded!", syllabusText, previousQPText });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;