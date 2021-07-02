

CREATE TABLE IF NOT EXISTS addresses
(
    id     INT AUTO_INCREMENT PRIMARY KEY,
    addresstype VARCHAR(255) NOT NULL,
    street  VARCHAR(255) NOT NULL,
    usstate  VARCHAR(255) NOT NULL, 
    city  VARCHAR(255) NOT NULL,
    zip  VARCHAR(255) NOT NULL,
    apt  VARCHAR(255) NOT NULL,
    userid INT NOT NULL, 
    userorderid INT NOT NULL
);

CREATE TABLE IF NOT EXISTS books
(
    id     INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle  VARCHAR(255) NOT NULL,
    publisher  VARCHAR(255) NOT NULL, 
    currentedition INT NOT NULL,
    authorbio TEXT NOT NULL,
    synopsis TEXT NOT NULL,
    ISBN TEXT NOT NULL,
    dateordered INT, 
    dateshipped INT
);

CREATE TABLE IF NOT EXISTS bookerratas
(
    id     INT AUTO_INCREMENT PRIMARY KEY,
    bookid INT NOT NULL,
    fieldtypeVAR VARCHAR(255),
    --copyrights, authors, hashtags
    fields VARCHAR(255) NOT NULL 
);

CREATE TABLE IF NOT EXISTS messages
(
    id     INT AUTO_INCREMENT PRIMARY KEY,
    messagecontent TEXT NOT NULL,
    messagedate DATE NOT NULL,
    messageresponseid INT NOT NULL,
    messagefrom VARCHAR(255) NOT NULL,
    userid INT NOT NULL
);

CREATE TABLE IF NOT EXISTS revenuecosts
(
    id     INT AUTO_INCREMENT PRIMARY KEY,
    bookid INT, 
    userorderid INT,
    rcname VARCHAR(255) NOT NULL,
    rcdescription VARCHAR(255) NOT NULL,
    rcvalue INT NOT NULL,
    rcdate DATE NOT NULL
);


CREATE TABLE IF NOT EXISTS users
(
    id     INT AUTO_INCREMENT PRIMARY KEY,
    phone INT, 
    email VARCHAR(255),
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS userorder
(
    id     INT AUTO_INCREMENT PRIMARY KEY,
    dateordered DATE NOT NULL,
    dateshipped DATE NOT NULL
);

