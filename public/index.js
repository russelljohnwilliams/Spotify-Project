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
};

var handleClick = function() {
  var searchedItem = document.getElementById( 'search-input' )
  var userInput = searchedItem.value;
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
      choice.artist = spotifySearch.artists.items[0];
      searchAlbums(spotifySearch)
    };
  };
  request.send( null );
};

var searchAlbums = function(spotifySearch){
  var artist = spotifySearch.artists.items[0].href;
  var url = artist + "/albums?album_type=album";
  var request1 = new XMLHttpRequest();
  request1.open("GET", url);
  request1.onload = function(){
    if(request1.status === 200) {
      state.album = JSON.parse(request1.responseText)
      findArtist()
    }
  };
  request1.send(null)
};

var findSong = function(songSearch){
  var url = songSearch;
  var request1 = new XMLHttpRequest();
  request1.open("GET", url);
  request1.onload = function(){
    if(request1.status === 200) {
      var singles = JSON.parse(request1.responseText)
      var song = singles.tracks.items[0].preview_url
      audio = new Audio(song);
    }
  };
  request1.send(null)
};

var findArtist = function(){
  var select = document.getElementById('songList');
  for ( var i = 0; i < state.album.items.length; i++ ){
    var opt = document.createElement('option')
    opt.innerHTML = state.album.items[i].name;
    opt.value = i;
    select.appendChild(opt)
    setArtistPic()
    setSimilarArtists()
   }
}

var selectSong = function(){
  var index = document.getElementById('songList').value;
  var song = state.album.items[index].href
  findSong(song)
  setAlbumPic(index)
}

var setArtistPic = function(){
  document.getElementById("pic").innerHTML = '<img class="picture" src=' + choice.artist.images[1].url + '>';
}

var setAlbumPic = function(index){
  document.getElementById("albumPic").innerHTML = '<img class="picture" src=' + state.album.items[index].images[1].url + '>';
}

var setSimilarArtists = function(index){
  document.getElementById("similarArtists").innerHTML = "hello"
}

var audio = new Audio()

var choice = {
  artist: null
}

var state = {
  album: null,
}

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

