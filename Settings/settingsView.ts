import { SettingsModel } from "./settingsModel.js";

export default class SettingsView
{
  private settingsFormElement : HTMLDivElement;
  private cancelSettingsElement : HTMLDivElement;
  private commitSettingsElement : HTMLButtonElement;
  private inputRowElement : HTMLInputElement;
  private inputColumnElement : HTMLInputElement;
  private useHeuristicElement : HTMLInputElement;
  private useDelayElement: HTMLInputElement;
  private setNbDelayElement: HTMLInputElement;
  private warningLabelElement: HTMLLabelElement;

  constructor(private _settingsModel: SettingsModel)
  {
    this.settingsFormElement = document.getElementById("settings-form") as HTMLDivElement;
    this.cancelSettingsElement = document.getElementById("cancel-settings") as HTMLDivElement;
    this.commitSettingsElement = document.getElementById("commit-settings") as HTMLButtonElement;
    this.inputRowElement = document.getElementById("nb-rows") as HTMLInputElement;
    this.inputColumnElement = document.getElementById("nb-columns") as HTMLInputElement;
    this.useHeuristicElement = document.getElementById("use-heuristic") as HTMLInputElement;
    this.useDelayElement = document.getElementById("use-delay") as HTMLInputElement;
    this.setNbDelayElement = document.getElementById("nb-delay") as HTMLInputElement;
    this.warningLabelElement = document.getElementById("show-warning") as HTMLLabelElement;

    this.useDelayElement.addEventListener("change", this.handleUseDelayChange);
  }

  public addGridSizeChangeListener = (listener: () => void) => 
  {
    this.inputRowElement.addEventListener("change", listener);
    this.inputColumnElement.addEventListener("change", listener);
  }

  public addCloseSettingsListener = (listener: () => void) =>
  {
    this.cancelSettingsElement?.addEventListener("click", listener);
  }

  public addCommitSettingsListener = (listener: () => void) =>
  {
    this.commitSettingsElement?.addEventListener("click", listener);
  }

  public displayWarningLabel = (display: boolean) =>
  {
    if (display)
    {
      this.warningLabelElement.classList.remove("hidden");
    }
    else
    {
      this.warningLabelElement.classList.add("hidden");
    }
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
    this.useHeuristicElement.checked = this._settingsModel.useHeuristic;
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
    return this.useHeuristicElement.checked;
  }

  get useDelay()
  {
    return this.useDelayElement.checked;
  }

  get nbDelay()
  {
    return parseInt(this.setNbDelayElement.value);
  }
}