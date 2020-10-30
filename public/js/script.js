/*
  This function loops trought defined array and display's each
  students information as a list item.
*/

function showPage(list, page) {
  let startIndex = (page * 9) - 9;
  let endIndex = page * 9;
  const ul = document.querySelector('.student-list');
  ul.innerHTML = "";
  for( let i = 0; i < list.length ; i++ ) {
    if ( i >= startIndex && i < endIndex) {
      ul.insertAdjacentHTML('beforeend', `
        <li class="student-item cf">
            <div class="student-details">
              <img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture">
              <h3>${list[i].name.first} ${list[i].name.last}</h3>
              <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
              <span class="date">Joined ${list[i].registered.date}</span>
            </div>
          </li>
      `);
    }
  }
}


/*
  this function counts how many page buttons 
  it should add from defined array
*/

function addPagination(list) {
  const pageCount = Math.ceil(list.length / 9);
  const ul = document.querySelector('.link-list');
  ul.innerHTML = "";

  for ( let i = 0 ; i < pageCount ; i++ ) {
    ul.insertAdjacentHTML('beforeend', `
      <li>
        <button type="button">${i + 1}</button>
      </li>
    `);
  }

  const buttons = document.querySelectorAll('.link-list button');
  buttons[0].classList.add('active');


  /* 
    This Event Listener listen's for a click event.
    if clicked on page button then add a class "active" to clicked button
  */

  ul.addEventListener('click', (event) => {
    const button = event.target;
    const page = button.textContent;

    if (button.nodeName === "BUTTON" ) {

      buttons.forEach(function(button){
        button.classList.remove('active');
      });

      button.classList.add("active");
      showPage(list, page);
    }

  });

};

/*
  This function adds a search bar and uses ES6 filter function to chech if search value 
  is = to any student from defined array and creates a new array with matches and pushes those matches to new array.
*/
function addSearch(list) {
  const header = document.querySelector('.header');
  header.insertAdjacentHTML('beforeend', `
  <label for="search" class="student-search">
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>
  `)
  const search = document.getElementById('search');
  const searchButton = document.querySelector(`[type="button"]`);

  /* 
    currently it's realtime search.
    But to test the button click search. we need to change only 2 things (click event, target element) .

    from 
    
    search.addEventListener('keyup'

    to

    searchButton.addEventListener('click'
  */

  search.addEventListener('keyup', () => {
    const searchValue = search.value.toLowerCase();

    const searchResult = list.filter( list => {
      let fullName = `${list.name.first} ${list.name.last}`;
      if (fullName.toLowerCase().includes(searchValue)) {
        return list;
      };
    });


    /* 
      if there is no data in searchResult array then display error message.
      else show students and page count
    */

    if (searchResult.length === 0) {
      const html = `<div class="error"><h3>Sorry, No match was fond :(</h3></div>`;
      document.querySelector('.link-list').innerHTML = html;
      document.querySelector('.student-list').innerHTML = "";;
    } else {
      showPage(searchResult, 1);
      addPagination(searchResult);
    };

  });

}

// calling all functions

showPage(data, 1);
addPagination(data);
addSearch(data);
