const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Configuração do transporte (exemplo com Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "intablete@gmail.com",
    pass: "@cc1S1995", // senha de app do Gmail
  },
});

exports.sendEmail = functions.https.onRequest((req, res) => {
  const { name, phone, message } = req.body;

  const mailOptions = {
    from: "intablete@gmail.com",
    to: "frontendcnn@gmail.com", // pode ser o seu próprio
    subject: "Novo contato do site de pintura",
    text: `Nome: ${name}\nTelefone: ${phone}\nMensagem: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    return res.send({ success: true });
  });
});