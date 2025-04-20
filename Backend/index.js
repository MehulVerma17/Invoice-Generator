import express from "express";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer-core";
import Handlebars from "handlebars";
import cors from "cors"; // Import cors package
import dotenv from "dotenv";

// Load environment variables /.env file
dotenv.config();

const app = express();
const port = process.env.PORT;

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

    const isDev = process.env.NODE_ENV !== "production";

    // 3. Launch Puppeteer to generate PDF
    // const browser = await puppeteer.launch(); //This is for Local Host only
    const browser = await puppeteer.launch({
      headless: "true", // or true if "new" causes problems
      executablePath: isDev ? undefined : "/usr/bin/google-chrome-stable", // auto-resolves Chrome path
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
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
    console.error("PDF generation error:", error);
    res
      .status(500)
      .json({ message: "Error generating PDF", error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// import fs from "fs";
// import path from "path";
// import puppeteer from "puppeteer";
// import Handlebars from "handlebars";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

// export default async (req, res) => {
//   if (req.method === "POST") {
//     try {
//       const invoiceData = req.body;

//       // Load the HTML template
//       const templatePath = path.join(
//         process.cwd(),
//         "src/custom_server/invoice-template.html"
//       );
//       const templateHtml = fs.readFileSync(templatePath, "utf8");
//       const template = Handlebars.compile(templateHtml);

//       // Render the HTML with the provided data
//       const finalHtml = template(invoiceData);

//       // Generate PDF with Puppeteer
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       await page.setContent(finalHtml, { waitUntil: "networkidle0" });

//       const pdfBuffer = await page.pdf({
//         format: "A4",
//         printBackground: true,
//         margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
//       });
//       await browser.close();

//       // Send the PDF response
//       res.setHeader("Content-Type", "application/pdf");
//       res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");
//       res.status(200).send(pdfBuffer);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error generating PDF" });
//     }
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// };
