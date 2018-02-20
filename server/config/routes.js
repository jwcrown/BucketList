var Main = require("../controllers/MainController.js");
var path = require("path");

module.exports = function (app) {
	app.post("/login", function (req, res) {
		Main.login(req, res);
	});

	app.get("/home", function (req, res) {
		Main.goHome(req, res);
	});

	app.get("/sess", function (req, res) {
		Main.checkSess(req, res);
	});

	app.get("/session", function (req, res) {
		Main.checkSession(req, res);
	});

	app.get("/logout", function (req, res) {
		Main.logout(req, res);
	});
	
	app.get("/showAll", function (req, res) {
		Main.showAll(req, res);
	});

	app.get("/showSelected", function (req, res) {
		Main.showSelected(req, res);
	});

	app.get("/getUsers", function (req, res) {
		Main.getUsers(req, res);
	});
    
    app.post("/addItem", function (req, res) {
		Main.addItem(req, res);
	});

	app.post("/check", function (req, res) {
		Main.check(req, res);
	});

	app.get("/user/:id", function (req, res) {
		Main.goToShow(req, res);
	})

	app.get("*", function (req, res) {
		res.sendFile(path.resolve("./client/dist/index.html"));
	});
}