const movieNameRef = document.querySelector("#userInput");
const searchBtn = document.querySelector(".search-btn");
const result = document.querySelector("#result");

// *function fetchData
let getMovie = async() => {
    let movieName = movieNameRef.value;
    const apiKey = "f56fd417"
    let url = ` http://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

    if (movieName.length === 0) {
        result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`
    } else {
        fetch(url).then(res => res.json()).then(data => {

            if (data.Response === 'True') {
                result.innerHTML = `
                        <div class=info>
                            <img src= ${data.Poster} class="poster">
                            <div>
                                <h2>${data.Title}</h2>
                                <div class="rating">
                                    <div class="imdb">
                                        <img src="star.svg">
                                        <h4>${data.imdbRating === "N/A" ? "Checking" : data.imdbRating}</h4>
                                    </div>
                                    <div class="tomato">
                                        <img src="tomato.png">
                                        <h4>${data.Ratings.length === 0 ? 'Checking' : data.Ratings[1].Value}</h4>
                                    </div>
                                </div>
                                <div class="movie-info">
                                    <h4 class="rated">${data.Rated}</h4>
                                    <h4 class="year">${data.Year}</h4>
                                    <h4 class="run-time">${data.Runtime}</h4>
                                </div>
                                <div class="genre">
                                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                                </div>
                            </div>
                        </div>
                        <h3>Plot</h3>
                        <p>${data.Plot}</p>
                        <div class="cast-dir">
                            <div class="cast">
                                <h3>Cast</h3>
                                <p>${data.Actors}</p>
                            </div>
                            <div class="director">
                                <h3>Director</h3>
                                <p>${data.Director}</p>
                            </div>
                            <h3>Relased Date</h3>
                            <div class="release-date">${data.Released}</div>
                        </div>
                    `;
            } else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`
            }
        });
    }
}


searchBtn.addEventListener("click", getMovie);
document.body.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getMovie();
    }
})
