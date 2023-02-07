USE mybujodb;

CREATE TABLE tb_roles(id VARCHAR(255), name VARCHAR(255))
CREATE TABLE tb_users(id INT NOT NULL AUTO_INCREMENT, username VARCHAR (20), name VARCHAR(255), password VARCHAR(255), phone VARCHAR(255),   PRIMARY KEY (id))
CREATE TABLE tb_items(id INT NOT NULL AUTO_INCREMENT, title VARCHAR(255), date VARCHAR(100), type VARCHAR(10), user_id VARCHAR(255),  PRIMARY KEY (id))

INSERT INTO tb_roles(id, name) VALUES ('123456', 'USER');
INSERT INTO tb_roles(id, name) VALUES ('654321', 'ADMIN');

INSERT INTO tb_users(id, name, password) VALUES ('1', 'niltoneapontes', '$2a$10$UBx84J8o1UXj9m7OR2tDCu67vd8NnSAyhoWMQtz/bziNpEWIZW8Me');

INSERT INTO tb_items(id , title, date, type, user_id) VALUES ("1", "Exemplo de tarefa 1", "2023-02-04T02:10:51Z", "task", "1");
INSERT INTO tb_items(id , title, date, type, user_id) VALUES ("2", "Exemplo de tarefa 2", "2023-02-04T02:10:51Z", "task", "1");
INSERT INTO tb_items(id , title, date, type, user_id) VALUES ("3", "Exemplo de tarefa 3", "2023-02-04T02:10:51Z", "task", "2");
INSERT INTO tb_items(id, title, date, type, user_id) VALUES ("4", "Exemplo de tarefa 4", "2023-02-04T02:10:51Z", "task", "3");
