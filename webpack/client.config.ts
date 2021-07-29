import path from 'path';
import webpack, { Configuration, WebpackPluginInstance as Plugin, Entry } from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import { IS_DEV, DIST_DIR, SRC_DIR } from './env';

import fileLoader from './loaders/file';
import cssLoader from './loaders/css';
import jsLoader from './loaders/js';
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";

const config: Configuration = {
    target: 'web',
    entry: ([
        IS_DEV && 'react-hot-loader/patch',
        // Entry для работы HMR
        IS_DEV && 'webpack-hot-middleware/client',
        IS_DEV && 'css-hot-loader/hotModuleReplacement',
        path.join(SRC_DIR, 'client'),
    ].filter(Boolean) as unknown) as Entry,
    module: {
        rules: [fileLoader.client, cssLoader.client, jsLoader.client],
    },
    output: {
        path: DIST_DIR,
        filename: '[name].js',
        publicPath: '/',
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        alias: { 'react-dom': '@hot-loader/react-dom' },
        extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx', '.scss'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
    plugins: [
        // new CleanWebpackPlugin({
        //     cleanAfterEveryBuildPatterns: ['main.js', 'main.css']
        // }),
        new ExtractCssChunks(),
        // Plugin для HMR
        new webpack.HotModuleReplacementPlugin(),
        // !IS_DEV && new CompressionPlugin(),
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx'],
        }),

    ].filter(Boolean) as Plugin[],
    devtool: 'source-map',
    performance: {
        hints: IS_DEV ? false : 'warning',
    },
};

export default config;
