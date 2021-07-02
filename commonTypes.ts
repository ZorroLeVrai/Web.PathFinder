export enum TileStatus
{
  Default,
  StartPosition,
  EndPosition,
  Wall,
  Path,
  Explored
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

export interface GridPosition 
{
  x: number;
  y: number;
}