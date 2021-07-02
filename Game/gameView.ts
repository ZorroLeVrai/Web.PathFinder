import GameModel from './gameModel.js';

const backgroundColor = "black";
const tilePadding = 1;

const defaultTileColor = "white";

export default class GameView
{
  private canvasElement: HTMLCanvasElement;
  private commandDiv: HTMLDivElement;
  private settingsButton: HTMLButtonElement;
  private canvasContext: CanvasRenderingContext2D;


  constructor(private gameModel: GameModel)
  {
    this.canvasElement = document.getElementById("mainCanvas") as HTMLCanvasElement;
    this.commandDiv = document.getElementById("commandMenu") as HTMLDivElement;
    this.settingsButton = document.getElementById("settings-button") as HTMLButtonElement;
    this.canvasContext = this.canvasElement.getContext("2d") as CanvasRenderingContext2D;

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
    this.canvasContext.fillStyle = defaultTileColor;

    for (let i=0; i < nbLine; ++i)
    {
      for (let j=0; j < nbColumn; ++j)
      {
        const minX = Math.round(i * this.canvasElement.width / nbLine) + tilePadding;
        const maxX = Math.round((i+1) * this.canvasElement.width / nbLine) - tilePadding;
        const minY = Math.round(j * this.canvasElement.height / nbColumn) + tilePadding;
        const maxY = Math.round((j+1) * this.canvasElement.height / nbColumn) - tilePadding;

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

  public addShowSettingsListener = (listener: () => void) =>
  {
    this.settingsButton?.addEventListener("click", listener);
  }

  public addCanvasListener = (listener: () => void) =>
  {
    this.canvasElement?.addEventListener("click", listener);
  }
}