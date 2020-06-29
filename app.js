const ui = new UI();
const utelly = new Utelly();
const omdb = new OMDB();
const tmdb = new TMDB();
const youtube = new Youtube();

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const closeBtn = document.getElementById("close");

// Call tmdb for trending tv - replaced unogs
tmdb.getTrending().then((data) => {
  console.log(data.results);
  ui.showTrending(data.results);
});

// Search text - utelly API call
searchBtn.addEventListener("click", (e) => {
  const searchText = searchInput.value.toLowerCase();
  if (searchText !== "") {
    utelly.getStream(searchText).then((data) => {
      ui.showMatch(data.streamData);
      console.log(data.streamData);
    });

    // If modal open, close on search
    //Added slight delay so there's time for new content to load before modal closes
    setTimeout(() => {
      ui.closeModal();
    }, 600);

    //Clear search input
    searchInput.value = "";
  } else {
    console.log("Not a match");
    // TODO: Display no match message
  }
});

// Search by pressing enter
searchInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    if (e.target.value !== "") {
      utelly.getStream(e.target.value).then((data) => {
        ui.showMatch(data.streamData);
      });
      searchInput.value = "";
    }
  }
});

// Details button event - show details
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("detailsBtn")) {
    let id = e.target.id;

    omdb.getMovieData(id).then((data) => {
      console.log(data.movie);
      //Pass movie title back to YouTube API call to get trailer
      youtube
        .getTrailer(data.movie.Title)
        .then((youtubeData) => {
          console.log(youtubeData.items);
          ui.showDetails(data.movie, youtubeData.items[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
});

document.addEventListener("click", (e) => {
  //If click on trending tv title, display where it streams via utelly
  if (e.target.id === "trending-title") {
    utelly.getStream(e.target.textContent).then((data) => {
      ui.showMatch(data.streamData);
    });
  }
});

// Close modal by clicking X
closeBtn.addEventListener("click", () => {
  ui.closeModal();
});

// Close modal by clicking outside
window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (e.target == modal) {
    ui.clickOutside();
  }
});
