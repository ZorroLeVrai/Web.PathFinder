import { GridSize } from '../commonTypes';

export class SettingsModel
{
  constructor(public gridSize: GridSize, public useHeuristic: boolean, public useDelay: boolean, public delayInMs: number)
  {
  }
}