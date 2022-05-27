-- TODO:
-- - Asignar timestamp a las tablas faltantes
-- - Modificar los tipos de datos para las fechas!
-- - Agregar Tablas:
--   - Atrasos
--   - Devoluciones??
--   - Rankings??
--   - Reportes??
CREATE DATABASE biblioteca;

USE biblioteca;

CREATE TABLE perfiles (
    perfil_id int(11) NOT NULL AUTO_INCREMENT,
    perfil_nombre varchar(45) NOT NULL,
    perfil_opciones varchar(200) DEFAULT NULL,
    timestamp timestamp NULL DEFAULT current_timestamp(),
    PRIMARY KEY (perfil_id)
);

CREATE TABLE permisos (
    permiso_id int(11) NOT NULL AUTO_INCREMENT,
    permiso_nombre varchar(50) NOT NULL,
    permiso_tag varchar(50) NOT NULL,
    permiso_descripcion varchar(100) DEFAULT NULL,
    timestamp timestamp NULL DEFAULT current_timestamp(),
    PRIMARY KEY (permiso_id),
    UNIQUE KEY permisos_tag_UN (permiso_tag)
);

CREATE TABLE perfiles_permisos (
    perfil_permiso_id int(11) NOT NULL AUTO_INCREMENT,
    permiso_id int(11) NOT NULL,
    perfil_id int(11) NOT NULL,
    timestamp timestamp NULL DEFAULT current_timestamp(),
    PRIMARY KEY (perfil_permiso_id),
    UNIQUE KEY perfiles_permisos_UN (permiso_id, perfil_id),
    KEY fk_perfiles_permisos_permisos1_idx (permiso_id),
    KEY fk_perfiles_permisos_perfiles1_idx (perfil_id),
    CONSTRAINT fk_perfiles_permisos_perfiles1 FOREIGN KEY (perfil_id) REFERENCES perfiles (perfil_id),
    CONSTRAINT fk_perfiles_permisos_permisos1 FOREIGN KEY (permiso_id) REFERENCES permisos (permiso_id)
);

CREATE TABLE usuarios (
    usuario_id int(11) NOT NULL AUTO_INCREMENT,
    usuario varchar(200) NOT NULL,
    nombre varchar(200) DEFAULT NULL,
    apellido varchar(200) DEFAULT NULL,
    password varchar(200) NOT NULL,
    usuario_token varchar(1000) DEFAULT NULL,
    usuario_salt varchar(100) DEFAULT NULL,
    usuario_mail varchar(150) NOT NULL,
    usuario_opciones varchar(200) DEFAULT NULL,
    usuario_tipo enum('USUARIO', 'ADMINISTRADOR') DEFAULT NULL,
    usuario_activo tinyint(1) DEFAULT 1,
    timestamp timestamp NULL DEFAULT current_timestamp(),
    PRIMARY KEY (usuario_id)
);

CREATE TABLE usuarios_perfiles (
    usuario_perfil_id int(11) NOT NULL AUTO_INCREMENT,
    perfil_id int(11) NOT NULL,
    usuario_id int(11) NOT NULL,
    timestamp timestamp NULL DEFAULT current_timestamp(),
    PRIMARY KEY (usuario_perfil_id),
    KEY fk_usuarios_perfiles_perfiles1_idx (perfil_id),
    KEY fk_usuarios_perfiles_usuarios1_idx (usuario_id),
    CONSTRAINT fk_usuarios_perfiles_perfiles1 FOREIGN KEY (perfil_id) REFERENCES perfiles (perfil_id),
    CONSTRAINT usuarios_perfiles_FK FOREIGN KEY (usuario_id) REFERENCES usuarios (usuario_id)
);


-- Tabla para las facultades!
CREATE TABLE facultades (
    facultad_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_facultad VARCHAR(200) NOT NULL,
    descripcion_facultad VARCHAR(500) NOT NULL
);

