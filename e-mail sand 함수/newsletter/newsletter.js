const AWS = require('aws-sdk');
const Influx = require('influxdb-nodejs');
const ses = new AWS.SES;
const client = new Influx(`http://${process.env.INFLUX_URL}/submitted_email`)
/*({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccesskey: process.env.SECRET_ACCESS_KEY,
    endpoint: 'https://email.us-west-2.amazonaws.com',
    region: 'us-west-2' 
});*/


exports.handler = (event, context, callback) => {
   console.log('Received event:', JSON.stringify(event, null, 2));
   var params = {
        Destination: {
            ToAddresses: [
                event.posted_data.email
                ] //수신자 이메일 주소
        },
        Message: {
            Body: {
                Text: { Data: "가입해주셔서 감사합니다." //본문
                }
            },
            
            Subject: { Data: "시그널나인 뉴스레터"  //제목
            }
        },
        Source: "support@signal9.io", //발신자 이메일 주소
        //SourceArn: 'arn:aws:ses:us-east-1:135269338319:identity/signal9.io'
    };
    if(event.posted_data.email==' '){
        ses.sendEmail(params, function (err, data) {
            callback(null, {err: err, data: data});
        });
    }
   
   client.queryRaw(`select subscriber from "newsletter_email" where subscriber='${event.posted_data.email}'`) 
   .then((result) => {
       var ison = result.results[0].series;
       console.log('result %j',ison);
       if(!ison){
           client.write('newsletter_email')
           .tag({})
           .field({ subscriber: event.posted_data.email }) 
           .then(() => console.info('write point success'))
           .catch(err => console.error(`Write point fail,${err.message}`));
           
           ses.sendEmail(params, function (err, data) {
            callback(null, {err: err, data: data});
            if (err) {
                console.log(err);
                context.fail(err); //메일 전송 실패
            } else {
                console.log(data);
                console.log("전송성공");
                context.succeed(event); //메일 전송 성공
            }
        });
       }
       else return 1;
   }).catch(err => console.error(`Query fail,${err.message}`));
   
};
