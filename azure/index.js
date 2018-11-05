var request = require("request");


module.exports = function(context, req) {
    
        context.log('starting..');
        let auth = "Basic " + new Buffer(req.body.account_sid + ":"+req.body.auth_token).toString("base64");
        
        var obj = {
            method: req.body.httpverb,
            uri: req.body.url,
            json: true,
            headers: {
                "Authorization": auth,
                "Accept":"application/json",
                "content-type":"application/x-www-form-urlencoded"
            }
        };

        if (req.body.payload) obj.body = req.body.payload;

        new Promise((resolve, reject) => {
            request(
                obj,
                function(error, response, body) {
                    let message = `Call of ${req.body.url}`;
                    if (error) {
                        context.log(message + " failed", error);
                        reject(error);
                        return;
                    } else {
                        context.res = { status: response.statusCode, body: body };
                        context.done();
                    }
                }
            );
        })
    
};