-- tabla para carreras
-- una facultad tiene muchas carreras y las carreras tienen una facultad
CREATE TABLE carreras (
    carrera_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_carrera VARCHAR(200) NOT NULL,
    descripcion_carrera VARCHAR(500) NOT NULL,
    facultad_id INT NOT NULL,
    CONSTRAINT fk_carrera_facultad FOREIGN KEY (facultad_id) REFERENCES facultades(facultad_id)
);

-- tabla para alumnos
-- un alumno tiene una carrera y una carrera tiene muchos alumnos
-- si el alumno se atrasa 3 veces en un mes, se bloquea por 2 semanas.
CREATE TABLE alumnos (
    alumno_id INT PRIMARY KEY AUTO_INCREMENT,
    rut_alumno VARCHAR(15) UNIQUE NOT NULL,
    nombre_alumno VARCHAR(200) NOT NULL,
    apellido_alumno VARCHAR(200) NOT NULL,
    email_alumno VARCHAR(200) NOT NULL,
    carrera_id INT NOT NULL,
    alumno_activo TINYINT (1) default 1 NOT NULL,
    CONSTRAINT fk_alumno_carrera FOREIGN KEY (carrera_id) REFERENCES carreras(carrera_id)
);




CREATE TABLE autor (
    autor_id INT PRIMARY KEY AUTO_INCREMENT,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    nacionalidad VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    fecha_fallecimiento DATE
);




CREATE TABLE libros (
    libro_id INT PRIMARY KEY AUTO_INCREMENT,
    isbn VARCHAR(200) UNIQUE NOT NULL,
    isbn_tipo VARCHAR(200) NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    -- autor_id VARCHAR(200) NOT NULL,
    editorial VARCHAR(200) NOT NULL,
    edicion VARCHAR(200) NOT NULL,
    fecha_publicacion VARCHAR(200) NOT NULL
);


CREATE TABLE libro_autores (
    libro_autor_id INT PRIMARY KEY AUTO_INCREMENT,
    libro_id INT NOT NULL,
    autor_id INT NOT NULL,
    KEY fk_libro_autores_autores1_idx (autor_id),
    KEY fk_libro_autores_libros1_idx (libro_id),
    CONSTRAINT fk_libro_autores_autores1 FOREIGN KEY (autor_id) REFERENCES autor (autor_id),
    CONSTRAINT fk_libro_autores_libros1 FOREIGN KEY (libro_id) REFERENCES libros (libro_id)
);


CREATE TABLE libro_stock (
    libro_stock_id INT PRIMARY KEY AUTO_INCREMENT,
    libro_id INT NOT NULL,
    stock INT NOT NULL,
    KEY fk_libro_stock_libros1_idx (libro_id),
    CONSTRAINT fk_libro_stock_libros1 FOREIGN KEY (libro_id) REFERENCES libros (libro_id)
);


-- 


CREATE TABLE trabajos (
    trabajo_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    editorial VARCHAR(200) NOT NULL,
    edicion VARCHAR(200) NOT NULL,
    fecha_publicacion VARCHAR(200) NOT NULL
);

CREATE TABLE trabajo_autor (
    trabajo_autor_id INT PRIMARY KEY AUTO_INCREMENT,
    trabajo_id INT NOT NULL,
    autor_id INT NOT NULL,
    KEY fk_trabajo_autor_autores1_idx (autor_id),
    KEY fk_trabajo_autor_trabajos1_idx (trabajo_id),
    CONSTRAINT fk_trabajo_autor_autores1 FOREIGN KEY (autor_id) REFERENCES autor (autor_id),
    CONSTRAINT fk_trabajo_autor_trabajos1 FOREIGN KEY (trabajo_id) REFERENCES trabajos (trabajo_id)
);

CREATE TABLE trabajo_stock (
    trabajo_stock_id INT PRIMARY KEY AUTO_INCREMENT,
    trabajo_id INT NOT NULL,
    total INT NOT NULL,
    en_biblioteca INT NOT NULL,
    en_prestamo INT NOT NULL,
    en_atraso INT NOT NULL,
    KEY fk_trabajo_stock_trabajos1_idx (trabajo_id),
    CONSTRAINT fk_trabajo_stock_trabajos1 FOREIGN KEY (trabajo_id) REFERENCES trabajos (trabajo_id)
);

