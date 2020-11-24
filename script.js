//Need to add actual toggle switch

// API REQUEST FOR LOCATION USING IP
const xhr = new XMLHttpRequest();
const url = 'http://ip-api.com/json/?fields=countryCode,regionName';

xhr.responseType = 'json';
xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let info = xhr.response;
      document.querySelector('.location').innerHTML = `In ${info.regionName}, ${info.countryCode}`;
      return
    }
}
xhr.open('GET', url);
xhr.send();


//API FOR WEATHER / CURRENT TEMP
const xhrTemp = new XMLHttpRequest();
const urlTemp = 'http://api.openweathermap.org/data/2.5/weather?q=detroit&units=imperial&appid=APIKEY';

xhrTemp.responseType = 'json';
xhrTemp.onreadystatechange = () => {
    if (xhrTemp.readyState === XMLHttpRequest.DONE) {
      let info = xhrTemp.response;
      document.querySelector('.currentTempValue').innerHTML = `${info.main.temp} F`;
      return
    }
}
xhrTemp.open('GET', urlTemp);
xhrTemp.send();


//UPDATING BACKGROUND AND OTHER QUES BASED ON TIME OF DAY
const changeBackground = () => {
  var x = new Date();
  let moon = document.querySelector(".moon");
  let sun = document.querySelector(".sun");
  var body = document.querySelector("body");
  var greeting = document.querySelector(".greeting");
  let iconAndMessage = document.querySelector(".iconAndMessage");
  let moreInfo = document.querySelector('.moreInfo');
  if (x.getHours() >= 18 || x.getHours() <= 4) {
    greeting.innerHTML = "GOOD EVENING";
    sun.style.display = "none";
    iconAndMessage.style.width = '400px';
    body.classList.remove("noon");
    body.classList.add("night");
    moreInfo.style.backgroundColor = 'black';
    moreInfo.style.color = 'white';
  } else if (x.getHours() >= 5 && x.getHours() <= 11) {
    greeting.innerHTML = "GOOD MORNING";
    sun.style.display = "inline";
    moon.style.display = "none";
    body.classList.remove("night");
    body.classList.add("morning");
  } else {
    greeting.innerHTML = "GOOD AFTERNOON";
    sun.style.display = "inline";
    moon.style.display = "none";
    body.classList.remove("morning");
    body.classList.add("noon");
  }
};


//GETTING THE CURRENT TIME FUNCTION
function display_currentTime() {
  var x = new Date();
  let minutes;
  if (x.getMinutes() < 10){
    minutes = "0" + x.getMinutes();
  } else {
    minutes = x.getMinutes();
  }
  document.querySelector(".currentTime").innerHTML = `${x.getHours()}:${minutes}`;
  display_time();
}

function display_time() {
  var refresh = 1000;
  mytime = setTimeout("display_currentTime()", refresh);
}


// GETTING THE TIMEZONE FUNCTION
const getTimezone = () => {
  let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  timezoneX = timezone.replace("_", " ");
  return timezoneX;
};


//GETTING MONTH OF THE YEAR FUNCTION
const getMonth = () => {
  var x = new Date();
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  let y = x.getMonth();
  let month = monthNames[y];
  return month;
}


//RETREIVING THE DAY OF THE WEEK
const getDay = () => {
  let day = new Date();
  let dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return dayNames[day.getDay()];
};


//GETTING RANDOM QUOTES TO POPULATE - Add refresh button to change quote? Add random generator based on time of day. add 3 quotes per day/morning/night
const getQuote = () => {
  let quote = [
    '" With the new day comes new strength and new thoughts. "',
    '" Your time is limited, so dont waste it living someone elses life. "',
    '" The way to get started is to quit talking and begin doing. "',
    '" The future belongs to those who believe in the beauty of their dreams. "',
    '" You will face many defeats in life, but never let yourself be defeated. "',
    `" Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So, throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails. Explore, Dream, Discover. "`,
    '“ Each night, when I go to sleep, I die. And the next morning, when I wake up, I am reborn. ”',
    '" The darker the night, the brighter the stars."',
    '" The moon, like a flower in heavens high bower, with silent delight sits and smiles on the night. "'
  ];
  let attribute = ["Eleanor Roosevelt", "Steve Jobs", "Walt Disney", "Eleanor Roosevelt", "Maya Angelou", "Mark Twain", "Mahatma Gandhi", "Fyodor Dostoyevsky", "William Blake"];
  let quoteChange = document.querySelector(".quote");
  let attributeChange = document.querySelector(".attribute");
  let i = Math.floor(Math.random()*9);
  quoteChange.innerHTML = quote[i];
  attributeChange.innerHTML = attribute[i];
};


//BUTTON FUNCTION TO CHANGE MORE DETAILS / LESS DETAILS
let state = false;
const getMoreDetails = () => {
  let quote = document.querySelector('.quoteAndAttribute');
  quote.classList.toggle('toggleQuoteAndAttribute');

  let background = document.querySelector('.wrapper');
  background.classList.toggle('toggleMoreInfo');

  let lessInfo = document.querySelector('.lessInfo');
  lessInfo.classList.toggle("toggleLessInfo");

  let less = document.querySelector('.buttonWord');
  if (less.innerHTML === "MORE"){
    less.innerHTML = "LESS";
  } else {
    less.innerHTML = "MORE";
  }

  let img = document.querySelector("img");
  const on = "assets/chevron-down.svg";
  const off = "assets/chevron-up.svg";
    if(state){
      img.src = off;
      state = false;
    } else{
      img.src = on;
      state = true;
    }
  }


document.querySelector(".dayOfWeekValue").innerHTML = `${getDay()}`;
document.querySelector(".currentTime").innerHTML = `${display_time()}`;
document.querySelector(".timezoneValue").innerHTML = `${getTimezone()}`;
document.querySelector(".monthValue").innerHTML = `${getMonth()}`;

changeBackground();
getQuote();
