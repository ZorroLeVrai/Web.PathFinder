import { SettingsModel } from "./settingsModel.js";

export default class SettingsView
{
  private settingsFormElement : HTMLDivElement;
  private cancelSettingsElement : HTMLDivElement;
  private commitSettingsElement : HTMLButtonElement;
  private inputRowElement : HTMLInputElement;
  private inputColumnElement : HTMLInputElement;
  private showExplorationElement : HTMLInputElement;
  private settingsButton: HTMLButtonElement;
  private useDelayElement: HTMLInputElement;
  private setNbDelayElement: HTMLInputElement;

  constructor(private _settingsModel: SettingsModel)
  {
    this.settingsFormElement = document.getElementById("settings-form") as HTMLDivElement;
    this.cancelSettingsElement = document.getElementById("cancel-settings") as HTMLDivElement;
    this.commitSettingsElement = document.getElementById("commit-settings") as HTMLButtonElement;
    this.inputRowElement = document.getElementById("nb-rows") as HTMLInputElement;
    this.inputColumnElement = document.getElementById("nb-columns") as HTMLInputElement;
    this.showExplorationElement = document.getElementById("show-exploration") as HTMLInputElement;
    this.settingsButton = document.getElementById("settings-button") as HTMLButtonElement;
    this.useDelayElement = document.getElementById("use-delay") as HTMLInputElement;
    this.setNbDelayElement = document.getElementById("nb-delay") as HTMLInputElement;

    this.useDelayElement.addEventListener("change", this.handleUseDelayChange);
  }

  public addCloseSettingsListener = (listener: () => void) =>
  {
    this.cancelSettingsElement?.addEventListener("click", listener);
  }

  public addCommitSettingsListener = (listener: () => void) =>
  {
    this.commitSettingsElement?.addEventListener("click", listener);
  }

  public addShowSettingsListener = (listener: () => void) =>
  {
    this.settingsButton?.addEventListener("click", listener);
  }

  private handleUseDelayChange = () =>
  {
    this.setNbDelayElement.disabled = !this.useDelayElement.checked;
  }

  public hide()
  {
    this.settingsFormElement.classList.add("removed");
  }

  //update the view according to the settings
  private updateView = () =>
  {
    this.inputRowElement.value = this._settingsModel.gridSize.nbLine.toString();
    this.inputColumnElement.value = this._settingsModel.gridSize.nbColumn.toString();
    this.showExplorationElement.checked = this._settingsModel.showExploration;
    this.useDelayElement.checked = this._settingsModel.useDelay;
    this.setNbDelayElement.value = this._settingsModel.delayInMs.toString();
  }

  public display()
  {
    this.settingsFormElement?.classList.remove("removed");
    this.updateView();
  }

  get rowSize()
  {
    return this.inputRowElement.value;
  }

  get columnSize()
  {
    return this.inputColumnElement.value;
  }

  get showExploration()
  {
    return this.showExplorationElement.checked;
  }

  get useDelay()
  {
    return this.useDelayElement.checked;
  }

  get nbDelay()
  {
    return this.setNbDelayElement.value;
  }
}