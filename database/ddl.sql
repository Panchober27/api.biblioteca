-- demo_lib.facultades definition

CREATE TABLE `facultades` (
  `facultad_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_facultad` varchar(200) NOT NULL,
  `descripcion_facultad` varchar(500) NOT NULL,
  PRIMARY KEY (`facultad_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;


-- demo_lib.perfiles definition

CREATE TABLE `perfiles` (
  `perfil_id` int(11) NOT NULL AUTO_INCREMENT,
  `perfil_nombre` varchar(45) NOT NULL,
  `perfil_opciones` varchar(200) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`perfil_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- demo_lib.permisos definition

CREATE TABLE `permisos` (
  `permiso_id` int(11) NOT NULL AUTO_INCREMENT,
  `permiso_nombre` varchar(50) NOT NULL,
  `permiso_tag` varchar(50) NOT NULL,
  `permiso_descripcion` varchar(100) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`permiso_id`),
  UNIQUE KEY `permisos_tag_UN` (`permiso_tag`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4;


-- demo_lib.tipo_libro definition

CREATE TABLE `tipo_libro` (
  `tipo_libro_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_tipo` varchar(200) NOT NULL,
  `descripcion_tipo` varchar(500) NOT NULL,
  PRIMARY KEY (`tipo_libro_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;


-- demo_lib.usuarios definition

CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(200) NOT NULL,
  `nombre` varchar(200) DEFAULT NULL,
  `apellido` varchar(200) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `usuario_token` varchar(1000) DEFAULT NULL,
  `usuario_salt` varchar(100) DEFAULT NULL,
  `usuario_mail` varchar(150) NOT NULL,
  `usuario_opciones` varchar(200) DEFAULT NULL,
  `usuario_tipo` enum('USUARIO','TECNICO') DEFAULT NULL,
  `usuario_activo` tinyint(1) NOT NULL DEFAULT 1,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;


-- demo_lib.carreras definition

CREATE TABLE `carreras` (
  `carrera_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_carrera` varchar(200) NOT NULL,
  `descripcion_carrera` varchar(500) NOT NULL,
  `facultad_id` int(11) NOT NULL,
  PRIMARY KEY (`carrera_id`),
  KEY `fk_carrera_facultad` (`facultad_id`),
  CONSTRAINT `fk_carrera_facultad` FOREIGN KEY (`facultad_id`) REFERENCES `facultades` (`facultad_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;


-- demo_lib.libros definition

CREATE TABLE `libros` (
  `libro_id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` varchar(200) NOT NULL,
  `isbn_tipo` varchar(200) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `autor` varchar(200) NOT NULL,
  `editorial` varchar(200) NOT NULL,
  `edicion` varchar(200) NOT NULL,
  `fecha_publicacion` varchar(200) NOT NULL,
  `tipo_libro` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  PRIMARY KEY (`libro_id`),
  UNIQUE KEY `isbn` (`isbn`),
  KEY `fk_libro_tipo_libro` (`tipo_libro`),
  CONSTRAINT `fk_libro_tipo_libro` FOREIGN KEY (`tipo_libro`) REFERENCES `tipo_libro` (`tipo_libro_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;


-- demo_lib.perfiles_permisos definition

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- demo_lib.usuarios_perfiles definition

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- demo_lib.alumnos definition

CREATE TABLE `alumnos` (
  `alumno_id` int(11) NOT NULL AUTO_INCREMENT,
  `rut_alumno` varchar(15) NOT NULL,
  `nombre_alumno` varchar(200) NOT NULL,
  `apellido_alumno` varchar(200) NOT NULL,
  `email_alumno` varchar(200) NOT NULL,
  `carrera_id` int(11) NOT NULL,
  PRIMARY KEY (`alumno_id`),
  UNIQUE KEY `rut_alumno` (`rut_alumno`),
  KEY `fk_alumno_carrera` (`carrera_id`),
  CONSTRAINT `fk_alumno_carrera` FOREIGN KEY (`carrera_id`) REFERENCES `carreras` (`carrera_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;


-- demo_lib.prestamos definition

CREATE TABLE `prestamos` (
  `prestamo_id` int(11) NOT NULL AUTO_INCREMENT,
  `alumno_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `fecha_inicio` varchar(200) NOT NULL,
  `fecha_fin` varchar(200) NOT NULL,
  `fecha_entrega` varchar(200) NOT NULL,
  `estado` enum('EN_STOCK','EN_PRESTAMO_VIGENTE','EN_PRESTAMO_RETRASO') DEFAULT NULL,
  PRIMARY KEY (`prestamo_id`),
  KEY `fk_prestamo_alumno` (`alumno_id`),
  KEY `fk_prestamo_usuario` (`usuario_id`),
  CONSTRAINT `fk_prestamo_alumno` FOREIGN KEY (`alumno_id`) REFERENCES `alumnos` (`alumno_id`),
  CONSTRAINT `fk_prestamo_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- demo_lib.prestamos_libros definition

CREATE TABLE `prestamos_libros` (
  `prestamos_libros_id` int(11) NOT NULL AUTO_INCREMENT,
  `prestamo_id` int(11) NOT NULL,
  `libro_id` int(11) NOT NULL,
  PRIMARY KEY (`prestamos_libros_id`),
  KEY `fk_prestamo_libro` (`prestamo_id`),
  KEY `fk_libro_prestamo` (`libro_id`),
  CONSTRAINT `fk_libro_prestamo` FOREIGN KEY (`libro_id`) REFERENCES `libros` (`libro_id`),
  CONSTRAINT `fk_prestamo_libro` FOREIGN KEY (`prestamo_id`) REFERENCES `prestamos` (`prestamo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;