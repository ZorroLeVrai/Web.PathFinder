import { TileStatus } from '../commonTypes.js';
import { SettingsModel } from '../Settings/settingsModel.js';

export default class GameModel
{
  grid: Array<Array<TileStatus>>;

  constructor(public settingsModel: SettingsModel)
  {
    this.grid = Array(this.settingsModel.gridSize.nbLine).fill(Array(this.settingsModel.gridSize.nbColumn).fill(TileStatus.Default));
  }
}