var backBtn = document.querySelector(".back-home");
var bookedSeatsElement = document.querySelector(".booked-seats");
var img = document.querySelector("img");

var bookedSeats = JSON.parse(localStorage.getItem("seats"));
var movieTitle = JSON.parse(localStorage.getItem("movieTitle"));

// add img your selected movie based on movieTitle
img.src = `./src/images/${movieTitle}.jpg`;

bookedSeatsElement.innerHTML = bookedSeats.join(",");

backBtn.addEventListener("click", function () {
  localStorage.removeItem("seats");
  localStorage.removeItem("seatType");
  localStorage.removeItem("seatQty");
  localStorage.removeItem("movieTitle");
  window.location.href = "index.html";
});
