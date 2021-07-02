import { TileStatus, GameMode, GridSize } from "../commonTypes.js";
import GameModel from "./gameModel.js";
import GameView from './gameView.js';

const radioBoxValue2GameModeMap = new Map([
  ["start", GameMode.SetStart],
  ["end", GameMode.SetEnd],
  ["wall", GameMode.SetWall],
  ["delete", GameMode.RemoveWall]
]);

export default class GameController
{
  private readonly gameView: GameView;

  constructor(private _gameModel: GameModel)
  {
    this.gameView = new GameView(_gameModel);
    this.gameView.addCanvasListener(this.handleCanvasClick);
    this.gameView.addGameModeListener(this.handleGameModeChange);
    this.gameView.addInitGridListener(this.handleInitGrid);
  }

  initGrid = (gridSize: GridSize) => 
  {
    this._gameModel.initGrid(gridSize.nbColumn, gridSize.nbLine);
    this.gameView.updateDisplay();
  }

  updateDisplay = () => 
  {
    this.gameView.updateDisplay();
  }

  private gridUpdate = (x: number, y: number, gameMode: GameMode) => 
  {
    const currentGridStatus = this._gameModel.getGridElement(x, y);

    switch(gameMode)
    {
      case GameMode.SetStart:
        if (TileStatus.Default === currentGridStatus)
        {
          this._gameModel.setStartPosition(x, y);
          this.gameView.updateDisplay();
        }
        break;
      case GameMode.SetEnd:
        if (TileStatus.Default === currentGridStatus)
        {
          this._gameModel.setEndPosition(x, y);
          this.gameView.updateDisplay();
        }
        break;
      case GameMode.SetWall:
        if (TileStatus.Default === currentGridStatus)
        {
          this._gameModel.setGridElement(x, y, TileStatus.Wall);
          this.gameView.updateDisplay();
        }
        break;
      case GameMode.RemoveWall:
        if (TileStatus.Wall === currentGridStatus)
        {
          this._gameModel.setGridElement(x, y, TileStatus.Default);
          this.gameView.updateDisplay();
        }
        break;
      default:
        break;
    }
  }

  private handleInitGrid = (evt: MouseEvent) =>
  {
    this._gameModel.resetGrid();
    this.gameView.updateDisplay();
  }

  private handleCanvasClick = (evt: MouseEvent) =>
  {
    const currentPosition = this.gameView.getPosition(evt.x, evt.y);
    this.gridUpdate(currentPosition.x, currentPosition.y, this._gameModel.gameMode);
  }

  private handleGameModeChange = (evt: Event) =>
  {
    const evtTarget = evt.target as HTMLInputElement;
    const gameMode = radioBoxValue2GameModeMap.get(evtTarget.value);

    if (gameMode !== undefined)
      this._gameModel.setGameMode(gameMode);
  }
}