'use strict';

// requestinfo - return details about the incoming HTTP request
//
// Example: curl -d "param1=value1&param2=value2" -H "Content-Type: application/x-www-form-urlencoded" -X POST <endpoint>
module.exports = async function (context) {
    const req = context.request;
    return {
        status: 200,
        body: {
            // There is a lot of garbage in the context.request, so strip out the useless stuff.
            headers: req.headers,
            body: req.body,
            method: req.method,
            url: req.url,
            query: req.query,
            httpVersion: req.httpVersion,

        },
        headers: {
            'Content-Type': 'application/json'
        }
    }
};
