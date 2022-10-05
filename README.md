# TechLab-Issue-Tracker
TechLab-Issue-Tracker is a web-application where users can track issues or bugs related to their project.

# Deployment Link
My project is deployed on Heroku. Click on the link given below to checkout my project.

[Visit TechLab](https://techlab-issue-tracker.herokuapp.com/)

# Technologies Used
This project was built using the following technologies :
* <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
* <img alt="Express.js" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
* <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">

### NPM packages used :
Important NPM packages used are as follows :

* [ejs](https://ejs.co/) : Templating engine(Embedded JavaScript)
* [express](http://expressjs.com/) : Express.js is a backend framework for Node.js
* [mongoose](https://mongoosejs.com/) : Mongoose ODM
* [node-sass-middleware](https://www.npmjs.com/package/node-sass-middleware) : Compiles .scss files to css
* [passport](https://www.passportjs.org/) : Passport authentication middleware used to authenticate users
* [passport-local](https://www.passportjs.org/packages/passport-local/) : Passport strategy for authenticating with a username and password
* [sass](https://www.npmjs.com/package/sass) : JavaScript implementation of Sass

# Features

## Project Dashboard Page

1. Displays a list of projects.
2. Displays a button to create new project.

## Create Project Page 

1. Displays a form to create a project with the following fields :

     1.1 Name
   
     1.2 Author
   
     1.3 Description
   
## Project Detail Page

1. When the user clicks on a project on Project Dashboard Page, the user is redirected to this page which shows all the issues/bugs related to the project.
2. User can search for issues/bugs by title, author, labels or description.
3. This page also contains a button to create new issues.

## Create Issue Page

1. Displays a form to create an issue with the following fields :

     1.1 Title
   
     1.2 Author
   
     1.3 Labels
   
     1.4 Description
     
# Installation
1. Install Node.js and MongoDB on your machine.
2. Download this project.
3. Open the terminal and make this project the current working directory.
```
$ cd ./TechLab-Issue-Tracker
```
4. Install all the dependencies.
```
$ npm install
```
5. Setup environment variables.

     [How To Set Environment Variables](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html)
     
6. Start the server.
```
$ npm start
```

# How to use ?

Watch the following demo video to get a complete understanding on how to use the project :
[Demo Video](https://drive.google.com/file/d/1zGe0xjvpOVQ1cuNHQTbnWYDwvi6znuiz/view)
