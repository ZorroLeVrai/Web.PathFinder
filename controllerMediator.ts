import { GridSize } from "./commonTypes.js";
import GameController from "./Game/gameController.js";
import SettingsController from "./Settings/settingsContoller.js";

export default class ControllerMediator
{
    constructor(private gameController: GameController, private settingsController: SettingsController)
    {
    }

    public updateGameDisplay = (gridSize: GridSize) => 
    {
        this.gameController.initGrid(gridSize);
    }

    public showSettingsForm = () =>
        this.settingsController.showSettings();

    public disableSettingsControls = (disable: boolean) =>
        this.gameController.disableSettingsControls(disable);
}