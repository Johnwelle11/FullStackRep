DROP TABLE IF EXISTS cars;
DROP TABLE if EXISTS car_owners;
DROP TABLE IF EXISTS properties;   

CREATE TABLE cars (
id SERIAL PRIMARY KEY,
name TEXT,
type TEXT,
model TEXT,
address TEXT
);

INSERT INTO cars ( name, type, model, address ) VALUES ( 'Bertha', 'Honda', 'Civic', 'at this location' );
INSERT INTO cars ( name, type, model, address ) VALUES ( 'Skim', 'Honda', 'Civic SE', 'Wendys' );
INSERT INTO cars ( name, type, model, address ) VALUES ( 'Whole', 'Honda', 'Civic Sport', 'Mcdonalds' );
INSERT INTO cars ( name, type, model, address ) VALUES ( 'Jeremy', 'Hummer', 'H2', 'Johns Driveaway' );
INSERT INTO cars ( name, type, model, address ) VALUES ( 'Joe', 'Jeep', '4-Runner', 'Hawaii' );
INSERT INTO cars ( name, type, model, address ) VALUES ( 'Small', 'Honda', 'Civic Sport SE', 'Burger King' );
INSERT INTO cars ( name, type, model, address ) VALUES ( 'Paul', 'Hummer', 'H1', 'Planet Fitness' );
INSERT INTO cars ( name, type, model, address ) VALUES ( 'Jim', 'Toyota', 'Cube', 'Japan' );


CREATE TABLE owners (
user_id SERIAL,
name TEXT,
phone_number TEXT,
email text
);

INSERT INTO owners ( name, phone_number, email ) VALUES ( 'Hog', '323-456-2345', 'hog@gmail.com' );
INSERT INTO owners ( name, phone_number, email ) VALUES ( 'Pig', '323-675-2345', 'pig@gmail.com' );
INSERT INTO owners ( name, phone_number, email ) VALUES ( 'Cow', '323-434-6478', 'cow@gmail.com' );
INSERT INTO owners ( name, phone_number, email ) VALUES ( 'Milk', '323-434-1234', 'milk@gmail.com' );
INSERT INTO owners ( name, phone_number, email ) VALUES ( 'Cheese', '546-434-0876', 'cheese@gmail.com' );
INSERT INTO owners ( name, phone_number, email ) VALUES ( 'Bread', '323-867-6867', 'bread@gmail.com' );
INSERT INTO owners ( name, phone_number, email ) VALUES ( 'Tummy', '667-456-7890', 'tummy@gmail.com' );

CREATE TABLE car_owners (
user_id INTEGER REFERENCES owner(user_id),
car_id INTEGER REFERENCES cars(car_id),
);
SELECT owner.name, owner.email, owner.phone_number, cars.model, cars.make, cars.year, cars.miles, cars.description, cars.price FROM cars  INNER JOIN owner ON cars.owner_id=owner.id

