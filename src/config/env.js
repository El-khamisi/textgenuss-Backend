require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  DBURI: process.env.DBURI,
  DBURI_remote: process.env.DBURI_remote,
  TOKENKEY: process.env.TOKENWORD,

  cloudinary_name: process.env.cloudinary_name,
  cloudinary_api_key: process.env.cloudinary_api_key,
  cloudinary_api_secret: process.env.cloudinary_api_secret,
  NODE_ENV: process.env.NODE_ENV,

  PAYMOB_APIKEY: process.env.PAYMOB_APIKEY,
  PAYMOB_integration_id: process.env.PAYMOB_integration_id,
  PAYMOB_HMAC: process.env.PAYMOB_HMAC,

  sendinblue_user: process.env.sendinblue_user,
  sendinblue_key: process.env.sendinblue_key,
  to_email: process.env.to_email,
  smtp_host: process.env.smtp_host,
  smtp_port: process.env.smtp_port,
  server_domain: process.env.server_domain,

  exchange_api: process.env.exchange_api,
};
