import GameController from './gameController';
import PathFinderService from './pathFinderService';


export default class AnimationController
{
  private pathFinder: PathFinderService;
  private isAnimationOn = true;
  private pathFinderDelay: number;
  private lastUpdate: number = -Number.MAX_VALUE;

  constructor(private gameController: GameController)
  {
  }

  start = (pathFinder: PathFinderService) =>
  {
    this.pathFinder = pathFinder;
    this.pathFinderDelay = this.gameController.getPathFinderDelay();
    window.requestAnimationFrame(this.animationLoop);
    this.isAnimationOn = true;
  }

  private animationLoop = (timeStamp: number) =>
  {
    if (this.isAnimationOn)
      window.requestAnimationFrame(this.animationLoop);

    if (timeStamp - this.lastUpdate < this.pathFinderDelay)
      return;

    this.lastUpdate = timeStamp;

    if (this.pathFinder.nextStep())
    {
      //display path finder solving step
      this.gameController.updateDisplay();
    }
    else
    {
      //path solved
      this.isAnimationOn = false;
      this.gameController.disableSettingsControls(false);
      this.gameController.updateDisplay();
    }
  }
}