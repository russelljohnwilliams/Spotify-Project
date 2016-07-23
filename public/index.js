// var play = {
//   audio: null
// }

var audio = new Audio()

var state = {
  singles: null
}

window.onload = function(){
  main()
};

var main = function() {
  var btn = document.getElementById('searchSpotify');
  btn.onclick = handleClick;

  var form = document.getElementById( 'search' );
  form.onsubmit = handleSubmit;

  var btn = document.getElementById('playMusic');
  btn.onclick = playAudio;

  var btn = document.getElementById('pauseMusic');
  btn.onclick = pauseAudio;

  var btn = document.getElementById('nextSong');
  btn.onclick = nextButton;

  // drawing()
  // init() 

};

var handleClick = function() {
  var searchedItem = document.getElementById( 'search-input' )
  var userInput = searchedItem.value;
  // searchedItem.value = '';
  searchSpotify(userInput)
};

var handleSubmit = function( event ){
  event.preventDefault();
  handleClick();
};

var searchSpotify = function(userInput) {
  var url = "https://api.spotify.com/v1/search?q=" + userInput + '&type=artist';
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function(){
    if (request.status === 200){
      var jsonString = request.responseText;
      spotifySearch = JSON.parse( jsonString );
      searchAlbums(spotifySearch)
    };
  };
  request.send( null );
};

var searchAlbums = function(spotifySearch){
  var artist = spotifySearch.artists.items[0].href;
  var url = artist + "/albums?album_type=single";
  var request1 = new XMLHttpRequest();
  request1.open("GET", url);
  request1.onload = function(){
    if(request1.status === 200) {
      state.singles = JSON.parse(request1.responseText)
      // dropDownList()
      displaySong()
    }
  };
  request1.send(null)
};

var displaySong = function(x){
  i = 0
  // i += x
  var p = document.getElementById('song')
  var opt = document.createElement('option')
  opt.innerHTML = state.singles.items[i].name
  p.appendChild(opt)
  var song = state.singles.items[i].href
  // console.log("what's this", song)
  findSong(song)
  // selectSong(i)
  document.getElementById("pic").innerHTML = '<img class="background" src=' + state.singles.items[i].images[1].url + '>';
}

var nextButton = function(){
  audio.pause()
  var x 
  x += 1
  var song = state.singles.items[x].href
  findSong(song)
}

var dropDownList = function(){
  var select = document.getElementById('songList');
  for ( var i = 0; i < state.singles.items.length; i++ ){
    var opt = document.createElement('option')
    console.log("find name", state.singles.items[i].images[1].url)
    opt.innerHTML = state.singles.items[i].name;
    opt.value = i;
    select.appendChild(opt)
    document.getElementById("pic").innerHTML = '<img class="background" src=' + state.singles.items[i].images[1].url + '>';
    // imageToShow = state.singles.items[i].images[1].url;
  }
}

var findSong = function(songSearch){
  var url = songSearch;
  var request1 = new XMLHttpRequest();
  request1.open("GET", url);
  request1.onload = function(){
    if(request1.status === 200) {
      var singles = JSON.parse(request1.responseText)
      // console.log("whaaaaat", singles.tracks.items[0].preview_url)
      var song = singles.tracks.items[0].preview_url
       audio = new Audio(song);
    }
  };
  request1.send(null)
};


// var selectSong = function(){
//   // var i = 0
//   // i = i
//   // i =+ x
//   // var index = document.getElementById('songList').value;
//   var song = state.singles.items[i].href
//   console.log("what's this", song)
//   findSong(song)
// }

// var a = new Audio(play.song);

var playAudio = function(){
  console.log(audio)
  audio.play();
}

var pauseAudio = function(){
  audio.pause();
}

 //  // ---------------------------------

//   var drawing = function(imageToShow){

//   var canvas = document.getElementById( 'main' );
//   console.log( 'canvas', canvas );
//   var context = canvas.getContext( '2d' );
//   context.fillStyle = 'grey'
//   context.fillRect( 10, 10, 580, 380 );
//   var img = document.getElementById("imageToShow");
//   ctx.drawImage(img, 10, 10, 150, 180);

// }

// var can, ctx, step, steps = 0,
     // delay = 10;

// function init() {
//    can = document.getElementById("main");
//    ctx = can.getContext("2d");
//    ctx.font = "20pt Verdana";
//    ctx.textAlign = "center";
//    ctx.textBaseline = "middle";
//    step = 320;
//    steps = 50;
//    RunTextLeftToRight();
// }

// function RunTextLeftToRight() {
//    step --;
//    ctx.clearRect(0, 0, can.width, can.height);
//    ctx.save();
//    ctx.translate(step, can.height / 2);
//    ctx.fillText("Welcome", 0, 0);
//    ctx.restore();
//    if (step == steps)
//        step = 320;
//    if (step > steps)
//        var t = setTimeout('RunTextLeftToRight()', delay);
// }
     

 // context.beginPath();
 // context.moveTo(100, 100);
 // context.lineTo(100, 150);
 // context.stroke();



  

 //  // ---------------------------------

