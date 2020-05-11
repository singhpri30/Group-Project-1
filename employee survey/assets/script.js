//pulling date from moments and setting as a variable
var todayDate = moment().format("MM" + "-" + "DD" + "-" + "YY");
//adding the date stamp to the survey
$("#dateStamp").text(todayDate);

//survey questions set as an array to be looped through
var surveyQuestions = [
  "Have you been in close contact with a confirmed case of Covid-19?",
  "Have you had a fever or felt feverish in the last 72 hours?",
  "Are you experiencing any respiratory symptoms, including a runny nose, sore throat, cough, or shortness of breath?",
  "Are you experiencing any new muscle aches or chills?",
  "Have you experienced any new change in your sense of taste or smell?",
];

//for looping through questions
var questionNum = 0;

//pulls the list of admins from local storage as a string
var adminEntryListJSON = localStorage.getItem("admin-json");
//parses it be displayed in the select drop down
var adminEntryList = JSON.parse(adminEntryListJSON);

//same thing as above, but for employees
var employeeEntryListJSON = localStorage.getItem("employee-json");
var employeeEntryList = JSON.parse(employeeEntryListJSON);

//landing spot for answers after pulled from session storage
// will then be used to add to local storage for further use
var answerObject = {};

//looping through admin names in local storage to add to
// select drop down
//if there are no names in local storage, nothin happens
if (adminEntryList == null) {
} else {
  for (i = 0; i < adminEntryList.length; i++) {
    var addNameToSelector = $("<option>").text(adminEntryList[i]);
    $("#adminName").append(addNameToSelector);
  }
}
//same as above, but for employee list
if (employeeEntryList == null) {
} else {
  for (i = 0; i < employeeEntryList.length; i++) {
    var addNameToSelector = $("<option>").text(employeeEntryList[i]);
    $("#employeeName").append(addNameToSelector);
  }
}

// .one() function:
//https://stackoverflow.com/questions/2323948/disabling-the-button-after-once-click

//on click, an input field and add button appear
//survey taker can add a name to the list
$("#addAdmin").one("click", function () {
  var nameInput = $("<input>").attr({ class: "input", id: "newAdminName" });
  var addNameButton = $("<button>")
    .attr({ class: "btn", id: "addNewAdmin" })
    .text("Add");
  var addNameToSelector = $("<option>");
  $("#employeeAdmin").append(nameInput);
  $("#employeeAdmin").append(addNameButton);

  //when add button is clicked, name is appended to dom
  $("#addNewAdmin").click(function () {
    var newAdminToAdd = $("#newAdminName").val();
    $(addNameToSelector).text(newAdminToAdd);
    $("#adminName").append(addNameToSelector);
    $(nameInput).hide();
    $(addNameButton).hide();
  });
});

//same as above, but for employee field
$("#addEmployee").one("click", function () {
  var nameInput = $("<input>").attr({ class: "input", id: "newEmployeeName" });
  var addNameButton = $("<button>")
    .attr({ class: "btn", id: "addNewEmployee" })
    .text("Add");
  var addNameToSelector = $("<option>");
  $(addNameButton).attr("id", "addNewEmployee");
  $("#newEmployee").append(nameInput);
  $("#newEmployee").append(addNameButton);

  $("#addNewEmployee").click(function () {
    var newEmployeeToAdd = $("#newEmployeeName").val();
    $(addNameToSelector).text(newEmployeeToAdd);
    $("#employeeName").append(addNameToSelector);
    $(nameInput).hide();
    $(addNameButton).hide();
  });
});

