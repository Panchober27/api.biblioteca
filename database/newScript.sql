
-- TODO:
-- - Asignar timestamp a las tablas faltantes
-- - Modificar los tipos de datos para las fechas!
-- - Agregar Tablas:
--   - Atrasos
--   - Devoluciones??
--   - Rankings??
--   - Reportes??

CREATE DATABASE demo_lib;

USE demo_lib;

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
  UNIQUE KEY perfiles_permisos_UN (permiso_id,perfil_id),
  KEY fk_perfiles_permisos_permisos1_idx (permiso_id),
  KEY fk_perfiles_permisos_perfiles1_idx (perfil_id),
  CONSTRAINT fk_perfiles_permisos_perfiles1 FOREIGN KEY (perfil_id) REFERENCES perfiles (perfil_id) ,
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
  usuario_tipo enum('USUARIO','ADMINISTRADOR') DEFAULT NULL,
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
  CONSTRAINT fk_usuarios_perfiles_perfiles1 FOREIGN KEY (perfil_id) REFERENCES perfiles (perfil_id) ,
  CONSTRAINT usuarios_perfiles_FK FOREIGN KEY (usuario_id) REFERENCES usuarios (usuario_id)
);


CREATE TABLE tipo_libro (
    tipo_libro_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_tipo VARCHAR(200) NOT NULL,
    descripcion_tipo VARCHAR(500) NOT NULL
);


CREATE TABLE libros (
    libro_id INT PRIMARY KEY AUTO_INCREMENT,
    isbn VARCHAR(200) UNIQUE NOT NULL,
    isbn_tipo VARCHAR(200) NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    autor VARCHAR(200) NOT NULL,
    editorial VARCHAR(200) NOT NULL,
    edicion VARCHAR(200) NOT NULL,
    fecha_publicacion VARCHAR(200) NOT NULL,
    tipo_libro INT NOT NULL,
    stock INT NOT NULL,
    -- un libro tiene un tipo de libro y un tipo de libro tiene muchos libros
    CONSTRAINT fk_libro_tipo_libro FOREIGN KEY (tipo_libro) REFERENCES tipo_libro(tipo_libro_id)
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
CREATE TABLE alumnos (
    alumno_id INT PRIMARY KEY AUTO_INCREMENT,
    rut_alumno VARCHAR(15) UNIQUE NOT NULL,
    nombre_alumno VARCHAR(200) NOT NULL,
    apellido_alumno VARCHAR(200) NOT NULL,
    email_alumno VARCHAR(200) NOT NULL,
    carrera_id INT NOT NULL,
    CONSTRAINT fk_alumno_carrera FOREIGN KEY (carrera_id) REFERENCES carreras(carrera_id)
);


-- tabla prestamos.
CREATE TABLE prestamos (
    prestamo_id INT PRIMARY KEY AUTO_INCREMENT,
    alumno_id INT NOT NULL,
    usuario_id INT NOT NULL,
    fecha_inicio VARCHAR(200) NOT NULL,
    fecha_fin VARCHAR(200) NOT NULL,
    fecha_entrega VARCHAR(200) NOT NULL,
    CONSTRAINT fk_prestamo_alumno FOREIGN KEY (alumno_id) REFERENCES alumnos(alumno_id),
    CONSTRAINT fk_prestamo_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);


-- tabla intermedia entre libros y prestamos con relacion muchos a muchos
CREATE TABLE prestamos_libros (
    prestamos_libros_id INT PRIMARY KEY AUTO_INCREMENT,
    prestamo_id INT NOT NULL,
    libro_id INT NOT NULL,
    CONSTRAINT fk_prestamo_libro FOREIGN KEY (prestamo_id) REFERENCES prestamos(prestamo_id),
    CONSTRAINT fk_libro_prestamo FOREIGN KEY (libro_id) REFERENCES libros(libro_id)
);
