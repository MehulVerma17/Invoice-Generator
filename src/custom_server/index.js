import express from "express";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import Handlebars from "handlebars";
import cors from "cors"; // Import cors package

const app = express();
const port = 3001;

// Middleware to parse JSON data
app.use(express.json());

// Enable CORS for all origins (you can restrict this to specific origins later)
app.use(cors());

// Load the HTML template (Handlebars)
const templatePath = path.join(process.cwd(), "invoice-template.html");
const templateHtml = fs.readFileSync(templatePath, "utf8");
const template = Handlebars.compile(templateHtml);

// Invoice PDF generation logic
app.post("/generate-pdf", async (req, res) => {
  try {
    // 1. Use data sent in the POST request
    const invoiceData = req.body;

    // 2. Render HTML with Handlebars
    const finalHtml = template(invoiceData);
    console.log(invoiceData);

    // 3. Launch Puppeteer to generate PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(finalHtml, { waitUntil: "networkidle0" });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        bottom: "20px",
        left: "20px",
        right: "20px",
      },
    });

    await browser.close();

    // 4. Send the PDF buffer as a response
    res.set("Content-Type", "application/pdf");
    res.set("Content-Disposition", "attachment; filename=invoice.pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating PDF" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