//when start button is clicked
$("#startBtn").click(function () {
  //for looping through the admins in local storage
  var adminList = $("#adminName > option");
  var adminArrayLS = [];

  //looping through employees in ls
  var employeeList = $("#employeeName > option");
  var employeeArrayLS = [];

  //looping through admins and adding them to an array
  for (i = 1; i < adminList.length; i++) {
    var adminItemText = $(adminList[i]).val();
    adminArrayLS.push(adminItemText);
  }
  //looping through employees and adding to an array
  for (i = 1; i < employeeList.length; i++) {
    var employeeItemText = $(employeeList[i]).val();
    employeeArrayLS.push(employeeItemText);
  }
  //adding both lists to local storage so they can be accessed again
  adminArrayLSJSON = JSON.stringify(adminArrayLS);
  employeeArrayLSJSON = JSON.stringify(employeeArrayLS);
  localStorage.setItem("admin-json", adminArrayLSJSON);
  localStorage.setItem("employee-json", employeeArrayLSJSON);

  //creating an object to commit to session storage
  //object contains answers provided on this table
  var answersObject = {
    Date: todayDate,
    "Admin Name": $("#adminName option:selected").val(),
    "Employee Name": $("#employeeName option:selected").val(),
  };
  //clearing out anything already in session storage
  sessionStorage.clear();

  //adding to local storage
  answersObjectJSON = JSON.stringify(answersObject);
  sessionStorage.setItem("answers", answersObjectJSON);

  //asking the first question
  askQuestion();
});

