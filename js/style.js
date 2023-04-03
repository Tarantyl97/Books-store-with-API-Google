const content = document.querySelector('.contents');
const btnBuy = document.querySelector('.new-book__btn');
const loadBtn = document.querySelector('.contents-load__btn');
const categoryBtn = document.querySelector('.navigation-sorting__btn');
const categoryList = document.querySelector('.navigation-sorting__list');
let listImg = document.querySelectorAll(".navigation-images__list  li");
let last = listImg[listImg.length - 1];

// const key = AIzaSyA33u6Vy5_rE0bumpGmDcUllKBefScJ66E;
let allBooks = [];

function Book(id, image, authors, title, stars, count, description, price) {
    this.id = id;
    this.image = image;
    this.authors = authors;
    this.title = title;
    this.stars = stars;
    this.count = count;
    this.description = description;
    this.price = price;
  }
  
  Book.prototype.render = function() {
  }

let id = 0
let startIndex = 0;
let categoryName = "harry potter";

function getBooks() {
fetch(`https://www.googleapis.com/books/v1/volumes?q=${categoryName}&key=AIzaSyA33u6Vy5_rE0bumpGmDcUllKBefScJ66E&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`)
    .then(response => response.json())
    .then(data => {
        data.items.forEach(item => {
            ++id;
            const image = item.volumeInfo.imageLinks?.thumbnail;
            const authors = item.volumeInfo.authors?.join(", ");
            const title = item.volumeInfo.title ?? "No title available";
            const stars = item.volumeInfo.averageRating ?? "No rating available";
            const count = item.volumeInfo.ratingsCount ?? "0";
            const description = item.volumeInfo.description ?? "No description available";
            const price = item.saleInfo?.retailPrice?.amount;

    let book = new Book(id, image, authors, title, stars, count, description, price);
    book.render();
    allBooks.push(book);

    let starsHtml = '';
        for (let i = 0; i < Math.round(book.stars); i++) {
            starsHtml += '<span class="star">&#9733;</span>';
        }
        for (let i = Math.round(book.stars); i < 5; i++) {
            starsHtml +=  '<span class="star">&#9734;</span>';
        }

    let bookHtml = `
      <div id="book-${book.id}" class="new-book">
          <img class="new-book__img" src="${book.image}" alt="book"/>
          <div class="new-book__main-text">
              ${book.authors ? `<p class="new-book__authors">${book.authors}</p>` : ""}
              ${book.title ? `<p class="new-book__title">${book.title}</p>` : ""}
              ${starsHtml && book.count ? `<p class="new-book__raiting">${starsHtml}, ${book.count} review</p>` : ""}
              ${book.description ? `<p class="new-book__info">${book.description}</p>` : ""}
              ${book.price ? `<p class="new-book__price">${book.price} RUB</p>` : `<p class="new-book__price">No price available</p>`}
              <button class="new-book__btn">buy now</button>
          </div>
      </div>
    `;

    content.insertAdjacentHTML('beforeEnd', bookHtml)
        });
    })
    .catch(error => {
  // обработка ошибки
    console.error(error);
    });
};

loadBtn.addEventListener('click', () => {
    startIndex += 6;
});

getBooks()

loadBtn.addEventListener('click', getBooks);

let prevBtn = null;

categoryList.addEventListener('click', (event) => {
    if(event.target.classList.contains('navigation-sorting__btn')) {
        if (prevBtn !== null) {
            prevBtn.classList.remove('navigation-sorting__btn_active');
            content.innerHTML = '';
            categoryName = event.target.textContent;
            startIndex = 0;
        };
        event.target.classList.add('navigation-sorting__btn_active');
        categoryName = event.target.textContent;
        getBooks()
        content.innerHTML = '';
        prevBtn = event.target;
    };
});

content.addEventListener('click', (event) => {
    if(event.target.classList.contains('new-book__btn')) {
        if (event.target.classList.contains('new-book__btn_active')) {
            event.target.innerHTML = 'buy now';
        } else {
            event.target.innerHTML = 'in the cart';
        }
        event.target.classList.toggle('new-book__btn_active');
    }
});

let count = 0;

content.addEventListener('click', (event) => {
  if (event.target.classList.contains('new-book__btn_active')) {
    count += 1;

    if(count > localStorage.getItem('cartCount')) {
        localStorage.setItem('cartCount', count)
    }
    const cartCount = `<div class='count'>${count}</div>`;
    last.insertAdjacentHTML('beforeEnd', cartCount);

  } else if (event.target.classList.contains('new-book__btn')) {
    if (count > 0) {
      count -= 1;
        let cartItems = document.querySelectorAll('.count');
        let lastItem = cartItems[cartItems.length - 1];
      lastItem.remove();
    }
  }
});









