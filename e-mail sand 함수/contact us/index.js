const AWS = require('aws-sdk');
var ses = require('node-ses');
var mailComposer = require('mailcomposer');

const client = ses.createClient({
    key: process.env.ACCESS_KEY,
    secret: process.env.SECRET_ACCESS_KEY, 
    amazon: 'https://email.us-west-2.amazonaws.com/'
});


exports.handler = (event, context, callback) => {
    console.log(event);
    
   
    client.sendEmail({
        to: 'cpg70233@naver.com',
        from: event.posted_data.name,
        subject: event.posted_data.name,
        message: event.posted_data.message,
        replyto: event.posted_data.email,
    }, function(err,date,res){
        if (err) {
            console.log(err);
            context.fail(err); // 메일전송실패
        }
        else {
            console.log(data);
            context.succeed(event);  // 메일전송성공
        }
    
    })
   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  /*  console.log('Received event:', JSON.stringify(event, null, 2));
    if (event.posted_data.name===undefined || event.posted_data.email===undefined || event.posted_data.message===undefined){
        callback("400 Invalid Input");
    }
   var params = {
        Destination: {
            ToAddresses: [event.posted_data.email] //SES에서 확인된 이메일 주소
        },
        Message: {
            Body: {
                Text: { Data: event.posted_data.message //본문
                }
            },
            
            Subject: { Data: event.posted_data.name  //제목
            }
        },
        Source: "cpg70233@naver.com" //SES 확인 발신자 이메일 주소
    };

    
     ses.sendEmail(params, function (err, data) {
        callback(null, {err: err, data: data});
        if (err) {
            console.log(err);
            context.fail(err); //메일 전송 실패
        } else {
            console.log(data);
            context.succeed(event); //메일 전송 성공
        }
    });*/
};
