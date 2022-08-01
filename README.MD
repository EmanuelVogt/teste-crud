# Simple crud 

login authentication and crud operations using html, css and javascript in the frontend and nodejs with mysql in the backend api;

## Installation

this project was created by nodejs in the LTS version, so: [nodejs](https://nodejs.org/en/) 


first of all, install the dependencies

express: to handle with static files and create the routes

bodyParser: to handle with parse data in the request body to json

and mysql

so... run:

```bash
yarn or npm install
```

## Usage

you need to creat an database in mysql

follow this tutorial to install mysql in the linux OS: [mysql linux](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04)

follow this tutorial to install mysql in the Windown OS with WLS2: [win WSL2](https://pen-y-fan.github.io/2021/08/08/How-to-install-MySQL-on-WSL-2-Ubuntu/)

i dont know how install in MAC OS and Win without WLS2
```mysql
after you login in the mysql using: sudo mysql -p, and entering with you password setted in the turorial
run:

CREATE DATABASE crud;

USE crud;

CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL);

and create you user to make the login: 

INSERT INTO users(username, password)
VALUES ('user1', '12345678');

so, now you just open the app folder and run: node .

it will run the index.js, and  you able to open in the browser the follow link: http://localhost:8080 and make login with you user!

```