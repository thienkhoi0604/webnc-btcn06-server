DROP DATABASE IF EXISTS `QL_PRESENTATION`;
CREATE DATABASE `QL_PRESENTATION`;
USE `QL_PRESENTATION`;

CREATE TABLE `ACCOUNTS`
(
	id INT NOT NULL AUTO_INCREMENT,
	email char(100) NOT NULL,
	password char(100),
	fullname char(50),
	telephone char(50),
    CONSTRAINT ACCOUNT_pkey PRIMARY KEY (id, email)
);

CREATE TABLE `PRESENTATIONS`
(
	id int NOT NULL AUTO_INCREMENT,
    name_pre varchar(50),
    owner_pre varchar(50),
    modified varchar(20),
    created varchar(20),
    PRIMARY KEY(id)
);

CREATE TABLE `SLIDES`
(
	id int NOT NULL AUTO_INCREMENT,
    id_presentation int NOT NULL,
    slide_type varchar(50) NOT NULL,
    question varchar(100),
    longer_description varchar(150),
    image varchar(50),
    result_layout char(10),
    PRIMARY KEY(id, id_presentation)
);

CREATE TABLE `OPTIONS`
(
	id_option int NOT NULL AUTO_INCREMENT,
    id_slide int NOT NULL,
    value_option varchar(100),
    vote int,
    PRIMARY KEY(id_option, id_slide)
);

ALTER TABLE `SLIDES`
ADD
(
	FOREIGN KEY(id_presentation) REFERENCES `PRESENTATIONS`(id)
);

ALTER TABLE `OPTIONS`	
ADD
(
	FOREIGN KEY(id_slide) REFERENCES `SLIDES`(id)
);

INSERT INTO `ACCOUNTS`(email, password, fullname, telephone)
VALUES
('admin@gmail.com', 'password', 'admin', '0974988944'),
('thienkhoi0604@gmail.com', '241865784khoi', 'Hoang Tran Thien Khoi', '0373273575'),
('paulallen@gmail.com', 'paulallen', 'Paul Allen', '1234567890'),
('teddymark@gmail.com', 'teddymark', 'Teddy Mark', '0987654321'),
('davidkim@gmail.com', 'davidkim', 'David Kim', '0988123123'),
('prelf0@gmail.com', '8ONg5nw2jvBf', 'Patricio Relf', '116-441-3823'),
('bgegg1@gmail.com', 'hzA0V1', 'Berky Gegg', '716-350-7989'),
('kleghorn2@gmail.com', '5cRweWZQALC', 'Kory Leghorn', '303-506-7891'),
('vmacmanus3@gmail.com', 'GKJWMsngK8KR', 'Vivienne MacManus', '539-680-6526'),
('xstrover4@gmail.com', 'hGgjiD1rBny', 'Xever Strover', '612-862-0369'),
('pkilmaster5@gmail.com', 'RGrcQdT', 'Pierre Kilmaster', '733-182-5526'),
('epointon6@gmail.com', 'NaIPIxOztkP', 'Ellette Pointon', '195-592-8966');

INSERT INTO `PRESENTATIONS`(name_pre, owner_pre, modified, created)
VALUES
('Stringtough', 'Tuckie Ede', '1 day ago', '1 week ago'),
('Ventosanzap', 'Lucienne Quare', '2 days ago', '1 day ago'),
('Mat Lam Tam', 'Sisely Saur', '1 day ago', '2 days ago'),
('Andalax', 'Car Bullas', '1 week ago', '1 week ago'),
('Vagram', 'Leroy Hartly', '3 days ago', '2 weeks ago'),
('Konklux', 'Tuckie Ede', '5 days ago', '1 hour ago'),
('Gembucket', 'Tuckie Ede', '1 day ago', '1 hour ago');

INSERT INTO `SLIDES`(id_presentation, slide_type, question, longer_description, image, result_layout)
VALUES
(1, 'Multiple Choice', 'Multiple Choice', null, null, 'bars'),
(1, 'Multiple Choice', 'Multiple Choice', null, null, 'bars'),
(1, 'Multiple Choice', 'Multiple Choice', null, null, 'bars');

INSERT INTO `OPTIONS`(id_slide, value_option, vote)
VALUES
(1, 'test 1', 2),
(1, 'test 2', 3),
(1, 'test 3', 1),
(1, 'test 4', 2),
(2, 'test 1', 3),
(2, 'test 2', 1),
(2, 'test 3', 0)

