const mailer = require('nodemailer')
const { welcome } = require('./welcome_template')
const { resetPass } = require('./resetpass_template')
require('dotenv').config()

const getEmailData = (to, name, token, template, actionData) => {
  let data = null

  switch (template) {
    case "welcome":
      data = {
        from: "OLStore <myolstore.sj@gmail.com>",
        to,
        subject: `Welcome to waves ${name}`,
        html: welcome()
      }
      break

    case 'reset_password':
      data = {
        from: "OLStore <myolstore.sj@gmail.com>",
        to,
        subject: `Hey ${name}, reset your password`,
        html: resetPass(actionData)
      }

    default:
      data
  }

  return data
}

const sendMail = (to, name, token, type, actionData = null) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "myolstore.sj@gmail.com",
      pass: process.env.EMAIL_PASS
    }
  })

  const mail = getEmailData(to, name, token, type, actionData)

  smtpTransport.sendMail(mail, function(error, res) {
    if (error) console.log(error)
    else cb()

    smtpTransport.close()
  })
}

module.exports = { sendMail }