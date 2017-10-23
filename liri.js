// Load the NPM Package inquirer
var inquirer = require("inquirer");
//******************

//Store dependencies in global variables

var keys = require("./keys.js"); 

var spotify = require("spotify");
var request = require("request");
var fs = require("fs");



//******************




var service;
var serviceData;
//var serviceDataArray = [];
var movieTitle;
var musicService;
var massageLocation;

var stdA;
var stdB;


/*function wrapInquire(){*/
// Create a "Prompt" with a series of questions.

inquirer
.prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "Hi good looking, What is your first name?",
      name: "username"
    },
    // Here we give the user a list to choose from.
    {
      type: "list",
      message: "Which service are you looking to enjoy?",
      choices: ["movie", "massage", "music"],
      name: "serviceChoice"
    },
    // Here we ask the user to confirm.
    {
      type: "input",
      message: "Ahh, oui oui, a movie?  Type the title, and I'll retrieve it: ",
      name: "movieTitle",
      when: function(answers){
        return answers.serviceChoice === "movie";
      }
    },
    {
      type: "input",
      message: "Ahh, oui oui, a massage?  What city are you in now? ",
      name: "massageLocation",
      when: function(answers){
        return answers.serviceChoice === "massage";
      }
    },
    {
      type: "input",
      message: "La-La-La-La-La...",
      name: "musicService",
      when: function(answers){
        return answers.serviceChoice === "music";
      }
    },
    // Here we ask the user to confirm.
    {
      type: "confirm",
      message: "Are you sure?",
      name: "confirm",
      default: true
    }
    ])
.then(function(inquirerResponse) {
   // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
   if (inquirerResponse.confirm) {

    if (inquirerResponse.serviceChoice==='movie') {
      serviceChoice = inquirerResponse.serviceChoice;
      serviceData = inquirerResponse.movieTitle;
    }
    else if (inquirerResponse.serviceChoice==='massage') {
      service = inquirerResponse.serviceChoice;
      serviceData = inquirerResponse.massageLocation;
    }
    else if (inquirerResponse.serviceChoice==='music') {
      serviceChoice = inquirerResponse.serviceChoice;
      serviceData = "music keys";
    }

    var serviceChoice = inquirerResponse.serviceChoice;
    var serviceData = inquirerResponse.movieTitle;
    console.log("\nWelcome " + inquirerResponse.username);
    console.log();
    console.log("Your VIP " + inquirerResponse.serviceChoice + " service will be ready for you in a jiffy!\n");
    console.log();
    console.log("Spanish: uno segundo mas por favor!");
    console.log();
    console.log("Japanese: ato ichi byou dake no de, mo sukoshi omachi kudasai!");
    console.log();
    console.log(" m(_ _)m ");
    console.log();
    console.log("It will be worth your wait;)");
    console.log();
    console.log(" ^_^/` ");      

//      B1(serviceChoice, serviceData);
masterSwitch(serviceChoice, serviceData);
}
else {
  console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
}
});

//B1("movie", "terminator", B2());

//B1("movie", "terminator");

//function B1(paramA, paramB, callback) {
/*
function B1(paramA, paramB) {
  stdA=paramA;
  console.log("In B1 stdA: " + stdA);
  stdB=paramB;
  console.log("In B1 stdB: " + stdB);
  B2(stdA,stdB);
}
*/

//////////////////////////////////////////
//START SWITCH CODE BLOCK////////////////////
//////////////////////////////////////////
function masterSwitch(serviceChoice, serviceData){
  console.log("masterSwitch() called");
  console.log("In masterSwitch() serviceChoice: " + serviceChoice);
  console.log("In masterSwitch() serviceData: " + serviceData);
  switch (serviceChoice) {

    case "movie":
    console.log("You chose the VIP movie service!")
    movie(serviceData);
    break;

    case "massage":
    console.log("You chose the VIP massage service!")    
    massage(serviceChoice, serviceData);
    break;

    case "music":
    console.log("You chose the VIP music service!")
    spotifyNow(serviceChoice, serviceData);
    break;
  }
}


//////////////////////////////////////////
//END SWITCH CODE BLOCK////////////////////
//////////////////////////////////////////


//////////////////////////////////////////
//START MOVIE CODE BLOCK////////////////////
//////////////////////////////////////////

function movie(serviceData){
  console.log("at the movie function now")

var serviceDataArray = [];
console.log(serviceDataArray);
serviceDataArray.push('nodeJsResevred1');
serviceDataArray.push('nodeJsResevred1');
console.log(serviceDataArray);
Array.isArray(serviceDataArray);

console.log("passed the serviceDataArray type test.");

var str = serviceData.trim();
//var str = "'"+serviceData.trim()+"'";
var cServiceData = str.replace(" ", ",");
//var cServiceData = str.replace(" ", "', '");
console.log("cServiceData: " + cServiceData + typeof(cServiceData));
console.log();
serviceDataArray.push(cServiceData);
Array.isArray(serviceDataArray);
console.log();
console.log("serviceDataArray[1]: " + serviceDataArray[1]);

/*
  if(serviceData === undefined){
//    movieSearch = "mr+nobody";
request("http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&apikey=40e9cece",function(error, response,body){
  console.log(body);
})
}  

else{
*/

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
//var request = require("request");

// Store all of the arguments in an array
//var nodeArgs = process.argv;
var nodeArgs = serviceDataArray;
// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
//KS note--b/c the process.argv above sets nodeArgs equal to an array of all the parameters/words input 
//on the command line including the first two which are always taken by the keayword node and the filename..
//so a three word title would have 5 arguments..so this sets the starting point at the 3rd index address (hence "2") of the 
//array.. the array length is 5 so the loop will increment the index up to 5 minus 1 or i<5.   
for (var i = 2; i < nodeArgs.length; i++) {
//if i is greateer than index 2 it's starting point and less than index 5 then perfrom the next block
//so for indeces of 3 and 4.. so movieName was initiated in the else piece of this code.  Then it adds a "+"
//and the next parameter (which is nodeArgs[3] and repeats again for nodeArgs[4])
if (i > 2 && i < nodeArgs.length) {

  movieName = movieName + "+" + nodeArgs[i];

}

else {
//this starts the movieName by setting index 2 parameter as movieName first, then the conditional block of 
//the for loop takes over. 
movieName += nodeArgs[i];

}
}

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors & Actresses: " + JSON.parse(body).Actors);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
    console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
  }
});

//}
}


//////////////////////////////////////////
//END MOVIE CODE BLOCK////////////////////
//////////////////////////////////////////
