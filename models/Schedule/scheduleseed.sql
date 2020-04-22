INSERT INTO service (id,name) 
VALUES(1,"Programming"), 
(2,"Massage"), 
(3,"Therapy");

INSERT INTO customer (id,name,email,password) 
VALUES(1,"Jerry Brown","jerry@gmail.com", "password"), 
(2,"Donald Duch","donald@gmail.com", "password"),
(3,"Jose Ricardo","jose@gmail.com", "password");

INSERT INTO provider (id,name,email,password,service_id,daily_slots) 
VALUES(1,"Ziggy Freud","ziggy@gmail.com", "password",1,8),
(2,"Silvia Carter","silvia@gmail.com", "password",2,8),
(3,"Joseph Domingo","joseph@gmail.com", "password",3,8);

INSERT INTO session (customer_id,provider_id,service_id,date,slot) 
VALUES(1,1,1, "2020-04-15",1),
(2,2,1, "2020-04-15",2),
(3,3,1, "2020-04-15",3),
(1,1,2, "2020-04-16",1),
(2,2,2, "2020-04-16",2),
(3,3,2, "2020-04-16",3),
(1,1,3, "2020-04-17",1),
(2,2,3, "2020-04-17",2),
(3,3,3, "2020-04-17",3);

SELECT * from customer;
SELECT * from provider;
SELECT * from session;
SELECT * from service;
