
-- DROP TABLE IF EXISTS books;

DROP TABLE IF EXISTS useraddress;
CREATE TABLE IF NOT EXISTS useraddress
(
    -- id     INT AUTO_INCREMENT PRIMARY KEY,
    addresstype VARCHAR(255) NOT NULL,
    street  VARCHAR(255) NOT NULL,
    usstate  VARCHAR(255) NOT NULL, 
    city  VARCHAR(255) NOT NULL,
    zip  VARCHAR(255) NOT NULL,
    apt  VARCHAR(255) NOT NULL,
    uniqueid VARCHAR(255) NOT NULL,
    useruniqueid VARCHAR(255) NOT NULL, 
    userorderuniqueid VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS book;
CREATE TABLE book
(
    -- id     INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle  VARCHAR(255) NOT NULL,
    publisher  VARCHAR(255) NOT NULL, 
    currentcopyright VARCHAR(65535) NOT NULL,
    bookedition VARCHAR(65535) NOT NULL,
    uniqueid VARCHAR(65535) NOT NULL,
    authorbio VARCHAR(65535) NOT NULL,
    synopsis VARCHAR(65535) NOT NULL,
    isbn VARCHAR(65535) NOT NULL,
    dateordered VARCHAR(255) NOT NULL, 
    dateshipped VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS bookerrata;
CREATE TABLE IF NOT EXISTS bookerrata
(
    -- id     INT AUTO_INCREMENT PRIMARY KEY,
    bookuniqueid VARCHAR(255) NOT NULL,
    fieldtypeVAR VARCHAR(255),
    --copyrights, authors, hashtags
    fields VARCHAR(65535) NOT NULL 
);

DROP TABLE IF EXISTS messageuser;
CREATE TABLE IF NOT EXISTS messageuser
(
    -- id     INT AUTO_INCREMENT PRIMARY KEY,
    messagecontent VARCHAR(65535) NOT NULL,
    messagedate VARCHAR(255) NOT NULL,
    messageresponseid VARCHAR(255) NOT NULL,
    messagefrom VARCHAR(65535) NOT NULL,
    useruniqueid VARCHAR(255) NOT NULL,
    messageuseruniqueid VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS revenuecost;
CREATE TABLE IF NOT EXISTS revenuecost
(
    -- id     INT AUTO_INCREMENT PRIMARY KEY,
    bookuniqueid VARCHAR(255) NOT NULL,
    userorderuniqueid VARCHAR(255) NOT NULL,
    rcname VARCHAR(255) NOT NULL,
    rcdescription VARCHAR(65535) NOT NULL,
    rcvalue VARCHAR(65535) NOT NULL,
    rcdate VARCHAR(65535) NOT NULL
);

DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user
(
    -- id     INT AUTO_INCREMENT PRIMARY KEY,
    phone INT, 
    email VARCHAR(255),
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS userorder;
CREATE TABLE IF NOT EXISTS userorder
(
    -- id     INT AUTO_INCREMENT PRIMARY KEY,
    dateordered VARCHAR(255) NOT NULL,
    dateshipped VARCHAR(255) NOT NULL
);


