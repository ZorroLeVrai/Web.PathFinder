import { SettingsModel } from './Settings/settingsModel.js';
import SettingsController from './Settings/settingsContoller.js';
import GameModel from './Game/gameModel.js';
import GameController from './Game/gameController.js';
import ControllerMediator from './controllerMediator.js';

let settingsController : SettingsController;
let gameController: GameController;

let settingsModel = new SettingsModel({ nbLine: 20, nbColumn: 20}, false, false, 10);
let gameModel = new GameModel(settingsModel);

window.onload = init;
window.addEventListener("resize", resizeWindow);

function init() : any
{
  settingsController = new SettingsController(settingsModel);
  gameController = new GameController(gameModel);
  const mediator = new ControllerMediator(gameController, settingsController);
  registerMediator(mediator);
}

function registerMediator(mediator: ControllerMediator)
{
  settingsController.registerMediator(mediator);
}

function resizeWindow()
{
  gameController.updateDisplay();
}
