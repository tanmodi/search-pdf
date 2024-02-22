import { PdfReader } from "pdfreader";

export async function parsePdf(pdfPath) {
  return new Promise((resolve, reject) => {
    let text = "";
    new PdfReader().parseFileItems(pdfPath, (err, item) => {
      if (err) {
        // handle error
        reject(err);
      } else if (!item) {
        // end of file
        resolve(text);
      } else if (item.text) {
        // append text
        text = text + item.text + "\n";
      }
    });
  });
}
