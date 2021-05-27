import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)



const createEmailWithAttachments = (title, toEmail, html, attachment) => {
  return {
    to: toEmail,
    from: 'liebsch@pm.me',
    subject: `New Blog Post ${title}`,
    text: html.replace(/<[^>]+>/g, ''),
    html: html,
    attachments: [
      {
        content: attachment,
        filename: "blogPost.pdf",
        type: "application/pdf",
        disposition: "attachment"
      }
    ]
  };
}

const createEmailWithoutAttachments = (title, toEmail, html) => {
  return {
    to: toEmail,
    from: 'liebsch@pm.me',
    subject: `New Blog Post ${title}`,
    text: html.replace(/<[^>]+>/g, ''),
    html: html
  };
}



export const sendEmailWAtt = async (title,toEmail, html, attachment) => {
  try {
    await sgMail.send(createEmailWithAttachments(title,toEmail, html, attachment));
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error)
    }
  }
}

export const sendEmail = async (title,toEmail, html) => {
  console.log("test")
  try {
    await sgMail.send(createEmailWithoutAttachments(title,toEmail, html));
  } catch (error) {
    console.error("error", error);
    if (error.response) {
      console.error(error)
    }
  }
}