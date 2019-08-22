const AWS = require('aws-sdk');
const ses = new AWS.SES;
const Influx = require('influxdb-nodejs');
const client = new Influx(`http://${process.env.INFLUX_URL}/submitted_email`)


exports.handler = (event, context, callback) => {
    
  console.log('Received event:', JSON.stringify(event, null, 2));
    
   var params = {
        Destination: {
            ToAddresses: [
                "support@signal9.io",
                ] //수신자 이메일 주소
        },
        Message: {
            Body: {
                Text: { Data: event.posted_data.message //본문
                }
            },
            
            Subject: { Data: event.posted_data.name  //제목
            }
        },
        ReplyToAddresses: [event.posted_data.email],
        Source: "support@signal9.io", //발신자 이메일 주소
        //SourceArn: 'arn:aws:ses:us-east-1:135269338319:identity/signal9.io'
    };

    client.write('contactus_email')
           .tag({
               questioner: event.posted_data.email,
            })
           .field({ 
               subject: event.posted_data.name,
               text: event.posted_data.message
             }) 
           .then(() => console.info('write point success'))
           .catch(err => console.error(`Write point fail,${err.message}`));
    
     ses.sendEmail(params, function (err, data) {
        callback(null, {err: err, data: data});
        if (err) {
            console.log(err);
            context.fail(err); //메일 전송 실패
        } else {
            console.log(data);
            context.succeed(event); //메일 전송 성공
        }
    });
};
