// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>



class Draggable {
  constructor(name, card_size, gridx, gridy) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = 0;
    this.y = 0;
    this.w = card_size;
    this.h = card_size;
    this.offsetX = 0;
    this.offsetY = 0;
    this.name = name;
    this.gridx = gridx;
    this.gridy = gridy;
    this.player1Colour = color(200, 100, 100)
    this.player2Colour = color(100, 100, 200)
    this.moveToGrid()
  }
  
  moveToGrid() {
    this.x = width/2 - this.w/2 + this.gridx*this.w
    this.y = height/2 - this.h/2 + this.gridy*this.h        
  }

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  show() {
    stroke(0);
    // Different fill based on state
    if (this.player==1) {
      fill(this.player1Colour);
    } else if (this.player==2) {
      fill(this.player2Colour);
    } else if (this.rollover) {
      fill(100);
    } else {
      fill(175, 200);
    }
    rect(this.x, this.y, this.w, this.h);
    
    push()
    noStroke()
    fill(0)
    text(this.name, this.x+this.w/2, this.y+this.h/2)
    pop()
  }

  pressed() {
    // Did I click on the rectangle?
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
    return this.dragging
  }

  released() {
    // Quit dragging
    this.dragging = false;
    
    //print(this.x+this.w)
    if (this.x+this.w < this.w*1.5)
      this.player = 1
    else if (this.x > width-this.w*1.5)
      this.player = 2
    else
      this.player = 0
  }
}