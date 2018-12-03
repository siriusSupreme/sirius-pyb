//draw the door on the house.
function Door(x,y) {

	
	this.x = x;
    this.y = y;
   
	
    this.draw = function(out){

	   out.rect(75,125).radius(5).fill('#CDB38B').stroke({width:2}).move(this.x+210, this.y+94);
 
	   
	   }

}

//end
