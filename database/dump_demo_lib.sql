-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: demo_lib
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
  PRIMARY KEY (`alumno_id`),
  UNIQUE KEY `rut_alumno` (`rut_alumno`),
  KEY `fk_alumno_carrera` (`carrera_id`),
  CONSTRAINT `fk_alumno_carrera` FOREIGN KEY (`carrera_id`) REFERENCES `carreras` (`carrera_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (3,'19456845-5','Daniel Esteban','Muñoz Avendaño','d.monuz.a@gmail.com',1),(4,'196565986-3','Benjamin Ignacio','Meneses Gonzalez','japz@gmail.com',2);
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carreras`
--

LOCK TABLES `carreras` WRITE;
/*!40000 ALTER TABLE `carreras` DISABLE KEYS */;
INSERT INTO `carreras` VALUES (1,'Medicina','Carrera de Medicina',1),(2,'Ingeneria Comercial','Carrera de Ingeneria Comerical',2);
/*!40000 ALTER TABLE `carreras` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facultades`
--

LOCK TABLES `facultades` WRITE;
/*!40000 ALTER TABLE `facultades` DISABLE KEYS */;
INSERT INTO `facultades` VALUES (1,'Medicina','Facultad de medicina'),(2,'Ingeneria','Facultad de Ingeneria');
/*!40000 ALTER TABLE `facultades` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libros`
--

LOCK TABLES `libros` WRITE;
/*!40000 ALTER TABLE `libros` DISABLE KEYS */;
INSERT INTO `libros` VALUES (1,'1313213','tapa dura','Harry Potter y la piedra filosofal','JK Rawling','De bolsillo','1a latam','21/11/1990',1,10);
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
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos`
--

LOCK TABLES `permisos` WRITE;
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
INSERT INTO `permisos` VALUES (59,'Crud-Usuarios','crud-usuarios','Este permiso permite al usuario (calidad admin) que realice operaciones crud en la tabla de usuarios','2022-04-16 04:12:03');
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;
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
  `fecha_entrega` varchar(200) NOT NULL,
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
-- Table structure for table `prestamos_libros`
--

DROP TABLE IF EXISTS `prestamos_libros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prestamos_libros` (
  `prestamos_libros_id` int(11) NOT NULL AUTO_INCREMENT,
  `prestamo_id` int(11) NOT NULL,
  `libro_id` int(11) NOT NULL,
  PRIMARY KEY (`prestamos_libros_id`),
  KEY `fk_prestamo_libro` (`prestamo_id`),
  KEY `fk_libro_prestamo` (`libro_id`),
  CONSTRAINT `fk_libro_prestamo` FOREIGN KEY (`libro_id`) REFERENCES `libros` (`libro_id`),
  CONSTRAINT `fk_prestamo_libro` FOREIGN KEY (`prestamo_id`) REFERENCES `prestamos` (`prestamo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamos_libros`
--

LOCK TABLES `prestamos_libros` WRITE;
/*!40000 ALTER TABLE `prestamos_libros` DISABLE KEYS */;
/*!40000 ALTER TABLE `prestamos_libros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_libro`
--

DROP TABLE IF EXISTS `tipo_libro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_libro` (
  `tipo_libro_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_tipo` varchar(200) NOT NULL,
  `descripcion_tipo` varchar(500) NOT NULL,
  PRIMARY KEY (`tipo_libro_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_libro`
--

LOCK TABLES `tipo_libro` WRITE;
/*!40000 ALTER TABLE `tipo_libro` DISABLE KEYS */;
INSERT INTO `tipo_libro` VALUES (1,'complementarios','Libros de lecturas complementarias y/o recreacionales.'),(2,'matematicas','Libros de matematicas...');
/*!40000 ALTER TABLE `tipo_libro` ENABLE KEYS */;
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
  `usuario_opciones` varchar(200) DEFAULT NULL,
  `usuario_tipo` enum('USUARIO','TECNICO') DEFAULT NULL,
  `usuario_activo` tinyint(1) NOT NULL DEFAULT 1,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (5,'fibr','Francisco','Berwart','ul96YjOF5QYaRBkCvrJkfWF6Dv3GYC6r075XCS6g23Fw7Mz61+FYpSNKUO1yh2t+Sk4GdowinSwSLYvPo0xikw==',NULL,'mbJ/T3+gNwTPcVdpGOYx1Q==','panchober27@gmail.com',NULL,'USUARIO',1,'2021-12-16 23:40:48'),(9,'carla','Carla','Gonzalez','RY3eJRHKctR1AaS6vYh70VrQU7V0u/S7IfKjTpcoFqs437nVrICNHxpq/g2TjcTSiC9NaSSVn0zfn+WU36WM2A==',NULL,'yUNyHneBFZXUQ37vKulQow==','carlagon64@gmail.com',NULL,NULL,1,'2022-04-17 02:58:23'),(10,'maximiliano','Carla','Gonzalez','2taDIJ+R+8PJyhsHc77pqHv/A4NElPs02d75686FM3chLftWIFIGOh6m6h/d49zXxlv52MS6cG0IWgXCiZCgWg==',NULL,'pfyYTiyvwD9ZpKNdaEogDw==','tttmaximiliano@gmail.com',NULL,NULL,1,'2022-04-17 03:00:53'),(11,'demo','DEMO','DEMO 1','F9skzjW2Bwm0mCk5zdaV5cM94+6PzG7XaI96/70gB5OlWeAohRAj3D2yWt/ZAYV+5jwYEJVEmhNQ5CGiBUCHtQ==',NULL,'8XfeElmDctFoclJ97sIavQ==','demo@mail.com','','USUARIO',1,'2022-05-16 05:41:10');
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
-- Dumping routines for database 'demo_lib'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16  2:07:05
