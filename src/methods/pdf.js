import PdfPrinter from "pdfmake"


export const generatePDFStream = data => {
  const fonts = {
    Roboto: {
      normal: "fonts/Roboto-Black.ttf",
      bold: "fonts/Roboto-Bold.ttf",
      italics: "fonts/Roboto-Italic.ttf",
      bolditalics: "fonts/Roboto-BoldItalic.ttf",
    },
  }

  const printer = new PdfPrinter(fonts)

  const docDefinition = {
    content: ["First paragraph", "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines"],
  }

  const options = {
    // ...
  }

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, options)
  pdfReadableStream.end()

  return pdfReadableStream
}

