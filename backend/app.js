const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    // console.log(`Request to ${req.url}:`);
    // console.log(req);
    // console.log("Response:");
    // console.log(res);
    next();
});
app.listen(process.env.PORT || process.env.port || 5000, () => {
    console.log(`App listening on port ${process.env.PORT || 5000}.`);
});


app.post("/task", handler.policyQuoteCount);
