export enum TileStatus
{
  Default,
  StartPosition,
  EndPosition,
  Wall,
  Path,
  Explored,
  ToExplore
}

export enum GameMode
{
  SetStart,
  SetEnd,
  SetWall,
  RemoveWall,
  Resolved
}

export interface GridSize
{
  nbLine: number,
  nbColumn: number
}

export interface CanvasSize
{
  xSize: number;
  ySize: number;
}

export class GridPosition 
{
  x: number;
  y: number;

  constructor(x: number, y: number)
  {
    this.x = x;
    this.y = y;
  }

  isOnPosition = (position: GridPosition) =>
    this.x === position.x && this.y === position.y;

  toNumber = () => 1000*this.y + this.x;

  getAllAdjacentPositions = () =>
  {
    return [
      new GridPosition(this.x-1, this.y-1),
      new GridPosition(this.x-1, this.y),
      new GridPosition(this.x-1, this.y+1),
      new GridPosition(this.x, this.y-1),
      new GridPosition(this.x, this.y+1),
      new GridPosition(this.x+1, this.y-1),
      new GridPosition(this.x+1, this.y),
      new GridPosition(this.x+1, this.y+1)
    ];
  }
}