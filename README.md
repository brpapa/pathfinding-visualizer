# Pathfinding Visualizer

A react-based visualization of a pathfinder, built without any UI library. You can view live [here](https://pathfinding.now.sh).

## Concepts

Each grid item represents a node in a implicit graph.
  - Each triangle is adjacent to other 3 triangles.
  - Each square is adjacent to other 4 squares.

## Implemented features

- [x] 2D grid types
  - [x] Triangle Grid
  - [x] Square Grid
  - [ ] Hexagon Grid

- [x] Search algorithms
  - [x] Depth-First Search
  - [x] Breadth-First Search
  - [x] Greedy Best-First Search
  - [x] A\* Search

- [x] Immediate response to delay change during visualization
- [x] Draw your own wall nodes with mouse
- [x] Persist form inputs on local storage
- [ ] Maze generator for wall nodes
- [ ] Drag and drop the source and target nodes
- [ ] Folding animation on changing the node state

## Installation

In the root directory, you can run:

```bash
# To install all dependencies of the project.
> yarn install
> npm install

# To run the app on http://localhost:3000.
> yarn start
> npm run start

# To run the unit tests
> yarn test:unit
> npm run test:unit

# To build the bundled app for production on the `build` folder.
> yarn build
> npm run build
```

