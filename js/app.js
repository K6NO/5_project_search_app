$(document).ready(function () {

    /**
     * helper function shortening album release date
     * @param releaseDate
     * @returns {*}
     */
    var shortenAlbumReleaseDate = function (releaseDate) {
        if (releaseDate.length > 4) {
            releaseDate = releaseDate.slice(0, 4);
        }
        return releaseDate;
    }

    //hide details section by default
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

        //callback function (album list)
        var loadAlbums = function (result) {
            var albumsHTML = '';

            //display no results message
            if(result.albums.items.length < 1){
                albumsHTML += `
                <li class="no-albums">
                    <i class="material-icons icon-help">help_outline</i>No albums found that match: ${searchTerm}
                </li>
                `
                $('#albums').html(albumsHTML);
            } else {

                // list albums
                $.each(result.albums.items, function (i, album) {
                    albumsHTML += `
                    <li>
                        <div class="album-wrap">
                            <a href="" class="details_link" id="${album.id}">
                                <img class="album-art" src="${album.images[0].url}">
                            </a>
                        </div>
                        <span class="album-title">${album.name}</span>
                        <span class="album-artist">${album.artists[0].name}</span>
                        <span class="album-title">
                            <a href="" class="details_link" id="${album.id}">Click for details!</a>
                        </span>
                    </li>
                    `
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
                        var singleAlbumHeaderHTML = `
                        <div>
                            <h1 class="main-title">AlbumSearch</h1>
                            <p class="album-detail-title-header">${album.name}</p>
                        </div>
                        `
                        $('#detail-header').html(singleAlbumHeaderHTML);
                        $('#detail-header').show();

                        //display album details
                        var albumReleaseDate = shortenAlbumReleaseDate(album.release_date);

                        var singleAlbumMainHTML = `
                        <div class="gray-bg-div">
                            <a href="" class="back_link"> < Search results</a>
                            <a href="${album.external_urls.spotify}">
                                <h1 class="album-detail-name">${album.name}(${albumReleaseDate})</h1></a>
                            <h3 class="album-detail-artist">${album.artists[0].name}</h3>
                        </div>
                        <div class="album-detail-wrap">
                            <a href="${album.external_urls.spotify}">
                                <img class="album-detail-art" src="${album.images[0].url}"/>
                            </a>
                        </div>
                        <p class="track-list-label">track list:</p>
                        <ol class="track-list">
                        `
                        $.each(album.tracks.items, function(i, track){
                            singleAlbumMainHTML += `<li>${track.name}</li>`;
                        });
                        singleAlbumMainHTML += '</ol>';
                        $('#details').html(singleAlbumMainHTML);
                        $('#details').show();

                        // back to search results event handler
                        $('.back_link').click(function (event) {
                            event.preventDefault();
                            $('.main-header').show();
                            $('#albums').show();
                            $('#details').hide();
                            $('#detail-header').hide();
                        })
                    }; // end callback (album detail)

                    //send AJAX request for album detail
                    $.getJSON(spotifySingleAlbumAPI, loadSingleAlbum);
                }); // end click event handler
            }
        }; //end callback (albums list)

        // display error message if no search term is entered
        if(searchTerm === '') {
            var albumsHTML = `
            <i class="material-icons icon-help">help_outline</i>
            <li class="no-albums">No search term entered. Please enter a search term!</li>
            `;
            $('#albums').html(albumsHTML);
        } else {
            // send AJAX request for albums
            $.getJSON(spotifyAPI, spotifyOptions, loadAlbums);
        }
    }); // end form event handler
});