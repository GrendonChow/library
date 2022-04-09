let myLibrary = [];

function Book(index, title, author, pages, read) {
    this.index = index;
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read;
}

Book.prototype.toggleRead = function()
{
    this.read = !this.read;
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
        form.reset();
    }
}

function addBookToLibrary(e) {
    e.preventDefault(); //Needed to stop from from submitting
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
    return new Book(myLibrary.length, title,author,pages,read);
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
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    readBtn.classList.add("read-button");
    removeBtn.classList.add("remove-button");
    removeBtn.textContent = "Remove";

    //Stores the myLibrary index of a book card as an attribute
    card.setAttribute('data-index', myLibrary.length);

    //Sets read toggle function
    readBtn.onclick = function(){
        book.toggleRead();
        if(book.read){
            card.classList.remove('unread-card')
            card.classList.add('read-card')
            readBtn.textContent = "Read";
        }
        else{
            card.classList.remove('read-card')
            card.classList.add('unread-card');
            readBtn.textContent = "Unread";
        }
    }
    //Uses the index to remove card.
    removeBtn.onclick = function(){
        removeCard(card.getAttribute('data-index'));
    }

    //Sets read/unread style
    if(book.read){
        card.classList.add('read-card');
        readBtn.textContent =  "Read";
    }
    else{
        card.classList.add('unread-card');
        readBtn.textContent =  "Unread";
    }
    title.style.fontStyle = "italic";
    title.textContent =  "\"" + book.title + "\"";
    author.textContent = 'by ' +book.author;
    pages.textContent = book.pages + ' pages';

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(readBtn);
    card.appendChild(removeBtn);
    content.appendChild(card);
}

//Removes card based on data-index
function removeCard(index){
    myLibrary.splice(index-1, 1)
    displayBooks();
}

//Default books
myLibrary.push(new Book(myLibrary.length, 'Awesome book', 'John Smith', 1204, true))
myLibrary.push(new Book(myLibrary.length, 'A Very Boring Tale', 'A.J Stevens', 543, false))

displayBooks();