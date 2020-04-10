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
    region: 'eu-west-1'
});

exports.sendEmail =(to,body,subject) =>{
    ses.sendEmail({
        Source: 'Marc Passenheim  <marc_passenheim@gmx.net>',
        Destination: {
            ToAddresses: ['marc_passenheim@gmx.net']
        },
        Message: {
            Body: {
                Text: { //html possible
                    Data: "We can't wait to start working with you! Please arrive on Monday at 9:00 am. Dress code is casual so don't suit up."
                },

            },//html integration  ,HTML
            Subject: {
                Data: "Your Application Has Been Accepted!"
            }
        }
    }).promise().then(
        () => console.log('it worked!')
    ).catch(
        err => console.log(err)
    );
   
}