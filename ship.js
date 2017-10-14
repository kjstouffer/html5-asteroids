//ship class

function ship(accelerationRate, fireRate, xPos, yPos)
{
    
    this.accelerationRate = accelerationRate;
    this.decelerationRate = 5*accelerationRate;
    
    
    this.xPos = xPos;
    this.yPos = yPos;
    this.xVelocity = 0;
    this.yVelocity = 0;
    //directionFacing will always be between pi and -pi
    this.directionFacing = 0;
    this.directionMoving = 0;
    this.bullets = new Array();
    
    this.shootTimer = 31;
    //fire rate is every 1/60 of a second, so to have it shoot twice per second, use 30
    this.fireRate = fireRate;
    
    this.xFrontOfShip = 12 * Math.cos(this.directionFacing) + this.xPos;
    this.yFrontOfShip = 12 * Math.sin(this.directionFacing) + this.yPos;
    
    this.xBackRightOfShip = 6 * Math.cos(this.directionFacing + (4*Math.PI/5)) + this.xPos;
    this.yBackRightOfShip = 6 * Math.sin(this.directionFacing + (4*Math.PI/5)) + this.yPos;
    
    this.xBackLeftOfShip = 6 * Math.cos(this.directionFacing - (4*Math.PI/5)) + this.xPos;
    this.yBackLeftOfShip = 6 * Math.sin(this.directionFacing - (4*Math.PI/5)) + this.yPos;
    
    this.isAccelerating = false;
    
    this.accelerate = accelerate;
    this.stopAccelerating = stopAccelerating;
    this.decelerate = decelerate;
    this.moveShip = moveShip;
    this.turnShip = turnShip;
    this.shoot = shoot;
    this.drawShip = drawShip;
    this.drawBullets = drawBullets;
}


//accelerates in the directionFacing the ship is facing (in radians)
function accelerate()
{
    //var speed = Math.sqrt(this.xVelocity * this.xVelocity + this.yVelocity * this.yVelocity);
    //var directionFacing = Math.atan2(this.yVelocity, this.xVelocity);
    //to make restricting the max speed easier, i could use a 
    //polar coordnate system instead, but since everything is 
    //already cartesian, it makes more sense to do all movement
    //in a cartesian system so that adding and subtracting velocities
    //is more straight forward.  upon thinking about this problem further,
    //i've decided to leave maxSpeed out of the equation since i would have to
    //implement an exponential decay model approaching the max speed if i were
    //to do it correctly.
    this.xVelocity += this.accelerationRate * Math.cos(this.directionFacing);
    this.yVelocity += this.accelerationRate * Math.sin(this.directionFacing);
    this.directionMoving = Math.atan2(this.yVelocity, this.xVelocity);
    
    this.isAccelerating = true;
}

function stopAccelerating()
{
    this.isAccelerating = false;
}
//accelerate backwards
function decelerate()
{
    //no matter which directionFacing the ship is facing, slow it down to stopping.
    if(Math.abs(this.yVelocity) < this.decelerationRate)
    {
        this.yVelocity = 0;
    }
    else
    {
        this.yVelocity -= this.decelerationRate * Math.sin(this.directionMoving);
    }
    if(Math.abs(this.xVelocity) < this.decelerationRate)
    {
        this.xVelocity = 0;
    }
    else
    {
        this.xVelocity -= this.decelerationRate * Math.cos(this.directionMoving);
    }
}

//tell the ship to move
function moveShip()
{
    this.xPos += this.xVelocity;
    this.yPos += this.yVelocity;
}
//directionFacing will be 1 for clockwise, 0 for not turning, and -1 for counter clockwise,
//not to be confused with the directionFacing the ship is facing
function turnShip(turndirectionFacing)
{
    if(turndirectionFacing > 0)
    {
        //turn ship to the "right"
        this.directionFacing += 3*(Math.PI / 180);
        if(this.directionFacing >= Math.PI)
        {
            this.directionFacing = this.directionFacing - 2 * Math.PI;
        }
    }
    else if (turndirectionFacing < 0)
    {
        //turn ship to the "left"
        this.directionFacing -= 3*(Math.PI / 180);
        if(this.directionFacing <= -Math.PI)
        {
            this.directionFacing = this.directionFacing + 2 * Math.PI;
        }
    }
    else
    {
        //dont turn the ship
    }
    
}

//draws a bullet coming out of the front of the ship
//only allow to shoot once every half of a second
function shoot()
{
    if(this.shootTimer > this.fireRate){
    //create a bullet in an array belonging to the ship
        this.bullets.push(new bullet(this.xFrontOfShip, this.yFrontOfShip, this.xVelocity, this.yVelocity, this.directionFacing));
        this.shootTimer = 0;
    }
}

//draws the ship on the specified canvas context
function drawShip(canvas,context)
{
    //xPos and yPos will always be "0" when drawing the ship. so from the center
    //of the ship, there will be an invisible line of length x depending on the
    //side of the ship.
    if(this.xPos > canvas.width)
    {
        this.xPos = 0;
    }
    if(this.yPos > canvas.height)
    {
        this.yPos = 0;
    }
    if(this.xPos < 0)
    {
        this.xPos = canvas.width;
    }
    if(this.yPos < 0)
    {
        this.yPos = canvas.height;
    }
    
    this.xFrontOfShip = 12 * Math.cos(this.directionFacing) + this.xPos;
    this.yFrontOfShip = 12 * Math.sin(this.directionFacing) + this.yPos;
    
    this.xBackRightOfShip = 6 * Math.cos(this.directionFacing + (3*Math.PI/4)) + this.xPos;
    this.yBackRightOfShip = 6 * Math.sin(this.directionFacing + (3*Math.PI/4)) + this.yPos;
    
    this.xBackLeftOfShip = 6 * Math.cos(this.directionFacing - (3*Math.PI/4)) + this.xPos;
    this.yBackLeftOfShip = 6 * Math.sin(this.directionFacing - (3*Math.PI/4)) + this.yPos;
    
    context.beginPath();
    context.moveTo(this.xFrontOfShip, this.yFrontOfShip);
    context.lineTo(this.xBackRightOfShip, this.yBackRightOfShip);
    context.lineTo(this.xBackLeftOfShip, this.yBackLeftOfShip);
    context.lineTo(this.xFrontOfShip, this.yFrontOfShip);
    context.closePath();
    context.fill();
    context.stroke();
        
    //draw the fire!!!
    if(this.isAccelerating == true)
    {
        var startAngle = this.directionFacing + Math.PI / 2;
        var endAngle = this.directionFacing - Math.PI / 2;
        var radius = 3.5;
        var x = (this.xBackRightOfShip + this.xBackLeftOfShip) / 2;
        var y = (this.yBackRightOfShip + this.yBackLeftOfShip) / 2;
        context.beginPath();
        context.moveTo(x,y);
        context.arc(x,y,radius,startAngle,endAngle);
        
        context.closePath();
        context.fill();
        context.stroke();
    }
    
}

function drawBullets(canvas,context)
{
    this.shootTimer++;
    if(this.bullets.length > 0)
    {
        if(this.bullets[0].isBulletDead() == true)
        {
            this.bullets.shift();
        }
    }
    for(var i = 0; i < this.bullets.length; i++)
    {
        this.bullets[i].moveBullet();
        this.bullets[i].drawBullet(canvas, context);
    }
    
}
