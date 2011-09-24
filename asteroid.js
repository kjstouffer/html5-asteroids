//bullet class

function asteroid(xPos, yPos, xVelocity, yVelocity)
{
    direction = Math.random() * Math.PI * 2;
    if(direction > Math.PI)
    {
        direction = direction - Math.PI * 2;
    }
    
    var speed = Math.random();
    
    var xSpeed = speed * Math.cos(direction);
    var ySpeed = speed * Math.sin(direction);
    
    this.xPos = xPos;
    this.yPos = yPos;
    this.xVelocity = xVelocity + xSpeed;
    this.yVelocity = yVelocity + ySpeed;
    //direction will always be between pi and -pi
    //this.direction = direction;
    
    
    this.moveAsteroid = moveAsteroid;
    this.drawAsteroid = drawAsteroid;
    this.splitAsteroid = splitAsteroid;
    this.isAsteroidDead = isAsteroidDead;
}


//tell the bullet to move
function moveAsteroid()
{
    this.xPos += this.xVelocity;
    this.yPos += this.yVelocity;
}

//draws the bullet on the specified canvas context
function drawAsteroid(canvas,context)
{
    
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
    
   
    
    context.beginPath();
    context.moveTo(this.xPos-15,this.yPos);
    context.lineTo(this.xPos-11, this.yPos -13);
    context.lineTo(this.xPos+3, this.yPos -16);
    context.lineTo(this.xPos+3, this.yPos -9);
    context.lineTo(this.xPos+11, this.yPos -11);
    context.lineTo(this.xPos+11, this.yPos -3);
    context.lineTo(this.xPos+7, this.yPos -1);
    context.lineTo(this.xPos+10, this.yPos +6);
    context.lineTo(this.xPos+4, this.yPos +13);
    context.lineTo(this.xPos-9, this.yPos +9);
    context.lineTo(this.xPos-15, this.yPos);
    context.closePath();
    context.fill();
    context.stroke();
}
function isAsteroidDead()
{
    var returnValue = false;
    if(this.lifeTime < 0)
    {
        returnValue = true;
    }
    
    return returnValue;
}

function splitAsteroid()
{

}