//asks questions in sequential order
function askQuestion() {
  //clearing html
  $("#questionField").text("");
  //creating a paragraph and giving it an id = to its index in the surveyQuesions array
  var question = $("<p>").attr("id", questionNum);
  //adding question text
  $(question).text(surveyQuestions[questionNum]);

  //creating the next qusetion button
  var nextBtn = $("<button>")
    .attr({ class: "button", id: "nextBtn" })
    .text("Next");
  //appendnig question to field
  $("#questionField").append(question);

  //adding yes or no control buttons
  var radioAnswerdiv = $("<div>").attr({
    class: "control",
    id: "askQuestion",
  });
  var yesLabel = $("<label>").attr("class", "radio");
  var inputYes = $("<input>").attr({
    type: "radio",
    name: "q" + questionNum,
    value: "yes",
    id: "yesBtn",
  });

  var noLabel = $("<label>").attr("class", "radio");
  var inputNo = $("<input>").attr({
    type: "radio",
    name: "q" + questionNum,
    value: "no",
  });
  //appending to field
  $(yesLabel).text("yes ");
  $(noLabel).text("no ");
  $(yesLabel).append(inputYes);
  $(radioAnswerdiv).append(yesLabel);
  $(noLabel).append(inputNo);
  $(radioAnswerdiv).append(noLabel);

  $("#questionField").append(radioAnswerdiv);
  $("#questionField").append(nextBtn);

  //for taking the employee temperature
  function takeTemp() {
    $("#questionField").text("");
    var header = $("<h1>").text("Employee Temperature");
    var employeeTemp = $("<input>").attr({
      class: "input",
      type: "number",
      id: "employeeTemp",
    });
    var reviewBtn = $("<button>").attr({
      class: "button",
      id: "reviewBtn",
    });
    $(reviewBtn).text("Review");
    $("#questionField").append(header, employeeTemp, reviewBtn);
  }

  //adding answers to session storage
  function addAnswer() {
    var lsAnswers = sessionStorage.getItem("answers");
    var lsAnswersJSON = JSON.parse(lsAnswers);
    var answer = $("#askQuestion input:checked").val();
    var varName = "Question " + (parseInt(questionNum) + parseInt(1));
    var answerToAdd = {
      [varName]: answer,
    };
    var superObject = Object.assign(lsAnswersJSON, answerToAdd);
    console.log(superObject);
    var STRINGlsAnswersJSON = JSON.stringify(superObject);
    sessionStorage.setItem("answers", STRINGlsAnswersJSON);
  }

  function addTemp() {
    var lsAnswers = sessionStorage.getItem("answers");
    var lsAnswersJSON = JSON.parse(lsAnswers);
    var answer = $("#employeeTemp").val();
    var varName = "Employee Temperature";
    var answerToAdd = {
      [varName]: answer,
    };
    var superObject = Object.assign(lsAnswersJSON, answerToAdd);
    console.log(superObject);
    var STRINGlsAnswersJSON = JSON.stringify(superObject);
    sessionStorage.setItem("answers", STRINGlsAnswersJSON);
  }

  function askSymptoms() {
    event.preventDefault();
    $("#yesBtn").click(function () {
      var testPara = $("<p>").text("Please select any symptoms that apply:");
      //div
      var symptomsDiv = $("<div>");
      //label
      var labelElOne = $("<label>")
        .attr({ class: "button is-checkbox" })
        .text("Runny Nose")
        .css({ padding: "2px", margin: "2px" });
      var labelElTwo = $("<label>")
        .attr({ class: "button is-checkbox" })
        .text("Sore Throat")
        .css({ padding: "2px", margin: "2px" });
      var labelElThree = $("<label>")
        .attr({ class: "button is-checkbox" })
        .text("Cough")
        .css({ padding: "2px", margin: "2px" });
      var labelElFour = $("<label>")
        .attr({ class: "button is-checkbox" })
        .text("Shortness of Breath")
        .css({ padding: "2px", margin: "2px" });
      //input
      var inputRunnyNose = $("<input>").attr({
        type: "checkbox",
        name: "answer",
        id: "checkbox1",
        value: "unchecked",
        title: "Runny Nose",
      });
      //input
      var inputSoreThoat = $("<input>").attr({
        type: "checkbox",
        name: "answer",
        id: "checkbox2",
        title: "Sore Throat",
        value: "unchecked",
      });
      //input
      var inputCough = $("<input>").attr({
        type: "checkbox",
        name: "answer",
        id: "checkbox3",
        title: "Cough",
        value: "unchecked",
      });
      //input
      var inputShortnessOfBreath = $("<input>").attr({
        type: "checkbox",
        name: "answer",
        id: "checkbox4",
        title: "Shortness of Breath",
        value: "unchecked",
      });

      $(labelElOne).append(inputRunnyNose);
      $(labelElTwo).append(inputSoreThoat);
      $(labelElThree).append(inputCough);
      $(labelElFour).append(inputShortnessOfBreath);
      $(symptomsDiv).append(labelElOne, labelElTwo, labelElThree, labelElFour);
      $("#questionField").append(testPara, symptomsDiv);

      //var symptomsValue = [];
      for (i = 0; i <= 4; i++) {
        $("#checkbox" + i).change(function () {
          if ($(this).attr("value") === "unchecked") {
            $(this).attr("value", "checked");
            console.log($(this).attr("title") + ": checked");
          } else if ($(this).attr("value") === "checked") {
            $(this).attr("value", "unchecked");
            console.log($(this).attr("title") + ": unchecked");
          }
          //if ($("#checkbox input:checked") == true) {
          //for (i = 1; i <= 4; i++) {
          //  $("#checkbox" + i).change(function () {
          //    console.log($(this).attr("value"));
          //    $("#nextBtn").click(function () {
          //addAnswer();
          //    });
          //   });
          // }
          // }

          //    if ($(this).attr("value") === "checked") {
          //      var checkedSymptoms = $(this).attr("title");
          //      $(symptomsValue).push(checkedSymptoms);
          //      console.log(checkedSymptoms);
          //    }
        });
      }
    });
  }
  function addSymptoms() {
    for (i = 0; i < 4; i++) {
      if ($(this).attr("value") === "checked") {
        //var checkedSymptoms = $(this).attr("title");
        alert("hello!");
      }
    }
  }

  //functionality for the next question button
  $("#nextBtn").click(function () {
    if ($("#askQuestion input:checked").val() == null) {
      event.preventDefault();
      var pleaseAnswer = $("<p>")
        .text("Please Pick Yes or No")
        .css("color", "red");
      $("#questionField").append(pleaseAnswer);
    } else {
      addAnswer();

      questionNum++;
      //the third question (index 2) has a few potential follow-up questions
      if (questionNum === 2) {
        askQuestion();
        askSymptoms();

        //otherwise, just needs to ask questions
      } else if (questionNum < surveyQuestions.length && questionNum != 2) {
        askQuestion();

        //one all questions have been asked, just needs to
      } else {
        takeTemp();
        $("#reviewBtn").click(function () {
          addTemp();
          $("#questionField").text("");
          var header = $("<h1>")
            .text("Review Answers")
            .css("text-align", "center");
          var answerDisplayDiv = $("<div>").css("text-align", "center");

          var answersFromSessStor = sessionStorage.getItem("answers");
          var answersFromSessStorJSON = JSON.parse(answersFromSessStor);

          //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
          for (let [key, value] of Object.entries(answersFromSessStorJSON)) {
            var answerPara = $("<p>").text(`${key}: ${value}`);
            $(answerDisplayDiv).append(answerPara);
          }

          $("#questionField").append(header, answerDisplayDiv);
        });
      }
    }
  });
}
