'use strict';

let https = require('https');

// The slackWebhookPath path looks something like "/services/XXX/YYY/zZz123".  To get such a path,
// use slack to create an "incoming webhook", and pass the relative URL part of that webhook for
// this function.
// For more details see https://api.slack.com/incoming-webhooks
async function sendSlackMessage(slackWebhookPath, msg) {
    let postData = JSON.stringify({"text": msg});
    let options = {
        hostname: "hooks.slack.com",
        path: slackWebhookPath,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    };

    console.log(`sending slack request`);
    return new Promise(function(resolve, reject) {
        let req = https.request(options, function(res) {
            console.log(`slack request status = ${res.statusCode}`);
            resolve(); // TODO: check status code and reject() on error
            return
        });
        req.write(postData);
        req.end();
    });
}

// Posts <body.message> to hooks.slack.com/<body.path>
module.exports = async function(context) {
    let b = context.request.body;
    let msg = b.message;
    let path = b.path;
    console.log(`Sending ${msg} to ${path}`);
    await sendSlackMessage(path, msg);
    return { status: 200, body: "" };    
}
