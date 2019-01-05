"use strict";
// API CALL
fetch('https://randomuser.me/api/?results=12&inc=name,email,location,dob,picture,phone&nat=us')
.then(response => response.json())
.then(data => {


//DOM ELEMENTS
  const directoryContainer = document.getElementsByClassName("container")[0];
  const modal = document.querySelector(".simpleModal");
  const modalContent = document.querySelector(".modal-content");



// returns formatted DOB
  const formatBirthday = (data) => {
    let dob = data.slice(0,10).split("-");
    let day = dob.pop();
    let month = dob.pop();
    let year = dob.pop();
    return  `${month}/${day}/${year}`;

  }

// appends input element
  let input = document.createElement("input");
  input.placeholder = "Search";
  document.querySelector("body").insertBefore(input, directoryContainer);
  const inputElement = document.querySelector("input");



 // holds JSON data
  let randomUsers = data.results;


// appends clicked card info to modal
function appendsInfoToModal(user) {
  document.querySelector(".modal-address").textContent = user.address.street;
  document.querySelector(".modal-photo").src = user.photo;
  document.querySelector(".modal-name").textContent = user.name;
  document.querySelector(".modal-email").textContent = user.email;
  document.querySelector(".modal-city").textContent = user.address.city;
  document.querySelector(".modal-phone").textContent = user.phone
  document.querySelector(".modal-birthday").textContent = `Birthday: ${formatBirthday(event.target.parentNode.parentNode.children[1].children[6].textContent)}`;
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
directoryContainer.addEventListener("click", (event) => {
   if (event.target.tagName === "P" || event.target.tagName === "IMG") {

     const user = {
       photo: event.target.parentNode.parentNode.children[0].childNodes[1].attributes[2].value,
       name: event.target.parentNode.parentNode.children[1].children[0].textContent,
       email: event.target.parentNode.parentNode.children[1].children[1].textContent,
       phone: event.target.parentNode.parentNode.children[1].children[4].textContent,

       address: {
         street: event.target.parentNode.parentNode.children[1].children[5].textContent,
         city: event.target.parentNode.parentNode.children[1].children[2].textContent
       }
     }

   appendsInfoToModal(user);

   }

  else if (event.target.className === "box") {
    appendsInfoToModal(user);

   }
})


// closes modal
document.querySelector(".closeBtn").addEventListener("click",() => {
   modalContent.classList.remove("modal-content");
   modalContent.classList.add("modal-content-out");

setTimeout(()=> {
  modal.style.display = "none";
  modalContent.classList.remove("modal-content-out");
  modalContent.classList.add("modal-content");
}, 600);

})

//filters employees
inputElement.addEventListener("keyup", (event)=> {

let searchResult = inputElement.value.toUpperCase();
 const employeeNames = [...document.getElementsByClassName("contact-name")];

   employeeNames.forEach(employee => {
     const employeeNameCapitalized = employee.textContent.toUpperCase();
      if (employeeNameCapitalized.indexOf(searchResult) > -1 ) {
           employee.parentNode.parentNode.style.display = "";
      }else {
         employee.parentNode.parentNode.style.display = "none";
      }
   })
})


})
.catch(error => console.log("LOOKS LIKE THERE'S AN ERROR", error));
