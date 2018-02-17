function cell(i, j){
    this.i = i;
    this.j = j;

    this.walls = new Array(6).fill(true);

    this.visited = false;

    this.x = rzao+(dzao-rzao/2)*this.j;
    this.y = rzao+(dzinho*2*this.i)+(dzinho*(this.j%2));

    this.highlight = function(){
        noStroke();
        fill(255);

        beginShape();
        for (var a = 0; a < TWO_PI; a += angle) {
            var sx = this.x + cos(a) * rzao;
            var sy = this.y + sin(a) * rzao;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }

    this.show = function() {
        stroke(255);
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
