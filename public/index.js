var play = {
  song: null
}

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

  // var select = document.getElementById('songList');

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
      // console.log('spotifySearch', spotifySearch)
    };
  };
  request.send( null );
};

var searchAlbums = function(spotifySearch){
  // console.log("searchAlbums func", spotifySearch)
  var artist = spotifySearch.artists.items[0].href;
  var url = artist + "/albums?album_type=single";
  var request1 = new XMLHttpRequest();
  request1.open("GET", url);
  request1.onload = function(){
    if(request1.status === 200) {
      state.singles = JSON.parse(request1.responseText)
      // console.log("sA, singles", singles)
      dropDownList()
      // var singles = singles.items[1].href
      // console.log("that time?", x)
      // searchForSong(singles)
    }
  };
  request1.send(null)
};

var dropDownList = function(){
  var select = document.getElementById('songList');
  // console.log("ddlist singles", singles)
  for ( var i = 0; i < state.singles.items.length; i++ ){
    var opt = document.createElement('option')
    opt.innerHTML = i;
    opt.value = i;
    // console.log("opt Value", opt)
    select.appendChild(opt)
  }
}

var findSong = function(songSearch){
  // console.log("search for a star", songSearch)
  var url = songSearch;
  var request1 = new XMLHttpRequest();
  request1.open("GET", url);
  request1.onload = function(){
    if(request1.status === 200) {
      var singles = JSON.parse(request1.responseText)
      console.log("whaaaaat", singles.tracks.items[0].preview_url)
      play.song = singles.tracks.items[0].preview_url
      // var a = new Audio(play.song);
      // a.play();
      // console.log('play?', play.song)
    }
  };
  request1.send(null)
};

  // var single = singles.items[i].href


// var displayOptions = function(select) {
//   for ( var i = 0; i < state.countries.length; i++ ) {
//     var opt = document.createElement('option')
//     opt.innerHTML = state.countries[i].name;
//     opt.value = i;
//     select.appendChild(opt)
//   }
// }

var selectSong = function(){
  var index = document.getElementById('songList').value;
  var song = state.singles.items[index].href
  console.log("what's this", song)
  findSong(song)
}

var playAudio = function(){
  var a = new Audio(play.song);
  a.play();
}

