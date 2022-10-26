var bookBtn = document.getElementsByClassName("movie-buttons");
var movieTitle = document.getElementsByClassName("movie-title");
let isMovieAvailable = false;

for (let i = 0; i < bookBtn.length; i++) {
  bookBtn[i].addEventListener("click", function () {
    createMovieList(movieTitle[i].innerHTML);
    localStorage.setItem("movieTitle", JSON.stringify(movieTitle[i].innerHTML));
    window.location.href = "seatBooking.html";
  });
}

function numbersArray(N, statingFrom) {
  return Array.from(Array(N), (_, i) => ({
    seatNo: i + statingFrom,
    hasBooked: false,
  }));
}

function createMovieList(movieName) {
  var data = JSON.parse(localStorage.getItem("movieSeats"));
  // condition run at first time data is null
  if (data == null) {
    localStorage.setItem(
      "movieSeats",
      JSON.stringify([
        {
          movieName,
          seats: {
            standard: numbersArray(50, 1),
            premium: numbersArray(50, 51),
          },
        },
      ])
    );
  }
  // check inside data we have already movie is present or not if not present add into the data
  else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].movieName === movieName) {
        isMovieAvailable = true;
      }
    }
    if (!isMovieAvailable) {
      localStorage.setItem(
        "movieSeats",
        JSON.stringify([
          ...data,
          {
            movieName,
            seats: {
              standard: numbersArray(50, 1),
              premium: numbersArray(50, 51),
            },
          },
        ])
      );
    }
  }
}
