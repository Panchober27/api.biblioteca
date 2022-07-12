-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-07-2022 a las 04:07:58
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `biblioteca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `alumno_id` int(11) NOT NULL,
  `rut_alumno` varchar(15) NOT NULL,
  `nombre_alumno` varchar(200) NOT NULL,
  `apellido_alumno` varchar(200) NOT NULL,
  `email_alumno` varchar(200) NOT NULL,
  `carrera_id` int(11) NOT NULL,
  `alumno_activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`alumno_id`, `rut_alumno`, `nombre_alumno`, `apellido_alumno`, `email_alumno`, `carrera_id`, `alumno_activo`) VALUES
(1, '1111111-1', 'Daniel', 'Munoz', 'd.munoza@gmail.com', 5, 1),
(2, '22222222-2', 'Benjamin', 'Meneses', 'japz@gmail.com', 1, 1),
(3, '33333333-3', 'Barbara', 'Fuentealba', 'barbijs@gmail.com', 6, 0),
(4, '333333-3', 'Eric', 'Cartman', 'ecartman@southpark.com', 6, 1),
(9, '44444-4', 'Kyle', 'Brofolwsky', 'kbrofolwsky@southpark.com', 1, 1),
(10, '55555-5', 'Kenneth', 'Mccormic', 'kmccormic@southpark.com', 3, 1),
(11, '666666-6', 'Stan', 'Marsh', 'smarsh@southpark.com', 5, 1),
(12, '7777777-7', 'Butters', 'Stotch', 'bstotch@southpark.com', 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autor`
--

CREATE TABLE `autor` (
  `autor_id` int(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `nacionalidad` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `fecha_fallecimiento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carreras`
--

CREATE TABLE `carreras` (
  `carrera_id` int(11) NOT NULL,
  `nombre_carrera` varchar(200) NOT NULL,
  `descripcion_carrera` varchar(500) NOT NULL,
  `facultad_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carreras`
--

INSERT INTO `carreras` (`carrera_id`, `nombre_carrera`, `descripcion_carrera`, `facultad_id`) VALUES
(1, 'Ing Informatica', 'Carrera de ingieneria informatica', 1),
(2, 'Ing Industrial', 'Carrera de ingieneria informatica', 1),
(3, 'Ing Comercial', 'Carrera de ingieneria informatica', 1),
(4, 'Enfermeria', 'Carrera de ingieneria Enfermeria', 2),
(5, 'Medicina', 'Carrera de ingieneria Medicina', 2),
(6, 'Terapia Ocupacional', 'Carrera de Terapia Ocupacional', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejemplar`
--

CREATE TABLE `ejemplar` (
  `ejemplar_id` int(11) NOT NULL,
  `isbn` int(20) DEFAULT NULL,
  `libro_id` int(11) DEFAULT NULL,
  `revista_id` int(11) DEFAULT NULL,
  `trabajo_id` int(11) DEFAULT NULL,
  `fecha_entrega` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `fecha_devolucion` datetime DEFAULT NULL,
  `estado` enum('DISPONIBLE','PRESTADO','ATRASADO') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ejemplar`
--



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facultades`
--

CREATE TABLE `facultades` (
  `facultad_id` int(11) NOT NULL,
  `nombre_facultad` varchar(200) NOT NULL,
  `descripcion_facultad` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `facultades`
--

INSERT INTO `facultades` (`facultad_id`, `nombre_facultad`, `descripcion_facultad`) VALUES
(1, 'Ingenieria', 'Facultad de ingienerias'),
(2, 'Salud', 'Facultad salud'),
(3, 'Humanidades', 'Facultad de humanidades'),
(4, 'Educacion', 'Facultad de educacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `libro_id` int(11) NOT NULL,
  `isbn_tipo` varchar(200) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `editorial` varchar(200) NOT NULL,
  `edicion` varchar(200) NOT NULL,
  `fecha_publicacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `libros`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro_autores`
--

CREATE TABLE `libro_autores` (
  `libro_autor_id` int(11) NOT NULL,
  `libro_id` int(11) NOT NULL,
  `autor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro_stock`
--

CREATE TABLE `libro_stock` (
  `libro_stock_id` int(11) NOT NULL,
  `libro_id` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `en_biblioteca` int(11) NOT NULL,
  `en_prestamo` int(11) NOT NULL,
  `en_atraso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `libro_stock`
--



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfiles`
--

CREATE TABLE `perfiles` (
  `perfil_id` int(11) NOT NULL,
  `perfil_nombre` varchar(45) NOT NULL,
  `perfil_opciones` varchar(200) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `perfiles`
--

INSERT INTO `perfiles` (`perfil_id`, `perfil_nombre`, `perfil_opciones`, `timestamp`) VALUES
(1, 'ADMINISTRADOR', NULL, '2022-07-09 16:58:52'),
(2, 'USUARIO', NULL, '2022-07-09 16:58:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfiles_permisos`
--

CREATE TABLE `perfiles_permisos` (
  `perfil_permiso_id` int(11) NOT NULL,
  `permiso_id` int(11) NOT NULL,
  `perfil_id` int(11) NOT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `perfiles_permisos`
--

INSERT INTO `perfiles_permisos` (`perfil_permiso_id`, `permiso_id`, `perfil_id`, `timestamp`) VALUES
(1, 1, 1, '2022-07-09 16:59:54'),
(2, 2, 2, '2022-07-09 16:59:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `permiso_id` int(11) NOT NULL,
  `permiso_nombre` varchar(50) NOT NULL,
  `permiso_tag` varchar(50) NOT NULL,
  `permiso_descripcion` varchar(100) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`permiso_id`, `permiso_nombre`, `permiso_tag`, `permiso_descripcion`, `timestamp`) VALUES
(1, 'administrador', 'administrador', NULL, '2022-07-09 16:59:31'),
(2, 'usuario', 'usuario', NULL, '2022-07-09 16:59:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamos`
--

CREATE TABLE `prestamos` (
  `prestamo_id` int(11) NOT NULL,
  `alumno_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  `estado` enum('PRESTADO','ATRASADO','FINALIZADO','FINALIZADO_ATRASADO') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `prestamos`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamo_ejemplar`
--

CREATE TABLE `prestamo_ejemplar` (
  `prestamo_ejemplar_id` int(11) NOT NULL,
  `prestamo_id` int(11) NOT NULL,
  `ejemplar_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `prestamo_ejemplar`
--



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `revistas`
--

CREATE TABLE `revistas` (
  `revista_id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `editorial` varchar(200) NOT NULL,
  `edicion` varchar(200) NOT NULL,
  `fecha_publicacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `revista_autor`
--

CREATE TABLE `revista_autor` (
  `revista_autor_id` int(11) NOT NULL,
  `revista_id` int(11) NOT NULL,
  `autor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `revista_stock`
--

CREATE TABLE `revista_stock` (
  `revista_stock_id` int(11) NOT NULL,
  `revista_id` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `en_biblioteca` int(11) NOT NULL,
  `en_prestamo` int(11) NOT NULL,
  `en_atraso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajos`
--

CREATE TABLE `trabajos` (
  `trabajo_id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `editorial` varchar(200) NOT NULL,
  `edicion` varchar(200) NOT NULL,
  `fecha_publicacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajo_autor`
--

CREATE TABLE `trabajo_autor` (
  `trabajo_autor_id` int(11) NOT NULL,
  `trabajo_id` int(11) NOT NULL,
  `autor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajo_stock`
--

CREATE TABLE `trabajo_stock` (
  `trabajo_stock_id` int(11) NOT NULL,
  `trabajo_id` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `en_biblioteca` int(11) NOT NULL,
  `en_prestamo` int(11) NOT NULL,
  `en_atraso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL,
  `usuario` varchar(200) NOT NULL,
  `nombre` varchar(200) DEFAULT NULL,
  `apellido` varchar(200) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `usuario_token` varchar(1000) DEFAULT NULL,
  `usuario_salt` varchar(100) DEFAULT NULL,
  `usuario_mail` varchar(150) NOT NULL,
  `usuario_tipo` enum('USUARIO','ADMINISTRADOR') DEFAULT NULL,
  `usuario_activo` tinyint(1) DEFAULT 1,
  `timestamp` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `usuario`, `nombre`, `apellido`, `password`, `usuario_token`, `usuario_salt`, `usuario_mail`, `usuario_tipo`, `usuario_activo`, `timestamp`) VALUES
(1, 'carla', 'Carla', 'Gonzalez', '9OQislUkF/gYQjCO4R78gfyDMDtmdpQGlxKyoCNy5PWASP8iD0eDG6VpMLIwQ8bJkXi5fLtfw7oqFmeWI3VKgA==', NULL, 'lGxQCW49SWl7uFEfQuB5DQ==', 'carlagon@gmail.com', 'ADMINISTRADOR', 1, '2022-06-16 06:24:01'),
(2, 'pancho', 'Francisco', 'Berwart', '/4TT+KVPMCtG8QAGney8y2Q5L5Ge4EcidzmrtIGbKlPxv5FWb13CmY5fKWUtX3DHO83uUXqP384+gYKqS9xAXw==', NULL, 'NMnDAdPkXv/hdx2m8Fwb5A==', 'panchober27@gmail.com', 'ADMINISTRADOR', 1, '2022-06-16 06:35:05'),
(4, 'maxi', 'Maximiliano', 'Machuca', 'MpQDA5xc7H++0JYIyJkAJ5zs1Auhcv3bPwDnN0pw0gynayLDDVkifdvnsiCEiSZGDc3s7Pm10pYsr1S10FbOhw==', NULL, 'heEaTMhU85SLNpsg+glxww==', 'maxi@mail.com', 'USUARIO', 1, '2022-07-09 17:39:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_perfiles`
--

CREATE TABLE `usuarios_perfiles` (
  `usuario_perfil_id` int(11) NOT NULL,
  `perfil_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios_perfiles`
--

INSERT INTO `usuarios_perfiles` (`usuario_perfil_id`, `perfil_id`, `usuario_id`, `timestamp`) VALUES
(1, 1, 1, '2022-07-09 17:00:27'),
(2, 1, 2, '2022-07-09 17:00:27');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`alumno_id`),
  ADD UNIQUE KEY `rut_alumno` (`rut_alumno`),
  ADD KEY `fk_alumno_carrera` (`carrera_id`);

--
-- Indices de la tabla `autor`
--
ALTER TABLE `autor`
  ADD PRIMARY KEY (`autor_id`);

--
-- Indices de la tabla `carreras`
--
ALTER TABLE `carreras`
  ADD PRIMARY KEY (`carrera_id`),
  ADD KEY `fk_carrera_facultad` (`facultad_id`);

--
-- Indices de la tabla `ejemplar`
--
ALTER TABLE `ejemplar`
  ADD PRIMARY KEY (`ejemplar_id`),
  ADD UNIQUE KEY `isbn` (`isbn`),
  ADD KEY `fk_ejemplar_libro` (`libro_id`),
  ADD KEY `fk_ejemplar_revista` (`revista_id`),
  ADD KEY `fk_ejemplar_ensayo` (`trabajo_id`);

--
-- Indices de la tabla `facultades`
--
ALTER TABLE `facultades`
  ADD PRIMARY KEY (`facultad_id`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`libro_id`);

--
-- Indices de la tabla `libro_autores`
--
ALTER TABLE `libro_autores`
  ADD PRIMARY KEY (`libro_autor_id`),
  ADD KEY `fk_libro_autores_autores1_idx` (`autor_id`),
  ADD KEY `fk_libro_autores_libros1_idx` (`libro_id`);

--
-- Indices de la tabla `libro_stock`
--
ALTER TABLE `libro_stock`
  ADD PRIMARY KEY (`libro_stock_id`),
  ADD KEY `fk_libro_stock_libros1_idx` (`libro_id`);

--
-- Indices de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  ADD PRIMARY KEY (`perfil_id`);

--
-- Indices de la tabla `perfiles_permisos`
--
ALTER TABLE `perfiles_permisos`
  ADD PRIMARY KEY (`perfil_permiso_id`),
  ADD UNIQUE KEY `perfiles_permisos_UN` (`permiso_id`,`perfil_id`),
  ADD KEY `fk_perfiles_permisos_permisos1_idx` (`permiso_id`),
  ADD KEY `fk_perfiles_permisos_perfiles1_idx` (`perfil_id`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`permiso_id`),
  ADD UNIQUE KEY `permisos_tag_UN` (`permiso_tag`);

--
-- Indices de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD PRIMARY KEY (`prestamo_id`),
  ADD KEY `fk_prestamo_alumno` (`alumno_id`),
  ADD KEY `fk_prestamo_usuario` (`usuario_id`);

--
-- Indices de la tabla `prestamo_ejemplar`
--
ALTER TABLE `prestamo_ejemplar`
  ADD PRIMARY KEY (`prestamo_ejemplar_id`),
  ADD KEY `fk_prestamo_ejemplar_prestamos1_idx` (`prestamo_id`),
  ADD KEY `fk_prestamo_ejemplar_ejemplar1_idx` (`ejemplar_id`);

--
-- Indices de la tabla `revistas`
--
ALTER TABLE `revistas`
  ADD PRIMARY KEY (`revista_id`);

--
-- Indices de la tabla `revista_autor`
--
ALTER TABLE `revista_autor`
  ADD PRIMARY KEY (`revista_autor_id`),
  ADD KEY `fk_revista_autor_autores1_idx` (`autor_id`),
  ADD KEY `fk_revista_autor_revistas1_idx` (`revista_id`);

--
-- Indices de la tabla `revista_stock`
--
ALTER TABLE `revista_stock`
  ADD PRIMARY KEY (`revista_stock_id`),
  ADD KEY `fk_revista_stock_revistas1_idx` (`revista_id`);

--
-- Indices de la tabla `trabajos`
--
ALTER TABLE `trabajos`
  ADD PRIMARY KEY (`trabajo_id`);

--
-- Indices de la tabla `trabajo_autor`
--
ALTER TABLE `trabajo_autor`
  ADD PRIMARY KEY (`trabajo_autor_id`),
  ADD KEY `fk_trabajo_autor_autores1_idx` (`autor_id`),
  ADD KEY `fk_trabajo_autor_trabajos1_idx` (`trabajo_id`);

--
-- Indices de la tabla `trabajo_stock`
--
ALTER TABLE `trabajo_stock`
  ADD PRIMARY KEY (`trabajo_stock_id`),
  ADD KEY `fk_trabajo_stock_trabajos1_idx` (`trabajo_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`);

--
-- Indices de la tabla `usuarios_perfiles`
--
ALTER TABLE `usuarios_perfiles`
  ADD PRIMARY KEY (`usuario_perfil_id`),
  ADD KEY `fk_usuarios_perfiles_perfiles1_idx` (`perfil_id`),
  ADD KEY `fk_usuarios_perfiles_usuarios1_idx` (`usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `alumno_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `autor`
--
ALTER TABLE `autor`
  MODIFY `autor_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `carreras`
--
ALTER TABLE `carreras`
  MODIFY `carrera_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `ejemplar`
--
ALTER TABLE `ejemplar`
  MODIFY `ejemplar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `facultades`
--
ALTER TABLE `facultades`
  MODIFY `facultad_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `libro_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `libro_autores`
--
ALTER TABLE `libro_autores`
  MODIFY `libro_autor_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `libro_stock`
--
ALTER TABLE `libro_stock`
  MODIFY `libro_stock_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  MODIFY `perfil_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `perfiles_permisos`
--
ALTER TABLE `perfiles_permisos`
  MODIFY `perfil_permiso_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `permiso_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  MODIFY `prestamo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `prestamo_ejemplar`
--
ALTER TABLE `prestamo_ejemplar`
  MODIFY `prestamo_ejemplar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `revistas`
--
ALTER TABLE `revistas`
  MODIFY `revista_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `revista_autor`
--
ALTER TABLE `revista_autor`
  MODIFY `revista_autor_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `revista_stock`
--
ALTER TABLE `revista_stock`
  MODIFY `revista_stock_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `trabajos`
--
ALTER TABLE `trabajos`
  MODIFY `trabajo_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `trabajo_autor`
--
ALTER TABLE `trabajo_autor`
  MODIFY `trabajo_autor_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `trabajo_stock`
--
ALTER TABLE `trabajo_stock`
  MODIFY `trabajo_stock_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios_perfiles`
--
ALTER TABLE `usuarios_perfiles`
  MODIFY `usuario_perfil_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD CONSTRAINT `fk_alumno_carrera` FOREIGN KEY (`carrera_id`) REFERENCES `carreras` (`carrera_id`);

--
-- Filtros para la tabla `carreras`
--
ALTER TABLE `carreras`
  ADD CONSTRAINT `fk_carrera_facultad` FOREIGN KEY (`facultad_id`) REFERENCES `facultades` (`facultad_id`);

--
-- Filtros para la tabla `ejemplar`
--
ALTER TABLE `ejemplar`
  ADD CONSTRAINT `fk_ejemplar_libro` FOREIGN KEY (`libro_id`) REFERENCES `libros` (`libro_id`),
  ADD CONSTRAINT `fk_ejemplar_revista` FOREIGN KEY (`revista_id`) REFERENCES `revistas` (`revista_id`),
  ADD CONSTRAINT `fk_ejemplar_trabajo` FOREIGN KEY (`trabajo_id`) REFERENCES `trabajos` (`trabajo_id`);

--
-- Filtros para la tabla `libro_autores`
--
ALTER TABLE `libro_autores`
  ADD CONSTRAINT `fk_libro_autores_autores1` FOREIGN KEY (`autor_id`) REFERENCES `autor` (`autor_id`),
  ADD CONSTRAINT `fk_libro_autores_libros1` FOREIGN KEY (`libro_id`) REFERENCES `libros` (`libro_id`);

--
-- Filtros para la tabla `libro_stock`
--
ALTER TABLE `libro_stock`
  ADD CONSTRAINT `fk_libro_stock_libros1` FOREIGN KEY (`libro_id`) REFERENCES `libros` (`libro_id`);

--
-- Filtros para la tabla `perfiles_permisos`
--
ALTER TABLE `perfiles_permisos`
  ADD CONSTRAINT `fk_perfiles_permisos_perfiles1` FOREIGN KEY (`perfil_id`) REFERENCES `perfiles` (`perfil_id`),
  ADD CONSTRAINT `fk_perfiles_permisos_permisos1` FOREIGN KEY (`permiso_id`) REFERENCES `permisos` (`permiso_id`);

--
-- Filtros para la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD CONSTRAINT `fk_prestamo_alumno` FOREIGN KEY (`alumno_id`) REFERENCES `alumnos` (`alumno_id`),
  ADD CONSTRAINT `fk_prestamo_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `prestamo_ejemplar`
--
ALTER TABLE `prestamo_ejemplar`
  ADD CONSTRAINT `fk_prestamo_ejemplar_ejemplar1` FOREIGN KEY (`ejemplar_id`) REFERENCES `ejemplar` (`ejemplar_id`),
  ADD CONSTRAINT `fk_prestamo_ejemplar_prestamos1` FOREIGN KEY (`prestamo_id`) REFERENCES `prestamos` (`prestamo_id`);

--
-- Filtros para la tabla `revista_autor`
--
ALTER TABLE `revista_autor`
  ADD CONSTRAINT `fk_revista_autor_autores1` FOREIGN KEY (`autor_id`) REFERENCES `autor` (`autor_id`),
  ADD CONSTRAINT `fk_revista_autor_revistas1` FOREIGN KEY (`revista_id`) REFERENCES `revistas` (`revista_id`);

--
-- Filtros para la tabla `revista_stock`
--
ALTER TABLE `revista_stock`
  ADD CONSTRAINT `fk_revista_stock_revistas1` FOREIGN KEY (`revista_id`) REFERENCES `revistas` (`revista_id`);

--
-- Filtros para la tabla `trabajo_autor`
--
ALTER TABLE `trabajo_autor`
  ADD CONSTRAINT `fk_trabajo_autor_autores1` FOREIGN KEY (`autor_id`) REFERENCES `autor` (`autor_id`),
  ADD CONSTRAINT `fk_trabajo_autor_trabajos1` FOREIGN KEY (`trabajo_id`) REFERENCES `trabajos` (`trabajo_id`);

--
-- Filtros para la tabla `trabajo_stock`
--
ALTER TABLE `trabajo_stock`
  ADD CONSTRAINT `fk_trabajo_stock_trabajos1` FOREIGN KEY (`trabajo_id`) REFERENCES `trabajos` (`trabajo_id`);

--
-- Filtros para la tabla `usuarios_perfiles`
--
ALTER TABLE `usuarios_perfiles`
  ADD CONSTRAINT `fk_usuarios_perfiles_perfiles1` FOREIGN KEY (`perfil_id`) REFERENCES `perfiles` (`perfil_id`),
  ADD CONSTRAINT `usuarios_perfiles_FK` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
