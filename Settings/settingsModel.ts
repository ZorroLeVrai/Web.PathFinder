import { GridSize } from '../commonTypes.js';

export class SettingsModel
{
  constructor(public gridSize: GridSize, public showExploration: boolean, public useDelay: boolean, public delayInMs: number)
  {
  }
}