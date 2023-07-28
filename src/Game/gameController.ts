import { TileStatus, GameMode, GridPosition, GridSize } from "../commonTypes";
import GameModel from "./gameModel";
import GameView from './gameView';
import ControllerMediator from "../controllerMediator";
import PathFinderService from "./pathFinderService";
import AnimationController from './animationController';

const radioBoxValue2GameModeMap = new Map([
  ["start", GameMode.SetStart],
  ["end", GameMode.SetEnd],
  ["wall", GameMode.SetWall],
  ["delete", GameMode.RemoveWall]
]);

export default class GameController
{
  private readonly animationController: AnimationController;
  private readonly gameView: GameView;
  private mediator: ControllerMediator;
  private isMouseDown = false;

  constructor(private gameModel: GameModel)
  {
    this.gameView = new GameView(gameModel);
    this.animationController = new AnimationController(this);
    this.gameView.addShowSettingsListener(this.handleSettingsDisplay);
    this.gameView.addCanvasListener("mousemove", this.handleCanvasMouseMove);
    this.gameView.addCanvasListener("mousedown", this.handleCanvasMouseDown);
    this.gameView.addCanvasListener("mouseup", this.handleCanvasMouseUp);
    this.gameView.addCanvasListener("mouseout", this.handleCanvasMouseUp);
    this.gameView.addGameModeListener(this.handleGameModeChange);
    this.gameView.addNewGridListener(this.handleNewGrid);
    this.gameView.addClearSolutionListener(this.handleClearSolution);
    this.gameView.addSolveListener(this.handleSolve);
  }

  registerMediator = (mediator: ControllerMediator) =>
  {
    this.mediator = mediator;
  }

  handleSettingsDisplay = () => 
  {
    this.disableSettingsControls(true);
    this.mediator.showSettingsForm();
  }

  disableSettingsControls = (disable: boolean) =>
    this.gameView.disableSettingsControls(disable);

  initGrid = (gridSize: GridSize) => 
  {
    this.gameModel.initGrid(gridSize.nbColumn, gridSize.nbLine);
    this.gameView.updateDisplay();
  }

  clearSolution = () =>
    this.gameModel.clearSolution();

  updateDisplay = () => 
  {
    this.gameView.updateDisplay();
  }

  hasObstacle = (position: GridPosition) =>
  {
    return (this.gameModel.getGridElement(position.x, position.y) === TileStatus.Wall)
  }

  setExploredPosition = (position: GridPosition) =>
  {
    this.gameModel.setGridElement(position.x, position.y, TileStatus.Explored);
  }
    

  setToExplorePosition = (position: GridPosition) =>
    this.gameModel.setGridElement(position.x, position.y, TileStatus.ToExplore);

  setPathPosition = (position: GridPosition) =>
    this.gameModel.setGridElement(position.x, position.y, TileStatus.Path);

  getStartPosition = () => this.gameModel.startPosition;

  getEndPosition = () => this.gameModel.endPosition;

  getGridSize = () => this.gameModel.settingsModel.gridSize;

  isInsideGrid = (position: GridPosition) =>
    position.x >= 0
    && position.y >=0
    && position.x < this.gameModel.settingsModel.gridSize.nbColumn
    && position.y < this.gameModel.settingsModel.gridSize.nbLine;

  isOnWall = (position: GridPosition) =>
    this.gameModel.getGridElement(position.x, position.y) === TileStatus.Wall;

  private gridUpdate = (x: number, y: number, gameMode: GameMode) => 
  {
    const currentGridStatus = this.gameModel.getGridElement(x, y);

    switch(gameMode)
    {
      case GameMode.SetStart:
        if (TileStatus.Default === currentGridStatus)
        {
          this.gameModel.setStartPosition(x, y);
          this.gameView.updateDisplay();
        }
        break;
      case GameMode.SetEnd:
        if (TileStatus.Default === currentGridStatus)
        {
          this.gameModel.setEndPosition(x, y);
          this.gameView.updateDisplay();
        }
        break;
      case GameMode.SetWall:
        if (TileStatus.Default === currentGridStatus)
        {
          this.gameModel.setGridElement(x, y, TileStatus.Wall);
          this.gameView.updateDisplay();
        }
        break;
      case GameMode.RemoveWall:
        if (TileStatus.Wall === currentGridStatus)
        {
          this.gameModel.setGridElement(x, y, TileStatus.Default);
          this.gameView.updateDisplay();
        }
        break;
      default:
        break;
    }
  }

  getPathFinderDelay = () => this.gameModel.getPathFinderDelay();

  private handleNewGrid = () =>
  {
    this.gameModel.resetGrid();
    this.gameView.updateDisplay();
  }

  private handleClearSolution = () =>
  {
    this.gameModel.clearSolution();
    this.gameView.updateDisplay();
  }

  private handleSolve = () =>
  {
    this.handleClearSolution();
    const pathFinder = new PathFinderService(this, this.gameModel.settingsModel.useHeuristic);

    if (this.getPathFinderDelay() > 0)
    {
      this.gameView.disableSettingsControls(true);
      this.animationController.start(pathFinder);
    }
    else
    {
      while (pathFinder.nextStep())
      {}
      this.updateDisplay();
    }
  }

  private processCanvasAction = (mousePositionX: number, mousePositionY: number) =>
  {
    const currentPosition = this.gameView.getPosition(mousePositionX, mousePositionY);
    this.gridUpdate(currentPosition.x, currentPosition.y, this.gameModel.gameMode);
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
      this.gameModel.setGameMode(gameMode);
  }
}