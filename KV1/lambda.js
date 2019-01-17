let Swagger = require('swagger-client');

exports.handler = function (event, context, callback) {
    // read from event, run your logic; complete via callback(<error, or null on success>, <JSON result on success>)

    Swagger.http({
        url: `https://services.dev.fintechmart.online/api-sandbox/application/token`,
        method: 'post',
        query: {},
        headers: { "Accept": "*/*", "Content-Type": "application/json" },
        body: JSON.stringify({
            password: "Jupiter!123",
            userName: "n12kumar@mail.com"
        })
    }).then((response) => {
        if (response.status !== 200) {
            throw new Error(`Bad response from server: ${response.status}; ${response.data}`);
        }
        callback(null, JSON.parse(response.data));
    }).catch((err) => {
        callback(err);
    });
}