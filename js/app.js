"use strict";
// API CALL
fetch('https://randomuser.me/api/?results=12&inc=name,email,location,dob,picture,phone&nat=us')
.then(response => response.json())
.then(data => {

  //DOM ELEMENTS
  const directoryContainer = document.getElementsByClassName("container")[0];
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");

  // returns formatted DOB
  const formatBirthday = data => {
    let splitBirthday = data.slice(0, 10).split("-");
    return `${splitBirthday[1]}/${splitBirthday[2]}/${splitBirthday[0]}`;
  }

  // appends input element
  let input = document.createElement("input");
  input.placeholder = "Search";
  document.querySelector("body").insertBefore(input, directoryContainer);
  const inputElement = document.querySelector("input");

  // holds JSON data
  let randomUsers = data.results;

  //appends info to modal
  function appendsEmployeeInfoToModal(userObj) {
    document.querySelector(".modal-photo").src = userObj.photo;
    document.querySelector(".modal-name").textContent = userObj.name;
    document.querySelector(".modal-email").textContent = userObj.email;
    document.querySelector(".modal-city").textContent = userObj.address.city;

    document.querySelector(".modal-phone").textContent = userObj.phone;
    document.querySelector(".modal-address").textContent = userObj.address.street;
    document.querySelector(".modal-birthday").textContent = `Birthday: ${formatBirthday(userObj.birthday)}`;
    document.querySelector(".modal-border").style.display = "block";
    modal.style.display = "block";
  }

  // maps through fetch api data and appends via innerHTML
  directoryContainer.innerHTML = `
     ${randomUsers.map(randomUser => `
           <div class="box">
        <div>
           <img class="photo" alt="profile-pic" src=${randomUser.picture.large}>
        </div>
             <div class="contact-info">
               <p class="contact-name">${randomUser.name.first} ${randomUser.name.last}</p>
               <p class="contact-email">${randomUser.email}</p>
               <p class="contact-city">${randomUser.location.city}</p>
                <hr class="border"/>
               <p class="phone">${randomUser.phone}</p>
               <p class="contact-address">${randomUser.location.street}, ${randomUser.location.state} ${randomUser.location.postcode}</p>
               <p class="contact-birthday">${randomUser.dob.date}</p>
             </div>
           </div>
           `).join("")}
       `

  //  listener fires when a box is clicked
  directoryContainer.addEventListener("click", event => {
    console.log(event.target);
    let randomUser = {};
    if (event.target.parentNode.parentNode.className === "box") {

      randomUser = {
        photo: event.target.parentNode.parentNode.children[0].childNodes[1].attributes[2].value,
        name: event.target.parentNode.parentNode.children[1].children[0].textContent,
        birthday: event.target.parentNode.parentNode.children[1].children[6].textContent,
        email: event.target.parentNode.parentNode.children[1].children[1].textContent,
        address: {
          city: event.target.parentNode.parentNode.children[1].children[2].textContent,
          street: event.target.parentNode.parentNode.children[1].children[5].textContent
        },
        phone: event.target.parentNode.parentNode.children[1].children[4].textContent
      }
      appendsEmployeeInfoToModal(randomUser);

    } else if (event.target.className === "box") {
      randomUser = {
        photo: event.target.children[0].childNodes[1].attributes[2].value,
        name: event.target.children[1].children[0].textContent,
        birthday: event.target.children[1].children[6].textContent,
        email: event.target.children[1].children[1].textContent,
        address: {
          city: event.target.children[1].children[2].textContent,
          street: event.target.children[1].children[5].textContent
        },
        phone: event.target.children[1].children[4].textContent
      }
      appendsEmployeeInfoToModal(randomUser);
    }

  });

  // closes modal
  document.querySelector(".closeBtn").addEventListener("click", () => {
    modalContent.classList.remove("modal-content");
    modalContent.classList.add("modal-content-out");

    setTimeout(() => {
      modal.style.display = "none";
      modalContent.classList.remove("modal-content-out");
      modalContent.classList.add("modal-content");
    }, 600);

  })

  //filters employees
  inputElement.addEventListener("keyup", event => {

    let searchResult = inputElement.value.toUpperCase();
    const employeeNames = [...document.getElementsByClassName("contact-name")];

    employeeNames.forEach(employee => {
      const employeeNameCapitalized = employee.textContent.toUpperCase();
      if (employeeNameCapitalized.indexOf(searchResult) > -1) {
        employee.parentNode.parentNode.style.display = "";
      } else {
        employee.parentNode.parentNode.style.display = "none";
      }
    })
  })

}).catch(error => console.log("LOOKS LIKE THERE'S AN ERROR", error));
