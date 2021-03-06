const https = require('https');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

function extend(origin, target) {
    for (var name in target) {
        if (target.hasOwnProperty(name)) {
            origin[name] = target[name];
        }
    }
    return origin;
}

function jenkins(options) {

  options.auth = options.user + ':' + options.password;

    var _setting = {
        host: 'jenkins.io',
        method: 'POST',
        job:'new_app',
        auth: ':',
        postData:"",

    }

    var setting = extend(_setting, options);
    this.setting = setting;

    setting.path = '/job/'+setting.job+'/build?token=' + setting.token + '&cause=node+Test'
    var keepAliveAgent = new https.Agent({ keepAlive: true });
    setting.agent = keepAliveAgent;
    var req = https.request(setting, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log('No more data in response.')
        })
    })

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });
    req.write(setting.postData);
    req.end();
}

module.exports = jenkins
