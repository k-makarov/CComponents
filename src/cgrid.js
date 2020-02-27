/*
    Simple realization of full canvas grid with center align
  */
 export default class CGrid {
    
    static get GRID_DEFAULT_LINE_WIDTH() { return 1; }
    
    /*
        options.canvas      - canvas element
        options.cellSize    - size of cell (px)
    */
    constructor(options) {
      this.canvas = options.canvas;
      this.canvasCtx = options.canvas.getContext("2d");
      this.cellSize = options.cellSize;
    }
    
    draw(color) {    
      let rows = 0;
      let cols = 0;
      let i = 0.5;
      
      //calc x,y grid line lengths
      let xLineLength = this.calcGridLineLength(this.canvas.width, this.cellSize);
      let yLineLength = this.calcGridLineLength(this.canvas.height, this.cellSize);
      
      //calc x,y grid offsets
      let xOffset = Math.floor((this.canvas.width - xLineLength) / 2);
      let yOffset = Math.floor((this.canvas.height - yLineLength) / 2);

      do {
        this.drawLine(xOffset, i + yOffset, xLineLength + xOffset, i + yOffset, color);
        i = i + this.cellSize;
        rows++;
      } while (i <= this.canvas.height)
        
      i = 0.5;
      do {     
        this.drawLine(i + xOffset, yOffset, i + xOffset, yLineLength + yOffset, color);
        i = i + this.cellSize;
        cols++;
      } while (i <= this.canvas.width)

      //rows and cols count is -1 from grid lines count
      rows--;
      cols--;
        
      this.grid = { rows, cols, xOffset, yOffset, xLineLength, yLineLength }
    }
    
    calcGridLineLength(cSize, cellSize) {
      return cSize % cellSize 
             ? Math.floor(cSize / cellSize) * cellSize
             : cSize;
    }
    
    drawLine(x1, y1, x2, y2, color) {
      this.canvasCtx.beginPath();
      this.canvasCtx.moveTo(x1, y1);
      this.canvasCtx.lineTo(x2, y2);
      this.canvasCtx.strokeStyle = color;
      this.canvasCtx.stroke();
    }
    
    drawCell(i, j, color) {
      let x = this.cellSize * (j - CGrid.GRID_DEFAULT_LINE_WIDTH) + this.grid.xOffset + CGrid.GRID_DEFAULT_LINE_WIDTH; 
      let y = this.cellSize * (i - CGrid.GRID_DEFAULT_LINE_WIDTH) + this.grid.yOffset + CGrid.GRID_DEFAULT_LINE_WIDTH;
      this.canvasCtx.fillStyle = color;
      this.canvasCtx.fillRect(x, y, this.cellSize - CGrid.GRID_DEFAULT_LINE_WIDTH, this.cellSize - CGrid.GRID_DEFAULT_LINE_WIDTH);
    }
    
    clearCell(i, j) {
      let x = this.cellSize * (j - CGrid.GRID_DEFAULT_LINE_WIDTH) + this.grid.xOffset + CGrid.GRID_DEFAULT_LINE_WIDTH;
      let y = this.cellSize * (i - CGrid.GRID_DEFAULT_LINE_WIDTH) + this.grid.yOffset + CGrid.GRID_DEFAULT_LINE_WIDTH;
      this.canvasCtx.clearRect(x, y, this.cellSize - CGrid.GRID_DEFAULT_LINE_WIDTH, this.cellSize - CGrid.GRID_DEFAULT_LINE_WIDTH);
    }
    
    getInstance = () => { return this.grid; }
  }