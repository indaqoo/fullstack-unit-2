
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


function addSearch(list) {
  const header = document.querySelector('.header');
  header.insertAdjacentHTML('beforeend', `
  <label for="search" class="student-search">
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>
  `)
  const search = document.getElementById('search');

  search.addEventListener('keyup', () => {
    const searchValue = search.value;
    
    const searchResult = list.filter( list => {
      let student = list;
      let fullName = `${student.name.first} ${student.name.last}`;
       if (fullName.toLowerCase().includes(searchValue.toLowerCase())) {
        return student;
       }
     });
   
     showPage(searchResult, 1);
     addPagination(searchResult);
  
  });


}

showPage(data, 1);
addPagination(data);
addSearch(data);


