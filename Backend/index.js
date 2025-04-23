import express from "express";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import cors from "cors";
import dotenv from "dotenv";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env config
dotenv.config();

const app = express();
const port = process.env.PORT;

// Enable JSON body parsing
app.use(express.json());

// CORS setup
const allowedOrigin =
  process.env.NODE_ENV === "production" ? process.env.CLIENT_ORIGIN : "*";

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "OPTIONS"],
  })
);

// Load and compile Handlebars HTML template
const templatePath = path.join(__dirname, "invoice-template.html");
const templateHtml = fs.readFileSync(templatePath, "utf8");
const template = Handlebars.compile(templateHtml);

// PDF generation endpoint
app.post("/generate-pdf", async (req, res) => {
  try {
    const invoiceData = req.body;
    const finalHtml = template(invoiceData);

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? "/usr/bin/chromium-browser"
          : puppeteer.executablePath(),
    });

    const page = await browser.newPage();
    await page.setContent(finalHtml, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
    });

    await browser.close();

    res.set("Content-Type", "application/pdf");
    res.set("Content-Disposition", "attachment; filename=invoice.pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    res
      .status(500)
      .json({ message: "Error generating PDF", error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
