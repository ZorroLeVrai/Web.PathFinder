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
  private isMouseDown = false;

  constructor(private _gameModel: GameModel)
  {
    this.gameView = new GameView(_gameModel);
    this.gameView.addCanvasListener("mousemove", this.handleCanvasMouseMove);
    this.gameView.addCanvasListener("mousedown", this.handleCanvasMouseDown);
    this.gameView.addCanvasListener("mouseup", this.handleCanvasMouseUp);
    this.gameView.addGameModeListener(this.handleGameModeChange);
    this.gameView.addInitGridListener(this.handleInitGrid);
    this.gameView.addSolveListener(this.handleSolve);
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

  private handleSolve = () =>
  {
    console.log("solve grid");
  }

  private processCanvasAction = (mousePositionX: number, mousePositionY: number) =>
  {
    const currentPosition = this.gameView.getPosition(mousePositionX, mousePositionY);
    this.gridUpdate(currentPosition.x, currentPosition.y, this._gameModel.gameMode);
  }

  private handleCanvasMouseMove = (evt: MouseEvent) =>
  {
    if (!this.isMouseDown)
      return;

      this.processCanvasAction(evt.x, evt.y);
  }

  private handleCanvasMouseDown = (evt: MouseEvent) =>
  {
    this.isMouseDown = true;
    this.processCanvasAction(evt.x, evt.y);
  }

  private handleCanvasMouseUp = () =>
  {
    this.isMouseDown = false;
  }

  private handleGameModeChange = (evt: Event) =>
  {
    const evtTarget = evt.target as HTMLInputElement;
    const gameMode = radioBoxValue2GameModeMap.get(evtTarget.value);

    if (gameMode !== undefined)
      this._gameModel.setGameMode(gameMode);
  }
}