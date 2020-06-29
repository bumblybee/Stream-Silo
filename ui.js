class UI {
  constructor() {
    this.resultsDiv = document.getElementById("results");
    this.searchValue = document.getElementById("search-input");
    this.modal = document.getElementById("modal");
    this.modalBody = document.getElementById("modal-body");
  }

  // Display Trending Series - Replaced new to Netflix
  showTrending(results) {
    let output = `
    <div class="container">
    <h1 class="new-header text-center text-dark mb-4">Trending Now</h1>
    </div>
    `;

    results.forEach((result) => {
      output += `
     
        <div class="card card-body mb-2">

            <div class="row">

              <div class="col-md-6">
                <img class="img-thumbnail mx-auto d-block rounded photo" src="https://image.tmdb.org/t/p/w300${result.poster_path}" alt="nothing to see here">
              </div>

              <div class="col-md-6">
                  <h1 class="name text-black mr-4" id="trending-title">${result.title}</h1>
                  <p class="release-date">(${result.release_date})</p>
                  
                  <br />
                  <p class="trending-synopsis mx-auto" >${result.overview}</p>
                  <br />
                  <p class="average-rating text-dark"><strong>Average Rating:</strong> ${result.vote_average}</p>
                
              </div>
            </div>
      
        </div>`;
    });

    this.resultsDiv.innerHTML = output;
  }

  // Display Searched Content
  showMatch(streams) {
    let output = "";

    streams.results.forEach((result) => {
      console.log(result);
      output += `
        <div class="card card-body mb-2">

            <div class="row">

              <div class="col-md-6">
                <img class="img-thumbnail search-img mx-auto d-block rounded photo" src="${result.picture}" alt="nothing to see here">
              </div>
              <div class="col-md-6">
                <h1 class="name">${result.name}</h1>
                <a id="${result.external_ids.imdb.id}" class="detailsBtn" href="#">Details</a>
              </div>
              <div class="col-md-12 logo-div">
                <ul class="list-group list-group-horizontal">
            
                `;

      //TODO: Add Disney+
      // Display Icons for Each Streaming Source
      result.locations.forEach((location) => {
        // If streaming location doesn't have icon, bypass
        if (location.display_name !== "NOT_SETIVAUS") {
          let source = "";
          let title = "";

          switch (location.display_name) {
            case "iTunes":
              source = "img/iTunes.png";
              title = "iTunes";
              break;
            case "Netflix":
              source = "img/Netflix.png";
              title = "Netflix";
              break;
            case "Amazon Instant Video":
              source = "img/amazon.png";
              title = "Amazon";
              break;
            case "Amazon Prime Video":
              source = "img/prime.png";
              title = "Amazon Prime Video";
              break;
            case "Google Play":
              source = "img/google-play.png";
              title = "Google Play Movies";
              break;
            case "Hulu":
              source = "img/hulu.png";
              title = "Hulu";
              break;
            case "HBO":
              source = "img/hbo.png";
              title = "HBO";
              break;
            case "AtomTicketsIVAUS":
              source = "img/atom.png";
              title = "Atom Tickets";
              break;
            case "Disney+":
              source = "img/disney-plus.png";
              title = "Disney+";
          }

          output += `
            
              <li class="list-group-item flex-fill border-0 logo-li"><a href="${location.url}" target="_blank" rel="noopener"><img class="logo" title="${title}" src="${source}"></a></li>
              
            `;
        }
      });

      output += `
                  </ul>
                </div>
                
                     
                    
                  </div>
                 
                </div>
              </div>`;
    });

    this.resultsDiv.innerHTML = output;
  }

  //TODO: Maybe add pages for popular, coming to theaters, etc.

  // Show Details and Trailer in Modal
  showDetails(movie, trailer) {
    console.log(movie);
    console.log(trailer);
    const videoSrc = `https://www.youtube.com/embed/${trailer.id.videoId}`;

    let body = `
    
    <div class="row">
    
    <div class="col-md-4">
    
    <img src="${movie.Poster}" class="img-fluid modal-image">
    
    </div>

    <div class="col-md-8 details-div pt-3 pr-4">
    <h2>${movie.Title}</h2>
    <p>(${movie.Year})</p>
    <p>${movie.Rated}</p>
    <p>${movie.Plot}</p>
    <p><strong>Director: </strong> ${movie.Director}</p>
    <p><strong>Cast: </strong> ${movie.Actors}.</p>
    <p><strong>Runtime:</strong> ${movie.Runtime}</p>
    `;

    // Display External Ratings
    movie.Ratings.forEach((rating) => {
      let source = "";
      let id = "";
      let href = "";

      if (rating.Source === "Internet Movie Database") {
        source = "img/imdb.png";
        id = movie.imdbID;
        href = `https://www.imdb.com/title/${id}/`;
      } else if (rating.Source === "Rotten Tomatoes") {
        href = `https://www.rottentomatoes.com/m/${movie.Title}`;

        //Remove % from tomatoes rating so can compare in if statement below
        const score = parseFloat(rating.Value);

        // Define score for displaying tomato or splat img
        if (score >= 60) {
          source = "img/tomato.png";
        }
        if (score < 60) {
          source = "img/splat.png";
        }
      } else if ((rating.Source = "Metacritic")) {
        //Metacritic requires lowercase, added code for that
        source = "img/metacritic.png";
        href = `https://www.metacritic.com/movie/${movie.Title.toLowerCase()}`;
      } else {
        source = rating.Source;
        href = "#";
      }
      // Insert imdb, tomatoes, metacritic icons and link to relevant page
      body += `
      <a href="${href}" target="_blank" rel="noopener">
      <img src="${source}" height="33">
      </a>
      <span> ${rating.Value}</span>`;
    });

    // Append iframe with YouTube trailer
    body += `
   
    <div>
    <iframe src=${videoSrc} title="video player" frameborder="0" allowfullscreen></iframe>
    </div>
    </div>
    </div>`;

    this.modalBody.innerHTML = body;
    this.modal.style.display = "block";
  }

  // Close modal by clicking x
  closeModal() {
    this.modal.style.display = "none";
  }

  // Close modal by clicking outside div
  clickOutside() {
    this.modal.style.display = "none";
  }
}
