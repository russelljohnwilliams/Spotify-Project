window.onload = function(){
  main()
};

var state = {
  albums: null,
  tracks: null,
  artist: null
}

var main = function() {

  var btn = document.getElementById('searchSpotify');
  btn.onclick = handleClick;

  var form = document.getElementById( 'search' );
  form

  var btn = document.getElementById('playMusic');
  btn.onclick = playAudio;

  var btn = document.getElementById('pauseMusic');
  btn.onclick = pauseAudio;

  var select = document.getElementById('album');
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
      state.artist = artistSearch.artists.items[0];
      searchAlbums(artistSearch)
      // relatedArtists(artistSearch)
    };
  };
  request.send( null );
};

var searchAlbums = function(artistSearch){
  document.getElementById("artist").innerText = ""
  document.getElementById("title").innerText = ""
  var artist = artistSearch.artists.items[0].href;
  var url = artist + "/albums?album_type=album";
  var request1 = new XMLHttpRequest();
  request1.open("GET", url);
  request1.onload = function(){
    if(request1.status === 200) {
      state.albums = JSON.parse(request1.responseText)
      generateAlbums()
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

var generateAlbums = function(){
  document.getElementById("album").options.length = 0;
  var select = document.getElementById('album');
  var placeholder = document.createElement('option')
  text = "choose an album"
  placeholder.innerHTML = text
  select.appendChild(placeholder)

  for ( var i = 0; i < state.albums.items.length; i++ ){
    var opt = document.createElement('option')
    album = state.albums.items[i].name;
    album = album.substring(0,18);
    console.log("opt:", album)
    opt.className="opt";
    opt.innerHTML = album;
    opt.value = i;
    select.appendChild(opt);
    setArtistPic()
  // }


  // for ( var i = 0; i < state.albums.items.length; i++ ){
  //   var opt = document.createElement('option')
  //   opt.innerHTML = state.albums.items[i].name;
  //   console.log("opt:", opt)
  //   // opt = opt.substring(0,18);
  //   opt.className="opt";
  //   opt.value = i;
  //   select.appendChild(opt);
  //   setArtistPic()
  }
}

var setArtistPic = function(){
  document.getElementById("pic").innerHTML = "<h3>"
  + state.artist.name + "</h3>" +'<img class="picture" src=' + state.artist.images[1].url + '>';
}

var selectAlbum = function(){
  var index = document.getElementById('album').value;
  var album = state.albums.items[index].href
  setAlbumPic(index, album)
  getSongs(album)
}

var setAlbumPic = function(index, album){
  document.getElementById("albumPic").innerHTML = '<div class="artist-pic">' + '<img class="picture" src=' + state.albums.items[index].images[1].url + '>' + '</div>';
}

var getSongs = function(albums){
  var url = albums;
  var request1 = new XMLHttpRequest();
  request1.open("GET", url);
  request1.onload = function(){
    if(request1.status === 200) {
      var albumInfo = JSON.parse(request1.responseText)
      state.tracks = albumInfo.tracks.items;
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
  var placeholder = document.createElement('option')
  text = "choose a song"
  placeholder.innerHTML = text
  select.appendChild(placeholder)
  for ( var i = 0; i < state.tracks.length; i++ ){
    var opt = document.createElement('option')
    song = state.tracks[i].name;
    song = song.substring(0,18);
    console.log("this thing : ", song)
    opt.className="opt"
    opt.innerHTML = song;
    opt.value = i;
    // select.appendChild("choose")
    select.appendChild(opt)
  }
}





var createTrack = function() {
  var index = document.getElementById('trackList').value;
  var song = state.tracks[index].preview_url
  audio = new Audio(song)

  var str = state.tracks[index].name
  var string = str.substring(0,30);
  console.log("String-a-ding", string)

  document.getElementById("artist").innerText = "artist : " + state.artist.name
  document.getElementById("title").innerText = "track : " + string
}

var audio = new Audio()

var playAudio = function(){
  audio.play();
  console.log("YEAH!")
  var spool = document.getElementById("leftSpoolCircle")
  document.getElementById("leftSpoolCircle").style.transition = "all 30s, linear";
  spool.style.webkitTransform = "rotateZ(-900deg)";
  var spool = document.getElementById("rightSpoolCircle")
  document.getElementById("rightSpoolCircle").style.transition = "all 30s, linear";
  spool.style.webkitTransform = "rotateZ(-900deg)";
}

var pauseAudio = function(){
  audio.pause();
  var spool = document.getElementById("leftSpoolCircle")
  spool.style.webkitAnimationPlayState = 'paused';
  var spool = document.getElementById("rightSpoolCircle")
  spool.style.webkitAnimationPlayState = 'paused';
}

// var choice = {
//   artist: null
// }

// var album = {
//   tracks: null
// }

// var state = {
//   albums: null,
//   tracks: null,
//   artist: null;
// }

