# MensajeTexto
an api rest with nodejs made to offer some management over the use of twillio api to send text messages for marketing purposes.
this project does not keep going.

## Getting Started

clone, enter in the folder project 
run
*mongodb
*npm init
*npm run dev

### Prerequisites

you need nodejs, mongodb(runnig locally or in internet)
create a folder inside the project called config and inside this folder a file called dev.env with the next enviroment variables

PORT=a port for the application to run(can be 3000)
MONGODB_URL_MENSAJES_TEXTO=an url in which mongodb is runnig somehing like:mongodb://127.0.0.1:27017/text-messages
SSID_TWILIO= the ssid give by twillio api
AUTH_TOKEN_TWILIO= the token given by twillio
NUMBER_TWILIO=the number that twillio allows you to send also from twillio webpage
JWT_SECRET=any string( use to generate the json web token)
