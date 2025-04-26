CREATE DATABASE tienda;
USE tienda;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    contraseña VARCHAR(255),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE inventario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(100),
    descripcion TEXT,
    cantidad INT,
    categoria_id INT,
    usuario_id INT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);


INSERT INTO usuarios (nombre, email, contraseña) VALUES
('Juan Pérez', 'juanperez@email.com', 'contraseña123'),
('Ana López', 'analopez@email.com', 'contraseña456'),
('Carlos García', 'carlosgarcia@email.com', 'contraseña789');

INSERT INTO categorias (nombre, usuario_id) VALUES
('Electrónica', 1),
('Ropa', 2),
('Alimentos', 3);

INSERT INTO inventario (nombre_producto, descripcion, cantidad, categoria_id, usuario_id) VALUES
('Laptop', 'Laptop de alta gama', 10, 1, 1),
('Camiseta', 'Camiseta de algodón', 50, 2, 2),
('Manzanas', 'Manzanas rojas frescas', 100, 3, 3);


SELECT * FROM inventario
WHERE usuario_id = 3 AND categoria_id = 5;

SELECT * FROM inventario
WHERE usuario_id = 3;
