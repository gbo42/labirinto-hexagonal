function cell(i, j){
    this.i = i;
    this.j = j;

    this.parent;

    this.walls = new Array(6).fill(true);

    this.visited = false;

    this.x = rzao+(dzao-rzao/2)*this.j;
    this.y = rzao+(dzinho*2*this.i)+(dzinho*(this.j%2));

    this.highlight = function(){
        noStroke();
        fill(highcolor);

        beginShape();
        for (var a = 0; a < TWO_PI; a += angle) {
            var sx = this.x + cos(a) * rzao;
            var sy = this.y + sin(a) * rzao;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }

    this.show = function() {
        stroke(wallcolor);
        for (let i = 0; i < 6; i++) {
            if(this.walls[i]){
                let a = (i+4)*angle;
                var sx = this.x + cos(a) * rzao;
                var sy = this.y + sin(a) * rzao;
                var sxn = this.x + cos(a+angle) * rzao;
                var syn = this.y + sin(a+angle) * rzao;

                line(sx, sy, sxn, syn);
            }
        }
    }

    this.neighbors = function(){
        let offsets = [[1, 1], [1, 0], [1, -1], [0, -1], [0, 1], [-1, 0]];
        let m = this.j % 2 == 0 ? -1 : 1;

        var neighbors = [];

        for(let i = 0; i < 6; i++){
            let ni = this.i + offsets[i][0]*m;
            let nj = this.j + offsets[i][1]*m;
            if(grid[ni] && grid[ni][nj] && !grid[ni][nj].visited){
                neighbors.push(grid[ni][nj]);
            }
        }

        return neighbors;
    }

    this.freeNeighbors = function(){
        let offsets = [[1, 1], [1, 0], [1, -1], [0, -1], [0, 1], [-1, 0]];
        let m = this.j % 2 == 0 ? -1 : 1;

        var neighbors = [];

        for(let i = 0; i < 6; i++){
            let ni = this.i + offsets[i][0]*m;
            let nj = this.j + offsets[i][1]*m;
            if(grid[ni] && grid[ni][nj] && !grid[ni][nj].visited){
                let di = this.i - grid[ni][nj].i;
                let dj = this.j - grid[ni][nj].j;
                let wall;
                if(this.j%2 == 0){
                    if(di == 1){
                        if(dj == 1){
                            wall = this.walls[5];
                        } else if(dj == -1){
                            wall = this.walls[1];
                        } else {
                            wall = this.walls[0];
                        }
                    } else if (di == 0){
                        if(dj == 1){
                            wall = this.walls[4];
                        } else {
                            wall = this.walls[2];
                        }
                    } else {
                        wall = this.walls[3];
                    }
                } else {
                    if(di == -1){
                        if(dj == -1){
                            wall = this.walls[2];
                        } else if(dj == +1){
                            wall = this.walls[4];
                        } else {
                            wall = this.walls[3];
                        }
                    } else if(di == 0){
                        if(dj == -1){
                            wall = this.walls[1];
                        } else {
                            wall = this.walls[5];
                        }
                    } else {
                        wall = this.walls[0];
                    }
                }
                if(!wall){
                    neighbors.push(grid[ni][nj]);
                }
            }
        }

        return neighbors;
    }
}

function removeWalls(a, b){
    let i = a.i - b.i;
    let j = a.j - b.j;
    if(a.j%2 == 0){
        if(i == 1){
            if(j == 1){
                a.walls[5] = false;
                b.walls[2] = false;
            } else if(j == -1){
                a.walls[1] = false;
                b.walls[4] = false;
            } else {
                a.walls[0] = false;
                b.walls[3] = false;
            }
        } else if (i == 0){
            if(j == 1){
                a.walls[4] = false;
                b.walls[1] = false;
            } else {
                a.walls[2] = false;
                b.walls[5] = false;
            }
        } else {
            a.walls[3] = false;
            b.walls[0] = false;
        }
    } else {
        if(i == -1){
            if(j == -1){
                a.walls[2] = false;
                b.walls[5] = false;
            } else if(j == +1){
                a.walls[4] = false;
                b.walls[1] = false;
            } else {
                a.walls[3] = false;
                b.walls[0] = false;
            }
        } else if(i == 0){
            if(j == -1){
                a.walls[1] = false;
                b.walls[4] = false;
            } else {
                a.walls[5] = false;
                b.walls[2] = false;
            }
        } else {
            a.walls[0] = false;
            b.walls[3] = false;
        }
    }
}

function pathTo(current){
    stroke(pathcolor);
    strokeWeight(10);
    while(current.parent){
        line(current.x, current.y, current.parent.x, current.parent.y);
        current = current.parent;
    }
    strokeWeight(1);
}
