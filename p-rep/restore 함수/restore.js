const node_ssh = require('node-ssh');
const Influx = require('influxdb-nodejs');
const client = new Influx(`http://${process.env.INFLUX_URL}/node_status`);
const ssh = new node_ssh();



// 함수 실행하기전에 ssh.execCommand 구문의 명령어를 꼭 확인 할 것
exports.handler = (event) => {  

    ssh.connect({               //aws 인스턴스에 연결
        host: process.env.HOST, //parameter(instance IP)
        username: 'ubuntu',
        port: 22,
        privateKey: process.env.PKEY, //parameter(.pem파일 경로)
    })
        .then(function () {
            ssh.execCommand('sudo docker-compose ps | grep -ni "ubuntu_prep_1" | grep -ni "unhealthy"', {  //docker의 ps 상태를 검색  
                onStdout(chunk) { console.log('stdoutChunk : ', chunk.toString('utf8')); },
                onStderr(chunk) { console.log('stderrChunk : ', chunk.toString('utf8')); },
            })
                .then(function (result) {
                    var unhealth = result.stdout;
                    client.queryRaw(`select block_height from "node_v" where time>=now()-${process.env.TIME_RANGE} order by time asc`)  //시간 순서대로 select하여  block_height값의 변화를 체크
                        .then((result) => {

                            var bheight_30m_ago = result.results[0].series[0].values[0][1]; // 30분전 block_height
                            var bheight_now = result.results[0].series[0].values[result.results[0].series[0].values.length - 1][1]; // 현재 block_height

                            if (unhealth != '' || (bheight_30m_ago == bheight_now)) { // restore 트리거 (healthy 체크, block_height변화 체크)
                                client.queryRaw('select last(restore) from "restore"')
                                    .then((result) => {
                                        var flag = result.results[0].series[0].values[0][1];

                                        if (flag == 1) {
                                            console.log('flag 값이 %d 이므로 리턴합니다', flag);
                                            ssh.dispose();
                                            return;
                                        }//flag == 1이면 연결 끊고 리턴

                                        client.write('restore')//restore 1 기록
                                            .tag({})
                                            .field({ restore: 1, })
                                            .then(() => console.info('write point success'))
                                            .catch(err => console.error(`Write point fail,${err.message}`));
                                        console.log('flag 1');

                                        ssh.execCommand('sudo docker-compose down', {                                   // restore 시작
                                            onStdout(chunk) { console.log('stdoutChunk : ', chunk.toString('utf8')); },
                                            onStderr(chunk) { console.log('stderrChunk : ', chunk.toString('utf8')); },
                                        })
                                            .then(function (result) {
                                                ssh.execCommand('sudo sh restore_copy.sh 1 13.209.234.146')
                                                    .then(function (result) {
                                                        console.log('STDOUT: ' + result.stdout);
                                                        //console.log('STDERR: ' + result.stderr);
                                                        ssh.execCommand('sudo docker-compose up -d', {
                                                            onStdout(chunk) { console.log('stdoutChunk : ', chunk.toString('utf8')); },
                                                            onStderr(chunk) { console.log('stderrChunk : ', chunk.toString('utf8')); },
                                                        })
                                                            .then(function (result) {
                                                                ssh.dispose();
                                                            });                                                         // restore 끝
                                                    });
                                            });
                                    });

                            }
                            else if (unhealth == '' && (bheight_30m_ago != bheight_now)) { // restore 정상 실행이면 DB에 restore=0 기록후 종료
                                client.queryRaw('select last(restore) from "restore"')
                                    .then((result) => {
                                        var flag = result.results[0].series[0].values[0][1];
                                        console.log('정상 State입니다.');
                                        if (flag == 1) {
                                            client.write('restore')
                                                .tag({})
                                                .field({ restore: 0, })
                                                .then(() => console.info('write point success'))
                                                .catch(err => console.error(`Write point fail,${err.message}`));
                                            console.log('flag 0');
                                        }
                                        ssh.dispose();
                                    });
                            }

                        });
                });
        });

};

