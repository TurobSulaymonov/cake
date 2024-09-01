module.exports = {
    apps : [{
      name   : "Cake",
      cwd: "./",
      script : "./dist/apps/nestar-api/main.js",
      false: false,
      env_production: {
         NODE_ENV: "production"
      },
      env_development: {
         NODE_ENV: "development"
      },
      instances: 1,
      exec_mode: "cluster" 
    }]
  }