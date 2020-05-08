## User Story

```
As a NH based employer
I WANT to develop a process for screening all employees reporting to work for COVID-19 related symptoms
SO THAT I may ensure the safety of my staff and adhere to NH’s STAY AT HOME 2.0 UNIVERSAL GUIDELINES requirements:
https://www.governor.nh.gov/news-media/stay-at-home/documents/20200501-universal.pdf
```

## Acceptance Criteria

```
LANDING PAGE = BULMA "HERO"
GIVEN the screener needs to ask the employee a series of questions and assess their responses
WHEN I click the button to initiate a screening
QUESTIONNAIRE = BULMA "CARDS" & "MODALS"
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
REPORTING PAGE = BULMA "TABLE" and accessible only via PASSWORD
THEN the data from the screening is stored to a table
GIVEN I am the employer
THEN when I enter a username and password I am presented with a table containing the employee screening data
```

## HTML Pages Required

```
Landing Page
Questionnaire Page
Resources Page
Employee Data Login Page
Employee Data Page
Dashboard Page
```

## Resources

```
Relevant COVID-19 links (possible API leads?)

Families First Coronavirus Response Act: Employer Paid Leave Requirements:
https://www.dol.gov/agencies/whd/pandemic/ffcra-employer-paid-leave

Prevention Tips:
https://www.cdc.gov/coronavirus/2019-ncov/index.html

NH COVID-19 STATS:
https://www.nh.gov/covid19/

COVID-19 Business Resources:
https://businesshelp.nheconomy.com/hc/en-us
```

## APIs

## Technical Specifications

## To Do List 5.4.20

```
Dave Allen's Suggestions
-User Story
-Flow Chart
-Wire Frame
-Flow
-Where are they going to click
-Where is that going to bring them
```
