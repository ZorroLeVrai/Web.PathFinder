import { SettingsModel } from './settingsModel.js';
import SettingsView from './settingsView.js';

export default class SettingsController
{
  private settingsView : SettingsView;

  constructor(private settingsModel: SettingsModel)
  {
    this.settingsView = new SettingsView(settingsModel);
    this.settingsView.addCloseSettingsListener(this.closeSettings);
    this.settingsView.addCommitSettingsListener(this.commitSettings);
  }

  closeSettings = () => {
    this.settingsView.hide();
  }

  showSettings = () =>
  {
    this.settingsView.display();
  }

  private setGridSize = (sizeRow: number, sizeColumn: number) =>
  {
    this.settingsModel.gridSize = { nbLine: sizeRow, nbColumn: sizeColumn }
  }

  commitSettings = () =>
  {
    //update the model according to the view
    this.setGridSize(parseInt(this.settingsView.rowSize), parseInt(this.settingsView.columnSize));
    this.settingsModel.showExploration = this.settingsView.showExploration;

    this.closeSettings();
  }
}