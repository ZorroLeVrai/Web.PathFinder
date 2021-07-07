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
    this.settingsView.addCloseSettingsListener(this.closeSettings);
    this.settingsView.addCommitSettingsListener(this.commitSettings);
    this.settingsView.addGridSizeChangeListener(this.handleGridSizeChange);
  }

  handleGridSizeChange = () =>
  {
    const isGridSizeChange = this.isGridSizeChange();
    this.settingsView.displayWarningLabel(isGridSizeChange);
  }

  registerMediator = (mediator: ControllerMediator) =>
  {
    this.mediator = mediator;
  }

  closeSettings = () => {
    this.settingsView.hide();
    this.mediator.disableSettingsControls(false);
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
  private updateModel = (isGridSizeChange: boolean) =>
  {
    if (isGridSizeChange)
    {
      this.setGridSize(parseInt(this.settingsView.rowSize), parseInt(this.settingsView.columnSize));
    }

    this.settingsModel.useHeuristic = this.settingsView.showExploration;
    this.settingsModel.useDelay = this.settingsView.useDelay;
    this.settingsModel.delayInMs = this.settingsView.nbDelay;
  }

  private isGridSizeChange = () =>
  {
    const newRowSize = parseInt(this.settingsView.rowSize);
    const newColumnSize = parseInt(this.settingsView.columnSize);
    return (newColumnSize !== this.settingsModel.gridSize.nbColumn || newRowSize !== this.settingsModel.gridSize.nbLine);
  }

  commitSettings = () =>
  {
    const isGridSizeChange = this.isGridSizeChange();
    this.updateModel(isGridSizeChange);

    if (isGridSizeChange)
      this.mediator.updateGameDisplay(this.settingsModel.gridSize);
    this.closeSettings();
    this.mediator.disableSettingsControls(false);
  }
}