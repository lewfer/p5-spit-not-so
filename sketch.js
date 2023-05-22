// Objects we need to store cards
cardDetails = [{name:"spit",gridx:0,gridy:0},
               {name:"not", gridx:-1,gridy:-1},
               {name:"fat", gridx:1, gridy:1},
               {name:"pan", gridx:1, gridy:-1},
               {name:"fop", gridx:-1, gridy:1},
               {name:"as",  gridx:1, gridy:0},
               {name:"if",  gridx:0, gridy:1},
               {name:"in",  gridx:0, gridy:-1},
               {name:"so",  gridx:-1, gridy:0}]
cards = []
cardsByLetter = {a:[], i:[], f:[], o:[], p:[], n:[], s:[], t:[]}
cardsByName = {}
letters = "aifopnst"
card_size = 100

// Text displayed when a player wins
winText = ""

gridMode = false


function setup() {
  createCanvas(800, 800);
  
  textAlign(CENTER, CENTER);
  textSize(36);  
  
  // Make all the cards
  for (let i=0; i<cardDetails.length; i++) {
    makeCard(cardDetails[i])
  }

  if (!gridMode)
    placeRandomly()
}




function draw() {
  background(220);
  
  // Player lines
  fill(0)
  text("Player 1", card_size*1.5/2, 100)
  text("Player 2", width-card_size*1.5/2, 100)
  line(card_size*1.5, 0, card_size*1.5, height)
  line(width-card_size*1.5, 0, width-card_size*1.5, height)

  // Display winner
  text(winText, width/2, 100)

  if (gridMode)
    drawGrid()
  
  // Check for drag
  for(var i = 0; i < cards.length; i++) {
    var card = cards[i];
    card.over();
    card.update();
    card.show();    
  }
}

// Check for dragged card
function mousePressed() {
  for(var i = cards.length-1; i >= 0; i--) {
    var card = cards[i];
    if (card.pressed())
      break
  }
}

// Check for dropped card
function mouseReleased() {
  for(var i = 0; i < cards.length; i++) {
    var card = cards[i];
    card.released();  
  }
  checkWins()
}

// Check for key pressed
function keyPressed() {
  if (key == 'x') {
    print("Arrange in grid")
    gridMode = true
    placeInGrid()
  } else if (key == 'r') {
    print("Arrange randomly")
    gridMode = false
    placeRandomly()
  }  
}
  
// Randomise the position of the cards
function placeRandomly() {
  for(var i = 0; i < cards.length; i++) {
    var card = cards[i];
    card.x = random(card_size*2, width-card_size*3)
    card.y = random(card_size, height-card_size)
    card.player = 0
  }
}

// Place the cards in a grid
function placeInGrid() {
  for (let i=0; i<cards.length; i++) {
    let card = cards[i]
    card.moveToGrid()
    card.player = 0
  }
}

// Make a card with the given name
function makeCard(details) {
  //let x = width/2 - card_size/2 + details.gridx*card_size
  //let y = height/2 - card_size/2 + details.gridy*card_size
  card = new Draggable(details.name, card_size, details.gridx, details.gridy)
  cards.push(card)  
  for (var i = 0; i < details.name.length; i++) {
    cardsByLetter[details.name.charAt(i)].push(card)
  }  
  cardsByName[name] = card
}

  
// Check if a player has won
function checkWins() {
  player1 = ""
  player2 = ""
  
  // Get all the letters for all the cards each player has
  for(var i = 0; i < cards.length; i++) {
    var card = cards[i];
    if (card.player==1)
      player1 += card.name
    else if (card.player==2)
      player2 += card.name
    
    //print(player1, player2)
  }
    
  // Find if we have 3 of anything
  winText = ""
  for (var j = 0; j < letters.length; j++) {
    letter = letters.charAt(j)
    let re = new RegExp(letter,'g')
    
    var count = (player1.match(re) || []).length;
    if (count==3) {
      print("Game Over")
      winText = "Player 1 wins with " +  letter
    }

    count = (player2.match(re) || []).length;
    if (count==3) {
      print("Game Over")      
      winText = "Player 2 wins with " +  letter
    }
  }
}

// Draw the 0x0 grid
function drawGrid() {
  // Draw grid lines
  push()
  strokeWeight(5)
  translate(width/2-card_size*1.5, height/2-card_size*1.5)
  w = card_size;
  h = card_size;
  line(w, 0, w, card_size*3);
  line(w * 2, 0, w * 2, card_size*3);
  line(0, h, card_size*3, h);
  line(0, h * 2, card_size*3, h * 2);
  pop()
  
  // Draw grid words
  push()
  noStroke()
  translate(width/2, height/2)
  for (let i=0; i<cards.length; i++) {
    let card = cards[i]
    let x = card.gridx*card_size
    let y =  card.gridy*card_size
    if (card.player==1)
      fill(card.player1Colour)
    else if (card.player==2)
      fill(card.player2Colour)
    else 
      fill(0)
    text(card.name, x, y)
  }
  pop()
}



