//variables for sounds
var rainSounds;
var birdSounds;

//variables storing weather data
var weatherData;
var url = 'http://api.wunderground.com/api/e97b5b645152e607/conditions/q/10001.json';
var currentTemp;
var currentCondition;
var wind;
var cityInfo;

//variables for images
  var overcast;
  var rain;
  var heavy;
  var sunny;
  var clearsky;
  var partly;

//coordinates for images
var images = {
  x: 100,
  y: 150,
  
  display: function(){
    //displays image based on conditions
  if (currentCondition == 'Overcast'){
  image(overcast, this.x, this.y, 300, 300); 
  } else if(currentCondition == 'Rain') {
    image(rain, this.x, this.y, 300, 300);
   } else if(currentCondition == 'Heavy Rain'){
     image(heavy, this.x, this.y, 300, 300);
    } else if(currentCondition == 'Light Rain'){
     image(rain, this.x, this.y, 300, 300);
    }
    else if(currentCondition == 'Clear'){
     image(clearsky, this.x, this.y, 300, 300);
    } else if(currentCondition == 'sunny'){
     image(sunny, this.x, this.y, 300, 300);
    }
    else if(currentCondition == 'Partly Cloudy'){
     image(partly, this.x, this.y, 300, 300);
    }
    else if(currentCondition == 'Mostly Cloudy'){
     image(partly, this.x, this.y, 300, 300);
    }
  },
  
  //determines movement based on wind
  windy: function(){
   this.x += random(-[wind], wind);
   this.y += random(-[wind], wind);

  }
}

function preload(){
  overcast = loadImage("images/overcast.png");
  rain = loadImage("images/rain.png");
  heavy = loadImage("images/heavy.png");
  clearsky = loadImage("images/clearsky.png");
  sunny = loadImage("images/sunny.png");
  rainSounds = loadSound("sounds/rainsounds.mp3");
  birdSounds = loadSound("sounds/birdsounds.mp3");
  partly = loadImage("images/partly.png");
}

function setup() {
  loadJSON(url, gotData);
  createCanvas(500,500);
  //plays sounds based on weather conditions
  if (currentCondition == 'Rain'){
  rainSounds.play();
  } else if (currentCondition == 'Light Rain'){
  rainSounds.play();
  } else if (currentCondition == 'Heavy Rain'){
  rainSounds.play();
  } else 
    birdSounds.play();
  
  
}

//loads api weather data for NYC
function gotData(data){
  weatherData = data;
  currentTemp = weatherData.current_observation.temp_f;
  currentCondition = weatherData.current_observation.weather;
  // console.log(currentTemp)
   console.log(currentCondition)
  wind = weatherData.current_observation.wind_mph;
  // console.log(wind)
  cityInfo = weatherData.current_observation.observation_location.city;
  // console.log(cityInfo)
  
}

function draw() {
  background(135, 206, 250);
  fill(255);
  textSize(10);
  //display city, temp, and weather conditions
  text("" + cityInfo, 20, 20);
  text("Temperature: " + currentTemp, 20, 30);
  text("Conditions: " + currentCondition, 20, 40);
  text("Wind: " + wind + "mph", 20, 50);
  images.display();
  images.windy();
  
  
}

