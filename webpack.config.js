const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const argv = require('yargs').argv;

const extractCssPlugin = new ExtractTextPlugin('css/[name]-[chunkhash].css');
const environment = process.env.NODE_ENV || argv.env || 'dev';

const config = {
    //entry
    entry: generateEntryPoints(),
    //output
    output: {
        path: __dirname + '/assets',
        pathinfo: true,  // Tell webpack to include comments in bundles with information about the contained modules
                  // should not be used in prod, it also adds some info about tree shaking to the generated bundle.      
        publicPath: '/assets/',
        filename: 'js/[name]-[chunkhash].js',
        chunkFilename: '[id].js'
    },
    cache: false,
    devtool: ifDevelopment('inline-source-map', 'source-map'),
    //loaders
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractCssPlugin.extract({
                use: [
                    {
                        loader: 'css-loader', 
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                ]
            })
        }]
    },
    //plugins
    plugins: [
        extractCssPlugin,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: '[name]-[chunkhash].js',
            minChunks: 2
        }),
        new ManifestPlugin({
            fileName: 'build-manifest.json',
            publicPath: '/assets/'
        }),
    ],
    // Empty value is not required to be pass in V2
    resolve: {
        extensions: ['.js','.es6']
    }
}

function ifDevelopment(value, alternate) {
    console.log(environment);
    return environment === 'dev' ? value : alternate;
}

function generateEntryPoints() {
    const pathToClient = './pages';

    let entries = {},
        pages = fs.readdirSync(pathToClient)
            .filter(file => fs.statSync(path.join(pathToClient,file)).isDirectory());
    
        for (let page of pages) {
            let fileNameWithoutExtension = `${pathToClient}/${page}/${page}`;

            entries[page] = [`${fileNameWithoutExtension}.scss`];

            if (fs.existsSync(`${fileNameWithoutExtension}.js`)) {
                entries[page].push(`${fileNameWithoutExtension}.js`);
            }
        }
    
    // Sample Entries
    // entries = {
    //     "app": ["app.scss", "app.js"],
    //     "page1": ["page1.scss", "page1.js"]
    // }
    return entries;
}

module.exports = config;