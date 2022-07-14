-- demo_bib.autor definition

CREATE TABLE `autor` (
  `autor_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `nacionalidad` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `fecha_fallecimiento` date DEFAULT NULL,
  PRIMARY KEY (`autor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- demo_bib.facultades definition

CREATE TABLE `facultades` (
  `facultad_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_facultad` varchar(200) NOT NULL,
  `descripcion_facultad` varchar(500) NOT NULL,
  PRIMARY KEY (`facultad_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;


-- demo_bib.libros definition

CREATE TABLE `libros` (
  `libro_id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn_tipo` varchar(200) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `editorial` varchar(200) NOT NULL,
  `edicion` varchar(200) NOT NULL,
  `fecha_publicacion` date NOT NULL,
  PRIMARY KEY (`libro_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;


-- demo_bib.perfiles definition

CREATE TABLE `perfiles` (
  `perfil_id` int(11) NOT NULL AUTO_INCREMENT,
  `perfil_nombre` varchar(45) NOT NULL,
  `perfil_opciones` varchar(200) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`perfil_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;


-- demo_bib.permisos definition

CREATE TABLE `permisos` (
  `permiso_id` int(11) NOT NULL AUTO_INCREMENT,
  `permiso_nombre` varchar(50) NOT NULL,
  `permiso_tag` varchar(50) NOT NULL,
  `permiso_descripcion` varchar(100) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`permiso_id`),
  UNIQUE KEY `permisos_tag_UN` (`permiso_tag`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;


-- demo_bib.revistas definition

CREATE TABLE `revistas` (
  `revista_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `editorial` varchar(200) NOT NULL,
  `edicion` varchar(200) NOT NULL,
  `fecha_publicacion` date NOT NULL,
  PRIMARY KEY (`revista_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- demo_bib.trabajos definition

CREATE TABLE `trabajos` (
  `trabajo_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `editorial` varchar(200) NOT NULL,
  `edicion` varchar(200) NOT NULL,
  `fecha_publicacion` date NOT NULL,
  PRIMARY KEY (`trabajo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- demo_bib.usuarios definition

CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(200) NOT NULL,
  `nombre` varchar(200) DEFAULT NULL,
  `apellido` varchar(200) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `usuario_token` varchar(1000) DEFAULT NULL,
  `usuario_salt` varchar(100) DEFAULT NULL,
  `usuario_mail` varchar(150) NOT NULL,
  `usuario_tipo` enum('USUARIO','ADMINISTRADOR') DEFAULT NULL,
  `usuario_activo` tinyint(1) DEFAULT 1,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;


-- demo_bib.carreras definition

CREATE TABLE `carreras` (
  `carrera_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_carrera` varchar(200) NOT NULL,
  `descripcion_carrera` varchar(500) NOT NULL,
  `facultad_id` int(11) NOT NULL,
  PRIMARY KEY (`carrera_id`),
  KEY `fk_carrera_facultad` (`facultad_id`),
  CONSTRAINT `fk_carrera_facultad` FOREIGN KEY (`facultad_id`) REFERENCES `facultades` (`facultad_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;


-- demo_bib.ejemplar definition

CREATE TABLE `ejemplar` (
  `ejemplar_id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` int(20) DEFAULT NULL,
  `libro_id` int(11) DEFAULT NULL,
  `revista_id` int(11) DEFAULT NULL,
  `trabajo_id` int(11) DEFAULT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `fecha_devolucion` datetime DEFAULT NULL,
  `estado` enum('DISPONIBLE','PRESTADO','ATRASADO') DEFAULT NULL,
  PRIMARY KEY (`ejemplar_id`),
  UNIQUE KEY `isbn` (`isbn`),
  KEY `fk_ejemplar_libro` (`libro_id`),
  KEY `fk_ejemplar_revista` (`revista_id`),
  KEY `fk_ejemplar_ensayo` (`trabajo_id`),
  CONSTRAINT `fk_ejemplar_libro` FOREIGN KEY (`libro_id`) REFERENCES `libros` (`libro_id`),
  CONSTRAINT `fk_ejemplar_revista` FOREIGN KEY (`revista_id`) REFERENCES `revistas` (`revista_id`),
  CONSTRAINT `fk_ejemplar_trabajo` FOREIGN KEY (`trabajo_id`) REFERENCES `trabajos` (`trabajo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4;


-- demo_bib.libro_autores definition

CREATE TABLE `libro_autores` (
  `libro_autor_id` int(11) NOT NULL AUTO_INCREMENT,
  `libro_id` int(11) NOT NULL,
  `autor_id` int(11) NOT NULL,
  PRIMARY KEY (`libro_autor_id`),
  KEY `fk_libro_autores_autores1_idx` (`autor_id`),
  KEY `fk_libro_autores_libros1_idx` (`libro_id`),
  CONSTRAINT `fk_libro_autores_autores1` FOREIGN KEY (`autor_id`) REFERENCES `autor` (`autor_id`),
  CONSTRAINT `fk_libro_autores_libros1` FOREIGN KEY (`libro_id`) REFERENCES `libros` (`libro_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- demo_bib.libro_stock definition

CREATE TABLE `libro_stock` (
  `libro_stock_id` int(11) NOT NULL AUTO_INCREMENT,
  `libro_id` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `en_biblioteca` int(11) NOT NULL,
  `en_prestamo` int(11) NOT NULL,
  `en_atraso` int(11) NOT NULL,
  PRIMARY KEY (`libro_stock_id`),
  KEY `fk_libro_stock_libros1_idx` (`libro_id`),
  CONSTRAINT `fk_libro_stock_libros1` FOREIGN KEY (`libro_id`) REFERENCES `libros` (`libro_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;


-- demo_bib.perfiles_permisos definition

CREATE TABLE `perfiles_permisos` (
  `perfil_permiso_id` int(11) NOT NULL AUTO_INCREMENT,
  `permiso_id` int(11) NOT NULL,
  `perfil_id` int(11) NOT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`perfil_permiso_id`),
  UNIQUE KEY `perfiles_permisos_UN` (`permiso_id`,`perfil_id`),
  KEY `fk_perfiles_permisos_permisos1_idx` (`permiso_id`),
  KEY `fk_perfiles_permisos_perfiles1_idx` (`perfil_id`),
  CONSTRAINT `fk_perfiles_permisos_perfiles1` FOREIGN KEY (`perfil_id`) REFERENCES `perfiles` (`perfil_id`),
  CONSTRAINT `fk_perfiles_permisos_permisos1` FOREIGN KEY (`permiso_id`) REFERENCES `permisos` (`permiso_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;


-- demo_bib.revista_autor definition

CREATE TABLE `revista_autor` (
  `revista_autor_id` int(11) NOT NULL AUTO_INCREMENT,
  `revista_id` int(11) NOT NULL,
  `autor_id` int(11) NOT NULL,
  PRIMARY KEY (`revista_autor_id`),
  KEY `fk_revista_autor_autores1_idx` (`autor_id`),
  KEY `fk_revista_autor_revistas1_idx` (`revista_id`),
  CONSTRAINT `fk_revista_autor_autores1` FOREIGN KEY (`autor_id`) REFERENCES `autor` (`autor_id`),
  CONSTRAINT `fk_revista_autor_revistas1` FOREIGN KEY (`revista_id`) REFERENCES `revistas` (`revista_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- demo_bib.revista_stock definition

CREATE TABLE `revista_stock` (
  `revista_stock_id` int(11) NOT NULL AUTO_INCREMENT,
  `revista_id` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `en_biblioteca` int(11) NOT NULL,
  `en_prestamo` int(11) NOT NULL,
  `en_atraso` int(11) NOT NULL,
  PRIMARY KEY (`revista_stock_id`),
  KEY `fk_revista_stock_revistas1_idx` (`revista_id`),
  CONSTRAINT `fk_revista_stock_revistas1` FOREIGN KEY (`revista_id`) REFERENCES `revistas` (`revista_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- demo_bib.trabajo_autor definition

CREATE TABLE `trabajo_autor` (
  `trabajo_autor_id` int(11) NOT NULL AUTO_INCREMENT,
  `trabajo_id` int(11) NOT NULL,
  `autor_id` int(11) NOT NULL,
  PRIMARY KEY (`trabajo_autor_id`),
  KEY `fk_trabajo_autor_autores1_idx` (`autor_id`),
  KEY `fk_trabajo_autor_trabajos1_idx` (`trabajo_id`),
  CONSTRAINT `fk_trabajo_autor_autores1` FOREIGN KEY (`autor_id`) REFERENCES `autor` (`autor_id`),
  CONSTRAINT `fk_trabajo_autor_trabajos1` FOREIGN KEY (`trabajo_id`) REFERENCES `trabajos` (`trabajo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- demo_bib.trabajo_stock definition

CREATE TABLE `trabajo_stock` (
  `trabajo_stock_id` int(11) NOT NULL AUTO_INCREMENT,
  `trabajo_id` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `en_biblioteca` int(11) NOT NULL,
  `en_prestamo` int(11) NOT NULL,
  `en_atraso` int(11) NOT NULL,
  PRIMARY KEY (`trabajo_stock_id`),
  KEY `fk_trabajo_stock_trabajos1_idx` (`trabajo_id`),
  CONSTRAINT `fk_trabajo_stock_trabajos1` FOREIGN KEY (`trabajo_id`) REFERENCES `trabajos` (`trabajo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- demo_bib.usuarios_perfiles definition

CREATE TABLE `usuarios_perfiles` (
  `usuario_perfil_id` int(11) NOT NULL AUTO_INCREMENT,
  `perfil_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`usuario_perfil_id`),
  KEY `fk_usuarios_perfiles_perfiles1_idx` (`perfil_id`),
  KEY `fk_usuarios_perfiles_usuarios1_idx` (`usuario_id`),
  CONSTRAINT `fk_usuarios_perfiles_perfiles1` FOREIGN KEY (`perfil_id`) REFERENCES `perfiles` (`perfil_id`),
  CONSTRAINT `usuarios_perfiles_FK` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;


-- demo_bib.alumnos definition

CREATE TABLE `alumnos` (
  `alumno_id` int(11) NOT NULL AUTO_INCREMENT,
  `rut_alumno` varchar(15) NOT NULL,
  `nombre_alumno` varchar(200) NOT NULL,
  `apellido_alumno` varchar(200) NOT NULL,
  `email_alumno` varchar(200) NOT NULL,
  `carrera_id` int(11) NOT NULL,
  `alumno_activo` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`alumno_id`),
  UNIQUE KEY `rut_alumno` (`rut_alumno`),
  KEY `fk_alumno_carrera` (`carrera_id`),
  CONSTRAINT `fk_alumno_carrera` FOREIGN KEY (`carrera_id`) REFERENCES `carreras` (`carrera_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;


-- demo_bib.prestamos definition

CREATE TABLE `prestamos` (
  `prestamo_id` int(11) NOT NULL AUTO_INCREMENT,
  `alumno_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `estado` enum('PRESTADO','ATRASADO','FINALIZADO','FINALIZADO_ATRASADO') DEFAULT NULL,
  PRIMARY KEY (`prestamo_id`),
  KEY `fk_prestamo_alumno` (`alumno_id`),
  KEY `fk_prestamo_usuario` (`usuario_id`),
  CONSTRAINT `fk_prestamo_alumno` FOREIGN KEY (`alumno_id`) REFERENCES `alumnos` (`alumno_id`),
  CONSTRAINT `fk_prestamo_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;


-- demo_bib.prestamo_ejemplar definition

CREATE TABLE `prestamo_ejemplar` (
  `prestamo_ejemplar_id` int(11) NOT NULL AUTO_INCREMENT,
  `prestamo_id` int(11) NOT NULL,
  `ejemplar_id` int(11) NOT NULL,
  PRIMARY KEY (`prestamo_ejemplar_id`),
  KEY `fk_prestamo_ejemplar_prestamos1_idx` (`prestamo_id`),
  KEY `fk_prestamo_ejemplar_ejemplar1_idx` (`ejemplar_id`),
  CONSTRAINT `fk_prestamo_ejemplar_ejemplar1` FOREIGN KEY (`ejemplar_id`) REFERENCES `ejemplar` (`ejemplar_id`),
  CONSTRAINT `fk_prestamo_ejemplar_prestamos1` FOREIGN KEY (`prestamo_id`) REFERENCES `prestamos` (`prestamo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;