$(document).ready(function () {

    //hide details section
    $('#detail-header').hide();

    //form submit event handler
    $('form').submit(function (event) {
        event.preventDefault();
        var searchTerm = $('#search').val();
        var spotifyAPI = 'https://api.spotify.com/v1/search';
        var spotifyOptions = {
            q : searchTerm,
            type: "album"
        };

        //callback function
        var loadAlbums = function (result) {
            var albumsHTML = '';

            //display no results message
            if(result.albums.items.length < 1){
                albumsHTML += '<li class="no-albums">';
                albumsHTML +=  '<i class="material-icons icon-help">help_outline</i>No albums found that match: ' + searchTerm + '</li>';
                $('#albums').html(albumsHTML);
            } else {

                // list albums
                $.each(result.albums.items, function (i, album) {
                    albumsHTML += '<li><div class="album-wrap">';
                    albumsHTML += '<a href="' + album.external_urls.spotify + '">';
                    albumsHTML += '<img class="album-art" src="' + album.images[0].url + '">';
                    albumsHTML += '</a>';
                    albumsHTML += '</div>';
                    albumsHTML += '<span class="album-title">' + album.name + '</span>';
                    albumsHTML += '<span class="album-artist">' + album.artists[0].name + '</span>';
                    console.log(album.id);
                    albumsHTML += '<span class="album-title"><a href="" class="details_link" id="' + album.id + '">Click for details!</a></span>';
                    albumsHTML += '</li>';
                }); // end each

                $('#albums').html(albumsHTML);

                // click event handler for album details link
                $('.details_link').click(function (event) {
                    event.preventDefault();
                    var trackId = $(this).attr('id');
                    var spotifySingleAlbumAPI = 'https://api.spotify.com/v1/albums/' + trackId;
                    var loadSingleAlbum = function (album) {
                        $('#main-header').hide();
                        $('#albums').hide();

                        // display new header
                        var singleAlbumHeaderHTML = '<div>';
                        singleAlbumHeaderHTML += '<h1 class="main-title">AlbumSearch</h1>';
                        singleAlbumHeaderHTML += '<p class="album-detail-title-header">' + album.name + '</p></div>';
                        $('#detail-header').html(singleAlbumHeaderHTML);
                        $('#detail-header').show();

                        //display album details
                        var singleAlbumMainHTML = '<div class="gray-bg-div"><a href="" class="back_link"> < Search results</a>';
                        var albumReleaseDate = album.release_date;
                        console.log(albumReleaseDate.length);
                        if(albumReleaseDate.length > 4) {
                            albumReleaseDate = albumReleaseDate.slice(0, 4);
                        }
                        singleAlbumMainHTML += '<h1 class="album-detail-name">' + album.name + ' (' + albumReleaseDate + ')</h1>';
                        singleAlbumMainHTML += '<h3 class="album-detail-artist">' + album.artists[0].name + '</h3></div></div>';
                        singleAlbumMainHTML += '<div class="album-detail-wrap"><img class="album-detail-art" src="' + album.images[0].url +'"/></div>';
                        singleAlbumMainHTML += '<p class="track-list-label">track list:</p>';
                        singleAlbumMainHTML += '<ol class="track-list">';
                        $.each(album.tracks.items, function(i, track){
                            singleAlbumMainHTML += '<li>' + track.name + '</li>';
                            console.log("In each " + track);
                        });
                        singleAlbumMainHTML += '</ol>';
                        $('#details').html(singleAlbumMainHTML);
                        $('#details').show();
                        $('.back_link').click(function (event) {
                            event.preventDefault();
                            $('.main-header').show();
                            $('#albums').show();
                            $('#details').hide();
                            $('#detail-header').hide();
                        })
                    };

                    //send AJAX request for single album
                    $.getJSON(spotifySingleAlbumAPI, loadSingleAlbum);
                });
            }
        }; //end callback
        if(searchTerm === '') {

            // display error message if no search term is entered
            var albumsHTML = '<i class="material-icons icon-help">help_outline</i><li class="no-albums">No search term entered. Please enter a search term!</li>';
            $('#albums').html(albumsHTML);
        } else {

            // send AJAX request for albums
            $.getJSON(spotifyAPI, spotifyOptions, loadAlbums);
        }
    }); // end form event handler
});