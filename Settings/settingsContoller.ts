import { SettingsModel } from './settingsModel.js';
import SettingsView from './settingsView.js';
import ControllerMediator from '../controllerMediator.js';

export default class SettingsController
{
  private settingsView : SettingsView;
  private mediator: ControllerMediator;

  constructor(private settingsModel: SettingsModel)
  {
    this.settingsView = new SettingsView(settingsModel);
    this.settingsView.addShowSettingsListener(this.showSettings);
    this.settingsView.addCloseSettingsListener(this.closeSettings);
    this.settingsView.addCommitSettingsListener(this.commitSettings);
  }

  registerMediator = (mediator: ControllerMediator) => {
    this.mediator = mediator;
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

    this.mediator.updateGameDisplay(this.settingsModel.gridSize);
    this.closeSettings();
  }
}