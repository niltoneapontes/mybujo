USE mybujodb;

CREATE TABLE tb_items(id VARCHAR(255), title VARCHAR(255), date VARCHAR(100), type VARCHAR(10), user_id VARCHAR(255),  PRIMARY KEY (id))

INSERT INTO tb_items(id , title, date, type, user_id) VALUES ("1", "Exemplo de tarefa 1", "2023-02-04T02:10:51Z", "task", "1");
INSERT INTO tb_items(id , title, date, type, user_id) VALUES ("2", "Exemplo de tarefa 2", "2023-02-04T02:10:51Z", "task", "1");
INSERT INTO tb_items(id , title, date, type, user_id) VALUES ("3", "Exemplo de tarefa 3", "2023-02-04T02:10:51Z", "task", "2");
INSERT INTO tb_items(id, title, date, type, user_id) VALUES ("4", "Exemplo de tarefa 4", "2023-02-04T02:10:51Z", "task", "3");
