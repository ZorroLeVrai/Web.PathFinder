import { TileStatus } from "../commonTypes.js";
import GameModel from "./gameModel.js";
import SettingsController from '../Settings/settingsContoller.js';
import GameView from './gameView.js';

const colorMap = new Map([
  [TileStatus.Default, "white"],
  [TileStatus.StartPosition, "green"],
  [TileStatus.EndPosition, "blue"],
  [TileStatus.Obstacle, "grey"],
  [TileStatus.Path, "green"],
  [TileStatus.Explored, "orange"]
]);


export default class GameController
{
  private readonly gameView: GameView;

  constructor(private _settingsController : SettingsController, private _gameModel: GameModel)
  {
    this.gameView = new GameView(_gameModel);

    this.gameView.addShowSettingsListener(this.handleShowSettings);
    this.gameView.addCanvasListener(this.handleCanvasClick);
  }

  handleShowSettings = () =>
  {
    this._settingsController.showSettings();
  }

  handleResizeWindow = () => 
  {
    this.gameView.updateDisplay();
  }

  handleCanvasClick = () => {
    
  }
}