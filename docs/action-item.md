# Action Item
The below info is just an example.

## User Story List
* User story 1: [As an user, I hope I can see the current unsteady test cases directly as soon as I enter Travis-reporter.](https://github.com/evanxd/travis-reporter/issues/48)
* User story 2: [As an user, I hope I can add, reduce, and define the search criteria by myself to find the test case information I want.](https://github.com/evanxd/travis-reporter/issues/49)
* User story 3: [As an user, I hope I can examine the Travis jobs of a certain test case within a period after I click on that test case displayed in the Risky table.](https://github.com/evanxd/travis-reporter/issues/50)
* User story 4: [As an user, I hope I can understand the success/faliure trend of a certain test case easily by a line chart.](https://github.com/evanxd/travis-reporter/issues/51)

## Action Item List
* Action item 1: [Establish a database.](https://github.com/evanxd/travis-reporter/issues/52)
* Action item 2: [Fetch the up-to-date data from Travis-CI.](https://github.com/evanxd/travis-reporter/issues/53)
* Action item 3: [Analyze and filter the data fetched from Travis-CI.](https://github.com/evanxd/travis-reporter/issues/55)
* Action item 4: [Update the database.](https://github.com/evanxd/travis-reporter/issues/56)
* Action item 5: [Define an API to search data corresponding to the condition and return the result.](https://github.com/evanxd/travis-reporter/issues/59)
* Action item 6: [Define an API to create new tab when user click on test file(details).](https://github.com/evanxd/travis-reporter/issues/60)
* Action item 7: [Define an API to set data of chart and return it.](https://github.com/evanxd/travis-reporter/issues/62)
* Action item 8: [Receive user's input(detail, search tool, home).](https://github.com/evanxd/travis-reporter/issues/63)
* Action item 9: [Show data gotten from search API.](https://github.com/evanxd/travis-reporter/issues/54)
* Action item 10: [Show chart.](https://github.com/evanxd/travis-reporter/issues/57)
* Action item 11: [Return to home page.](https://github.com/evanxd/travis-reporter/issues/57)
* Action item 12: [Use a mongoDB to produce a simple database table.](https://github.com/evanxd/travis-reporter/issues/71)

## Item Dependences
###[Travis Reporter](https://github.com/evanxd/travis-reporter)

#####-> User story 1: [As an user, I hope I can see the current unsteady test cases directly as soon as I enter Travis-reporter.](https://github.com/evanxd/travis-reporter/issues/48)
######--> [Establish a database.](https://github.com/evanxd/travis-reporter/issues/52)
######--> [Fetch the up-to-date data from Travis-CI.](https://github.com/evanxd/travis-reporter/issues/53)
######--> [Analyze and filter the data fetched from Travis-CI.](https://github.com/evanxd/travis-reporter/issues/55)
######---> [Update the database.](https://github.com/evanxd/travis-reporter/issues/56)
######--> [Define an API to search data corresponding to the condition and return the result.](https://github.com/evanxd/travis-reporter/issues/59)
######---> [Show data gotten from search API.](https://github.com/evanxd/travis-reporter/issues/54)

#####-> User story 2: [As an user, I hope I can add, reduce, and define the search criteria by myself to find the test case information I want.](https://github.com/evanxd/travis-reporter/issues/49)
######--> [Establish a database.](https://github.com/evanxd/travis-reporter/issues/52)
######--> [Fetch the up-to-date data from Travis-CI.](https://github.com/evanxd/travis-reporter/issues/53)
######--> [Analyze and filter the data fetched from Travis-CI.](https://github.com/evanxd/travis-reporter/issues/55)
######---> [Update the database.](https://github.com/evanxd/travis-reporter/issues/56)
######--> [Define an API to search data corresponding to the condition and return the result.](https://github.com/evanxd/travis-reporter/issues/59)
######---> [Show data gotten from search API.](https://github.com/evanxd/travis-reporter/issues/54)

#####-> User story 3: [As an user, I hope I can examine the Travis jobs of a certain test case within a period after I click on that test case displayed in the Risky table.](https://github.com/evanxd/travis-reporter/issues/50)
######--> [Establish a database.](https://github.com/evanxd/travis-reporter/issues/52)
######--> [Fetch the up-to-date data from Travis-CI.](https://github.com/evanxd/travis-reporter/issues/53)
######--> [Analyze and filter the data fetched from Travis-CI.](https://github.com/evanxd/travis-reporter/issues/55)
######---> [Update the database.](https://github.com/evanxd/travis-reporter/issues/56)
######--> [Define an API to search data corresponding to the condition and return the result.](https://github.com/evanxd/travis-reporter/issues/59)
######---> [Show data gotten from search API.](https://github.com/evanxd/travis-reporter/issues/54)
######----> [Receive user's input(detail, search tool, home).](https://github.com/evanxd/travis-reporter/issues/63)

#####-> User story 4: [As an user, I hope I can understand the success/faliure trend of a certain test case easily by a line chart.](https://github.com/evanxd/travis-reporter/issues/51)
######--> [Establish a database.](https://github.com/evanxd/travis-reporter/issues/52)
######--> [Fetch the up-to-date data from Travis-CI.](https://github.com/evanxd/travis-reporter/issues/53)
######--> [Analyze and filter the data fetched from Travis-CI.](https://github.com/evanxd/travis-reporter/issues/55)
######---> [Update the database.](https://github.com/evanxd/travis-reporter/issues/56)
######--> [Define an API to search data corresponding to the condition and return the result.](https://github.com/evanxd/travis-reporter/issues/59)
######---> [Show data gotten from search API.](https://github.com/evanxd/travis-reporter/issues/54)
######----> [Receive user's input(detail, search tool, home).](https://github.com/evanxd/travis-reporter/issues/63)
######-----> [Show chart.](https://github.com/evanxd/travis-reporter/issues/57)