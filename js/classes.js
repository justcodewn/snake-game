class Sprite{
    constructor({location={x:0,y:0},height=10,width=10,color="#00ff00"}){
        this.location = location;
        this.height = height;
        this.width = width;
        this.color = color;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.location.x, this.location.y, this.width, this.height);
    }
    update(){

    }
}

class MovingSprite extends Sprite{
    constructor({location,width,height, color,velocity={x:0,y:0}}){
        super({location, height, width, color});
        this.velocity = velocity;
    }
    draw(){
        super.draw();
    }
    update(){
        this.location.x+= this.velocity.x;
        this.location.y+= this.velocity.y;
    }
}

class SnakeBody extends MovingSprite{
    constructor({head,next, location, height,width,color,velocity={x:0,y:0}}){
        super({location,height, width, color,velocity});
        this.next = next;
        this.head = head;
    }
    draw(){
        super.draw();
        if(this.next){
            this.next.draw();
        }
    }
    update(){
        if(!this.next){
            super.update();
        }else{
            this.location.x = this.next.location.x;
            this.location.y = this.next.location.y;
            this.next.update();
        }
    }
}

class TileMap{
    constructor({map=[[]],drawCallback=(item,x,y,mapRef)=>{}}){
        this.map = map;
        this.drawCallback = drawCallback;
        this.wallTiles = [];
        this.wallTiles = this.buildTile(this.map);
    }
    draw(){
        this.wallTiles.forEach((tile)=>{
            tile.draw();
        })
    }
    update(){
        this.wallTiles.forEach((sprite)=>{
            sprite.update();
        })
    }
    buildTile(map){
        const builtTile = [];
        map.map((row,iy)=>{
            row.map((item,ix)=>{
                this.drawCallback(item,ix,iy,builtTile);
            })
        })
        return builtTile;
    }
    rebuild(){
        this.wallTiles = this.buildTile(this.map);
    }
}