-- ------------------------------


CREATE TABLE revistas (
    revista_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    editorial VARCHAR(200) NOT NULL,
    edicion VARCHAR(200) NOT NULL,
    fecha_publicacion VARCHAR(200) NOT NULL
);


CREATE TABLE revista_autor (
    revista_autor_id INT PRIMARY KEY AUTO_INCREMENT,
    revista_id INT NOT NULL,
    autor_id INT NOT NULL,
    KEY fk_revista_autor_autores1_idx (autor_id),
    KEY fk_revista_autor_revistas1_idx (revista_id),
    CONSTRAINT fk_revista_autor_autores1 FOREIGN KEY (autor_id) REFERENCES autor (autor_id),
    CONSTRAINT fk_revista_autor_revistas1 FOREIGN KEY (revista_id) REFERENCES revistas (revista_id)
);


CREATE TABLE revista_stock (
    revista_stock_id INT PRIMARY KEY AUTO_INCREMENT,
    revista_id INT NOT NULL,
    total INT NOT NULL,
    en_biblioteca INT NOT NULL,
    en_prestamo INT NOT NULL,
    en_atraso INT NOT NULL,
    KEY fk_revista_stock_revistas1_idx (revista_id),
    CONSTRAINT fk_revista_stock_revistas1 FOREIGN KEY (revista_id) REFERENCES revistas (revista_id)
);




-- preguntar al profe como hacer por el isbn.
-- agregar ubn campo para saber el estado fisico del ejemplar???
CREATE TABLE ejemplar (
    ejemplar_id INT PRIMARY KEY AUTO_INCREMENT,
    isbn INT(20) UNIQUE,
    libro_id INT,
    revista_id INT,
    trabajo_id INT,
    fecha_entrga DATE,
    fecha_fin DATE,
    fecha_devolucion DATE,
    estado ENUM('DISPONIBLE', 'PRESTADO', 'ATRASADO'),
    KEY fk_ejemplar_libro (libro_id),
    KEY fk_ejemplar_revista (revista_id),
    KEY fk_ejemplar_ensayo (trabajo_id),
    CONSTRAINT fk_ejemplar_libro FOREIGN KEY (libro_id) REFERENCES libros (libro_id),
    CONSTRAINT fk_ejemplar_revista FOREIGN KEY (revista_id) REFERENCES revistas (revista_id),
    CONSTRAINT fk_ejemplar_trabajo FOREIGN KEY (trabajo_id) REFERENCES trabajos (trabajo_id)
);


-- tabla prestamos.
CREATE TABLE prestamos (
    prestamo_id INT PRIMARY KEY AUTO_INCREMENT,
    alumno_id INT NOT NULL,
    usuario_id INT NOT NULL,
    fecha_inicio VARCHAR(200) NOT NULL,
    fecha_fin VARCHAR(200) NOT NULL,
    estado ENUM('PRESTADO', 'ATRASADO', 'FINALIZADO', 'FINALIZADO_ATRASADO'),
    CONSTRAINT fk_prestamo_alumno FOREIGN KEY (alumno_id) REFERENCES alumnos(alumno_id),
    CONSTRAINT fk_prestamo_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);


CREATE TABLE prestamo_ejemplar (
    prestamo_ejemplar_id INT PRIMARY KEY AUTO_INCREMENT,
    prestamo_id INT NOT NULL,
    ejemplar_id INT NOT NULL,
    KEY fk_prestamo_ejemplar_prestamos1_idx (prestamo_id),
    KEY fk_prestamo_ejemplar_ejemplar1_idx (ejemplar_id),
    CONSTRAINT fk_prestamo_ejemplar_prestamos1 FOREIGN KEY (prestamo_id) REFERENCES prestamos (prestamo_id),
    CONSTRAINT fk_prestamo_ejemplar_ejemplar1 FOREIGN KEY (ejemplar_id) REFERENCES ejemplar (ejemplar_id)
);

