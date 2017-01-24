var Piece = function(val)
{
	this.value = val;
}

var GameBoard = function(seconds)
{
	this.pieces = [];
	
	for(var i = 0; i < 16; i++)
	{
		this.pieces.push(new Piece(Math.floor(Math.random() * 9 + 1)));
	}

	this.time = seconds;	
	this.currentScore = 0;
	this.SUM = 10;
}

GameBoard.prototype.addPieces = function(index1, index2)
{
	if(this.pieces[index1].value + this.pieces[index2].value == this.SUM && index1 != index2)
	{
		this.currentScore += 10;
		temp = Math.floor(Math.random() * this.pieces.length);
		
		while(temp == index1)
			temp = Math.floor(Math.random() * this.pieces.length);
		this.pieces[index1].value = 10 - this.pieces[temp].value;
		
		this.pieces[index2].value = Math.floor(Math.random() * 9 + 1);
		
		return true;
	}
	
	return false;
}

GameBoard.prototype.getTimeDisplay = function()
{
	output = "Time Left: ";
    seconds = this.time;
            
    output += seconds;
        
        
    return output;
}
GameBoard.prototype.switchDifficulty = function(seconds)
{
    this.time = seconds;
}

GameBoard.prototype.newBoard = function(seconds)
{
	for(var i = 0; i < this.pieces.length; i++)
			this.pieces[i].val = Math.floor(Math.random() * 9 + 1);
	this.time = seconds;
	this.currentScore = 0;
}