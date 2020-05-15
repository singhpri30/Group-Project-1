# Project: ***Covid-19 Tracker***
Objective: The COVID-19 Tracker is an application that will assist organizations across NH in administering their screenings as well as provide their staff with important resources, communications, and data surrounding COVID-19.

## User Story
```
As a NH based employer
I WANT to develop a process for screening all employees reporting to work for COVID-19 related symptoms
SO THAT I may ensure the safety of my staff and adhere to NH’s STAY AT HOME 2.0 UNIVERSAL GUIDELINES requirements:
https://www.governor.nh.gov/news-media/stay-at-home/documents/20200501-universal.pdf
```
## Acceptance Criteria
```
GIVEN the screener needs to ask the employee a series of questions and assess their responses
WHEN I click the button to initiate a screening
THEN I am presented with a series of questions that require input
WHEN prompted for the date
THEN I enter the current date
WHEN prompted for the name of the employee CONDUCTING the screening
THEN the screener name is entered
WHEN prompted for the name of the employee BEING screened
THEN their name is entered
WHEN prompted with Q1 “Have you been in close contact with a confirmed case of COVID-19?”
THEN based on their response I select “Yes” or “No”
WHEN prompted with Q2 “Have you had a fever or felt feverish in the last 72 hours?”
THEN based on their response I select “Yes” or “No”
WHEN prompted with Q3 “Are you experiencing any respiratory symptoms including a runny
nose, sore throat, cough, or shortness of breath?”
THEN based on their response I select “Yes” or “No”
IF “Yes” is selected
THEN I am presented with a series of checkboxes and select all that apply (need to select at least one): runny nose, sore throat, cough, shortness of breath;
WHEN prompted with Q4 “Are you experiencing any new muscle aches or chills?”
THEN based on their response I select “Yes” or “No”
WHEN prompted with Q5 “Have you experienced any new change in your sense of taste or smell?”
THEN based on their response I select “Yes” or “No”
WHEN prompted for the employees temperature
THEN based on the thermometers reading I enter the TEMP
WHEN all Questions are answered
IF the employee responded “Yes” to at least one Q
OR
IF the employee responded “No” to all Q’s but has a temperature equal to or greater than 100 degrees Fahrenheit
THEN the employee must be instructed to leave the premises immediately and to seek medical advice
IF the employee answered “No” to all Q’s and doesn’t have a fever then they can stay
WHEN the final result is presented
THEN the data from the screening is stored to a table
```


### Technical Specification:
* This application has been designed using the Bulma CSS framework.
* An event listener has been added when a user clicks on the ***start screening button*** button.
* The elements have been created dynamically to display screening questions.
* An event listener for the ***submit*** buttons to save data to local storage
* The Resources page has been created using the Bulma template.
* The elements on the COVID New page has been created dynamically to display news.
* The news data has been fetched using third party API
* The elements on COVID Stats page have been created dynamically to covid-19 statistics.
* The data has been fetched using third party API.
* The Chart.js library has been to display data on the chats
* This project utilizes the use of moment.js for time formatting



### Functional Specification:
* A navbar with the different link to various pages and it is consistent across all the webpages.
* On the Home page, start your screening button will redirect the user to the survey page.
* On the Survey page, the user will be presented with screening questions.
* User will be redirected to the employee data page once all the questions have been answered.
* On Employee data page, the user can signup and view all the employee data
* On the Resources page, the user can get more information about covid-19.
* On COVID News page, the user can read covid-19 related news.
* On COVID Stats page, the user can check covid-19 statistics in World, USA, and NH.

### This project features responsive design using a media queries
*Has responsive layout for:*
* Small devices (landscape phones, 576px and up) 
* Medium devices (tablets, 768px and up) 
* Large devices (desktops, 992px and up) 


### To Execute File:
Open in browser

## Developer ##

**Ffej Caplan**

**Priyanka Singh**

**Remi Muinatu Ibraheem**

**Sam Bonias**




### Below are the links of the deployed project: ###

*https://github.com/Team-1-UNH-Bootcamp/Group-Project-1*

*https://team-1-unh-bootcamp.github.io/Group-Project-1/index.html*
