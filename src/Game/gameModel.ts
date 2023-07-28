import { TileStatus, GameMode, GridPosition } from '../commonTypes';
import { SettingsModel } from '../Settings/settingsModel';

export default class GameModel
{
  grid: Array<Array<TileStatus>>;
  gameMode: GameMode;
  startPosition: GridPosition | undefined;
  endPosition: GridPosition | undefined;

  constructor(public settingsModel: SettingsModel)
  {
    this.gameMode = GameMode.SetStart;
    this.initGrid(settingsModel.gridSize.nbColumn, settingsModel.gridSize.nbLine);
  }

  public initGrid = (nbColumn: number, nbLine: number) =>
  {
    let gridResult: Array<Array<TileStatus>> = [];
    this.startPosition = undefined;
    this.endPosition = undefined;

    for (let i=0; i<nbColumn; ++i)
    {
      gridResult.push(Array(nbLine).fill(TileStatus.Default));
    }

    this.grid = gridResult;
  }

  public clearSolution = () =>
  {
    this.setGridAction((x, y) => {
      if ([TileStatus.Path, TileStatus.Explored, TileStatus.ToExplore].includes(this.grid[x][y]))
        this.grid[x][y] = TileStatus.Default;
    });
  }

  public getPathFinderDelay = () => (this.settingsModel.useDelay) ? this.settingsModel.delayInMs : 0;

  public resetGrid = () =>
  {
    this.startPosition = undefined;
    this.endPosition = undefined;

    this.setGridAction((x, y) => this.grid[x][y] = TileStatus.Default);
  }

  private setGridAction = (action: (x: number, y: number) => void) =>
  {
    for (let x=0; x<this.settingsModel.gridSize.nbColumn; ++x)
    {
      for (let y=0; y<this.settingsModel.gridSize.nbLine; ++y)
      {
        action(x,y);
      }
    }
  }

  private resetPosition = (position: GridPosition | undefined) => 
  {
    if (position !== undefined)
    {
      this.setGridElement(position.x, position.y, TileStatus.Default);
    }
  }

  setStartPosition = (x: number, y: number) => 
  {
    this.resetPosition(this.startPosition);
    this.startPosition = new GridPosition(x, y);
    this.setGridElement(x, y, TileStatus.StartPosition);
  }

  setEndPosition = (x: number, y: number) => 
  {
    this.resetPosition(this.endPosition);
    this.endPosition = new GridPosition(x, y);
    this.setGridElement(x, y, TileStatus.EndPosition);
  }

  setGameMode = (mode: GameMode) => 
  {
    if (GameMode.Resolved === this.gameMode)
      return;

    this.gameMode = mode;
  }

  setGridElement = (x: number, y: number, tileStatus: TileStatus) => 
  {
    this.grid[x][y] = tileStatus;
  }

  getGridElement = (x: number, y: number) : TileStatus => 
  {
    return this.grid[x][y];
  }
}