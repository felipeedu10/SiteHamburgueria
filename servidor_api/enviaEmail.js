const nodemailer = require ("nodemailer")
const {google} = require("googleapis")

const CLIENT_ID = "693984977626-vibgpik076mocli257kb4mqmgm4ku1oo.apps.googleusercontent.com" 
const CLIENT_SECRET = "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//04dKs4l3wazbuCgYIARAAGAQSNwF-L9IrxIbUVynZtMeQx62QpwKOoBnFTwrLkSPTCOWXYhIoJs07AEHssyqO78Q2qEDBnhLVzj0"

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

async function enviarEmail(){
    try {
        const accessToken = await oAuth2Client.getAccessToken 

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'felipeedu2409@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: 'HAMBURGUERIA🍔 <felipeedu2409@gmail.com>',
            to: 'felipeeduardo53333@gmail.com',
            subject: 'Teste',
            text: 'Oi fio beleza',
        }

        const result = await transport.enviarEmail(mailOptions)
        return result
        
    } catch (error) {
        return(error)
    }
}

enviarEmail().then(result => console.log('email enviado', result)).catch(error => console.log(error.message));

var btnEnviar = document.querySelector("#botao-form");

btnEnviar.addEventListener("click", enviarEmail());


