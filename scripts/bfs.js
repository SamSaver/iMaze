import { getUnvisitedNeighbors } from "./utils";

export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  // Create a Queue and add our initial node in it
  let q = [];
  startNode.distance = 0;
  q.push(startNode);
  startNode.isVisited = true;
  // visitedNodesInOrder.push(startNode);
  // We'll continue till our queue gets empty
  while (!(q.length === 0)) {
    let currentNode = q.shift();

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
      neighbor.isVisited = true;
      q.push(neighbor);
    }
  }
  return visitedNodesInOrder;
}

export function bfsStep(q, visitedNodesInOrder, grid) {
  if (!(q.length === 0)) {
    let currentNode = q.shift();

    if (currentNode.isWall) return currentNode;

    visitedNodesInOrder.push(currentNode);

    let unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    unvisitedNeighbors.filter((neighbor) => !neighbor.isWall);

    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = currentNode.distance + 1;
      neighbor.previousNode = currentNode;
      neighbor.isVisited = true;
      q.push(neighbor);
    }
    return currentNode;
  }
}
