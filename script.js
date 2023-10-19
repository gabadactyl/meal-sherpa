// L+G: Array to populate the menu
const menu = [
  {
    id: 1,
    title: "Mexican",
    img: "https://images.unsplash.com/photo-1625167171750-419e95f877d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1leGljYW4lMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    description:
      "<a href='https://thetacoproject.com/our-menu/'>The Taco Project</a> <br> <a href='https://chichos.square.site/#kbWfHr'>Chicho's Cocina</a>",
  },
  {
    id: 2,
    title: "Mediterranean",
    img: "https://media.istockphoto.com/id/1461256163/photo/feta-cheese-salad-on-wooden-table.jpg?s=612x612&w=0&k=20&c=JISWAr9aTfUdLkgoR2rSWQN-ZzfQvOrhG9stauCUqSE=",
    description:
      "<a href='https://www.grubhub.com/restaurant/laylas-falafel-936-high-ridge-rd-stamford/301826?classicAffiliateId=%2Fr%2Fw%2F25803%2F&utm_source=kitchen.grubhub.com&utm_medium=OOL&utm_campaign=order%20online&utm_content=301826'>Layla's Falafel</a>",
  },
  {
    id: 3,
    title: "Asian Fusion",
    img: "https://media.istockphoto.com/id/1413801779/photo/papaya-salad-seafood-salad-salted-egg-salad-with-steamed-sticky-rice-and-vegetables-on-banana.webp?b=1&s=170667a&w=0&k=20&c=1ScXPi0RBHNe9qX8VdhfEHr9hPw4MqHG8W9Mj69hNT0=",
    description:
      "<a href='https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=e0efc18a-5858-44ae-a030-231a2b59e480&client_is_mobile=true'>Asiana Bistro</a> <br> <a href='https://www.kikustamford.com/menu'>Kiku</a>",
  },
  {
    id: 4,
    title: "Italian",
    img: "https://images.unsplash.com/photo-1616299915952-04c803388e5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGl0YWxpYW4lMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    description:
      "<a href='https://zazagastrobar.com/menu/'>Zaza</a> <br> <a href='https://order.toasttab.com/online/fortina-stamford#!/'>Fortina</a>",
  },
];

//L: Function to display the menu
const menuContainer = document.getElementById("menu-container");

menu.forEach((item) => {
  const menuItem = document.createElement("div");
  menuItem.className = "menu-item";
  menuItem.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div class="menu-item-title">${item.title}</div>
        <div class="menu-item-description">${item.description}</div>
    `;
  menuContainer.appendChild(menuItem);
});

//L: Function to randomize a meal
function randomizeMeal() {
  const randomIndex = Math.floor(Math.random() * menu.length);
  const meal = menu[randomIndex];
  alert(`How about ${meal.title}?`);
}

// L: Event listener for the "Randomize Meal" button
const randomizeButton = document.getElementById("randomizeButton");
randomizeButton.addEventListener("click", randomizeMeal);

//G: DOM event listener when 1. confirm details is clicked in form, saves in local storage and shows info
document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitReservation");
  const nameInput = document.getElementById("name");
  const dateInput = document.getElementById("date");
  const guestsInput = document.getElementById("guests");

  submitButton.addEventListener("click", function () {
    event.preventDefault(); // Prevent the form from submitting
    const name = nameInput.value;
    const selectedDate = dateInput.value;
    const numberOfGuests = parseInt(guestsInput.value);

    if (!name || !selectedDate || isNaN(numberOfGuests)) {
      alert("Please fill out all required fields.");
    } else {
      const menuSelection = document.getElementById("menu").value;
      alert(
        `Thank you ${name}, for your reservation on ${selectedDate} for ${numberOfGuests} guests. Looking forward to enjoying ${menuSelection} with you!! 🍲`
      );

      // Store the reservation details in local storage
      const reservationDetails = {
        name,
        selectedDate,
        numberOfGuests,
        menuSelection,
      };
      localStorage.setItem(
        "reservationDetails",
        JSON.stringify(reservationDetails)
      );

      // Reload the page in case you want to change
      location.reload();

      // Display the button to send reservation details
      document.getElementById("sendReservationButton").style.display = "block";
    }
  });

  // G: Event listener for the "2. Send me the deets" aka Send Reservation button
  document
    .getElementById("sendReservationButton")
    .addEventListener("click", function () {
      // Get the reservation details from local storage
      const storedReservationDetails =
        localStorage.getItem("reservationDetails");

      if (storedReservationDetails) {
        const reservationDetails = JSON.parse(storedReservationDetails);
        // const phoneNumber = prompt('Please enter the phone number for sending the reservation details via text:');

        const message = `Hey there! Here's my reservation for your dinner party! \n Name: ${reservationDetails.name}\n Date: ${reservationDetails.selectedDate}\n Guests: ${reservationDetails.numberOfGuests}\n Preference: ${reservationDetails.menuSelection}`;

        if (confirm("Do you want to send the reservation details via text?")) {
          // Open the SMS app with the message and phone number
          window.open(`sms:$?&body=${message}`);
        }
      } else {
        alert("No reservation details found.");
      }
    });
});
