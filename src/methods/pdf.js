import PdfPrinter from "pdfmake"



export const generatePDFStream = async data => {
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
  };
  
  const blog = data[0]
  

  const printer = new PdfPrinter(fonts)

  const docDefinition = {
    content: [
      blog.title,
      blog.author.name
    ],
  }

  const options = {
    // ...
  }

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, options)

  return pdfReadableStream
}

export const generatePDFStream2 = async data => {
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
  };
  

  const printer = new PdfPrinter(fonts)

  const docDefinition = {
    content: ["First paragraph", "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines"],
  }

  const options = {
    // ...
  }

  const pdf = pdfMake.createPdf(docDefinition, options)
  const pdfBuffer = await   pdf.getBuffer()
  return pdfBuffer
}

