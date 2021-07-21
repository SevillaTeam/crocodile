import ExtractCssChunks from "extract-css-chunks-webpack-plugin";
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
    },
};
