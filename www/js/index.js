$(document).ready(function()
{
	$("#loadingScreen").fadeIn(3000); 
	loadingTime = setTimeout(function() 
	{
		$("body").css("background-color", "white")
		$("#loadingScreen").fadeOut({duration: 2000, queue: false});
		$("body").effect("highlight", {color: "black", queue: false}, 3000);
		$("#titleScreen").show(2000);
		clearTimeout(loadingTime);
	}, 6000);
	
	board = new GameBoard(0);
	
	countdownDisplay = document.getElementById("countdown"); 
	pieceDisplays = document.getElementsByClassName("valueHolder");
	timeDisplay = document.getElementById("timeDisplay");
	scoreDisplay = document.getElementById("scoreDisplay");
	highScoreDisplay = document.getElementById("highScoreDisplay");
	
	highScoreDisplay.innerHTML = highScore;
				
	for(var i = 0; i < board.pieces.length; i++)
	{
		pieceDisplays[i].innerHTML = board.pieces[i].value;
		pieceDisplays[i].parentElement.parentElement.setAttribute("onclick", "checkForMatch(" + i + ")");
	}	
	
	$(".startButtons").button();
	$("#againButton").button();
});	

var selectedAmount = 0;
var selectedPieces = [];
var highScoreString = "";

function checkForMatch(index)
{
	selectedAmount++;
	selectedPieces.push(index);
	pieceDisplays[index].parentElement.style.boxShadow = "0px 0px 5px #ffd700";
	
	if(selectedAmount != 2)
		return;
	
	isAMatch = board.addPieces(selectedPieces[0], selectedPieces[1]);
	
	if(isAMatch == true)
	{
		pieceDisplays[selectedPieces[0]].parentElement.style.boxShadow = "none";
		pieceDisplays[selectedPieces[1]].parentElement.style.boxShadow = "none";
		$(pieceDisplays[selectedPieces[0]].parentElement).hide("scale", {}, 500);
		$(pieceDisplays[selectedPieces[1]].parentElement).hide("scale", {}, 500);
		pieceDisplays[selectedPieces[0]].innerHTML = board.pieces[selectedPieces[0]].value;
		pieceDisplays[selectedPieces[1]].innerHTML = board.pieces[selectedPieces[1]].value;
		scoreDisplay.innerHTML = board.currentScore;
		$(pieceDisplays[selectedPieces[0]].parentElement).show("scale", {}, 500);
		$(pieceDisplays[selectedPieces[1]].parentElement).show("scale", {}, 500);
	}
	else
	{
		pieceDisplays[selectedPieces[0]].parentElement.style.boxShadow = "none";
		pieceDisplays[selectedPieces[1]].parentElement.style.boxShadow = "none";
		$(pieceDisplays[selectedPieces[0]].parentElement).effect("shake");
		$(pieceDisplays[selectedPieces[1]].parentElement).effect("shake");
	}
	
	selectedAmount = 0;
	selectedPieces.length = 0;
}

function timeFunction()
{
	board.time--;
	if(board.time > 0)
		timeDisplay.innerHTML = board.getTimeDisplay();
	else
	{
		clearInterval(timer);
		timeDisplay.innerHTML = "Out of time";
		endOfGame();
	}
}

function startGame(time)
{
	highScoreString = "highScore" + checkHighScores(time);
	
	if(localStorage.getItem(highScoreString) == null)
		highScore = 0;
	else
		highScore = localStorage.getItem(highScoreString);
	
	highScoreDisplay.innerHTML = highScore;
	board.time = time;
	document.getElementById("countdownBackground").style.zIndex = "3";
	$("#gameDisplay").show(500);
	$("#countdownBackground").show();
	$(countdownDisplay).show();
	countdownTime = 3;
	countdownTimer = setInterval(function()
	{
		if(countdownTime > 0)
		{
			countdownDisplay.innerHTML = countdownTime;
			countdownTime--;
		}
		else
			countdownDisplay.innerHTML = "GO";
	}, 1000);
	countdown = setTimeout(function()
	{
		clearInterval(countdownTimer);
		$(countdownDisplay).hide();
		document.getElementById("countdownBackground").style.zIndex = "0";
		$("#countdownBackground").hide();
		timer = setInterval(timeFunction, 1000);
	}, 4000);
	$("#titleScreen").hide(500);
}

function endOfGame()
{
	countdownDisplay.innerHTML = "3";
	
	$("#gameDisplay").hide(500);
	
	if(board.currentScore > highScore)
	{
		highScore = board.currentScore;
		localStorage.setItem(highScoreString, board.currentScore);
		highScoreDisplay.innerHTML = highScore;
	}
	
	document.getElementById("highScore").innerHTML = highScore;
	document.getElementById("finalScore").innerHTML = board.currentScore;
	$("#endStuff").show(500);
}

function restartGame()
{
	$("#titleScreen").show(500);
	board.newBoard(0);
	for(var i = 0; i < board.pieces.length; i++)
		pieceDisplays[i].innerHTML = board.pieces[i].value;
	$("#endStuff").hide(500);
	scoreDisplay.innerHTML = board.currentScore;
}

function checkHighScores(time)
{
	if(time == 16)
		return "Sanic";
	else
		if(time == 31)
			return "Fast";
	else
		if(time == 61)
			return "Slow";
	
	return "Time";
}