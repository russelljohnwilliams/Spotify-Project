// var state = {
//   spotifySearch: null
// } 

// console.log("outter", state.spotifySearch)

window.onload = function(){
  main()
};

var main = function() {
  var btn = document.getElementById('searchSpotify');
  btn.onclick = handleClick;

  var form = document.getElementById( 'search' );
  form.onsubmit = handleSubmit;

  var btn = document.getElementById('playMusic');
  btn.onclick = handleClick;
};

var handleClick = function() {
  var searchedItem = document.getElementById( 'search-input' )
  var userInput = searchedItem.value;
  searchedItem.value = '';
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
      console.log('spotifySearch', spotifySearch)
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
      var singles = JSON.parse(request1.responseText)
      console.log(singles)
      var x = singles.items[0].href
      console.log("that time?", x)
      searchForSong(x)
    }
  };
  request1.send(null)
};


var searchForSong = function(songSearch){
  var url = songSearch;
  var request1 = new XMLHttpRequest();
  request1.open("GET", url);
  request1.onload = function(){
    if(request1.status === 200) {
      var singles = JSON.parse(request1.responseText)
      console.log(singles)
      song = singles.tracks.items[0].preview_url
      console.log("this time?", song)

    }
  };
  request1.send(null)
};


