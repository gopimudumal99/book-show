var goToSeatsBtn = document.querySelector(".choose-seats");
var chooseTypeBtn = document.getElementsByClassName("choose");
var seatType = document.getElementsByClassName("type-name");
var seatQty = document.getElementsByClassName("seat");
var goToSeatsBtn = document.querySelector(".go-to-seats");
var premiumSeatType = document.querySelector(".premium-seats");
var standardSeatType = document.querySelector(".standard-seats");

//local storage fetch
var movieTitle = JSON.parse(localStorage.getItem("movieTitle"));
var data = JSON.parse(localStorage.getItem("movieSeats"));

// filter the data and get particular your selected movie seats list
var seatsAllocate = data.filter((item) => item.movieName == movieTitle)[0]
  .seats;

// check seatAvailable base on the seatType
function checkSeatsAvailable(seatName) {
  return seatsAllocate[seatName].filter((item) => item.hasBooked != true)
    .length;
}

// no seats are available for those type card is disable for those particular seatType
function seatAvailableAlert() {
  if (checkSeatsAvailable("standard") === 0) {
    standardSeatType.classList.add("disabled-card");
    var standardBtn = standardSeatType.childNodes[3];
    standardBtn.style = "cursor:not-allowed";
    standardBtn.innerHTML = "Not Available";
  }
  if (checkSeatsAvailable("premium") === 0) {
    premiumSeatType.classList.add("disabled-card");
    var premiumBtn = standardSeatType.childNodes[3];
    premiumBtn.style = "cursor:not-allowed";
    premiumBtn.innerHTML = "Not Available";
  }
}

seatAvailableAlert();


// choose seat type option
for (let i = 0; i < chooseTypeBtn.length; i++) {
  chooseTypeBtn[i].addEventListener("click", function () {
    if (chooseTypeBtn[i].innerHTML === "Select") {
      localStorage.setItem("seatType", JSON.stringify(seatType[i].innerHTML));
      enabledTheGoToSeatsBtn();
      chooseTypeBtn[i == 0 ? i + 1 : i - 1].classList.remove("btn-done");
      chooseTypeBtn[i].classList.add("btn-done");
    } else {
      chooseTypeBtn[i == 0 ? i + 1 : i - 1].classList.remove("btn-done");
    }
  });
}

// choose no of seats
for (let i = 0; i < seatQty.length; i++) {
  seatQty[i].addEventListener("click", function () {
    localStorage.setItem("seatQty", JSON.stringify(seatQty[i].innerHTML));
    enabledTheGoToSeatsBtn();
    seatQty[i].classList.add("btn-done1");
    removeOtherClass(i);
  });
}

// remove other qty seats are selected already
function removeOtherClass(select) {
  for (let i = 0; i < seatQty.length; i++) {
    if (i !== select) {
      seatQty[i].classList.remove("btn-done1");
    }
  }
}

// go next page button enable and disable handle this function
function enabledTheGoToSeatsBtn() {
  if (localStorage.getItem("seatType") && localStorage.getItem("seatQty")) {
    goToSeatsBtn.classList.remove("btn-disabled");
  } else {
    goToSeatsBtn.classList.add("btn-disabled");
  }
}

// if button is enable then go to next page
goToSeatsBtn.addEventListener("click", function () {
  let seatType = JSON.parse(localStorage.getItem('seatType'));
  let seatQty = JSON.parse(localStorage.getItem('seatQty'));
  if (!seatType && !seatQty) {
    return alert("Please select 'Seat Type' and 'Seat Quantity' ");
  }
  if (!seatType) {
    return alert('Please select "Seat Type" ');
  }
  if (!seatQty) {
    return alert("Please Select no.s of seats you want");
  }
  window.location.href = "seats.html";
});
