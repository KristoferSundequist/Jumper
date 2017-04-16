//handling music
//var music = document.getElementById("audioID");
//music.play();

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var canvasText = document.createElement("canvas");
var ctxText = canvasText.getContext("2d");
canvasText.width = 200;
canvasText.height = 50;
document.body.appendChild(canvasText);

var bgReady = false;
// Background image
var bgImage = new Image();
bgImage.src = "images/background.png";

bgImage.onload = function () {
	bgReady = true;
	//load background
	ctx.drawImage(bgImage, 0, 0);
	
	//Draw text on screen
	ctx.fillStyle = "white";
	ctx.font = "22px Impact";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Points: " + getDataFromUrl(), 220, 50);
	ctx.fillText("Stay inside the rings.", 160, 160);
	ctx.fillText("Grab coins to gain points.", 140, 130);
	ctx.fillText("Control the character with the Arrows keys.", 70, 100);
	ctx.fillText("Jump between rings with Space.", 110, 190);
	ctx.fillText("Good luck!", 200, 220);
	ctx.font = "40px Impact";
	ctx.fillText("Press ENTER to continue..", 60, 300);

};


// Handle keyboard controls
var keysDown = {};

var listener = function (event) {
	if(event.keyCode == 13){
		ctx.clearRect ( 0, 0, canvas.width, canvas.height);
		ctx.drawImage(bgImage, 0, 0);	
		startGame();
	}
};

var checkStart = function(){
	addEventListener("keydown", listener, false);
};


// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

var heroRightReady = false;
var heroRightImage = new Image();
heroRightImage.onload = function () {
	heroRightReady = true;
};
heroRightImage.src = "images/heroright.png";

var heroJumpReady = false;
var heroJumpImage = new Image();
heroJumpImage.onload = function () {
	heroJumpReady = true;
};
heroJumpImage.src = "images/herojump.png";

var herojumpleftReady = false;
var herojumpleftImage = new Image();
herojumpleftImage.onload = function () {
	herojumpleftReady = true;
};
herojumpleftImage.src = "images/herojumpleft.png";


var heroStillLeftReady = false;
var heroStillLeftImage = new Image();
heroStillLeftImage.onload = function () {
	heroStillLeftReady = true;
};
heroStillLeftImage.src = "images/heroStillLeft.png";

var heroStillRightReady = false;
var heroStillRightImage = new Image();
heroStillRightImage.onload = function () {
	heroStillRightReady = true;
};
heroStillRightImage.src = "images/heroStillRight.png";




// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";


// Game objects
var hero = {
	speed: 0.25,
	xhero: canvas.width / 2,
	yhero: canvas.height / 2,
	jump: 1
	
};


var monster = {};
var monstersCaught = 0;


// Handle keyboard controls
var keysDown = {};

var upKey = false;
var downKey = false;
var leftKey = false;
var rightKey = false;
var jumpKey = false;


//Events som lyssnar efter knapptryckn
addEventListener("keydown", function (e) {
	//keysDown[e.keyCode] = true;
	if(e.which == 38){
		upKey = true;
	}
	if(e.which == 40){
		downKey = true;
	}
	if(e.which == 37){
		leftKey = true;
	}
	if(e.which == 39){
		rightKey = true;
	}
	if(e.which == 32){
		jumpKey = true;
	}	
}, false);

//Event som lyssnar efter knappsläpp
addEventListener("keyup", function (e) {
	//delete keysDown[e.keyCode];
	if(e.which == 38){
		upKey = false;
	}
	if(e.which == 40){
		downKey = false;
	}
	if(e.which == 37){
		leftKey = false;
	}
	if(e.which == 39){
		rightKey = false;
	}
	if(e.which == 32){
		jumpKey = false;
	}
}, false);


// Reset the game when the player catches a monster
var spawnNewMonster = function () {

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};


var disc1 = new Disc(80000, 1, 20, 0.05, 'red');
var disc2 = new Disc(120000, 1, 20, 0.05, 'red');
var disc3 = new Disc(170000, 1, 20, 0.025, 'red');
var disc4 = new Disc(140000, 1, 20, 0.025, 'red');
var disc5 = new Disc(120000, 1, 20, 0.05, 'red');
var disc6 = new Disc(100000, 1, 20, 0.05, 'red');
var disc7 = new Disc(200000, 1, 20, 0.025, 'red');
var disc8 = new Disc(200000, 1, 20, 0.025, 'red');

var discArr = new Array();
discArr.push(disc1);
discArr.push(disc2);
discArr.push(disc3);
discArr.push(disc4);
discArr.push(disc5);
discArr.push(disc6);
discArr.push(disc7);
discArr.push(disc8);


for(var i = 0; i < discArr.length; i++){
	discArr[i].newDisc();
}


