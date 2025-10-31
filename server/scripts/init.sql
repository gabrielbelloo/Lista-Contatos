create schema contacts_db;
use contacts_db;

create table departments (
	id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(100) NOT NULL
);

create table extensions (
	id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
	extension_number VARCHAR(20) NOT NULL UNIQUE
);


create table contacts (
	id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100),
    department_id INT UNSIGNED,
    extension_id INT UNSIGNED,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (extension_id) REFERENCES extensions(id) ON DELETE SET NULL
);

create table phones (
	id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
    contact_id INT UNSIGNED NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    type ENUM('Work phone','Personal phone','Home phone','Other'),
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE
);
	
create table emails (
	id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
    contact_id INT UNSIGNED NOT NULL,
	email_address VARCHAR(100) NOT NULL,
    type ENUM('Work email','Personal email','Other'),
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE
);