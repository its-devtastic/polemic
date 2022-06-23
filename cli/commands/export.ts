import exportToHtml from "../helpers/exportToHtml.js";
import exportToPdf from "../helpers/exportToPdf.js";

export default async function exportCommand({ format }: ExportOptions) {
  if (format === "html") {
    await exportToHtml();
  }
  if (format === "pdf") {
    await exportToPdf();
  }
}

interface ExportOptions {
  format: "html" | "pdf";
}
