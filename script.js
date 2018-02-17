var grid, current, next;
var angle;
var cols, rows;
var dzao, rzao, dzinho;
var stack = [];
var queue;
var done;

var pathcolor = 'rgba(50,255,50,1)';
var wallcolor = 'rgba(255,255,255,1)';
var highcolor = 'rgba(150,150,255,1)';
var backcolor = 'rgba(51,51,51,1)';
function setup(){
    var h = 600;
    var w = 600;

    createCanvas(w,h);

    done = false;
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

    queue = new Queue();
    queue.enqueue(grid[0][0]);
    goal = grid[rows-1][cols-1];
    current = grid[0][0];
}

function draw(){
    background(backcolor);
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            grid[i][j].show();
        }
    }

    if(!done){
        current.highlight();
        current.visited = true;
        next = random(current.neighbors());
        if(next){
            removeWalls(current, next);
            stack.push(current);
            current = next;
        } else if(stack.length > 0){
            current = stack.pop();
        } else {
            done = true;
            for(let i = 0; i < rows; i++){
                for(let j = 0; j < cols; j++){
                    grid[i][j].visited = false;
                }
            }
        }
    } else {
        if(!queue.isEmpty()){
            current = queue.dequeue();
            current.visited = true;
            var neighbors = current.freeNeighbors();
            pathTo(current);
            for(let i = 0; i < neighbors.length; i++){
                neighbors[i].visited = true;
                neighbors[i].parent = current;
                queue.enqueue(neighbors[i]);

                if(neighbors[i] == goal){
                    pathTo(neighbors[i]);
                    noLoop();
                }
            }
        }
    }
}
