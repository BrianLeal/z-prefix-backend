const app = require("./app");

// const port = process.env.PORT || 8080;
const port = 8080;
// Instruct app to listen.
app.listen(port, () => {
    console.log(`API is listening to port ${port}`)
});