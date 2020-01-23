-- MySQL dump 10.13  Distrib 5.6.43, for Win64 (x86_64)
--
-- Host: localhost    Database: food_application
-- ------------------------------------------------------
-- Server version	5.6.43-log

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
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Jimmy','Carter','1999-12-31 23:59:59'),(2,'Theodore','Roosevelt','2009-11-01 23:59:59'),(3,'John','Kennedy','2003-02-03 23:59:59'),(4,'Martin','King','1998-08-21 23:59:59'),(5,'Harry','Truman','2007-04-15 00:00:00'),(6,'Woodrow','Wilson','2016-01-14 21:25:00'),(7,'Thomas','Truman','2014-06-25 01:25:00'),(8,'Andrew','Truman','2004-01-14 17:25:00'),(9,'Bill','Truman','2004-01-15 11:25:00'),(10,'Martin','Truman','2020-01-11 21:41:58'),(11,'Millard','Truman','2020-01-11 22:03:17'),(12,'George','Truman','2020-01-12 00:05:18'),(13,'Lyndon','Truman','2020-01-11 22:12:34'),(14,'Donald','Truman','2020-01-12 00:14:14'),(15,'Nick','Truman','2020-01-11 22:17:57'),(16,'Norman','Truman','2020-01-12 00:21:49'),(17,'Herbert','Hoover','2020-01-12 10:21:43'),(18,'Lenny','Hoover','2020-01-13 21:25:29'),(19,'Jimmy','Carter','2020-01-13 23:28:29'),(20,'Gerald','Ford','2020-01-13 23:41:02'),(21,'Gerald','Ford','2020-01-16 00:23:03');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (2);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-16  1:02:42
