import {APPMANAGER} from "./src/managers/app-manager";
import {App} from "./src/app";

window.onload = () => {
	APPMANAGER.setupGameManager()
	new App().prepareScene()
}