import HtmlWebpackPlugin from "html-webpack-plugin";

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
                    test: /\.(scss|css)$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                            },
                        },
                        'sass-loader',
                    ],
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
                directory: "./public",
            },
            hot: true,
            open: false,
            historyApiFallback: true,
        },
    },
];
