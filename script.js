var grid, current, next;
var angle;
var cols, rows;
var dzao, rzao, dzinho;
var stack = [];

function setup(){
    var h = 600;
    var w = 600;

    createCanvas(w,h);

    rows = 13;
    cols = 15;
    dzao = 50;
    rzao = dzao/2;
    angle = TWO_PI / 6;
    dzinho = dzao*0.43301270189;

    grid = new Array(rows);

    for(let i = 0; i < rows; i++){
        grid[i] = new Array(cols);
    }

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            grid[i][j] = new cell(i, j);
        }
    }

    current = grid[0][0];
}

function draw(){
    background(51);
    current.highlight();
    current.visited = true;
    next = random(current.neighbors());
    if(next){
        removeWalls(current, next);
        stack.push(current);
        current = next;
    } else if(stack.length > 0){
        current = stack.pop();
    }


    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            grid[i][j].show();
        }
    }
}
