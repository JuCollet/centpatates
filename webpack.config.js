module.exports = {
    entry : './js/app',
    output : {
        filename : 'bundle.js',
        path : __dirname
    },
    module : {
        loaders : [
            {
                test : /\.js$/,
                exclude : __dirname + 'node_modules',
                loader : 'babel-loader'
            }, {
                test : /\.less$/,
                loader : "style-loader!css-loader!less-loader"
            }, {
                test : /\.(png|jpeg|gif|svg)$/,
                loader: 'file-loader?name=/img/[name].[ext]'
            }
        ]
    }
};