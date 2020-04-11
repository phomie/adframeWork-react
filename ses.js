const aws = require('aws-sdk');

let secrets;
if (process.env.NODE_ENV == 'production') {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require('./secrets'); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: 'eu-central-1'
});

exports.sendEmail =(to,body,subject) =>{
   const emailPromise= ses.sendEmail({
        Source: 'Marc Passenheim  <marc_passenheim@gmx.net>',
        Destination: {
            ToAddresses: ['marc_passenheim@gmx.net']
        },
        Message: {
            Body: {
                Text: { //html possible
                    Data: body
                },

            },//html integration  ,HTML
            Subject: {
                Data: subject
            }
        }

        



    }).promise()
    return  emailPromise;
   
}