-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: biblioteca
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `autor`
--

DROP TABLE IF EXISTS `autor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `autor` (
  `autor_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `nacionalidad` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `fecha_fallecimiento` date DEFAULT NULL,
  PRIMARY KEY (`autor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autor`
--

LOCK TABLES `autor` WRITE;
/*!40000 ALTER TABLE `autor` DISABLE KEYS */;
/*!40000 ALTER TABLE `autor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carreras`
--

DROP TABLE IF EXISTS `carreras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carreras` (
  `carrera_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_carrera` varchar(200) NOT NULL,
  `descripcion_carrera` varchar(500) NOT NULL,
  `facultad_id` int(11) NOT NULL,
  PRIMARY KEY (`carrera_id`),
  KEY `fk_carrera_facultad` (`facultad_id`),
  CONSTRAINT `fk_carrera_facultad` FOREIGN KEY (`facultad_id`) REFERENCES `facultades` (`facultad_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carreras`
--

LOCK TABLES `carreras` WRITE;
/*!40000 ALTER TABLE `carreras` DISABLE KEYS */;
/*!40000 ALTER TABLE `carreras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ejemplar`
--

DROP TABLE IF EXISTS `ejemplar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ejemplar` (
  `ejemplar_id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` int(20) DEFAULT NULL,
  `libro_id` int(11) DEFAULT NULL,
  `revista_id` int(11) DEFAULT NULL,
  `trabajo_id` int(11) DEFAULT NULL,
  `fecha_entrga` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `fecha_devolucion` date DEFAULT NULL,
  `estado` enum('DISPONIBLE','PRESTADO','ATRASADO') DEFAULT NULL,
  PRIMARY KEY (`ejemplar_id`),
  UNIQUE KEY `isbn` (`isbn`),
  KEY `fk_ejemplar_libro` (`libro_id`),
  KEY `fk_ejemplar_revista` (`revista_id`),
  KEY `fk_ejemplar_ensayo` (`trabajo_id`),
  CONSTRAINT `fk_ejemplar_libro` FOREIGN KEY (`libro_id`) REFERENCES `libros` (`libro_id`),
  CONSTRAINT `fk_ejemplar_revista` FOREIGN KEY (`revista_id`) REFERENCES `revistas` (`revista_id`),
  CONSTRAINT `fk_ejemplar_trabajo` FOREIGN KEY (`trabajo_id`) REFERENCES `trabajos` (`trabajo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ejemplar`
--

LOCK TABLES `ejemplar` WRITE;
/*!40000 ALTER TABLE `ejemplar` DISABLE KEYS */;
/*!40000 ALTER TABLE `ejemplar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facultades`
--

DROP TABLE IF EXISTS `facultades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facultades` (
  `facultad_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_facultad` varchar(200) NOT NULL,
  `descripcion_facultad` varchar(500) NOT NULL,
  PRIMARY KEY (`facultad_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facultades`
--

LOCK TABLES `facultades` WRITE;
/*!40000 ALTER TABLE `facultades` DISABLE KEYS */;
/*!40000 ALTER TABLE `facultades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libro_autores`
--

DROP TABLE IF EXISTS `libro_autores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libro_autores`
--

LOCK TABLES `libro_autores` WRITE;
/*!40000 ALTER TABLE `libro_autores` DISABLE KEYS */;
/*!40000 ALTER TABLE `libro_autores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libro_stock`
--

DROP TABLE IF EXISTS `libro_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `libro_stock` (
  `libro_stock_id` int(11) NOT NULL AUTO_INCREMENT,
  `libro_id` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  PRIMARY KEY (`libro_stock_id`),
  KEY `fk_libro_stock_libros1_idx` (`libro_id`),
  CONSTRAINT `fk_libro_stock_libros1` FOREIGN KEY (`libro_id`) REFERENCES `libros` (`libro_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libro_stock`
--

LOCK TABLES `libro_stock` WRITE;
/*!40000 ALTER TABLE `libro_stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `libro_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libros`
--

DROP TABLE IF EXISTS `libros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `libros` (
  `libro_id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` varchar(200) NOT NULL,
  `isbn_tipo` varchar(200) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `editorial` varchar(200) NOT NULL,
  `edicion` varchar(200) NOT NULL,
  `fecha_publicacion` varchar(200) NOT NULL,
  PRIMARY KEY (`libro_id`),
  UNIQUE KEY `isbn` (`isbn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libros`
--

LOCK TABLES `libros` WRITE;
/*!40000 ALTER TABLE `libros` DISABLE KEYS */;
/*!40000 ALTER TABLE `libros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfiles`
--

DROP TABLE IF EXISTS `perfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `perfiles` (
  `perfil_id` int(11) NOT NULL AUTO_INCREMENT,
  `perfil_nombre` varchar(45) NOT NULL,
  `perfil_opciones` varchar(200) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`perfil_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfiles`
--

LOCK TABLES `perfiles` WRITE;
/*!40000 ALTER TABLE `perfiles` DISABLE KEYS */;
/*!40000 ALTER TABLE `perfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfiles_permisos`
--

DROP TABLE IF EXISTS `perfiles_permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfiles_permisos`
--

LOCK TABLES `perfiles_permisos` WRITE;
/*!40000 ALTER TABLE `perfiles_permisos` DISABLE KEYS */;
/*!40000 ALTER TABLE `perfiles_permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisos`
--

DROP TABLE IF EXISTS `permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permisos` (
  `permiso_id` int(11) NOT NULL AUTO_INCREMENT,
  `permiso_nombre` varchar(50) NOT NULL,
  `permiso_tag` varchar(50) NOT NULL,
  `permiso_descripcion` varchar(100) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`permiso_id`),
  UNIQUE KEY `permisos_tag_UN` (`permiso_tag`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos`
--

LOCK TABLES `permisos` WRITE;
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
INSERT INTO `permisos` VALUES (1,'Crud-Usuarios','crud-usuarios',NULL,'2022-05-27 06:33:40');
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestamo_ejemplar`
--

DROP TABLE IF EXISTS `prestamo_ejemplar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prestamo_ejemplar` (
  `prestamo_ejemplar_id` int(11) NOT NULL AUTO_INCREMENT,
  `prestamo_id` int(11) NOT NULL,
  `ejemplar_id` int(11) NOT NULL,
  PRIMARY KEY (`prestamo_ejemplar_id`),
  KEY `fk_prestamo_ejemplar_prestamos1_idx` (`prestamo_id`),
  KEY `fk_prestamo_ejemplar_ejemplar1_idx` (`ejemplar_id`),
  CONSTRAINT `fk_prestamo_ejemplar_ejemplar1` FOREIGN KEY (`ejemplar_id`) REFERENCES `ejemplar` (`ejemplar_id`),
  CONSTRAINT `fk_prestamo_ejemplar_prestamos1` FOREIGN KEY (`prestamo_id`) REFERENCES `prestamos` (`prestamo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamo_ejemplar`
--

LOCK TABLES `prestamo_ejemplar` WRITE;
/*!40000 ALTER TABLE `prestamo_ejemplar` DISABLE KEYS */;
/*!40000 ALTER TABLE `prestamo_ejemplar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestamos`
--

DROP TABLE IF EXISTS `prestamos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prestamos` (
  `prestamo_id` int(11) NOT NULL AUTO_INCREMENT,
  `alumno_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `fecha_inicio` varchar(200) NOT NULL,
  `fecha_fin` varchar(200) NOT NULL,
  `estado` enum('PRESTADO','ATRASADO','FINALIZADO','FINALIZADO_ATRASADO') DEFAULT NULL,
  PRIMARY KEY (`prestamo_id`),
  KEY `fk_prestamo_alumno` (`alumno_id`),
  KEY `fk_prestamo_usuario` (`usuario_id`),
  CONSTRAINT `fk_prestamo_alumno` FOREIGN KEY (`alumno_id`) REFERENCES `alumnos` (`alumno_id`),
  CONSTRAINT `fk_prestamo_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamos`
--

LOCK TABLES `prestamos` WRITE;
/*!40000 ALTER TABLE `prestamos` DISABLE KEYS */;
/*!40000 ALTER TABLE `prestamos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revista_autor`
--

DROP TABLE IF EXISTS `revista_autor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revista_autor`
--

LOCK TABLES `revista_autor` WRITE;
/*!40000 ALTER TABLE `revista_autor` DISABLE KEYS */;
/*!40000 ALTER TABLE `revista_autor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revista_stock`
--

DROP TABLE IF EXISTS `revista_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revista_stock`
--

LOCK TABLES `revista_stock` WRITE;
/*!40000 ALTER TABLE `revista_stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `revista_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revistas`
--

DROP TABLE IF EXISTS `revistas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `revistas` (
  `revista_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `editorial` varchar(200) NOT NULL,
  `edicion` varchar(200) NOT NULL,
  `fecha_publicacion` varchar(200) NOT NULL,
  PRIMARY KEY (`revista_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revistas`
--

LOCK TABLES `revistas` WRITE;
/*!40000 ALTER TABLE `revistas` DISABLE KEYS */;
/*!40000 ALTER TABLE `revistas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trabajo_autor`
--

DROP TABLE IF EXISTS `trabajo_autor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trabajo_autor`
--

LOCK TABLES `trabajo_autor` WRITE;
/*!40000 ALTER TABLE `trabajo_autor` DISABLE KEYS */;
/*!40000 ALTER TABLE `trabajo_autor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trabajo_stock`
--

DROP TABLE IF EXISTS `trabajo_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trabajo_stock`
--

LOCK TABLES `trabajo_stock` WRITE;
/*!40000 ALTER TABLE `trabajo_stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `trabajo_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trabajos`
--

DROP TABLE IF EXISTS `trabajos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trabajos` (
  `trabajo_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `editorial` varchar(200) NOT NULL,
  `edicion` varchar(200) NOT NULL,
  `fecha_publicacion` varchar(200) NOT NULL,
  PRIMARY KEY (`trabajo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trabajos`
--

LOCK TABLES `trabajos` WRITE;
/*!40000 ALTER TABLE `trabajos` DISABLE KEYS */;
/*!40000 ALTER TABLE `trabajos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'carla','Carla','Gonzalez','y45zODUTx6Bx3JPqn4qlJkZBIynTQkEW0GncYO3Ig0gyuvEW6Y6rfNx7OefueZAoC0QbprfS/XytVLyNFrEYQg==',NULL,'RRNU+CgJVR/7I7pZuZFCsA==','carlagon64@gmail.com','ADMINISTRADOR',1,'2022-05-27 06:36:04'),(2,'maxi','Maximiliano','Maximiliano','pi+tcvOn1QmRxw4vWGHkeDET836IJdP36Vby6wa+mA+Z2eRQKf1ZVBE5G7sKPsUunHN+w1bzFtqzRfK4Xf2sRA==',NULL,'p3RacfMFHwKV/mazLUuSDw==','tttmaximiliano@gmail.com','ADMINISTRADOR',1,'2022-05-27 06:37:14'),(3,'pancho','Francisco','Berwart','jdC+68LyPgrtz2D3Vu5pCEd9tIR6KGUc0tE86cal5oQgPdLZvqJB11JA22vIcwSA5E+/OL3I4VuPzfx+35KgjA==',NULL,'2fV7a+6qhYzxJIGi63hMmA==','panchober27@gmail.com','ADMINISTRADOR',1,'2022-05-27 06:37:40');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_perfiles`
--

DROP TABLE IF EXISTS `usuarios_perfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_perfiles`
--

LOCK TABLES `usuarios_perfiles` WRITE;
/*!40000 ALTER TABLE `usuarios_perfiles` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios_perfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'biblioteca'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-10 19:45:22
