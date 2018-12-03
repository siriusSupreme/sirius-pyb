"use strict"
var output1 = SVG('output1').size(2000,500);
var output2 = SVG('output2').size(2000,500);



var house1 = new House(80,50, "purple",20);
var house2 = new House(900,50, "blue",50);
var house3 = new House(80,50, "pink",80);
var house4 = new House(900,50, "#EE7621",90);


house1.draw(output1);
house2.draw(output1);
house3.draw(output2);
house4.draw(output2);