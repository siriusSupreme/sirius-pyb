function House(x, y, color,size) {
    this.x = x;
    this.y = y;
    this.color =color;
    this.size= size;
    
    this.roof = new Roof(x,y);
    
    this.base = new Base(x,y,color);
   
    this.floor = new Floor(x,y,color);
	
	this.tree = new Tree(x,y);
	
	this.door = new Door(x,y);
	
	this.window = new Window(x,y,size);
    
    
	
	
	
    
    this.draw = function(out) {
        this.tree.draw(out);
        this.base.draw(out);
		this.window.draw(out);
		this.roof.draw(out);
        this.floor.draw(out);
        this.door.draw(out);
        
		
		
		
    }
}