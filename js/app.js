"use strict";
// API CALL
fetch('https://randomuser.me/api/?results=12&inc=name,email,location,dob,picture,phone&nat=us')
.then(response => response.json())
.then(data => {
  

//DOM ELEMENTS
  const directoryContainer = document.getElementsByClassName("container")[0];
  const closeButton = document.querySelector(".closeBtb");
  const modal = document.getElementById("simpleModal");
  const arrowback = document.getElementById("arrowback");



// returns formatted DOB
  const formatBirthday = (data) => {
    let dob = data.slice(0,10).split("-");
    let day = dob.pop();
    let month = dob.pop();
    let year = dob.pop();
    let bDay = `${month}/${day}/${year}`;
    return bDay;

  }

// appends input element
  let input = document.createElement("input");
  input.placeholder = "Search";
  document.querySelector("body").insertBefore(input, directoryContainer);
  const inputElement = document.querySelector("input");



 // binding holds JSON data
  let results = data.results;



// maps through fetch api data and appends via innerHTML
       directoryContainer.innerHTML = `
     ${results.map((item) => `
           <div class="box">
        <div>
           <img class="photo" alt="profile-pic" src=${item.picture.large}>
        </div>
             <div class="contact-info">
               <p class="contact-name">${item.name.first} ${item.name.last}</p>
               <p class="contact-email">${item.email}</p>
               <p class="contact-city">${item.location.city}</p>
                <hr class="border"/>
               <p class="phone">${item.phone}</p>
               <p class="contact-address">${item.location.street}, ${item.location.state} ${item.location.postcode}</p>
               <p class="contact-birthday">${item.dob.date}</p>
             </div>
           </div>
           `).join("")}
       `

       //  listener fires when a box is clicked
directoryContainer.addEventListener("click", (event) => {
   if (event.target.tagName === "P" || event.target.tagName === "IMG") {

  document.querySelector(".modal-photo").src =   event.target.parentNode.parentNode.children[0].childNodes[1].attributes[2].value;
  document.querySelector(".modal-name").textContent = event.target.parentNode.parentNode.children[1].children[0].textContent;
  document.querySelector(".modal-email").textContent = event.target.parentNode.parentNode.children[1].children[1].textContent;
  document.querySelector(".modal-city").textContent = event.target.parentNode.parentNode.children[1].children[2].textContent;
  document.querySelector(".modal-border").style.display = "block";
  document.querySelector(".modal-phone").textContent = event.target.parentNode.parentNode.children[1].children[4].textContent;
  document.querySelector(".modal-address").textContent = event.target.parentNode.parentNode.children[1].children[5].textContent;
  document.querySelector(".modal-birthday").textContent = `Birthday: ${formatBirthday(event.target.parentNode.parentNode.children[1].children[6].textContent)}`;
  modal.style.display = "block";
   }
  else if (event.target.className === "box") {
     document.querySelector(".modal-photo").src = event.target.children[0].childNodes[1].attributes[2].value;
    document.querySelector(".modal-name").textContent = event.target.children[1].children[0].textContent;
    document.querySelector(".modal-email").textContent = event.target.children[1].children[1].textContent;
    document.querySelector(".modal-city").textContent = event.target.children[1].children[2].textContent;
    document.querySelector(".modal-border").style.display = "block";
    document.querySelector(".modal-phone").textContent = event.target.children[1].children[4].textContent;
    document.querySelector(".modal-address").textContent = event.target.children[1].children[5].textContent;
    document.querySelector(".modal-birthday").textContent = `Birthday: ${formatBirthday(event.target.children[1].children[6].textContent)}`;
    modal.style.display = "block";

   }

})


// closes modal
closeButton.addEventListener("click",() => {
     modal.style.display = "none";
})



//filters employees
inputElement.addEventListener("keyup", (event)=> {

let searchResult = inputElement.value.toUpperCase();
 const employeeNames = [...document.getElementsByClassName("contact-name")];

   employeeNames.forEach(employee => {
      if (employee.textContent.toUpperCase().indexOf(searchResult) > -1 ) {
           employee.parentNode.parentNode.style.display = "";
      }else {
         employee.parentNode.parentNode.style.display = "none";
      }
   })
})


})
.catch(error => console.log("LOOKS LIKE THERE'S AN ERROR", error));
