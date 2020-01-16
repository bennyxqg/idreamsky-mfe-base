module.exports = {
    port: 8777,
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    proxy: {
        "/mfe-pack": {
            target: "http://localhost:9000",
            pathRewrite: {"^/mfe-pack" : ""}
        },
        "/app2": {
            target: "http://localhost:9002",
            pathRewrite: {"^/app2" : ""}
        },
        "/app3": {
            target: "http://localhost:9003",
            pathRewrite: {"^/app3" : ""}
        },
        "/app4": {
            target: "http://localhost:9004",
            pathRewrite: {"^/app4" : ""}
        },
        "/app5": {
            target: "http://localhost:9005",
            pathRewrite: {"^/app5" : ""}
        }
    },
    clientLogLevel: "error"
};