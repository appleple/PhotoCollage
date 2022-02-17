const path = require('path');
module.exports = {
    entry: {
        bundle: './src/index.ts'
    },  
    output: {
        path: path.join(__dirname,'dist'),
        publicPath: './example',
        filename: '[name].js'
    },
    resolve: {
        extensions:['.ts','.js']
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "example"),
        }
    },
    module: {
        rules: [
            {
                test:/\.ts$/,loader:'ts-loader'
            }
        ]
    }
}