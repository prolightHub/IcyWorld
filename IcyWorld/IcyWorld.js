var canvas = document.getElementById("canvas");
var processing = new Processing(canvas, function(processing) {
    processing.size(400, 400);
    processing.background(0xFFF);

    var mouseIsPressed = false;
    processing.mousePressed = function () { mouseIsPressed = true; };
    processing.mouseReleased = function () { mouseIsPressed = false; };

    var keyIsPressed = false;
    processing.keyPressed = function () { keyIsPressed = true; };
    processing.keyReleased = function () { keyIsPressed = false; };

    function getImage(s) {
        var url = "https://www.kasandbox.org/programming-images/" + s + ".png";
        processing.externals.sketch.imageCache.add(url);
        return processing.loadImage(url);
    }

    function getLocalImage(url) {
        processing.externals.sketch.imageCache.add(url);
        return processing.loadImage(url);
    }

    // use degrees rather than radians in rotate function
    var rotateFn = processing.rotate;
    processing.rotate = function (angle) {
        rotateFn(processing.radians(angle));
    };

    with (processing) {
      
var createArray = function(Obj)
{
    var array = [];
    array.add = function(config)
    {
        this.push(new Obj(config));
    };
    array.draw = function() 
    {
        for(var i = 0; i < this.length; i++)
        {
            this[i].draw();   
        }
    };
    array.update = function() 
    {
        for(var i = 0; i < this.length; i++)
        {
            this[i].update();  
            if(this[i].delete !== undefined && this[i].delete)
            {
                this.splice(i, 1);
            }
        }
    };
    return array;
};

var Cloud = function(config)
{
    this.xPos = config.xPos;
    this.yPos = config.yPos;
    this.width = config.width;
    this.height = config.height;
    this.color = config.color;
    
    this.xSpeed = config.xSpeed || 0;
    this.xVel = this.xSpeed;
    this.maxXVel = config.maxXVel || 5;
    
    this.ySpeed = config.ySpeed || 0;
    this.yVel = this.ySpeed;
    this.maxYVel = config.maxYVel || 5;
    
    this.draw = function() 
    {
        noStroke();
        fill(this.color);
        ellipse(this.xPos, this.yPos, this.width, this.height);
    };
    
    this.update = function()
    {
        if(this.xPos < -(this.width / 2))
        {
            this.xPos = width + this.width / 2;    
        }
        if(this.xPos > width + this.width / 2)
        {
            this.xPos = -(this.width / 2);    
        }
        this.xVel = constrain(this.xVel, -this.maxXVel, this.maxXVel);
        this.xPos += this.xVel;
        
        if(this.yPos < -(this.height / 2))
        {
            this.yPos = height + this.height / 2;    
        }
        if(this.yPos > height + this.height / 2)
        {
            this.yPos = -(this.height / 2);    
        }
        this.yVel = constrain(this.yVel, -this.maxYVel, this.maxYVel);
        this.yPos += this.yVel;
    };
};

var clouds = createArray(Cloud);
clouds.generate = function(amt)
{
    for(var i = 0; i < amt; i++)
    {
        this.add({
            xPos : random(0, width),
            yPos : random(height / 10, height / 2.5),
            height : random(15, 35),
            width : random(50, 150),
            color : color(255, 255, 255, random(100, 200)),
            
            xSpeed : random(-4, 4) / 8,
        });
    }
};

clouds.generate(random(5, 15));

var sun = function(xPos, yPos, diameter)
{
    noStroke();
    fill(207, 207, 76, 200);
    ellipse(xPos, yPos, diameter, diameter);
};

var planet = function(x, y, d)
{
    noStroke();
    pushMatrix();
        translate(-230, -335);
        translate(x, y);
        scale(0.87);
        rotate(10);
        fill(25, 149, 207, 150);
        ellipse(330, 338, d || 200, d || 200);
        pushMatrix();
            translate(267, 275);
            rotate(48);
            fill(255, 255, 255, 30);
            ellipse(0, 0, 21, 89);
        popMatrix();
        
        strokeWeight(10);
        stroke(25, 59, 196, 100);
        line(220, 425, 437, 234);
        
        strokeWeight(5);
        stroke(97, 157, 176, 50);
        line(210, 419, 456, 202);
        line(230, 430, 475, 220);
    popMatrix();
};

var iceTower = function(x, y)
{
    pushMatrix();
        translate(-30, -200);
        translate(x, y);
        fill(95, 192, 227, 150);
        triangle(103, 194, 129, 233, 47, 380);
        triangle(54, 233, 105, 230, 31, 399);
        triangle(19, 243, 68, 225, 22, 405);
    popMatrix();
};

var hill = function(x, y, sc, l)
{
    pushMatrix();
        translate(180, 95);
        scale(sc);
        translate(x, y);
        rotate(145);
        fill(83, 194, 214, 200);
        for(var i = 0; i < 4; i++)
        {
            rect(i * 29, 0, 30, l || 100, 12);
        }
    popMatrix();
};


var IsMouseInside = function(obj)
{
    return (mouseX > obj.xPos && 
            mouseX < obj.xPos + obj.width) &&
           (mouseY > obj.yPos && 
            mouseY < obj.yPos + obj.height);   
};
var Button = function(config)
{
    this.xPos = config.xPos;
    this.yPos = config.yPos;
    this.width = config.width;
    this.height = config.height;
    this.color = config.color || color(149, 179, 66);
    
    this.message = config.message || "";
    this.textSize = config.textSize || 12.5;
    this.textColor = config.textColor || 0;
    
    this.name = config.name;
    
    this.draw = function() 
    {
        fill(this.color);
        rect(this.xPos, this.yPos, this.width, this.height);
        fill(0, 0, 0);
        textAlign(CENTER, CENTER);
        textSize(this.textSize);
        fill(this.textColor);
        text(this.message, this.xPos + this.width/2, this.yPos + this.height/2);
    };
};
var buttons = createArray(Button);
buttons.refs = {};
buttons.add = function(config)
{
    this.refs[config.name] = this.length;
    this.push(new Button(config)); 
};
buttons.getButton = function(name)
{
    if(this.refs[name] !== undefined &&
    this[this.refs[name]] !== undefined)
    {
        return this[this.refs[name]];
    }else{
        println("Error referencing button '" + name + "'.");
        return new Button({});    
    }  
};
buttons.add({
    xPos : 150,
    yPos : 175,
    width : 110,
    height : 30,
    message : "Continue",
    name : "continue",
    color : color(10, 10, 10, 50)
});
buttons.add({
    xPos : 150,
    yPos : 215,
    width : 110,
    height : 30,
    message : "Restart",
    name : "restart",
    color : color(10, 10, 10, 50)
});
buttons.add({
    xPos : 150,
    yPos : 255,
    width : 110,
    height : 30,
    message : "Menu",
    name : "menu",
    color : color(10, 10, 10, 50)
});

var draw = function() 
{
    background(147, 221, 250);
    
    planet(342, 319, 220);
    
    sun(100, 80, 50);
    clouds.draw();
    clouds.update();

    iceTower(22, 188);
    iceTower(142, 272);
    
    hill(-38, 243, 1.2, 125);
    hill(24, 256, 1.2, 125);
    
    //ground
    fill(41, 131, 143);
    ellipse(69, 409, 155, 75);
    ellipse(243, 409, 268, 67);
    
    fill(38, 157, 173);
    ellipse(166, 409, 126, 75);
    
    //ice spikes
    fill(95, 192, 227, 150);
    triangle(0, 329, 0, 400, 222, 296);
    triangle(0, 380, 0, 400, 280, 302);
    
    fill(30, 93, 201, 200);
    triangle(36, 364, 13, 339, 209, 300);
    triangle(36, 379, 13, 391, 269, 304);
    
    fill(95, 192, 227, 150);
    triangle(400, 400, 339, 400, 185, 275);
    triangle(357, 400, 291, 400, 159, 313);
    
    fill(30, 93, 201, 200);
    triangle(358, 406, 196, 282, 335, 369);
    triangle(338, 400, 313, 399, 159, 313);
    
    //shanding
    fill(112, 64, 31, 20);
    rect(0, 387, 400, 14, 100);
    fill(0, 0, 0, 4);
    ellipse(200, 360, 400, 100);
    
    
    /*fill(0, 0, 0, 50);
    rect(50, 0, width - 100, height);
    textSize(15);
    fill(0, 0, 0, 100);
    textAlign(CENTER, CENTER);
    text("Use the arrow keys or \n wasd to move. " + 
    "Pressed down or \n the spacebar to enter doors that \n lead to the next level.  Press 'p'  to \n pause and 'r' to restart.", 200, 180);
    fill(0, 0, 0, 50);
    ellipse(200, 180, 250, 120);
    */
    //buttons.draw();
    
    // fill(0, 0, 0, 100);
    // rect(50, 0, width - 100, height);
    // textSize(40);
    // fill(0, 0, 0, 100);
    // textAlign(CENTER, CENTER);
    // text("Paused", 200, 100);
    
    // buttons.draw();
    
    // if(IsMouseInside(buttons.getButton("restart")))
    // {
        
    // }
};




    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});