
'use strict';

var tinderContainer = document.querySelector('.tinder');
var allCards = document.querySelector('.tinder--cards');
var cardDivs = document.querySelectorAll('.tinder--cards');
var nope = document.getElementById('nope');
var love = document.getElementById('love');
var apiKey = 'APmEif8JXbXLZVpdykjkAzc4UqAz4VO3WujGA9Tf'
var requestUrl = 'https://api.watchmode.com/v1/genres/?apiKey=APmEif8JXbXLZVpdykjkAzc4UqAz4VO3WujGA9Tf'
var submit = document.querySelector("#startbtn")
var genreForm = document.getElementById("genre-form")
var genreBox = document.getElementById("genre-box")
var swipeCards = document.querySelector('.swipe')
var select = document.getElementById("genres")
let movies = []
var lovedList = document.querySelector('lovedList')

var action = document.querySelector(".action")
var anime = document.querySelector(".anime")
var comedy = document.querySelector(".comedy")
var documentary = document.querySelector(".documentary")
var scienceFiction = document.querySelector(".science-fiction")
var horror = document.querySelector(".horror")
var thriller = document.querySelector(".thriller")
var drama = document.querySelector(".drama")
var western = document.querySelector(".western")
var adventure = document.querySelector(".adventure")
var musical = document.querySelector(".musical")
var genre = document.getElementById("genre_title").value;
var yes = document.getElementById("yes")
var no = document.getElementById("no")
var na = document.getElementById("na")



var actionInput = document.querySelector(".actionMovies")
var animeInput = document.querySelector(".animeMovies")
var comedyInput = document.querySelector(".comedyMovies")
var documentaryInput = document.querySelector(".documentaryMovies")
var sciFiInput = document.querySelector(".sciFiMovies")
var horrorInput = document.querySelector(".horrorMovies")
var thrillerInput = document.querySelector(".thrillerMovies")
var dramaInput = document.querySelector(".dramaMovies")
var westernInput = document.querySelector(".westernMovies")
var adventureInput = document.querySelector(".adventureMovies")
var musicalInput = document.querySelector(".musicalMovies")

var button = document.querySelector("#startbtn")



// function gives platform of given title 
function getStreaming(title, titleId) {
  fetch(`https://api.watchmode.com/v1/title/${titleId}/sources/?apiKey=APmEif8JXbXLZVpdykjkAzc4UqAz4VO3WujGA9Tf`)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)
      // create cards and placement for info.
      const card = document.createElement('div')
      card.classList.add('tinder--card')
      const movieImage = document.createElement('img')
      movieImage.setAttribute('src', './assets/img/finding-flix.png')
      const h3 = document.createElement('h3')
      h3.textContent = title
      const sub = document.createElement('p')
      sub.textContent = 'Available on: '
      data.forEach(function (item) {
        let p = document.createElement('p')
        p.textContent = item.name
        sub.appendChild(p)
      })
// attach items to cards
      card.appendChild(movieImage)
      card.appendChild(h3)
      card.appendChild(sub)
      allCards.appendChild(card)
    })
}
// function gives list of titles based on genre selected 
function getAPI(data) {
  fetch(`https://api.watchmode.com/v1/list-titles/?apiKey=APmEif8JXbXLZVpdykjkAzc4UqAz4VO3WujGA9Tf&genres=${data}&limit=5`)
    .then(function (response) {
      return response.json()

    }).then(function (data) {
      console.log(data)
      data.titles.forEach(function (title) {
        getStreaming(title.title, title.id)
      })
      console.log(data.titles[1].title)
      console.log(data.titles)
    })

}

function initCards(card, index) {

  var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

  newCards.forEach(function (card, index) {
    card.style.zIndex = cardDivs.length - index;
    card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
    card.style.opacity = (10 - index) / 10;
  });
}

tinderContainer.classList.add('loaded');

cardDivs.forEach(function (el) {
  var hammertime = new Hammer(el);

  hammertime.on('pan', function (event) {
    el.classList.add('moving');
  });

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  hammertime.on('panend', function (event) {
    el.classList.remove('moving');
    tinderContainer.classList.remove('tinder_love');
    tinderContainer.classList.remove('tinder_nope');

    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    event.target.classList.toggle('removed', !keep);

    if (keep) {
      event.target.style.transform = '';
    } else {
      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
      initCards();
    }
  });
});

function createButtonListener(love) {
  return function (event) {
    var cards = document.querySelectorAll('.tinder--card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) return false;
  let array = []
    var card = cards[0];
    console.log(cards[0].children[1].innerHTML)

    card.classList.add('removed');

    if (love) {
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
      
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    }

    initCards();

    event.preventDefault();
    
    console.log("is this the right function")
  };
}

var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);

nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);

function togglehide() {
  if (swipeCards.style.display === "none") {
    swipeCards.style.display = "block"

  }


};

function handleFormSubmit(event) {

}

// function to get 'loved' items
function saveLoved() {
  let val = document.querySelector('input').value

  let loves = JSON.parse(localStorage.getItem('')) || [];

  loves.push(val)
  localStorage.setItem('val', JSON.stringify((loves)))
}
// saveLoved()

localStorage.setItem('love', love)
console.log(localStorage.getItem('love'))

// function to display localstorage
// function seeLovedMovies(val) {
//   var heartBlock = document.getElementById("lovedList")
//   heartBlock.textContent=loves
// lovedList.append(heartBlock);
// console.log(seeLovedMovies)
// }
// document.getElementById('userIn').onclick = function(){
//   var answers = document.getElementsByName('answer')
//   for (var answer of answers)
//   {
//     if(answers.checked){
//       alert(answer.value)
//     }
//   }
// }

// get data for user to use later
function myFunction(event){
  event.preventDefault
 let testing = document.querySelector('input[name="answer"]:checked').value;
 console.log(testing)
 localStorage.setItem('selection', testing)
//  alert(testing)
 
  // var genre = document.getElementById("genre_title").value;
  // var yes = document.getElementById("yesAnswer").value;
  // var no = document.getElementById("noAnswer").value;
  // var na = document.getElementById("naAnswer").value;
  // var answers = document.getElementsByName('answer')
  // for (i=0;i<answers.length;i++){
  //   if (answers[i].checked){
  //     let result = answers[i]
  //     console.log(answers)
  //   }
    
  
  // }
  // console.log(answers)
  // var userForm = document.getElementById('user')
  // console.log(userForm.value)
//   // localStorage.setItem('Your fav genre?',' '); 
 }
// get the info 


genreForm.addEventListener('submit', function (event) {
  event.preventDefault()

  console.log(genres.value)
  let genre = genres.value
  getAPI(genre)
  togglehide();
}

);
console.log(genreForm)
saveLoved()


