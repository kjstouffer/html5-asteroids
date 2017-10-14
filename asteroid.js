//bullet class

function asteroid(xPos, yPos, xVelocity, yVelocity, lifetime)
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
    this.direction = direction;
    this.lifetime = lifetime;
    this.factor = 2 ** (lifetime - 1);
    this.radius = 13 * this.factor;

    //define class functions
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

//draws the asteroid on the specified canvas context
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
    context.moveTo(this.xPos - (this.factor * 15), this.yPos );
    context.lineTo(this.xPos - (this.factor * 11), this.yPos - (this.factor * 13));
    context.lineTo(this.xPos + (this.factor * 3),  this.yPos - (this.factor * 16));
    context.lineTo(this.xPos + (this.factor * 3),  this.yPos - (this.factor * 9));
    context.lineTo(this.xPos + (this.factor * 11), this.yPos - (this.factor * 11));
    context.lineTo(this.xPos + (this.factor * 11), this.yPos - (this.factor * 3));
    context.lineTo(this.xPos + (this.factor * 7),  this.yPos - (this.factor * 1));
    context.lineTo(this.xPos + (this.factor * 10), this.yPos + (this.factor * 6));
    context.lineTo(this.xPos + (this.factor * 4),  this.yPos + (this.factor * 13));
    context.lineTo(this.xPos - (this.factor * 9),  this.yPos + (this.factor * 9));
    context.lineTo(this.xPos - (this.factor * 15), this.yPos );
    context.closePath();
    context.fill();
    context.stroke();
}

// each main asteroid has a lifetime of 2, which means it can be split twice before being destroyed.
function isAsteroidDead()
{
    var returnValue = false;
    if(this.lifetime <= 0)
    {
        returnValue = true;
    }

    return returnValue;
}

function splitAsteroid()
{
    if(this.isAsteroidDead()) return [];
    var newAsteroids = [new asteroid(this.xPos, this.yPos, this.xVelocity, this.yVelocity, this.lifetime - 1), new asteroid(this.xPos, this.yPos, this.xVelocity, this.yVelocity, this.lifetime - 1)];
    return newAsteroids;
}
