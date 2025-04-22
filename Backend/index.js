import express from "express";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let puppeteer;
let chrome = {};

if (process.env.AWS_LAMBDA_FUNCTION_VERSION || process.env.RENDER) {
  const chromeModule = await import("chrome-aws-lambda");
  const puppeteerCore = await import("puppeteer-core");
  chrome = chromeModule.default;
  puppeteer = puppeteerCore.default;
} else {
  puppeteer = (await import("puppeteer")).default;
}

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

const allowedOrigin =
  process.env.NODE_ENV === "production" ? process.env.CLIENT_ORIGIN : "*";
const corsOptions = {
  origin: allowedOrigin,
  methods: ["GET", "POST", "OPTIONS"],
};

app.use(cors(corsOptions));

const templatePath = path.join(__dirname, "invoice-template.html");
const templateHtml = fs.readFileSync(templatePath, "utf8");
const template = Handlebars.compile(templateHtml);

app.post("/generate-pdf", async (req, res) => {
  let options = {};
  if (process.env.AWS_LAMBDA_FUNCTION_VERSION || process.env.RENDER) {
    options = {
      args: [
        ...chrome.args,
        "--hide-scrollbars",
        "--disable-web-security",
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      defaultViewport: chrome.defaultViewport,
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }

  try {
    const invoiceData = req.body;
    const finalHtml = template(invoiceData);

    let browser = await puppeteer.launch(options);
    let page = await browser.newPage();
    await page.setContent(finalHtml, { waitUntil: "networkidle0" });

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
