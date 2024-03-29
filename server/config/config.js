let env = process.env.NODE_ENV || "development";
console.log(`Environment -> ${env}`);

if (env === "development" || env === "server" || env === "development-online") {
  let config = require("./config.json");
  let envConfig = config[env];

  Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key];
  });
}
