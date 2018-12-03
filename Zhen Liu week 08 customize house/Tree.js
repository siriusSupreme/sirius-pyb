function Tree(x,y,color){
    
	this.x = x;
    this.y = y;
    this.color = color;
	
    this.draw = function(out){
      out.rect(50,200).radius(15).fill('#6a4f33').stroke({width:3}).move(this.x+370, this.y+150);
        /*add some leaves*/
        out.circle(100).fill('#C0FF3E').stroke({width:3}).move(this.x+330, this.y+90);
        out.circle(100).fill('#C0FF3E').stroke({width:3}).move(this.x+350, this.y+110);
        out.circle(100).fill('#C0FF3E').stroke({width:3}).move(this.x+375, this.y+80);
        out.circle(110).fill('#B4EEB4').stroke({width:3}).move(this.x+380, this.y+140);
        out.circle(90).fill('#8B8B00').stroke({width:3}).move(this.x+360, this.y+95);
        out.circle(90).fill('#8B8B00').stroke({width:3}).move(this.x+340, this.y+50);
        out.circle(100).fill('#8B8B00').stroke({width:3}).move(this.x+380, this.y+40);
        /*add a sun*/
        out.circle(150).fill('#EEC900').move(this.x+500,this.y-50);
        
 
	   
	   }



}
//end
