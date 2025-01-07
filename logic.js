const dialog = document.getElementById("favDialog");
const listOfBooks = document.querySelector(".card-container");
const cancelButton = document.querySelector("#cancel");
const submitButton = document.querySelector("#submit");
const form = document.querySelector(".book-form");



const myLibrary = [];


function Book(title,author,numPages,read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = this.read === "Read" ? "Not read yet" : "Read";
}


function addBookToLibrary(title,author,numPages,read){
    let bookObj = new Book(title,author,numPages,read);
    myLibrary.push(bookObj);
    return bookObj;
}

function populateCard(book,card){
    const title = document.createElement("p");
    const author = document.createElement("p");
    const numPages = document.createElement("p");
    const read = document.createElement("p");
    read.setAttribute("class","setRead")

    title.textContent = book.title;
    card.appendChild(title);
    author.textContent = book.author;
    card.appendChild(author);
    numPages.textContent = book.numPages;
    card.appendChild(numPages);
    read.textContent = book.read;
    card.appendChild(read);
    
}

function updateCard(card,book){
    const read = card.querySelector(".setRead")
    read.textContent = book.read;
}


function createCard(book){
    const card = document.createElement("div")

    const deleteButton = document.createElement("button") 
    deleteButton.textContent = "Delete book from library"
    deleteButton.className = "delete-book"
    
    const changeReadStatus = document.createElement("button")
    changeReadStatus.textContent = "Toggle Read Status";
    changeReadStatus.className = "toggle-read";
    changeReadStatus.addEventListener("click", () => {
        book.toggleRead();
        updateCard(card,book);
    });
    card.appendChild(changeReadStatus);


    card.setAttribute("class","card")
    populateCard(book,card);
    card.id = book.title;
    card.appendChild(deleteButton);
    listOfBooks.appendChild(card);
    deleteButton.addEventListener("click", (e) =>{
        handleDelete(e.target)
    }); 
}



function displayBooks(){
    myLibrary.forEach((book) =>{
        createCard(book);
    });
}

const handleNewBook = function(){
    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    const numPages = formData.get("num-pages")
    const read = formData.get("read");

    const newBook = addBookToLibrary(title,author,numPages,read);
    createCard(newBook);
}

const handleDelete = function(cardButton){
    const parentId = cardButton.parentNode.id;
    const index = myLibrary.findIndex((book) =>{
        return book.title === parentId;
    });
    myLibrary.splice(index,1);
    cardButton.parentNode.remove();
}

const handleAddBookButton = function(){
    dialog.showModal();
}

addBookToLibrary("The Hobbit","JRR Tolkien",295,"Not read yet");
addBookToLibrary("Wind And Truth","Brandon Sanderson",1500,"Not read yet");
addBookToLibrary("Harry Potter and the Deathly Hallows","JK Rowling",500,"Read");





displayBooks();

const addBookButton = document.querySelector(".add-book");
addBookButton.addEventListener("click",handleAddBookButton)

cancelButton.addEventListener("click", () => {
    dialog.close();
  });

submitButton.addEventListener("click",(event)=>{
        event.preventDefault();
        handleNewBook();
        dialog.close();
})

