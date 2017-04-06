/*An electron app to open browser and save images*/
const server = require("./index");
const { app, BrowserWindow } = require("electron");
const port = process.env.PORT || 3014;

function createWindow() {
	const win = new BrowserWindow({
		show: false
	});

	server({ electronWin: win });
	win.loadURL(`http://localhost:${port}`);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
