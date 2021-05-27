import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)



const createEmail = (title, toEmail, html, attachment) => {
  return msg = {
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



export const sendEmail = async (title,toEmail, html, attachment) => {
  try {
    await sgMail.send(createEmail(title,toEmail, html, attachment));
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
  }
}