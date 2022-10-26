var standardContainer = document.querySelector(".standard-container");
var premiumContainer = document.querySelector(".premium-container");
var premiumSeats = document.querySelector(".premium-btns");
var standardSeats = document.querySelector(".standard-btns");

var payBtn = document.querySelector(".pay-now");
var selectedSeats = document.querySelector(".seats-qty");
var selectedSeatsPrice = document.querySelector(".seats-price");

//get the data from local storage
var movieTitle = JSON.parse(localStorage.getItem("movieTitle"));
var data = JSON.parse(localStorage.getItem("movieSeats"));
var seatQty = JSON.parse(localStorage.getItem("seatQty"));
var seatType = JSON.parse(localStorage.getItem("seatType"));

// select those buttons based on SeatType
var seatBtns = document.getElementsByClassName(`${seatType.toLowerCase()}-btn`);

//for premium and standard seats arrange

function showSeats(typeofSeat, parentElement) {
  var seatsAllocate = data.filter((item) => item.movieName == movieTitle)[0]
    .seats[typeofSeat];
  parentElement.innerHTML = "";

  seatsAllocate.map(function (item, index) {
    var button = document.createElement("button");
    if (typeofSeat == "premium") {
      button.setAttribute("class", "premium-btn");
    } else {
      button.setAttribute("class", "standard-btn");
    }
    if (item.hasBooked) {
      button.setAttribute("class", "booked-btn");
    }
    button.innerHTML = item.seatNo;
    parentElement.append(button);
  });
}
showSeats("premium", premiumSeats);
showSeats("standard", standardSeats);


//no access the other seats
function noAccessSeats() {
  if (seatType == "Premium") {
    standardContainer.classList.add("no-access-seats");
  } else {
    premiumContainer.classList.add("no-access-seats");
  }
}
noAccessSeats();

// select the seat and store into localStorage
let seatsArr = [];

for (let i = 0; i < seatBtns.length; i++) {
  seatBtns[i].addEventListener("click", function () {
    seatBtns[i].classList.toggle("select-btn");
    var userSelectedSeats = uniqueSeatsArr(seatBtns[i].innerHTML);
    selectedSeats.innerHTML = userSelectedSeats.length;
    if (seatType == "Premium") {
      selectedSeatsPrice.innerHTML = "₹" + userSelectedSeats.length * 300;
    } else {
      selectedSeatsPrice.innerHTML = "₹" + userSelectedSeats.length * 250;
    }
    localStorage.setItem("seats", JSON.stringify(userSelectedSeats));
  });
}

function uniqueSeatsArr(n) {
  if (seatsArr.length == seatQty) {
    seatsArr = [];
    removeOtherClass(n);
  }
  if (seatsArr.includes(n)) {
    return (seatsArr = seatsArr.filter((i) => i !== n));
  } else {
    seatsArr.push(n);
    return seatsArr;
  }
}

function removeOtherClass(n) {
  for (let i = 0; i < seatBtns.length; i++) {
    if (seatBtns[i].innerHTML !== n) {
      seatBtns[i].classList.remove("select-btn");
    }
  }
}

payBtn.addEventListener("click", function () {
  //booked the seat after click pay
  let seatsSelected = JSON.parse(localStorage.getItem("seats"));
  var seatsAllocate = data.filter((item) => item.movieName == movieTitle)[0]
    .seats;
  if(!seatsSelected){
    return alert('Please select  seats and move forward to pay')
  }
  for (let i = 0; i < seatsSelected.length; i++) {
    seatsAllocate.premium.map(function (item) {
      if (item.seatNo == seatsSelected[i]) {
        item.hasBooked = true;
      }
    });
    seatsAllocate.standard.map(function (item) {
      if (item.seatNo == seatsSelected[i]) {
        item.hasBooked = true;
      }
    });
  }
  localStorage.setItem("movieSeats", JSON.stringify(data));
  if (JSON.parse(localStorage.getItem("seats")).length > 0) {
    window.location.href = "congrats.html";
  } else {
    alert("No seats are selected, please select the seats!");
  }
});
