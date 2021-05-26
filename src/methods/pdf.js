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
  
  
  let plainText = blog.content.replace(/<[^>]+>/g, '');


  const docDefinition = {
    content: [
      {
        text: blog.title,
        style: 'header'
      },
      {
        text: blog.author.name,
        style: 'subheader'
      },
      {
        text: plainText,
        style: 'normal'
      },
      
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [10, 30, 40, 30]
      },
      subheader: {
        fontSize: 15,
        bold: false,
        margin: [10, 0, 0, 0]
      },
      normal: {
        fontSize: 12,
        bold: false,
        margin: [10, 20, 40, 0]
      },
      quote: {
        italics: true
      },
      small: {
        fontSize: 8
      }
    }
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

