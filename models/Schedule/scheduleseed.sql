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