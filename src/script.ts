import { SettingsModel } from './Settings/settingsModel';
import SettingsController from './Settings/settingsContoller';
import GameModel from './Game/gameModel';
import GameController from './Game/gameController';
import ControllerMediator from './controllerMediator';
import '../public/style.css';

let settingsController : SettingsController;
let gameController: GameController;

let settingsModel = new SettingsModel({ nbLine: 20, nbColumn: 20}, true, false, 0);
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
  gameController.registerMediator(mediator);
}

function resizeWindow()
{
  gameController.updateDisplay();
}
