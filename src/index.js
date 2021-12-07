
'use strict';

//必要なものは都度 npm i してください
const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3002;
const cv = require('@azure/cognitiveservices-customvision-prediction');
const fs = require('fs');
const bodyParser = require('body-parser');
const Request = require('request');

const line_config = {
    channelSecret: '',
    channelAccessToken: ''
};

const app = express();
const client = new line.Client(line_config);

app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)')); //ブラウザ確認用(無くても問題ない)
app.post('/webhook', line.middleware(line_config), (req, res) => {
    console.log(req.body.events);

    // botに送られる画像にアクセスするための設定
    const options = {
        url: `https://api.line.me/v2/bot/message/${req.body.events[0].message.id}/content`,
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + line_config.channelAccessToken,
        },
        encoding: null
    };
    Request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            //画像を保存します
            fs.writeFileSync(`/tmp/` + req.body.events[0].message.id + `.jpg`, new Buffer(body), 'binary');
            console.log('file saved');
            const filePath = `/tmp/` + req.body.events[0].message.id + `.jpg`;
            const cv_config = {
                "predictionEndpoint": "",
                "predictionKey": ""
            };

            cv.sendImage(
                filePath,
                cv_config,
                (data) => {
                    console.log(data); 
                    let tagName = data.predictions[0].tagName;
                    let probability = data.predictions[0].probability;

                    client.replyMessage(req.body.events[0].replyToken, {
                        type: 'text',
                        text: tagName + 'の確率、' + probability 
                      }); 
                }
            );
        }
    })
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
})

app.listen(PORT);
console.log(`Server running at ${PORT}`);