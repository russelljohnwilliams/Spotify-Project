window.onload = function(){
  main()
};

var main = function() {

  var btn = document.getElementById('searchSpotify');
  btn.onclick = handleClick;

  var form = document.getElementById( 'search' );
  form

  var btn = document.getElementById('playMusic');
  btn.onclick = playAudio;

  var btn = document.getElementById('pauseMusic');
  btn.onclick = pauseAudio;

  var select = document.getElementById('songList');
  select.onchange = selectAlbum;

  var select = document.getElementById('trackList');
  select.onchange = createTrack

};

var handleClick = function() {
  var searchedItem = document.getElementById( 'search-input' )
  var userInput = searchedItem.value;
  searchArtists(userInput)
  searchedItem.value = '';
};

var handleSubmit = function( event ){
  event.preventDefault();
  handleClick();
};

var searchArtists = function(userInput) {
  var url = "https://api.spotify.com/v1/search?q=" + userInput + '&type=artist';
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function(){
    if (request.status === 200){
      var jsonString = request.responseText;
      artistSearch = JSON.parse( jsonString );
      choice.artist = artistSearch.artists.items[0];
      searchAlbums(artistSearch)
      relatedArtists(artistSearch)
    };
  };
  request.send( null );
};

var searchAlbums = function(artistSearch){
  var artist = artistSearch.artists.items[0].href;
  var url = artist + "/albums?album_type=album";
  var request1 = new XMLHttpRequest();
  request1.open("GET", url);
  request1.onload = function(){
    if(request1.status === 200) {
      state.albums = JSON.parse(request1.responseText)
      findArtist()
    }
  };
  request1.send(null)
};


var relatedArtists = function(artistSearch){
  var url = artistSearch.artists.items[0].href+"/related-artists";
  var request3 = new XMLHttpRequest();
  request3.open("GET", url);
  request3.onload = function(){
    if(request3.status === 200) {
      var relatedArtists = JSON.parse(request3.responseText)
      setRelatedArtists(relatedArtists)
    }
  };
  request3.send()
};

var setRelatedArtists = function(related){
  document.getElementById("similarArtists").innerHTML = "<h3>" 
  + "Related Artists" + "</h3>"
  for (var i in related.artists)
    document.getElementById("similarArtists").innerHTML  += related.artists[i].name + "<br>" 
}

var findArtist = function(){
  document.getElementById("songList").options.length = 0;
  var select = document.getElementById('songList');
  for ( var i = 0; i < state.albums.items.length; i++ ){

    var opt = document.createElement('option')
    opt.innerHTML = state.albums.items[i].name;
    opt.value = i;
    select.appendChild(opt)

    setArtistPic()
  }
}

var setArtistPic = function(){
  document.getElementById("pic").innerHTML = "<h1>"
  + choice.artist.name + "</h1>" +'<img class="picture" src=' + choice.artist.images[1].url + '>';
}

var selectAlbum = function(){
  var index = document.getElementById('songList').value;
  var album = state.albums.items[index].href
  setAlbumPic(index, album)
  getSongs(album)
}

var setAlbumPic = function(index, album){
  document.getElementById("albumPic").innerHTML = '<img class="picture" src=' + state.albums.items[index].images[1].url + '>';
}

var getSongs = function(albums){
  var url = albums;
  var request1 = new XMLHttpRequest();
  request1.open("GET", url);
  request1.onload = function(){
    if(request1.status === 200) {
      var albumInfo = JSON.parse(request1.responseText)
      album.tracks = albumInfo.tracks.items;
      generateTrackList(albumInfo);
    }
  };
  request1.send(null)
};

var generateTrackList = function(albumInfo){
  document.getElementById("albumTitle").innerHTML = "<h3>" 
  + albumInfo.name + "</h3>"
  document.getElementById("trackList").options.length = 0;
  var select = document.getElementById('trackList');
  for ( var i = 0; i < album.tracks.length; i++ ){
    var opt = document.createElement('option')
    song = album.tracks[i].name;
    opt.innerHTML = song;
    opt.value = i;
    select.appendChild(opt)
  }
}

var createTrack = function() {
  var index = document.getElementById('trackList').value;
  var song = album.tracks[index].preview_url
  audio = new Audio(song)

  document.getElementById("artist").innerText = "artist: " + choice.artist.name
  document.getElementById("title").innerText = "artist: " + album.tracks[index].name
}

var audio = new Audio()

var playAudio = function(){
  audio.play();

}

var pauseAudio = function(){
  audio.pause();
  document.getElementById("artist").innerText = ""
  document.getElementById("title").innerText = ""

}

var choice = {
  artist: null
}

var album = {
  tracks: null
}

var state = {
  albums: null,
}

