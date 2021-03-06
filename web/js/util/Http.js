const http = require("http");
const https = require("https");

class Http {

    /**
     * Perform an HTTP test and get the response.
     *
     * https://nodejs.org/api/http.html#http_http_request_options_callback
     *
     *
     * // TODO: replace with: https://github.com/request/request
     *
     * @param options
     */
    static async fetchContent(options) {

        let provider;

        if(options.protocol === "http:") {
            console.log("Using http");
            provider = http;
        } else if (options.protocol === "https:") {
            console.log("Using https");
            provider = https;
        } else {
            throw new Error("No provider for protocol: " + options.protocol);
        }


        return new Promise(function (resolve, reject) {

            provider.get(options, function (response) {

                if(response.statusCode !== 200) {
                    reject(new Error("Wrong status code: " + response.statusCode));
                }

                // reject if we don't have the proper response

                let data = [];

                response.on('data', function(chunk) {
                    data.push(chunk);
                });

                response.on('end', function() {
                    //at this point data is an array of Buffers
                    //so Buffer.concat() can make us a new Buffer
                    //of all of them together
                    let buffer = Buffer.concat(data);
                    resolve(buffer);

                });

            })

        });

    }

    /**
     * Execute an HTTP request and return the data and the response.
     * @param options
     * @return {Promise<any>}
     */
    static async execute(options) {

        let provider;

        if(options.protocol === "http:") {
            console.log("Using http");
            provider = http;
        } else if (options.protocol === "https:") {
            console.log("Using https");
            provider = https;
        } else {
            throw new Error("No provider for protocol: " + options.protocol);
        }

        return new Promise(function (resolve, reject) {

            provider.get(options, function (response) {

                if(response.statusCode !== 200) {
                    reject(new Error("Wrong status code: " + response.statusCode));
                }

                // reject if we don't have the proper response

                let data = [];

                response.on('data', function(chunk) {
                    data.push(chunk);
                });

                response.on('end', function() {
                    //at this point data is an array of Buffers
                    //so Buffer.concat() can make us a new Buffer
                    //of all of them together
                    let buffer = Buffer.concat(data);
                    resolve({
                        response,
                        data: buffer
                    });

                });

            })

        });

    }

}

module.exports.Http = Http;
