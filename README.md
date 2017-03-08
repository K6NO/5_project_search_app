# 5_project_search_app

Request data from the Spotify API to display movie information
Go to https://developer.spotify.com/ to start using the API documentation.
Use Spotify's 'search by album' endpoint to return albums found to match the name passed to the value of the “q” parameter, or query parameter
The data should return in JSON format
Display search results on the page
The data should load inside the #albums <ul>
Please see the comments in index.html for samples of the HTML you'll need to dynamically create with JavaScript
For each album returned, render an <li> displaying these items inside:
Album title
Album art image
Render an <img> that displays the 640px x 640px album art image via the src attribute
Make sure you use the exact class names provided in the CSS
Let users know when search returns no album data
If the search returns no album data, display the text "No albums found that match: 'title'."
See a sample of the code you'll need to display in the index.html comments

Link a movie to its Spotify page
Wrap the album art image -- or everything in the <li> -- in a <a> tag that links an album to its spotify.com listing
For example: Luck Of The Draw
Create an album description page
Use the “albums” endpoint and the album id to get details for an album if clicked
Load or link to a description page displaying a album's title, year, album art, tracklist, and artist
You'll need to write the CSS for this new page
See the 'description-page.png' mockup in the 'examples' folder of the project files
