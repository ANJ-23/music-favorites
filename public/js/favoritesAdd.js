// handles "add to favorites" button
const favHandler = async (event) => {
    event.preventDefault();
    // upon pressing button with "data-song-id={{song.id}}", stores value of song's ID
    const songId = event.target.dataset["songId"]
    // console.log("id: ", songId)

    // fetch corresponding 'POST' route in "/api/songRoutes.js"
    // song_id has to be passed in
    await fetch("/api/songs/add", {
        method: 'POST',
        body: JSON.stringify({
            song_id: songId, // sends 'id' number as 'req.body'
        }), 
        headers: { 'Content-Type': 'application/json' },
    });
};

// adds favHandler function to ALL buttons with class="add-to-fav"
document
  .querySelectorAll('.add-to-fav')
  .forEach(button => button.addEventListener('click', favHandler))