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

  //update the model according to the view
  private updateModel = () =>
  {
    this.setGridSize(parseInt(this.settingsView.rowSize), parseInt(this.settingsView.columnSize));
    this.settingsModel.showExploration = this.settingsView.showExploration;
    this.settingsModel.useDelay = this.settingsView.useDelay;
    this.settingsModel.delayInMs = this.settingsView.nbDelay;
  }

  commitSettings = () =>
  {
    this.updateModel();
    this.mediator.updateGameDisplay(this.settingsModel.gridSize);
    this.closeSettings();
  }
}