import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "node:path";

export default [
    {
        mode: 'development',
        entry: './client.jsx',
        output: {
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
            }),
        ],
        devServer: {
            static: {
                directory: path.join('public'),
            },
            hot: true,
            open: true,
            historyApiFallback: true,
        },
    }
];