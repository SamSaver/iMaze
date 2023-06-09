import { getUnvisitedNeighbors } from "./utils";

export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  // Create a Stack and add our initial node in it
  let stack = [];
  startNode.distance = 0;
  stack.push(startNode);
  //   startNode.isVisited = true;
  // visitedNodesInOrder.push(startNode);
  // We'll continue till our queue gets empty
  while (!(stack.length === 0)) {
    let currentNode = stack.pop();
    currentNode.isVisited = true;

    if (currentNode.isWall) continue;

    visitedNodesInOrder.push(currentNode);

    if (
      currentNode.row === finishNode.row &&
      currentNode.col === finishNode.col
    )
      return visitedNodesInOrder;
    let unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    unvisitedNeighbors.filter((neighbor) => !neighbor.isWall);

    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = currentNode.distance + 1;
      neighbor.previousNode = currentNode;
      //   neighbor.isVisited = true;
      stack.push(neighbor);
    }
  }
  return visitedNodesInOrder;
}

export function dfsStep(stack, visitedNodesInOrder, grid) {
  if (!(stack.length === 0)) {
    let currentNode = stack.pop();
    currentNode.isVisited = true;

    if (currentNode.isWall) return currentNode;

    visitedNodesInOrder.push(currentNode);

    let unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    unvisitedNeighbors.filter((neighbor) => !neighbor.isWall);

    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = currentNode.distance + 1;
      neighbor.previousNode = currentNode;
      //   neighbor.isVisited = true;
      stack.push(neighbor);
    }
    return currentNode;
  }
}
