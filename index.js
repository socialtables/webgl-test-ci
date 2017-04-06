const express = require("express");
const app = express();
const port = process.env.PORT || 3014;
const bodyParser = require("body-parser");
const fs = require("fs");

const savePath = "./generated-images";

module.exports = function({ electronWin }) {
	app.use(bodyParser.json());

	app.post("/save-image", (req, res) => {
		const base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
		fs.writeFile(`${savePath}/test.png`, base64Data, "base64", err => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else {
				res.sendStatus(200);
			}
		});
	});

	app.post("/close", (req, res) => {
		electronWin.close();
		res.sendStatus(200);
		process.exit(0);
	});

	console.log(`Listen on port ${port}`);
	app.use(express.static(__dirname));
	app.use(express.static(__dirname + "/compiled"));
	app.listen(port);
};
