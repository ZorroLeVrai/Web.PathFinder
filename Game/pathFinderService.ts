import GameController from './gameController.js';
import { GridPosition } from '../commonTypes.js';

class PathInformation
{
  public currentPostion: GridPosition;
  public previousNodePosition: GridPosition | null = null;
  public pathLength: number = Number.MAX_VALUE;
  private fullCost: number;

  constructor(currentPostion: GridPosition, previousPosition: GridPosition | null, pathLength: number, public estimatedCost: number)
  {
    this.currentPostion = currentPostion;
    this.setPathLength(previousPosition, pathLength);
  }

  private updateFullCost = () =>
    this.fullCost = this.pathLength + this.estimatedCost;

  public setPathLength = (previousNodePosition: GridPosition | null, pathLength: number) =>
  {
    if (pathLength < this.pathLength)
    {
      this.previousNodePosition = previousNodePosition;
      this.pathLength = pathLength;
      this.updateFullCost();
    }
  }

  public getFullCost = () =>
    this.fullCost;
}

export default class PathFinderService
{
  private startPosition: GridPosition;
  private endPosition: GridPosition;
  private exploredNodes: Map<number, PathInformation> = new Map();
  private nodeToExplore: Map<number, PathInformation> = new Map();

  constructor(private gameController : GameController)
  {
    const startPosition = gameController.getStartPosition();
    const endPosition = gameController.getEndPosition();

    if (startPosition !== undefined)
    {
      this.startPosition = startPosition;
    }
    else
      console.log("Cannot solve path: no start position is set");

    if (endPosition !== undefined)
      this.endPosition = endPosition;
    else
      console.log("Cannot solve path: no end position is set");

    this.updateNode(this.startPosition, null, 0);
  }

  private updateNode = (currentPosition: GridPosition, previousPosition: GridPosition | null, pathLength: number) =>
  {
    const numberPosition = currentPosition.toNumber();
    const currentNode = this.nodeToExplore.get(numberPosition);
    if (null != currentNode)
    {
      currentNode.setPathLength(previousPosition, pathLength);
    }
    else
    {
      this.nodeToExplore.set(numberPosition, this.createPathInformation(currentPosition, previousPosition, pathLength));
      this.setToExplorePosition(currentPosition);
    }
  }

  private setToExplorePosition = (position: GridPosition) =>
  {
    if (!position.isOnPosition(this.startPosition) && !position.isOnPosition(this.endPosition))
      this.gameController.setToExplorePosition(position);
  }

  private setExploredPosition = (position: GridPosition) =>
  {
    if (!position.isOnPosition(this.startPosition))
      this.gameController.setExploredPosition(position);
  }

  private setPathPosition = (position: GridPosition) =>
  {
    if (!position.isOnPosition(this.startPosition) && !position.isOnPosition(this.endPosition))
      this.gameController.setPathPosition(position);
  }


  private createPathInformation = (currentPosition: GridPosition, previousPosition: GridPosition | null, pathLength: number) =>
    new PathInformation(currentPosition, previousPosition, pathLength, this.getDistanceToEndPoint(currentPosition));

  private getDistanceToEndPoint = (position: GridPosition) =>
  {
    const distance = Math.sqrt((position.x - this.endPosition.x)**2 + (position.y - this.endPosition.y)**2);
    return distance;
  }
    

  private getBestNode = () =>
  {
    let bestNode : PathInformation | null = null;
    for(let node of this.nodeToExplore.values())
    {
      if (bestNode == null || node.getFullCost() < bestNode.getFullCost())
        bestNode = node;
    }

    return bestNode;
  }

  private getAdjacentNodes = (position: GridPosition): Array<GridPosition> =>
  {
    const result: Array<GridPosition> = [];

    for (let adjacentPosition of position.getAllAdjacentPositions())
    {
      if (this.gameController.isInsideGrid(adjacentPosition)
        && !this.gameController.isOnWall(adjacentPosition)
        && !this.exploredNodes.has(adjacentPosition.toNumber())
        && !this.nodeToExplore.has(adjacentPosition.toNumber()))
      {
        result.push(adjacentPosition);
      }
    }

    return result;
  }

  private setNodeAsExplored = (node: PathInformation) =>
  {
    const key = node.currentPostion.toNumber();
    this.nodeToExplore.delete(key);
    this.exploredNodes.set(key, node);
    this.setExploredPosition(node.currentPostion);
  }

  nextStep = () => 
  {
    let bestNode = this.getBestNode();

    if (null == bestNode)
      return false;

    if (bestNode.currentPostion.isOnPosition(this.endPosition))
    {
      this.inferWholePath(bestNode);
      return false;
    }
    
    let adjacentPositions = this.getAdjacentNodes(bestNode.currentPostion);
    for(let adjacentPosition of adjacentPositions)
    {
      this.updateNode(adjacentPosition, bestNode.currentPostion, bestNode.pathLength+1);
    }

    this.setNodeAsExplored(bestNode);
    return true;
  }

  private inferWholePath = (node: PathInformation) =>
  {
    let currentNode : PathInformation | null | undefined = node;

    while (currentNode != null)
    {
      this.setPathPosition(currentNode.currentPostion);
      let previousPosition = currentNode.previousNodePosition;

      if (null == previousPosition)
      {
        currentNode = null;  
      }
      else
      {
        currentNode = this.exploredNodes.get(previousPosition.toNumber())
      } 
    }
  }
}