function Base(x,y,color) {
    this.x = x;
    this.y = y;
    this.color = color;
    
	this.draw = function(out) {
        out.rect(300,220).move(this.x,this.y+50).radius(10).fill('#98754d').stroke({width:4}).fill(this.color);
    }
	
	
}





//end

	

