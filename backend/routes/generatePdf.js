const express = require("express");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/generate", async (req, res) => {
    try {
        const { difficulty, syllabusText, previousQPText } = req.body;
        if (!difficulty) {
            return res.status(400).json({ error: "Missing required parameters." });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Extract Question Paper Pattern
        const patternResponse = await model.generateContent(
            `Analyze this question paper and extract the format:\n${previousQPText}`
        );
        const qpPattern = patternResponse.response.candidates[0].content.parts[0].text;

        // Generate the Question Paper
        const response = await model.generateContent(
            `Generate a new question paper based on this syllabus:\n${syllabusText} and difficulty: ${difficulty}\n\nFollow this pattern:\n${qpPattern}`
        );

        let newQP = response.response.candidates[0].content.parts[0].text;

        console.log("Generated QP (Markdown Format):", newQP);

        // Remove Markdown Syntax (Manual Approach)
        newQP = newQP
            .replace(/\*\*(.*?)\*\*/g, "$1") // Remove **bold** formatting
            .replace(/\*(.*?)\*/g, "$1")     // Remove *italic* formatting
            .replace(/`(.*?)`/g, "$1")      // Remove `inline code`
            .replace(/^#+\s/gm, "");        // Remove # Headings

        console.log("Formatted QP (Plain Text):", newQP);

        // Define paths for saving the PDF
        const pdfPath = `Generated_QP_${Date.now()}.pdf`;
        const publicDir = path.join(__dirname, "..", "public");
        const filePath = path.join(publicDir, pdfPath);

        // Ensure public directory exists
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir);
        }

        // Create a formatted PDF
        const doc = new PDFDocument({ margin: 50 });
        doc.pipe(fs.createWriteStream(filePath));

        // Header
        doc.fontSize(18).text("Generated Question Paper", { align: "center", underline: true });
        doc.moveDown(1);

        // Formatting each section properly
        const lines = newQP.split("\n");
        lines.forEach((line) => {
            if (line.trim() === "") {
                doc.moveDown(0.5); // Space between paragraphs
            } else if (/^\d+\./.test(line)) {
                doc.fontSize(12).text(line, { indent: 10 });
            } else {
                doc.fontSize(12).text(line);
            }
        });

        // Finalize the PDF
        doc.end();

        res.json({ message: "Question paper generated!", downloadLink: `http://localhost:5000/generatePdf/download/${pdfPath}` });

    } catch (error) {
        console.error("Error generating question paper:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to download the generated PDF
router.get("/download/:fileName", (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, "..", "public", fileName);

    res.download(filePath, fileName, (err) => {
        if (err) {
            res.status(500).json({ error: "File not found" });
        }
    });
});

module.exports = router;