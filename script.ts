import { SettingsModel } from './Settings/settingsModel.js';
import SettingsController from './Settings/settingsContoller.js';
import GameModel from './Game/gameModel.js';
import GameController from './Game/gameController.js';

let settingsController : SettingsController;
let gameController: GameController;

let settingsModel = new SettingsModel({ nbLine: 20, nbColumn: 20}, false);
let gameModel = new GameModel(settingsModel);

window.onload = init;
window.addEventListener("resize", resizeWindow);

function init() : any
{
  settingsController = new SettingsController(settingsModel);
  gameController = new GameController(settingsController, gameModel);
}

function resizeWindow()
{
  gameController.handleResizeWindow();
}