//DISK KLASSEN
//------------
//spawnTime: hur länge en disc skall leva
//radius: hur stor disken startas
//changeRate: hur snabbt tiden går
//sizeChange: Hur snabbt disken blir större
//diskens färg
function Disc (spawnTime, radius, changeRate, sizeChange, color) {
	this.discColor = color;
	//Hur mycket större discen blir per tick
	this.sizeChange = sizeChange;
	//hur snabbt tiden skall gå
	this.changeRate = changeRate;
	//hur stor discen är just nu
	this.radius = radius;
	//Om discen skall bli mindre eller större
	this.getSmaller = false;
	//hur länge en disc skall leva
	this.spawnTime = spawnTime;
	//hur lång tid det har gått sedan discens skapelse
	this.newSpawn = this.spawnTime;
	//discens x position
	this.circleX = 0;
	//discens y position
	this.circleY = 0;
	
	//Ny disk
	this.newDisc = function(){
		this.getSmaller = false;
		this.newSpawn = this.spawnTime;
	
		this.circleX = Math.floor((Math.random()*canvas.width));
		this.circleY = Math.floor((Math.random()*canvas.height));
	};
	
	//ritar ut disken baserat på nuvarande attirubter
	this.renderDisc = function (){
		ctx.beginPath();
		ctx.arc(this.circleX, this.circleY, this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = this.discColor;
		ctx.fill();
		ctx.lineWidth = 10;
		ctx.strokeStyle = '#f0f0f0';
		ctx.stroke();	
	};
	
	//Måste köras varje tidsinstans
	this.updateDisc = function(deltaTime){
		this.newSpawn -= this.changeRate * deltaTime;
		
		//Ändrar storlek på disc
		if(this.getSmaller == false){
			this.radius += this.sizeChange * deltaTime;
		}else if(this.getSmaller == true){
			this.radius -= this.sizeChange * deltaTime;
		}
		
		
		//Om halva tiden har gått skall discen bli mindre istället för större
		if(this.newSpawn < this.spawnTime / 2){
			this.getSmaller = true;
		}
		
		//Om tiden har gått ut skall allt ressettas, discen skall förflyttas etc
		if(this.newSpawn <= 0){
			this.newDisc();
		}
	};
}

//fix alertBox bugg
var alertShowed = false;

var isJumping = false;
var timeKeeper = 0;
var jumpTime = 500;
var jumpGetSmaller = false;
var jumpSpeed = 0.003;
// Update game objects
var update = function (modifier) {
	
	
	
	//Uppdaterar discar
	for(var i = 0; i < discArr.length; i++){
		discArr[i].updateDisc(modifier);
	}
	
	var moveCount = 0;
	//player input
	if (upKey == true) { // Player holding up
		hero.y -= hero.speed * modifier;
		hero.yhero -= hero.speed * modifier;
		moving = true;
	}else{
		moveCount++;
	}
	
	if (downKey == true) { // Player holding down
		hero.y += hero.speed * modifier;
		hero.yhero += hero.speed * modifier;
		moving = true;
	}else{
		moveCount++;
	}
	
	if (leftKey == true) { // Player holding left
		hero.x -= hero.speed * modifier;
		hero.xhero -= hero.speed * modifier;
		left = true;
		moving = true;
	}else{
		moveCount++;
	}
	
	if (rightKey == true) { // Player holding right
		hero.x += hero.speed * modifier;
		hero.xhero += hero.speed * modifier;
		left = false;
		moving = true;
	}else{
		moveCount++;
	}
	
	if(moveCount == 4){
		moving = false;
	}
	
	if (jumpKey == true && isJumping == false) { // Player holding space
		isJumping = true;
		
		for(var i = 0; i < keysDown.length; i++){
			if(keysDown[i] == 32){
				keysDown.splice(i, 1);
			}
		}
	}
	
	
	//kontrollerar JUMP
	if(isJumping == true){
		timeKeeper += 1 * modifier;
		
		if(timeKeeper <= jumpTime/2 && jumpGetSmaller == false){
			hero.jump += jumpSpeed * modifier;
		}else{
			jumpGetSmaller = true;
		}
		
		if(jumpGetSmaller == true){
			hero.jump -= jumpSpeed * modifier;
		}
		
		if(timeKeeper >= jumpTime && jumpGetSmaller == true){
			timeKeeper = 0;
			jumpGetSmaller = false;
			isJumping = false;
			hero.jump = 1;
		}
	}
	
	
	var checkTouch = 0;
	
	//Loopar igenom diskarna för att se om hjälten rör dem
	for(var i = 0; i < discArr.length; i++){
		
		//skapar en rätvinklig triangel med hjältens position som en punkt och cirkelns mitt som en annan
		//Jag tar sedan ut avståndet mellan dessa med hjälp utav pythagoras sats
		var distanceBetweenHeroAndDiscCenter = Math.sqrt(Math.pow(discArr[i].circleX - hero.x, 2) + Math.pow(discArr[i].circleY - hero.y, 2));
		
		//Om 'cirkelns radie' är större än avståndet mellan 'hjälten' och 'cirkelns center' är hjälten "inne" i cirkeln
		if (discArr[i].radius + 10 >= distanceBetweenHeroAndDiscCenter && discArr[i].radius + 10 + 32 >= distanceBetweenHeroAndDiscCenter){
			//hjälten är inne i en disk
			checkTouch++;
		}
	}
	
	
	//Om hjälten inte är inne i någon disk bör checkTouch vara == 0
	if(checkTouch == 0 && isJumping == false){
		
		//fix for chrome alertbox bugg
		if(alertShowed == false){
			alertShowed = true;
			
			window.location = getRealUrl() + "?" + monstersCaught;
		}
		//clearInterval(mainInterval);
	}
	
	
	//Hero touching monster? Spawn new monster and get point

	if ( hero.x <= (monster.x+32+16) && monster.x <= (hero.x+32-16) && hero.y <= (monster.y + 32+30) && monster.y <= (hero.y+32-30) )
	{
		monstersCaught++;
		spawnNewMonster();
	}
};

function getRealUrl(){
	var passed = false;
	var realURL = "";
	for(var i = 0; i < document.URL.length; i++){
		if(document.URL[i] == "?"){
			passed = true;
		}
		if(passed == false){
			realURL = realURL + document.URL[i];
		}
	}
	return realURL;
};

function getDataFromUrl(){
	var passed = false;
	var realURL = "";
	for(var i = 0; i < document.URL.length; i++){
		if(passed == true){
			realURL = realURL + document.URL[i];
		}
		if(document.URL[i] == "?"){
			passed = true;
		}
	}
	return realURL;
};


var left = true;
var moving = false;

// Draw everything
var render = function () {
	
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	
	for(var i = 0; i < discArr.length; i++){
		discArr[i].renderDisc();
	}
	
	//
	//Renderar hjälten
	//
	if(moving == true){
		//Om hjälten rör på sig
		if(left == true){
			if(isJumping == false){
				if (heroReady) {
					ctx.drawImage(heroImage, hero.x-16, hero.y-30, 30*hero.jump, 32*hero.jump);
				}
			}else if(herojumpleftReady){
				ctx.drawImage(herojumpleftImage, hero.x-16, hero.y-30, 30*hero.jump, 32*hero.jump);
			}
		}
		
		if(left == false){
			if(isJumping == false){
				if (heroRightReady) {
					ctx.drawImage(heroRightImage, hero.x-16, hero.y-30, 30*hero.jump, 32*hero.jump);
				}
			}else if(heroJumpReady){
				ctx.drawImage(heroJumpImage, hero.x-16, hero.y-30, 30*hero.jump, 32*hero.jump);
			}
		}
		
	}else if(moving == false){
	
		//Om hjälten står still
		if(left == true){
			if(isJumping == false){
				if(heroStillLeftReady){
					ctx.drawImage(heroStillLeftImage, hero.x-16, hero.y-30, 30*hero.jump, 32*hero.jump);
				}
			}else if(herojumpleftReady){
				ctx.drawImage(herojumpleftImage, hero.x-16, hero.y-30, 30*hero.jump, 32*hero.jump);
			}	
		}
		
		
		if(left == false){
			if(isJumping == false){
				if(heroStillRightReady){
					ctx.drawImage(heroStillRightImage, hero.x-16, hero.y-30, 30*hero.jump, 32*hero.jump);
				}
			}else if(heroJumpReady){
				ctx.drawImage(heroJumpImage, hero.x-16, hero.y-30, 30*hero.jump, 32*hero.jump);
			}
		}
	}
	
	
	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	


	
	
	// Score
    ctx.fillStyle = "rgba(100, 55, 155, 0.5)";
	ctx.fillRect(canvas.width-50,0,50,50);
	
	ctx.fillStyle = "rgba(255, 255, 255, 1)";
	ctx.font = "24px Impact";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText(monstersCaught, canvas.width-32, 10);
	
	
};


// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	
	update(delta);
	render();

	then = now;
};

//reset game to start attributes
var reset = function (){
	points = 0;
	monstersCaught = 0;
	
	hero.x = discArr[3].circleX;
	hero.y = discArr[3].circleY + 5;
	xhero = discArr[3].circleX;
	yhero = discArr[3].circleY + 5;
};

var then;
var startGame = function (){
	removeEventListener("keydown", listener, false);
	
	spawnNewMonster();
	// Let's play this game!
	reset();
	
	then = Date.now();
	var mainInterval = setInterval(main, 1); // Execute as fast as possible
}

checkStart();



