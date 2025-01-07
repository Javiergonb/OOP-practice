const listOfBooks = document.querySelector(".card-container");



const myLibrary = [];


function Book(title,author,numPages,read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;

    this.info = function(){
        return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.read}`;
    }
}


function addBookToLibrary(title,author,numPages,read){
    let bookObj = new Book(title,author,numPages,read);
    myLibrary.push(bookObj);
}

function createCard(book){
    const card = document.createElement("div")
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete book from library"
    deleteButton.className = "delete-book"
    card.setAttribute("class","card")
    card.textContent = book.info();
    card.id = book.title;
    card.appendChild(deleteButton);
    listOfBooks.appendChild(card);
}



function displayBooks(){
    myLibrary.forEach((book) =>{
        createCard(book);
    });
}

const handleDelete = function(cardButton){
    const parentId = cardButton.parentNode.id;
    const index = myLibrary.findIndex((book) =>{
        return book.title === parentId;
    });
    myLibrary.splice(index,1);
    cardButton.parentNode.remove();
}

addBookToLibrary("The Hobbit","JRR Tolkien",295,"not read yet");
addBookToLibrary("Wind And Truth","Brandon Sanderson",1500,"not read yet");
addBookToLibrary("Harry Potter and the Deathly Hallows","JK Rowling",500,"read");





displayBooks();
let deleteButtons = document.querySelectorAll(".delete-book");
deleteButtons.forEach((button) =>{
    button.addEventListener("click", (e) =>{
        handleDelete(e.target)
    });
});

