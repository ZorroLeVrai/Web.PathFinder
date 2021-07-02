import { GridSize } from '../commonTypes.js';

export class SettingsModel
{
  constructor(private _gridSize: GridSize, private _showExploration: boolean)
  {}

  get gridSize()
  {
    return this._gridSize;
  }

  set gridSize(value)
  {
    this._gridSize = value;
  }

  get showExploration()
  {
    return this._showExploration;
  }

  set showExploration(value)
  {
    this._showExploration = value;
  }
}