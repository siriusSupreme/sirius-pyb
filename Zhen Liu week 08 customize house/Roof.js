
//add a chimney on the house as the roof.
function Roof(x,y,color) {
    this.x = x;
    this.y = y;
    this.color= color;
    
	
    this.draw = function(out){
		  out.rect(50,70).fill('#CFCFCF').stroke({width:3}).move(this.x+20, this.y-20);
        }
	 }




   
    
//end






