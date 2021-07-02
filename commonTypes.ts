export enum TileStatus {
  Default,
  StartPosition,
  EndPosition,
  Obstacle,
  Path,
  Explored
}

export interface GridSize {
  nbLine: number,
  nbColumn: number
}

export interface CanvasSize {
  xSize: number;
  ySize: number;
}