//---------------------burger functionality----------------------
(function () {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function () {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

//---------------Function to transitions the panels----------------
var signUpButton = document.getElementById("signUp");
var signInButton = document.getElementById("signIn");
var container = document.getElementById("container");

signUpButton.addEventListener("click", rightPanelAdd);
function rightPanelAdd() {
  container.classList.add("right-panel-active");
}

signInButton.addEventListener("click", rightPanelRemove);
function rightPanelRemove() {
  container.classList.remove("right-panel-active");
  location.reload();
}

//--------------------Function to accept login credentials-------------------
var existingEntries = JSON.parse(localStorage.getItem("allEntries")) || [];
console.log(existingEntries);
// click event for the login button to run function
$("#button1").on("click", getInfo);

function getInfo() {
  //declare a variable to store the input from username input field
  var username = document.getElementById("username1").value;
  //declare a variable to store the input from password input field
  var password = document.getElementById("password1").value;
  //declare a variable to reference the tag that needs text output
  var result = document.querySelector(".result");

  for (var i = 0; i < existingEntries.length; i++) {
    // check if user input matches username and password of a current index of the existingEntries object array
    if (
      username == existingEntries[i].username &&
      password == existingEntries[i].password
    ) {
      // if login credentials match, divert user to employee data page (currently coded to go to resources page)
      window.open("resources.html");
      return;
    }
  }
  //else notify of "incorrect username or password"
  //needed to apply "event.preventDefault" due to output appearing then disappearing (form)
  event.preventDefault(
    (result.textContent =
      "You've entered an incorrect userName or Password. Try again")
  );
}

//------------Function to clear login credentials upon signUp button click-------------
$("#signUp").on("click", clearInput);
function clearInput() {
  document.querySelector(".result").textContent = "";
  document.getElementById("username1").value = "";
  document.getElementById("password1").value = "";
}

//-----------Function to reigister a new user and populate local storage obj array-------------
//When userName and password is entered and user clicks sign-up button the following should happen
//  the username and password is recorded into an array object
//  the array object is saved to local storage

$("#button2").on("click", registerUser);

function registerUser() {
  var newUsername = document.getElementById("newUsername").value;
  var newPassword = document.getElementById("newPassword").value;
  var result2 = document.querySelector(".result2");

  var newUser = {
    username: newUsername,
    password: newPassword,
  };
  //this if statements prevents this from running unless input fields have values
  if (newUsername !== "" && newPassword !== "") {
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if (existingEntries == null) existingEntries = [];
    localStorage.setItem("newUser", JSON.stringify(newUser));
    existingEntries.push(newUser);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
    //needed to apply "event.preventDefault" due to output appearing then disappearing (form)
    event.preventDefault(
      (result2.textContent = "You've successfully registered!")
    );
  }
}

//--------------Sources-----------------------
// https://www.youtube.com/watch?v=mUdo6w87rh4 (traversy media)
// https://www.freecodecamp.org/forum/t/uncaught-typeerror-cannot-read-property-length-of-null-error/332786/7
// https://www.w3schools.com/jsref/met_win_settimeout.asp
// https://www.w3schools.com/jsref/met_loc_reload.asp
// https://stackoverflow.com/questions/39407803/why-does-settimeoutlocation-reload-throw-a-typeerror/39407908
// https://stackoverflow.com/questions/19635077/adding-objects-to-array-in-localstorage
// https://developer.mozilla.org/en-US/docs/Web/API/Window/open
