/*add windows on the house.*/

function Window(x,y) {
    
	this.x = x;
    this.y = y;
	this.draw = function(out) {
        
		
		out.rect(105,50).radius(10).fill('#a0fcfe').stroke({width:2}).move(this.x+30,this.y+60);
		out.rect(80,110).fill('#a0fcfe').stroke({ width: 3 }).move(this.x+40,this.y+130);
        out.line(this.x+30,this.y+90,this.x+135,this.y+90).stroke({ width: 3 });
        out.line(this.x+90,this.y+60,this.x+90,this.y+110).stroke({ width: 3 });

		
	}
}	

//end








