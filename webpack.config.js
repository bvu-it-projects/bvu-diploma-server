const path = require('path');

module.exports = {
    target: "node",
    mode: "production",
    entry: "./src/server.ts",
    module: {
        rules: [
            {
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [
            ".ts", ".js",
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    }
}