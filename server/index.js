// NOTE: This will use babel to run server.js on ES6

require('@babel/register')({
    ignore: [ /(node_modules)/ ],
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
    ],
})

require('./server')

