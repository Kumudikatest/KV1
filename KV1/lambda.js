let axios = require('axios');
let csvjson = require('csvjson');
let jsonQuery = require('json-query');
let Swagger = require('swagger-client');

exports.handler = function (event, context, callback) {
    // read from event, run your logic; complete via callback(<error, or null on success>, <JSON result on success>)

    Swagger.http({
        url: `https://services.dev.fintechmart.online/api-sandbox/application/token`,
        method: 'post',
        query: {},
        headers: { "Accept": "*/*", "Content-Type": "application/json" },
        body: JSON.stringify({
            password: process.env.password,
            userName: process.env.userName
        })
    }).then((response) => {
        if (response.status !== 200) {
            throw new Error(`Bad response from server: ${response.status}; ${response.data}`);
        }
        callback(null, JSON.parse(response.data));
    }).catch((err) => {
        callback(err);
    });

    let csvData = {};
    axios.get("http://insight.dev.schoolwires.com/HelpAssets/C2Assets/C2Files/C2ImportGroupsSample.csv").then(response => {
        csvData.dataSet1 = csvjson.toObject(response.data, {});

        var result = jsonQuery('dataSet1[GroupName=System Administrators]', {
            data: csvData
        }).value;

        //callback(null, result);
        console.log(result);
    });


}