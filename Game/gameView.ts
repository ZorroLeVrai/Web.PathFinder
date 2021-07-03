import { GridPosition, TileStatus } from '../commonTypes.js';
import GameModel from './gameModel.js';

const backgroundColor = "black";
const defaultTileColor = "white";
const tilePadding = 1;

const colorMap = new Map([
  [TileStatus.Default, "white"],
  [TileStatus.StartPosition, "green"],
  [TileStatus.EndPosition, "blue"],
  [TileStatus.Wall, "grey"],
  [TileStatus.Path, "green"],
  [TileStatus.Explored, "orange"]
]);

export default class GameView
{
  private canvasElement: HTMLCanvasElement;
  private commandDiv: HTMLDivElement;
  private initGridButton: HTMLButtonElement;
  private solveButton: HTMLButtonElement;
  private canvasContext: CanvasRenderingContext2D;
  private gameModeElements: NodeListOf<Element>;

  constructor(private gameModel: GameModel)
  {
    this.canvasElement = document.getElementById("mainCanvas") as HTMLCanvasElement;
    this.commandDiv = document.getElementById("commandMenu") as HTMLDivElement;
    this.initGridButton = document.getElementById("init-grid-button") as HTMLButtonElement;
    this.solveButton  = document.getElementById("solve-button") as HTMLButtonElement;
    this.canvasContext = this.canvasElement.getContext("2d") as CanvasRenderingContext2D;
    this.gameModeElements = document.querySelectorAll("input[name='command']");

    this.updateDisplay();
  }

  private updateCanvasSize = () =>
  {
    this.canvasElement.width = window.innerWidth;
    this.canvasElement.height = window.innerHeight - this.commandDiv.offsetHeight - 4;
  }

  private setBackGroundColor = () =>
  {
    this.canvasContext.fillStyle = backgroundColor;
    this.canvasContext.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  private displayGrid = () => 
  {
    const nbLine = this.gameModel.settingsModel.gridSize.nbLine;
    const nbColumn = this.gameModel.settingsModel.gridSize.nbColumn;

    for (let x=0; x < nbColumn; ++x)
    {
      for (let y=0; y < nbLine; ++y)
      {
        const minX = Math.round(x * this.canvasElement.width / nbColumn) + tilePadding;
        const maxX = Math.round((x+1) * this.canvasElement.width / nbColumn) - tilePadding;
        const minY = Math.round(y * this.canvasElement.height / nbLine) + tilePadding;
        const maxY = Math.round((y+1) * this.canvasElement.height / nbLine) - tilePadding;

        const tileColor = colorMap.get(this.gameModel.grid[x][y]);
        this.canvasContext.fillStyle = tileColor ?? defaultTileColor;
        this.canvasContext.fillRect(minX, minY, maxX-minX, maxY-minY);
      }
    }
  }

  public updateDisplay = () =>
  {
    this.updateCanvasSize();
    this.setBackGroundColor();
    this.displayGrid();
  }

  public addCanvasListener = (eventName: string, listener: (evt: MouseEvent) => void) =>
  {
    this.canvasElement?.addEventListener(eventName, listener);
  }

  public addGameModeListener = (listener: (evt: Event) => void) =>
  {
    for (const gameMode of this.gameModeElements)
    {
      gameMode.addEventListener("change", listener);
    }
  }

  public addInitGridListener = (listener: (evt: Event) => void) => 
  {
    this.initGridButton.addEventListener("click", listener);
  }

  public addSolveListener = (listener: () => void) => 
  {
    this.solveButton.addEventListener("click", listener);
  }

  public getPosition = (x: number, y: number) : GridPosition =>
  {
    const nbLine = this.gameModel.settingsModel.gridSize.nbLine;
    const nbColumn = this.gameModel.settingsModel.gridSize.nbColumn;
    const commandBarHeight = this.commandDiv.offsetHeight;
    const canvasWidth = this.canvasElement.width;
    const canvasHeight = this.canvasElement.height;

    const absoluteX = x;
    const absoluteY = y - commandBarHeight;
    return {x: Math.floor(nbColumn*absoluteX / canvasWidth), y: Math.floor(nbLine*absoluteY / canvasHeight)} ;
  }

  public getSelectedMode = () => 
  {
    for (const gameMode of this.gameModeElements)
    {
      const gameModeInputElement = gameMode as HTMLInputElement;
      if (gameModeInputElement.checked)
      {
        return gameModeInputElement.value;
      }
    }

    return "";
  }
}