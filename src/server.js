const http = require("http");

const app = require("./app");
const db = require("./models");

const server = http.createServer(app);

db.sequelize.sync().then(() => {
    server.listen(3001, () => {
        console.log("Listening to port 3001");
    });
});
