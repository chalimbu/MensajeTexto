// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = process.env.SSID_TWILIO;
const authToken = process.env.AUTH_TOKEN_TWILIO;
const client = require('twilio')(accountSid, authToken);

//'+57 3194751456'
const enviarMensaje = async(number, message) => {
        await client.messages
            .create({
                body: message,
                from: process.env.NUMBER_TWILIO,
                to: number
            }).catch((e) => { throw new Error(e.message) })
    }
    //enviarMensaje('+57 3194751456','hola desde la app de all-clean')
module.exports = enviarMensaje