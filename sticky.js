// Gluey Jots
// Simple notes app with search bar, using local storage


function addLoadEvent(func) {

  let oldOnload = window.onload;
  if (typeof(oldOnload) !== "function") {
    window.onload = func;
  } else {
    window.onload = function() {
      oldOnload();
      func();
    }
  }
}


function addJot(title, text) {

  // Get DOM elements
  let jot = document.getElementsByClassName('jot-0')[0];
  let js = document.getElementById('jot-surface');
  
  // Clone node, change class so visible and add to surface
  let newJot = jot.cloneNode(true);
  newJot.className = 'jot';

  // Add title and text if any
  if (title && text) {
    let jt = newJot.getElementsByClassName('jot-title')[0];
    let jc = newJot.getElementsByClassName('jot-content')[0];
    jt.innerHTML = title;
    jc.innerHTML = text;
  }

  // Add node to jots surface
  let firstNote = document.getElementsByClassName('jot')[0];
  js.insertBefore(newJot, firstNote);

  // Add delete listener
  let db = newJot.getElementsByClassName('jot-delete')[0];
  db.addEventListener('click', deleteJot);
}


function deleteJot(e) {

  let js = document.getElementById('jot-surface');
  let el = e.target.parentNode.parentNode;
  js.removeChild(el);
  saveJots();
  e.preventDefault();
}


function saveJots() {

  // Get elements
  let jots = document.getElementsByClassName('jot');
  let jotsArr = [];
  
  // Iterate for title and text, push to array
  for (let i = 0; i < jots.length; i++) {
    let title = jots[i].getElementsByClassName('jot-title')[0].firstChild.nodeValue;
    let text = jots[i].getElementsByClassName('jot-content')[0].firstChild.nodeValue;
    let jot = {
      "title": title,
      "text": text
    };

    // Send title and text to array
    jotsArr.unshift(jot);
  }

  // Save array to storage as string
  localStorage.setItem("jots", JSON.stringify(jotsArr));
}


function fetchJots() {

  // Get jots from storage and parse
  let jots = JSON.parse(localStorage.getItem('jots'));
  let jotInt = 120;
  
  // Add each jot to document
  for (let i = 0; i < jots.length; i++) {
    let title = jots[i].title;
    let text = jots[i].text;

    // Modest throttle so users can see updating
    setTimeout(() => {
      addJot(title, text);      
    }, i * jotInt);
  }
}

function searchMessages(term) {

  let str = term.value.toUpperCase();

  // Get messages as array
  let jots = document.getElementsByClassName('jot-title');
  let ja = "";

  // Check each title against search term
  for (let k = 0; k < jots.length; k++) {
    ja = jots[k].firstChild.nodeValue;
    let strClean = ja.replace(/[^0-9a-zA-Z\xC0-\xFF \-]/g, '').toUpperCase();
    let condition = strClean.indexOf(str) > -1;

    // Display or not
    if (!condition) {
      jots[k].parentNode.parentNode.style.display = 'none';
    } else {
      jots[k].parentNode.parentNode.style.display = '';
    }
  }
}


// Event Listeners
function addNewJotListener() {
  let addBtn = document.getElementById('add-jot');
  addBtn.addEventListener('click', addJot);
}

function addSaveListener() {
  let saveBtn = document.getElementById('jot-save');
  saveBtn.addEventListener('click', saveJots);
}

function addSearchListener() {
  let searchInput = document.getElementById('search-messages');
  searchInput.addEventListener('input', () => searchMessages(searchInput));
}


// Load Events
addLoadEvent(addNewJotListener);
addLoadEvent(addSaveListener);
addLoadEvent(addSearchListener);
addLoadEvent(fetchJots);