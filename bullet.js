//bullet class

function bullet(xPos, yPos, xVelocity, yVelocity, direction)
{
    
    //var xFrontOfShip = 12 * Math.cos(direction);
    //var yFrontOfShip = 12 * Math.sin(direction);
    
    var speed = 5;
    
    var xSpeed = speed * Math.cos(direction);
    var ySpeed = speed * Math.sin(direction);
    
    this.xPos = xPos;
    this.yPos = yPos;
    this.xVelocity = xVelocity + xSpeed;
    this.yVelocity = yVelocity + ySpeed;
    //direction will always be between pi and -pi
    //this.direction = direction;
    
    this.lifeTime = 10000;
    
    this.moveBullet = moveBullet;
    this.drawBullet = drawBullet;
    this.isBulletDead = isBulletDead;
}


//tell the bullet to move
function moveBullet()
{
    this.xPos += this.xVelocity;
    this.yPos += this.yVelocity;
}

//draws the bullet on the specified canvas context
function drawBullet(canvas,context)
{
    this.lifeTime--;
    //xPos and yPos will always be "0" when drawing the bullet. so from the center
    //of the bullet, there will be an invisible line of length x depending on the
    //side of the bullet.
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
    
   
    
    //context.beginPath();
    context.fillRect(this.xPos-2,this.yPos-2, 4,4);
    context.strokeRect(this.xPos-2,this.yPos-2, 4,4)
    //context.closePath();
    //context.fill();
    //context.stroke();
}
function isBulletDead()
{
    var returnValue = false;
    if(this.lifeTime < 0)
    {
        returnValue = true;
    }
    
    return returnValue;
}
function didBulletHitSomething()
{
    
}
