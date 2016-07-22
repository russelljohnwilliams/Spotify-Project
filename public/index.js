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
      // console.log(url)
      // displayOptions( query );
      searchAlbums(spotifySearch)
    };
    // console.log("inner", spotifySearch.artists.items[0].href)
  };
  request.send( null );

};


var searchAlbums = function(spotifySearch){
  var artist = spotifySearch.artists.items[0].href;
  var url = artist + "/albums?album_type=single";
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function(){
    if (request.status === 200){
      var jsonString = request.responseText;
      albumSearch = JSON.parse( jsonString );
      console.log('albums', albumSearch)

    }
  }
  request.send( null ); 
}







