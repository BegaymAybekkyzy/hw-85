import path from "path";

const rootPath = __dirname;

const config = {
    rootPath: rootPath,
    publicPath: path.join(rootPath, "public"),
    db: "mongodb://localhost/spotify",
}

export default config;