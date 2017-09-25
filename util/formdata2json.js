'use strict';

// formdata2json - Transforms POST form data to JSON
//
// Example: curl -d "param1=value1&param2=value2" -H "Content-Type: text/plain" -X POST <endpoint>
module.exports = async function (context) {
    let result = {};
    const b = context.request.body;
    console.log("parsed body", context.request.body);
    if (typeof b === "object") {
        // Content-type allowed express to parse formdata as object already
        result = b
    } else {
        // We need to parse the formdata it ourselves
        let data = decodeURIComponent(b.toString());
        let dataParts = data.split('&');
        for (let i = 0; i < dataParts.length; i++) {
            let kv = dataParts[i].split("=");
            result[kv[0]] = kv[1];

        }
    }
    console.log("Converted formdata", data);
    return {
        status: 200,
        body: result,
        headers: {
            'Content-Type': 'application/json'
        }
    }
};
