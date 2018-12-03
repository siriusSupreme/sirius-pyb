//floor
function Floor(x,y,color) {
    
	this.x = x;
    this.y = y;
    this.color = color;
 
    this.draw = function(out){
out.rect(360,25).fill('#c39765').stroke({width:3}).move(this.x-30, this.y+250);
       
	   
	   }
	 
}
		
		
		
//end