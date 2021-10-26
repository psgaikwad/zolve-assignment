const webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use:  {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {loader: "html-loader"}
                ]

            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                {
                    loader: 'file-loader',
                    options: {},
                },
                ],
            }
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
}