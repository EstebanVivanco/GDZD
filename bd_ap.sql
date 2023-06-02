
create table tipo_tiendas(

    id_tipo int auto_increment primary key,
    nombre_tipo varchar(40)

);

create table categoria_producto(

    id_categoria_producto int auto_increment primary key,
    nombre_categoria_producto varchar(40)
    
);

create table estado_producto(

    id_estado_producto int auto_increment primary key,
    nombre_estado_producto varchar(40)
    
);


create table estado_zona (

    id_estado_zona int auto_increment primary key,
    nombre_estado_zona varchar(40) not null

);

create table zona(

    id_zona int auto_increment primary key,
    nombre_zona varchar(40) not null,
    imagen_zona varchar(300) not null,
    id_estado_zona_fk int not null,
    FOREIGN KEY (id_estado_zona_fk) REFERENCES estado_zona(id_estado_zona)

);

create table estado_sector (

    id_estado_sector int auto_increment primary key,
    nombre_estado_sector varchar(40) not null

);

create table sector(

    id_sector int auto_increment primary key,
    nombre_sector varchar(40) not null,
    id_estado_sector_fk int not null,
    id_zona_fk int not null,
    FOREIGN KEY (id_estado_sector_fk) REFERENCES estado_sector(id_estado_sector),
    FOREIGN KEY (id_zona_fk) REFERENCES zona(id_zona)

);

create table tienda (

    id_tienda int auto_increment primary key,
    nombre_tienda varchar(50) not null,
    correo_tienda varchar(50) not null,
    pass_tienda varchar(50) not null,
    slogan_tienda varchar(300) not null,
    logo_tienda varchar(200) not null,
    horarios_tienda varchar(400) not null,
    id_tipo_fk int,
    id_sector_fk int,
    FOREIGN KEY (id_tipo_fk) REFERENCES tipo_tiendas(id_tipo),
    FOREIGN KEY (id_sector_fk) REFERENCES sector(id_sector)

);

CREATE TABLE proveedores (
  id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
  nombre_proveedor VARCHAR(255) NOT NULL
);

create table productos (

    id_producto int auto_increment primary key,
    nombre_producto varchar(80),
    stock int,
    precio_producto int,
    id_categoria_producto_fk int,
    id_estado_fk int,
    id_tienda_fk int,
    id_bodega_fk int,
    id_proveedor_fk int,
    FOREIGN KEY (id_categoria_producto_fk) REFERENCES categoria_producto(id_categoria_producto),
    FOREIGN KEY (id_estado_fk) REFERENCES estado_producto(id_estado_producto),
    FOREIGN KEY (id_tienda_fk) REFERENCES tienda(id_tienda),
    FOREIGN KEY (id_proveedor_fk) REFERENCES proveedores(id_proveedor)
    -- FOREIGN KEY (id_bodega_fk) REFERENCES bodega(id_bodega)


);

CREATE TABLE estado_habitacion(

    id_estado_habitacion int auto_increment primary key,
    nombre_estado_habitacion varchar(40)

);

CREATE TABLE habitaciones (

  id_habitacion INT AUTO_INCREMENT PRIMARY KEY,
  numero VARCHAR(10) NOT NULL,
  estado_habitacion_fk int NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  precio_hora int NOT NULL,
  id_sector_fk int NOT NULL,
  FOREIGN KEY (estado_habitacion_fk) REFERENCES estado_habitacion(id_estado_habitacion),
  FOREIGN KEY (id_sector_fk) REFERENCES sector(id_sector)

);

CREATE TABLE reserva_habitaciones (

    id_reserva_habitaciones INT AUTO_INCREMENT PRIMARY KEY ,
    id_habitacion_fk INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    pasajero_nombre VARCHAR(255) NOT NULL,
    pasajero_rut VARCHAR(255) NOT NULL,
    pasajero_correo VARCHAR(255) NOT NULL,
    valor_total int,
    FOREIGN KEY (id_habitacion_fk) REFERENCES habitaciones(id_habitacion)

);

INSERT INTO tipo_tiendas (nombre_tipo) VALUES
    ('Ropa y Moda'),
    ('Electrónica'),
    ('Supermercado');

INSERT INTO categoria_producto (nombre_categoria_producto) VALUES
    ('Ropa'),
    ('Electrodomésticos'),
    ('Alimentos'),
    ('Juguetes');

