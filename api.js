//Streams API
class Utelly {
  constructor() {
    this.auth = {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key": `${config.UTELLY_KEY}`,
      },
    };
  }

  async getStream(title) {
    const res = await fetch(
      `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${title}&country=us`,
      this.auth
    );
    const streamData = await res.json();

    return {
      streamData,
    };
  }
}

// Series and movie details API
class OMDB {
  constructor() {
    this.key = `${config.OMDB_KEY}`;
  }

  async getMovieData(id) {
    const movieRes = await fetch(
      `https://www.omdbapi.com/?plot=full&apikey=${this.key}&i=${id}`
    );

    const movieData = await movieRes.json();

    return {
      movie: movieData,
    };
  }
}

// TMDB API for trending content - replaced unogs
class TMDB {
  async getTrending() {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${config.TMDB_KEY}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`
    );

    const data = await res.json();

    return data;
  }
}

// YouTube API to get trailers
class Youtube {
  async getTrailer(title) {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?q=${title}-official-trailer&part=snippet&key=${config.YOUTUBE_KEY}`
    );
    const data = await res.json();
    return data;
  }
}

//TODO: Scrape prices?
