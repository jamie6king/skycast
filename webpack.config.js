import dotenv from "dotenv";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

export default [
    {
        mode: 'development',
        entry: './client.jsx',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, "dist/client"),
            publicPath: "/"
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
                template: path.resolve(__dirname, 'public/index.html'),
            }),
            new webpack.DefinePlugin({
                "process.env": JSON.stringify(process.env)
            })
        ],
        devServer: {
            static: {
                directory: path.resolve(__dirname, "public"),
            },
            hot: true,
            open: false,
            historyApiFallback: true,
        },
    },

    {
        mode: "development",
        target: "node",
        entry: "./server.js",
        output: {
            filename: "server.bundle.cjs",
            path: path.resolve(__dirname, "dist/server"),
            libraryTarget: "commonjs2"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: "babel-loader"
                },
            ],
        },
        resolve: {
            extensions: [".js"],
        },
        externals: {
            express: "commonjs express",
            os: "commonjs os",
            fs: "commonjs fs",
            path: "commonjs path",
            dotenv: "commonjs dotenv"
        },
    },
];
