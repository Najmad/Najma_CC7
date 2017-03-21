//variables for time
var h

//variables for sounds
var rainSounds;
var birdSounds;
var crickets;

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
  var snow;

//coordinates for images
var images = {
  x: 50,
  y: 50,
  
  displaying: function(){
    //displays image based on conditions
  if (currentCondition == 'Overcast' || 'Scattered Clouds'){
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
    else if(currentCondition == 'Snow' || 'Light Snow' || 'Heavy Snow' || 'Snow Storms'){
     image(snow, this.x, this.y, 300, 300);
    }
    else if((h >= 7) && (h < 17) && (currentCondition == 'Partly Cloudy' || 'Mostly Cloudy' || 'Scattered Clouds')){
     image(partly, this.x, this.y, 300, 300);
    }
    else if((h <= 7) || (h >= 17) && (currentCondition == 'Partly Cloudy' || 'Mostly Cloudy' || 'Scattered Clouds')){
     image(overcast, this.x, this.y, 300, 300);
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
  snow = loadImage("images/snow.png");
  h = hour();
  //console.log(h);
  crickets = loadSound("sounds/crickets.mp3");
}

function setup() {
  loadJSON(url, gotData);
  createCanvas(400,400);
  //plays sounds based on weather conditions
  if (currentCondition == 'Rain'){
  rainSounds.play();
  } else if (currentCondition == 'Light Rain'){
  rainSounds.play();
  } else if (currentCondition == 'Heavy Rain'){
  rainSounds.play();
  } else if ((h >= 7) && (h < 17) && (currentCondition == 'Cloudy' || 'Partly Cloudy' || 'Sunny' || 'Clear')){
    birdSounds.play();
  } else  crickets.play();
  
}

//loads api weather data for NYC
function gotData(data){
  weatherData = data;
  currentTemp = weatherData.current_observation.temp_f;
  currentCondition = weatherData.current_observation.weather;
  // console.log(currentTemp)
   //console.log(currentCondition)
  wind = weatherData.current_observation.wind_mph;
  // console.log(wind)
  cityInfo = weatherData.current_observation.observation_location.city;
  // console.log(cityInfo)
  
}

function draw() {
  if ((h >= 17) || (h < 7)){
  background(0, 26, 51);  
  } else
  background(135, 206, 250);
  fill(255);
  textSize(10);
  //display city, temp, and weather conditions
  text("" + cityInfo, 20, 20);
  text("Temperature: " + currentTemp, 20, 30);
  text("Conditions: " + currentCondition, 20, 40);
  text("Wind: " + wind + "mph", 20, 50);
  images.displaying();
  images.windy();
  
  
}
