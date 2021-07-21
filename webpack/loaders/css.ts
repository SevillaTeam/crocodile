import ExtractCssChunks from "extract-css-chunks-webpack-plugin";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const {IS_DEV} = require('../env');

export default {
    client: {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
            ExtractCssChunks.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                }
            },
            'sass-loader',
        ],
    },
    server: {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        exportOnlyLocals: true
                    },
                }
            },
            'sass-loader',
        ],
        // loader: 'null-loader',
        // use: [
        // ExtractCssChunks.loader,
        // MiniCssExtractPlugin.loader,
        // 'style-loader',
        // {
        // Interprets `@import` and `url()` like `import/require()` and will resolve them
        // loader: 'css-loader',
        // options: {
        //     modules: true,
        // esModule: true
        // localIdentName: '[name]__[local]--[hash:base64:5]'
        // }
        // },
        // 'sass-loader',
        // ],
    },
};
