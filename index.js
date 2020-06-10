// // A simple Java program to implement Game of Life 
// function GameOfLife (arr)
// { 
//     x = 10, y = 10;
//         arr1= 
//         [[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
//         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] 

// 		for (l = 1; l < M - 1; l++) 
// 		{ 
// 			for (m = 1; m < N - 1; m++) 
// 			{ 
// 			var aliveNeighbours = 0; 
// 				for ( i = -1; i <= 1; i++) 
// 					for (j = -1; j <= 1; j++) 
// 						aliveNeighbours += grid[l + i][m + j]; 

// 				aliveNeighbours -= grid[l][m]; 

// 				if ((grid[l][m] == 1) && (aliveNeighbours < 2)) 
// 					future[l][m] = 0; 

// 				else if ((grid[l][m] == 1) && (aliveNeighbours > 3)) 
// 					future[l][m] = 0; 

// 				else if ((grid[l][m] == 0) && (aliveNeighbours == 3)) 
// 					future[l][m] = 1; 

// 				else
// 					future[l][m] = grid[l][m]; 
			 
//         } 
//     }
//     console.log(GameOfLife(       
//          [[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
//         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] ))
// }

	

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  }
  let grid;
  let cols;
  let rows;
  let resolution = 10;
  
  function setup() {
    createCanvas(600, 400);
    cols = width / resolution;
    rows = height / resolution;
  
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = floor(random(2));
      }
    }
  }
  
  function draw() {
    background(0);
  
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j] == 1) {
          fill(255);
          stroke(0);
          rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }
  
    let next = make2DArray(cols, rows);
  
    // Compute next based on grid
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        // Count live neighbors!
        let sum = 0;
        let neighbors = countNeighbors(grid, i, j);
  
        if (state == 0 && neighbors == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
      }
    }
  
    grid = next;
  }
  
  function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum += grid[col][row];
      }
    }
    sum -= grid[x][y];
    return sum;
  }