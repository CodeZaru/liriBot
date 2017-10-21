//Store dependencies in global variables
var keys = require("./keys.js"); 
var inquirer = require("inquirer");
var spotify = require("spotify");
var request = require("request");/**From the OMDB exercise**/
var fs = require("fs");

//Inform the user what to type
//console.log("Please Type: spotify-song, movie-please, or instructions-please.");

// Prompt the user to provide information.
inquirer.prompt([

{
  type: "input",
  name: "userInput",
  message: "Please Type a Request: play-song, play-movie, or instructions-please."
}
// After the prompt, store the user's response in a variable called movieTitle.
]).then(function(liriRequest) {

 console.log(liriRequest.userInput);



//process.argv[2] = the action specified by the user
/*var userCommand = process.argv[2];*/
//process.argv[3] = is the search parameter
//var search = process.argv[3];



//Like the Bank Exercise, created a switch to handle which action to execute
//function masterController(){
  switch (liriRequest.userInput) {

    case "play-song":
    spotifyNow();
    break;

    case "play-movie":
    movie();
    break;

    case "instructions":
    seeDirections();
    break;
  }
})


//////////////////////////////////////////
//START SPOTIFY CODE BLOCK////////////////////
//////////////////////////////////////////

function spotifyNow(){

// Prompt the user to provide information.
inquirer.prompt([

{
  type: "input",
  name: "userInput",
  message: "Ahh, you wanna listen to music?  Type the title, and I'll look for it.."
}

// After the prompt, store the user's response in a variable called movieTitle.
]).then(function(songTitle) {

 console.log(songTitle.userInput);

 var searchMusic;
 if(songTitle === undefined) {
  var songTitle = songTitle.userInput;
  spotify.search({ type: 'track', query: songTitle }, function(err, data){

    if(songTitle.userInput){
      var data = data.tracks.items;
      for(var i =0; i < data.length; i++){

        console.log(data[i].name);
        console.log(data[i].album.href); 
        console.log(data[i].album.name); 
        console.log(data[i].preview_url); 

        for(var j =0; j < data[i].artists.length; j++){
          console.log(data[i].artists[j].name); 
        }
      }
    }else{
      spotify.search({ type: 'track', query: "what's my age again"}, function(err, data){
        var data = data.tracks.items;
        console.log(data[0].name); 
        console.log(data[0].album.href); 
        console.log(data[0].album.name); 
        console.log(data[0].preview_url); 
        console.log(data[0].artists[0].name); 
      })
    }
  })
   // outputLog();
 }
})
}
//////////////////////////////////////////
//END SPOTIFY CODE BLOCK////////////////////
//////////////////////////////////////////


//////////////////////////////////////////
//START MOVIE CODE BLOCK////////////////////
//////////////////////////////////////////

function movie(){
console.log("at the movie function now")
// Prompt the user to provide information.
inquirer.prompt([

{
  type: "input",
  name: "userInput",
  message: "Ahh, you wanna see a movie?  Type the title, and I'll look for it.."
}

// After the prompt, store the user's response in a variable called movieTitle.
]).then(function(movieTitle) {

 console.log(movieTitle.userInput);

 if(movieTitle === undefined){
//    movieSearch = "mr+nobody";
request("http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&apikey=40e9cece",function(error, response,body){
  console.log(body);

})
}  

else{


// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
//var request = require("request");

// Store all of the arguments in an array
//var nodeArgs = process.argv;
var nodeArgs = movieTitle.userInput;
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

}
})
}
//////////////////////////////////////////
//END MOVIE CODE BLOCK////////////////////
//////////////////////////////////////////


//////////////////////////////////////////
//START SWITCH CODE BLOCK////////////////////
//////////////////////////////////////////

function seeDirections(){
  console.log("Processing...");

  fs.readFile("random.txt", "utf8", function(error,data){
    if(error){
      console.log("Here is the error: " + error);
    }
    else{
      var dataArr = data.split(",");
      userCommand = dataArr[0];
      search = dataArr[1];

      //if multiword search
      for(i=2; i<data.Arr.length; i++){
        search= search + "+" + dataArr[i];
      }

      masterController();
    }
  })
}

masterController();


//////////////////////////////////////////
//END SWITCH CODE BLOCK////////////////////
//////////////////////////////////////////
