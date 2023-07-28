import { GridSize } from "./commonTypes";
import GameController from "./Game/gameController";
import SettingsController from "./Settings/settingsContoller";

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