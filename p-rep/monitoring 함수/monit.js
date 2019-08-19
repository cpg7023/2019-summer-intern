const request = require('request');
const Influx = require('influxdb-nodejs');
const client = new Influx(`http://${process.env.INFLUX_URL}/node_status`);



exports.handler = (event) => {  

  request(`http://${process.env.NODE_URL}/api/v1/status/peer`, function(error, response, body) {
     //console.log(body);   //body에 node status데이터가 담겨있다
     const Jp= JSON.parse(body);
     console.log(Jp);
     var available;
       if(Jp.service_available==true){
           available = 1;
       }
       else{
           available = 0;
       }
       console.log(available);
     client.write('node_v') //DB Schema
     .tag({
       //status: Jp.status,
       //state: Jp.state,
       //service_available: Jp.service_available,
       peer_type: Jp.peer_type,
       audience_count: Jp.audience_count,
       consensus: Jp.consensus,
       peer_id: Jp.peer_id,
       round: Jp.round,
       peer_target: Jp.peer_target,
       //leader: Jp.leader,
       epoch_leader: Jp.epoch_leader,
       //mq_peer_mc: Jp.mq.peer.message_count,
       //mq_channel_mc: Jp.mq.channel.message_count,
       //mq_score_mc: Jp.mq.score.message_count,
     })
     .field({
       made_block_count: Jp.made_block_count,
       status: Jp.status,
       state: Jp.state,
       service_available: available,
       block_height: Jp.block_height,
       epoch_height: Jp.epoch_height,
       unconfirmed_block_height: Jp.unconfirmed_block_height,
       total_tx: Jp.total_tx,
       unconfirmed_tx: Jp.unconfirmed_tx,
       leader_complaint: Jp.leader_complaint,
       peer_count: Jp.peer_count,
       leader: Jp.leader,
       mq_peer_mc: Jp.mq.peer.message_count,
       mq_channel_mc: Jp.mq.channel.message_count,
       mq_score_mc: Jp.mq.score.message_count,
     })
     .then(() => console.info('write point success'))
     .catch(err => console.error(`Write point fail,${err.message}`));
  });

};

