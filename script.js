let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read;
}

const content = document.querySelector(".content");
const modal = document.querySelector('.form-modal');
const newBookBtn = document.querySelector('.new-book-button');
const form = document.querySelector("form");

form.onsubmit = addBookToLibrary;

newBookBtn.onclick = function(){
    modal.style.visibility = "visible";
}

window.onclick = function(event){
    if(event.target == modal){
        modal.style.visibility = "hidden";
    }
}

function addBookToLibrary(e) {
    e.preventDefault();
    var newBook = getBookData();
    myLibrary.push(newBook);
    displayBooks();
    modal.style.visibility = "hidden";
    form.reset();
}

//Gets the book data from form
function getBookData(){
    title = document.getElementById('title').value;
    author = document.getElementById('author').value;
    pages = document.getElementById('pages').value;
    read = document.getElementById('read').checked;
    console.log(read);
    return new Book(title,author,pages,read);
}

function displayBooks(){
    content.innerHTML = '';
    myLibrary.forEach(book => {
        createCard(book);
    });
}

//Used to create html element and add card information.
function createCard(book){
    const card = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('p');

    if(book.read){
        card.classList.add('read-card');
        read.textContent =  "Read";
    }
    else{
        card.classList.add('unread-card');
        read.textContent =  "Unread";
    }

    title.textContent =  "\"" + book.title + "\"";
    author.textContent = 'by ' +book.author;
    pages.textContent = book.pages + ' pages';

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    content.appendChild(card);
}

//Default books
myLibrary.push(new Book('Awesome book', 'John Smith', 1204, true))
myLibrary.push(new Book('A Very Boring Tale', 'A.J Stevens', 543, false))

displayBooks();