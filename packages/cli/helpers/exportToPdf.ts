import ora from "ora";
import puppeteer from "puppeteer";
import http from "http";
import handler from "serve-handler";
import path from "path";

import exportToHtml from "./exportToHtml.js";
import fs from "fs-extra";

export default async function exportToPdf() {
  const spinner = ora(`Exporting your project to PDF...`);
  spinner.start();

  await exportToHtml({ silent: true });

  const projectDir = process.cwd();

  const server = http
    .createServer((request, response) => {
      // You pass two more arguments for config and middleware
      // More details here: https://github.com/vercel/serve-handler#options
      return handler(request, response, {
        public: path.resolve(projectDir, "export", "html"),
      });
    })
    .listen(3000, async () => {
      const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--font-render-hinting=none"],
      });
      const page = await browser.newPage();

      await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
      await page.emulateMediaType("print");
      await page.evaluateHandle("document.fonts.ready");

      await fs.ensureDir(path.resolve(projectDir, "export", "pdf"));

      await page.pdf({
        printBackground: false,
        format: "a4",
        path: path.resolve(projectDir, "export", "pdf", "document.pdf"),
        margin: {
          top: "25px",
          bottom: "80px",
        },
        displayHeaderFooter: true,
        headerTemplate: ``,
        footerTemplate: `<div style="text-align: right; width: 100%; max-width: 514px; margin: 0 auto;">
<span style="font-size: 11px; font-family: 'STIX Two Text', serif" class="pageNumber"></span>
</div>`,
      });

      await browser.close();

      spinner.succeed();
      server.close();
    });
}
