INSERT INTO statistics(experience, client, guarantee, delivery)
VALUES(7, 10000, 10, 3);

INSERT INTO admin ( username, password ) VALUES ( 'admin', crypt('admin', gen_salt('bf')) ); 