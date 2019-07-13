DROP DATABASE IF EXISTS driver_db;
CREATE DATABASE driver_db;

USE driver_db;
SELECT * FROM usertests;

INSERT INTO usertests (userName, email_address, password, gender)
VALUES ("Kim", "kim52@gmail.com", 56564, "female");

INSERT INTO usertests (userName, email_address, password, gender)
VALUES ("Yolanda", "yolandawc@hotmail.com", 56420, "female");

INSERT INTO usertests (userName, email_address, password)
VALUES ("Shawn", "shawnss@hotmail.com", 648521);

INSERT INTO usertests (userName, email_address, password, gender)
VALUES ("Susan", "susana@gmail.com", 8524, "female");