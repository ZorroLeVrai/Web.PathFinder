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

  constructor(private _settingsModel: SettingsModel)
  {
    this.settingsFormElement = document.getElementById("settings-form") as HTMLDivElement;
    this.cancelSettingsElement = document.getElementById("cancel-settings") as HTMLDivElement;
    this.commitSettingsElement = document.getElementById("commit-settings") as HTMLButtonElement;
    this.inputRowElement = document.getElementById("nb-rows") as HTMLInputElement;
    this.inputColumnElement = document.getElementById("nb-columns") as HTMLInputElement;
    this.showExplorationElement = document.getElementById("show-exploration") as HTMLInputElement;
    this.settingsButton = document.getElementById("settings-button") as HTMLButtonElement;
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

  public hide()
  {
    this.settingsFormElement.classList.add("removed");
  }

  public display()
  {
    this.settingsFormElement?.classList.remove("removed");

    //update the view according to the settings
    this.inputRowElement.value = this._settingsModel.gridSize.nbLine.toString();
    this.inputColumnElement.value = this._settingsModel.gridSize.nbColumn.toString();
    this.showExplorationElement.checked = this._settingsModel.showExploration;
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
}