INSERT INTO estado_producto (nombre_estado_producto) VALUES
    ('Disponible'),
    ('Agotado'),
    ('En oferta');

INSERT INTO estado_zona (nombre_estado_zona) VALUES
    ('Activa'),
    ('En construcción'),
    ('Cerrada');

INSERT INTO zona (nombre_zona, imagen_zona, id_estado_zona_fk) VALUES
    ('Zona Comercial', 'zona_comercial.jpg', 1),
    ('Zona Residencial', 'zona_residencial.jpg', 1),
    ('Zona Industrial', 'zona_industrial.jpg', 2);

INSERT INTO estado_sector (nombre_estado_sector) VALUES
    ('Activo'),
    ('En mantenimiento'),
    ('Cerrado');

INSERT INTO sector (nombre_sector, id_estado_sector_fk, id_zona_fk) VALUES
    ('Sector Ropa', 1, 1),
    ('Sector Electrónica', 1, 1),
    ('Sector Alimentos', 1, 2),
    ('Sector Juguetes', 2, 3);

INSERT INTO tienda (nombre_tienda, slogan_tienda, logo_tienda, horarios_tienda, id_tipo_fk, id_sector_fk) VALUES
    ('Tienda de Ropa', '¡Moda para todos!', 'logo_ropa.jpg', 'Lun-Vie: 9AM-8PM, Sáb-Dom: 10AM-6PM', 1, 1),
    ('Electro Store', 'Tecnología al alcance de todos', 'logo_electro.jpg', 'Lun-Dom: 9AM-9PM', 2, 2),
    ('Supermercado FreshMart', 'Calidad y frescura garantizada', 'logo_supermercado.jpg', 'Lun-Dom: 7AM-10PM', 3, 3);

INSERT INTO estado_habitacion (nombre_estado_habitacion) VALUES
    ('Disponible'),
    ('Ocupada'),
    ('Mantenimiento');

INSERT INTO habitaciones (numero, estado_habitacion_fk, descripcion, precio_hora, id_sector_fk) VALUES
    ('101', 1, 'Habitación doble con vista al mar', 100, 1),
    ('102', 1, 'Habitación individual estándar', 80, 1),
    ('201', 2, 'Suite de lujo con jacuzzi privado', 200, 2),
    ('202', 1, 'Habitación doble con balcón', 120, 2),
    ('301', 3, 'Habitación individual económica', 60, 3);

INSERT INTO reserva_habitaciones (id_habitacion_fk, fecha_inicio, fecha_fin, pasajero_nombre, pasajero_rut, pasajero_correo, valor_total) VALUES
    (1, '2023-06-10', '2023-06-15', 'Juan Pérez', '12345678-9', 'juan@example.com', 500),
    (2, '2023-07-01', '2023-07-05', 'María Gómez', '98765432-1', 'maria@example.com', 320),
    (3, '2023-08-20', '2023-08-25', 'Carlos Rodríguez', '56789123-4', 'carlos@example.com', 1000),
    (4, '2023-09-15', '2023-09-17', 'Laura Torres', '43215678-0', 'laura@example.com', 240),
    (5, '2023-10-10', '2023-10-12', 'Ana Silva', '87654321-2', 'ana@example.com', 120);

ALTER TABLE productos ADD imagen_producto VARCHAR(300) NOT NULL AFTER nombre_producto;

INSERT INTO proveedores (nombre_proveedor) VALUES
    ('Proveedor A'),
    ('Proveedor B'),
    ('Proveedor C');

INSERT INTO productos (nombre_producto, stock, precio_producto, id_categoria_producto_fk, id_estado_fk, id_tienda_fk, id_bodega_fk, id_proveedor_fk, imagen_producto) VALUES
    ('Camisa de manga corta', 50, 29.99, 1, 1, 1, 1, 1, 'ruta_imagen_1.jpg'),
    ('Pantalón de mezclilla', 30, 49.99, 2, 1, 2, 2, 2, 'ruta_imagen_2.jpg'),
    ('Zapatos deportivos', 20, 69.99, 3, 1, 3, 3, 3, 'ruta_imagen_3.jpg');

ALTER TABLE `tienda` ADD `banner_tienda` VARCHAR(300) NOT NULL AFTER `slogan_tienda`;

