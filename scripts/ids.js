import { getUnvisitedNeighbors } from "./utils";

export function ids(grid, startNode, finishNode) {
  let visitedNodesInOrderList = [];
  let hasFound = { val: false };
  let limit = 1;

  while (!hasFound.val) {
    let visitedNodesInOrder = dfs(grid, startNode, finishNode, limit, hasFound);

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        grid[row][col].isVisited = false;
      }
    }
    visitedNodesInOrderList.push(visitedNodesInOrder);
    limit += 1;
  }

  return visitedNodesInOrderList;
}

function dfs(grid, startNode, finishNode, limit, hasFound) {
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

    if (!currentNode.isVisited) {
      currentNode.isVisited = true;

      if (currentNode.isWall) continue;

      visitedNodesInOrder.push(currentNode);

      if (
        currentNode.row === finishNode.row &&
        currentNode.col === finishNode.col
      ) {
        hasFound.val = true;
        return visitedNodesInOrder;
      }
      let unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
      unvisitedNeighbors.filter((neighbor) => !neighbor.isWall);

      if (currentNode.distance + 1 >= limit) {
        continue;
      }

      for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = currentNode.distance + 1;
        neighbor.previousNode = currentNode;
        //   neighbor.isVisited = true;
        stack.push(neighbor);
      }
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
