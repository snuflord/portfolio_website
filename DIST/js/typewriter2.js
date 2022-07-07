const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = ''; // the full word
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method. A JavaScript method is a property of an object that contains a function definition. Methods are functions stored as object properties.

TypeWriter.prototype.type = function() {
    // current index of word - the % operator returns the remainder of two numbers. 
    const current = this.wordIndex % this.words.length;
    // get full text of current word
    const fulltxt = this.words[current];
    // check if deleting
    if(this.isDeleting) {
        // remove char
        this.txt = fulltxt.substring(0, this.txt.length - 1);
    } else {
        // add character
        this.txt = fulltxt.substring(0, this.txt.length + 1);
    }
    // insert txt into element (the html span)

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

    // Initial type speed
    let typeSpeed = 200;

    if(this.isDeleting) {
        typeSpeed /= 2; // divide typespeed by 2 (100 ms)
    }

    // check to see if word is complete

    if(!this.isDeleting && this.txt === fulltxt) { //if the word is not deleting and the text is full:
        //make pause at end of complete word
        typeSpeed = this.wait;
        // set delete to true
        this.isDeleting = true;
     } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // move to next word
        this.wordIndex++;
        // pause before start typing new word
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed)
}

// Initialise on DOM load

document.addEventListener('DOMContentLoaded', init);

// initiate app

function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Initialise typewriter
    new TypeWriter(txtElement, words, wait);
}



