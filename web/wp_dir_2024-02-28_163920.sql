-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: wp_dir
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `name` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text,
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (12,'Entertainment','','2024-02-23 17:27:46','2024-02-21 03:26:09'),(13,'Technology','','2024-02-23 17:27:24','2024-02-21 03:27:18'),(14,'Knowledge','Knowledge','2024-02-23 17:27:02','2024-02-21 03:30:39'),(15,'Sports','sports Channel','2024-02-23 17:30:38','2024-02-22 16:42:55'),(16,'music',NULL,'2024-02-25 13:55:42','2024-02-25 13:55:42'),(17,'news',NULL,'2024-02-25 14:00:03','2024-02-25 14:00:03'),(18,'business',NULL,'2024-02-25 14:44:49','2024-02-25 14:44:49'),(19,'movie',NULL,'2024-02-25 15:50:10','2024-02-25 15:50:10'),(20,'adult',NULL,'2024-02-25 15:50:18','2024-02-25 15:50:18'),(21,'Cele',NULL,'2024-02-26 09:38:43','2024-02-26 09:38:43'),(22,'Revolution',NULL,'2024-02-26 09:47:44','2024-02-26 09:47:44');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

--
-- Table structure for table `fb_page`
--

DROP TABLE IF EXISTS `fb_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fb_page` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `create_time` datetime DEFAULT NULL COMMENT 'Create Time',
  `name` varchar(255) DEFAULT NULL,
  `access_token` text,
  `page_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fb_page`
--

/*!40000 ALTER TABLE `fb_page` DISABLE KEYS */;
INSERT INTO `fb_page` VALUES (1,NULL,'kyaw gree','EAANbR1ZAmfE0BOwksEQaDK654W0oFcbNQljpZB9Aopoz7c6KHKXRdZCxtnToQYkTgZAZCj16yuhYex7MGwPrzRyolgaejELZAgFC8AHelgqTy4ekIyywMBNt0Rkt7svHKLQ80cbZAlZBXcp6Tlc13TluZBDZAIjsGEwLtPIr8n6fPcqJATgc3R10k6UyfTsyZA0wZCZBtE0ZAf9wJZC8zf6gDgSEXHPXe0ZD',NULL);
/*!40000 ALTER TABLE `fb_page` ENABLE KEYS */;

--
-- Table structure for table `map_category_website`
--

DROP TABLE IF EXISTS `map_category_website`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_category_website` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `category_id` int DEFAULT NULL,
  `website_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `website_id` (`website_id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=191 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_category_website`
--

/*!40000 ALTER TABLE `map_category_website` DISABLE KEYS */;
INSERT INTO `map_category_website` VALUES (118,15,478),(120,14,479),(124,15,483),(125,14,481),(126,14,472),(127,14,474),(133,12,469),(134,16,469),(135,12,468),(136,14,467),(137,13,467),(138,17,464),(139,12,457),(141,14,452),(142,18,452),(143,14,450),(144,13,450),(146,15,446),(149,12,448),(152,14,484),(153,12,484),(154,13,22),(155,20,28),(157,15,32),(161,15,395),(162,19,397),(163,12,397),(165,17,398),(166,19,396),(167,17,399),(169,20,477),(170,14,410),(171,21,403),(172,17,400),(174,20,423),(175,21,423),(177,17,428),(178,22,428),(179,21,429),(180,21,432),(182,14,434),(184,21,436),(186,15,444),(187,19,31),(188,17,33),(190,20,476);
/*!40000 ALTER TABLE `map_category_website` ENABLE KEYS */;

--
-- Table structure for table `map_website_fb_page`
--

DROP TABLE IF EXISTS `map_website_fb_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_website_fb_page` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `fb_page_id` int DEFAULT NULL,
  `website_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_website_fb_page`
--

/*!40000 ALTER TABLE `map_website_fb_page` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_website_fb_page` ENABLE KEYS */;

--
-- Table structure for table `website`
--

DROP TABLE IF EXISTS `website`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `website` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `name` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` text NOT NULL,
  `site_icon_url` text,
  `color_hue` int NOT NULL DEFAULT '200',
  `keywords` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `error_code` varchar(100) DEFAULT NULL COMMENT 'last fetch http status',
  `last_scan_time` timestamp NULL DEFAULT NULL,
  `scan_by` varchar(100) DEFAULT NULL,
  `api_base_path` varchar(255) NOT NULL DEFAULT '/?rest_route=/',
  `is18Plus` enum('yes','no') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'no',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=485 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `website`
--

/*!40000 ALTER TABLE `website` DISABLE KEYS */;
INSERT INTO `website` VALUES (22,'Hein Soe','as a web developer and designer committed to creating visually appealing and highly functional websites. With a focus on the latest trends and technologies, I strive to deliver exceptional web solutions that help businesses succeed online.','https://api.heinsoe.com','',100,NULL,'2024-02-21 03:35:52','2024-02-25 15:49:33','active','',NULL,NULL,'/?rest_route=/','no'),(28,'Wone Dine [အပြာကား]','www.wonedine.com','https://wonedine.com','',200,NULL,'2024-02-21 05:57:16','2024-02-25 15:49:47','active','',NULL,NULL,'/?rest_route=/','yes'),(31,'Channel Myanmar','Quality Is Our Priority','https://channelmyanmar.org',NULL,20,NULL,'2024-02-22 03:59:55','2024-02-26 09:55:16','disable','DUPLACATE','2024-02-23 17:43:17','Hein Soe','/?rest_route=/','no'),(32,'sportsmyanmar.com','','https://sportsmyanmar.com','https://sportsmyanmar.com/wp-content/uploads/2023/03/cropped-loggg.png',50,NULL,'2024-02-22 15:12:24','2024-02-25 15:51:19','active','',NULL,NULL,'/?rest_route=/','no'),(33,'DVB','Democratic Voice of Burma','https://burmese.dvb.no','https://burmese.dvb.no/wp-content/uploads/2020/09/dvb-logo1-min.png',200,NULL,'2024-02-23 05:29:08','2024-02-26 09:55:29','disable','DUPLICATE','2024-02-25 15:54:44','Hein Soe','/wp-json/','no'),(34,'http://heinsoe.com','ldk','http://heinsoe.com',NULL,200,NULL,'2024-02-23 06:29:43','2024-02-26 09:55:48','disable','ERR_NETWORK','2024-02-23 07:21:56','Hein Soe','/?rest_route=/','no'),(395,'sportsmyanmar.com','','https://sportsmyanmar.com','https://sportsmyanmar.com/wp-content/uploads/2023/03/cropped-loggg.png',72,'sport','2024-02-23 07:56:38','2024-02-25 15:52:23','active','',NULL,NULL,'/?rest_route=/','no'),(396,'Apex Canal','ရုပ်ရှင် review','https://apexcanal.com','https://apexcanal.com/wp-content/uploads/2022/01/cropped-Cover.png',234,'ရုပ်ရင် film movie ','2024-02-23 07:56:38','2024-02-25 15:58:49','disable','TEMPO','2024-02-25 15:52:27','Hein Soe','/?rest_route=/','no'),(397,'Channel Myanmar','Quality Is Our Priority','https://channelmyanmar.org','https://lh3.googleusercontent.com/5YjkTnlORhYBuh7FgIwWpNPiWrFSY0FY4hanxTmIeTYg0zjwPxVfx9RWaoMm46A0bw=h200',50,'ရုပ်ရင် film movie ','2024-02-23 07:56:38','2024-02-25 15:53:56','active','','2024-02-23 17:43:17','Hein Soe','/?rest_route=/','no'),(398,'DVB','Democratic Voice of Burma','https://burmese.dvb.no','https://burmese.dvb.no/wp-content/uploads/2020/09/dvb-logo1-min.png',226,'news သတင်း','2024-02-23 07:56:38','2024-02-25 15:54:49','active','','2024-02-25 15:54:44','Hein Soe','/wp-json/','no'),(399,'Arakan Princess Media','','https://arakanprincess.media','https://arakanprincess.media/wp-content/uploads/2021/08/cropped-arakanprincessmedia-1.png',234,'news သတင်း','2024-02-23 07:56:38','2024-02-25 15:59:09','active','',NULL,NULL,'/?rest_route=/','no'),(400,'Nowadays News','','https://nowadays-news.com','',234,'news သတင်း','2024-02-23 07:56:38','2024-02-25 15:59:45','active','',NULL,NULL,'/?rest_route=/','no'),(401,'Play Maker Sports Journal','သတင်း','https://playmakersports.co','null',291,'news သတင်း','2024-02-23 07:56:38','2024-02-26 09:41:14','active','ERR_TIMED_OUT',NULL,NULL,'/?rest_route=/','no'),(402,'Blacker','Newsstand','https://blackotfb.com','https://blackotfb.com/wp-content/uploads/2022/08/cropped-blacker.png',20,'Black ot','2024-02-23 07:56:38','2024-02-26 09:39:23','active','',NULL,NULL,'/?rest_route=/','no'),(403,'All Movie Store','MEDIA AND ENTERTAINMENT','https://media.allmoviestore.com','https://media.allmoviestore.com/wp-content/uploads/2024/01/7b6ea6e9788ccf8194599ca94293746d.jpg',20,'Movie','2024-02-23 07:56:38','2024-02-26 09:39:03','active','',NULL,NULL,'/?rest_route=/','no'),(404,'Q Media','Lifestyle Magazine','https://springcele.mmrenews.club','Null',349,'ပေါက်ကရ','2024-02-23 07:56:38','2024-02-28 10:03:29','disable','ERR_NETWORK','2024-02-28 10:03:29','Hein Soe','/?rest_route=/','no'),(405,'Cele Main News Link','Entertainment','https://news.mainnewslink.com','',28,'ပေါက်ကရ','2024-02-23 07:56:38','2024-02-26 09:37:45','active','CORS','2024-02-26 09:36:51','Hein Soe','/?rest_route=/','no'),(406,'Cele Corner','For More Perfect Day','https://celecorner.club','null',284,'ပေါက်ကရ','2024-02-23 07:56:38','2024-02-28 10:03:31','disable','ERR_NETWORK','2024-02-28 10:03:31','Hein Soe','/?rest_route=/','no'),(407,'Media Update News','News Media Website','https://mediaupdatenews.com','Null',284,'ပေါက်ကရ','2024-02-23 07:56:38','2024-02-26 09:35:33','disable','EXPIRE','2024-02-26 09:35:09','Hein Soe','/?rest_route=/','no'),(408,'SS','','https://www.shwesagar.xyz','https://www.shwesagar.xyz/wp-content/uploads/2022/12/cropped-8.png',284,'ပေါက်ကရ','2024-02-23 07:56:38','2024-02-26 09:35:01','active','',NULL,NULL,'/?rest_route=/','no'),(409,'ESPN News','Knowledges For Everyone','https://espnnews.club','',259,'esp','2024-02-23 07:56:38','2024-02-26 09:34:39','active','',NULL,NULL,'/?rest_route=/','no'),(410,'Kwee','All about Lifestyle, Fashion, Music, Sports and Health','https://kwee.co','https://kwee.co/wp-content/uploads/2018/07/cropped-KWEE-favicon.png',20,'ကီဝီ','2024-02-23 07:56:38','2024-02-26 09:34:10','active','',NULL,NULL,'/?rest_route=/','no'),(411,'Cele Main News Link','Entertainment','https://news.mainnewslink.com','',302,'Cele','2024-02-23 07:56:38','2024-02-26 09:36:51','disable','ERR_NETWORK','2024-02-26 09:36:51','Hein Soe','/?rest_route=/','no'),(412,'Thadin K-pop News','Just another WordPress site','https://thadin.kpop-news.xyz','null',313,'  ','2024-02-23 07:56:38','2024-02-26 09:31:33','disable','','2024-02-26 09:31:17','Hein Soe','/?rest_route=/','no'),(413,'Burmesenew','Stay Informed with the Latest News and Updates','https://www.burmesenew.xyz','',327,'  ','2024-02-23 07:56:38','2024-02-26 09:31:13','active','',NULL,NULL,'/?rest_route=/','no'),(414,'Thadin',' ','https://freshnews37.com','null',327,'  ','2024-02-23 07:56:38','2024-02-26 09:30:58','disable','ERR_NETWORK','2024-02-26 09:30:58','Hein Soe','/?rest_route=/','no'),(415,'Pyo Ka Nyar',' ','https://pyokanyar.xyz','null',327,'  ','2024-02-23 07:56:38','2024-02-26 09:30:44','disable','',NULL,NULL,'/?rest_route=/','no'),(416,'Pya Zat',' ','https://pyazat.com','null',327,'  ','2024-02-23 07:56:38','2024-02-26 09:48:25','disable','ERR_NETWORK','2024-02-26 09:48:25','Hein Soe','/?rest_route=/','no'),(417,'World info Post','Unveiling World&#039;s Stories','https://worldinfopost.com','https://i0.wp.com/worldinfopost.com/wp-content/uploads/2023/08/cropped-world-info-post-icon.png?fit=512%2C512&ssl=1',327,'  ','2024-02-23 07:56:38','2024-02-26 09:45:07','active','',NULL,NULL,'/?rest_route=/','no'),(418,'Knowverse','Unlocking Knowledge for a Brighter Future','https://popularpostnews.com','https://popularpostnews.com/wp-content/uploads/2023/06/favicon.png',327,'  ','2024-02-23 07:56:38','2024-02-26 09:44:56','active','',NULL,NULL,'/?rest_route=/','no'),(419,'Class New 24','Cele','https://classnews24.com','null',302,' ','2024-02-23 07:56:38','2024-02-26 09:44:45','disable','','2024-02-26 09:44:35','Hein Soe','/?rest_route=/','no'),(420,'monywanews','My WordPress Blog','https://monywanews.online','',284,' ','2024-02-23 07:56:38','2024-02-26 09:44:12','active','','2024-02-26 09:43:26','Hein Soe','/?rest_route=/','no'),(421,'CeleGabar','','https://celegabar.com','',75,'ဆယ်လီကမ္ဘာ','2024-02-23 07:56:38','2024-02-26 09:43:22','active','',NULL,NULL,'/?rest_route=/','no'),(422,'ONE DAILY MEDIA','thutadaily','https://thutadaily.xyz','null',75,'သုတ','2024-02-23 07:56:38','2024-02-28 10:03:39','disable','ERR_NETWORK','2024-02-28 10:03:39','Hein Soe','/?rest_route=/','no'),(423,'XmmSub.com','ကျော်ကြီးတို့ကမ္ဘာ','https://xmmsub.com','',250,'','2024-02-23 07:56:38','2024-02-26 09:43:05','active','',NULL,NULL,'/?rest_route=/','yes'),(424,'ဒေါက်တာကိုကြီး','Dr Ko Gyi','https://drkogyi.com','null',250,'လိုး, အပြာ','2024-02-23 07:56:38','2024-02-28 10:02:11','disable','ERR_NETWORK','2024-02-28 10:02:11','Hein Soe','/?rest_route=/','no'),(425,'nattarlay','nattarlay','https://nattarlay.com','null',250,'လိုး, အပြာ','2024-02-23 07:56:38','2024-02-28 09:59:20','disable','ERR_NETWORK','2024-02-28 09:59:20','Hein Soe','/?rest_route=/','no'),(426,'Wone Dine [အပြာကား]','ဝုန်းဒိုင်း','https://wonedine.com','https://static-00.iconduck.com/assets.00/no-one-under-eighteen-emoji-256x256-kudtml05.png',250,'လိုး, အပြာ','2024-02-23 07:56:38','2024-02-26 09:46:25','active','',NULL,NULL,'/?rest_route=/','yes'),(427,'Thadin','https://crph.xyz/thadin/','https://crph.xyz/thadin','null',250,'','2024-02-23 07:56:38','2024-02-26 09:46:49','disable','','2024-02-26 09:46:30','Hein Soe','/?rest_route=/','no'),(428,'NewsZca','','https://newzca.com','false',280,' ','2024-02-23 07:56:38','2024-02-26 09:47:20','active','',NULL,NULL,'/?rest_route=/','no'),(429,'San Kyi Par','Tech Blog','https://www.sankyipar.com','https://i0.wp.com/www.sankyipar.com/wp-content/uploads/2019/01/cropped-Untitled-design.png?fit=512%2C512&ssl=1',20,' ','2024-02-23 07:56:38','2024-02-26 09:48:19','active','',NULL,NULL,'/?rest_route=/','no'),(430,'Pya Zat','Daily Celebrity News','https://pyazat.com','null',309,' ','2024-02-23 07:56:38','2024-02-26 09:48:29','disable','','2024-02-26 09:48:25','Hein Soe','/?rest_route=/','no'),(431,'San Thitsa','Read Every Day','https://santhitsanew.com','https://santhitsanew.com/wp-content/uploads/2020/03/cropped-ju7.png',20,' ','2024-02-23 07:56:38','2024-02-26 09:49:08','disable','DB ERROR','2024-02-26 09:48:46','Hein Soe','/?rest_route=/','no'),(432,'Shwe Yoe MM','Unlocking Success through Business and Management','https://shweyoemm.com','https://shweyoemm.com/wp-content/uploads/2023/05/cropped-Shwe-Yoe-web-icon.png',20,'ရွှေရိုး','2024-02-23 07:56:38','2024-02-26 09:49:57','active','',NULL,NULL,'/?rest_route=/','no'),(433,'Burma Media Rays','','https://burmamediarays.club','',291,' ','2024-02-23 07:56:38','2024-02-26 09:50:37','active','','2024-02-26 09:50:01','Hein Soe','/?rest_route=/','no'),(434,'Beesportnews','Online Info','https://beesportnews.fun','https://beesportnews.fun/wp-content/uploads/2020/07/cropped-95419136_246109220131875_923511869509992448_n.jpg',291,' ','2024-02-23 07:56:38','2024-02-25 13:23:16','active','',NULL,NULL,'/?rest_route=/','no'),(435,'Say Lo Yar','Your latest News','https://sayloyar.com','null',20,'စေလိုရာ','2024-02-23 07:56:38','2024-02-26 09:51:17','disable','ERR_NETWORK','2024-02-26 09:51:17','Hein Soe','/?rest_route=/','no'),(436,'Shwe Yoe MM','Unlocking Success through Business and Management','https://shweyoemm.com','https://shweyoemm.com/wp-content/uploads/2023/05/cropped-Shwe-Yoe-web-icon.png',20,'ရွှေရိုး','2024-02-23 07:56:38','2024-02-26 09:51:58','disable','DUPLACATE',NULL,NULL,'/?rest_route=/','no'),(437,'Update News','Celebrity News','https://todayupdatenew.com','null',20,' ','2024-02-23 07:56:38','2024-02-26 09:52:19','disable','EXPIRE','2024-02-26 09:52:03','Hein Soe','/?rest_route=/','no'),(438,'Shwe Sar','Finance Insights','https://shwesar.com','https://shwesar.com/wp-content/uploads/2023/11/cropped-ShweSar-icon.png',259,'ရွှေစာ','2024-02-23 07:56:38','2024-02-25 15:12:58','active','','2024-02-25 15:11:29','Hein Soe','/?rest_route=/','no'),(439,'Worldinfo Daily Updates','Tech, Science, Knowledge And Business ','https://news.worldinfo365.com','null',46,' ','2024-02-23 07:56:38','2024-02-25 14:53:27','disable','','2024-02-25 14:53:14','Hein Soe','/?rest_route=/','no'),(440,'Youth Bar','News','https://youth-bar.com','null',46,' ','2024-02-23 07:56:38','2024-02-26 09:53:29','disable','ERR_NETWORK','2024-02-26 09:53:29','Hein Soe','/?rest_route=/','no'),(441,'CeleZone','','https://celezone.net','',46,' ','2024-02-23 07:56:38','2024-02-25 14:52:23','active','',NULL,NULL,'/?rest_route=/','no'),(442,'SLN-Business','Insurance','https://socialnewsmm.com','https://socialnewsmm.com/wp-content/uploads/2023/03/cropped-cropped-pupg11.jpg',46,' ','2024-02-23 07:56:38','2024-02-25 14:51:36','active','',NULL,NULL,'/?rest_route=/','no'),(443,'Min Mahar','မင်းမဟာ','https://www.minmahar.com','https://i0.wp.com/www.minmahar.com/wp-content/uploads/2022/08/cropped-20220901_020905.png?fit=512%2C512&ssl=1',306,'မင်းမဟာ','2024-02-23 07:56:38','2024-02-26 11:12:30','disable','ERR_NETWORK','2024-02-26 11:12:30','Hein Soe','/?rest_route=/','no'),(444,'MySport Myanmar','Sport and Health','https://mysportmyanmar.com','',20,'sport အားကစား','2024-02-23 07:56:38','2024-02-26 09:53:27','active','',NULL,NULL,'/?rest_route=/','no'),(445,'Sports Myanmar','Myanmar Sports News','https://sportmyanmar.xyz','null',158,'sport အားကစား','2024-02-23 07:56:38','2024-02-25 14:49:41','disable','ERR_NETWORK','2024-02-25 14:49:41','Hein Soe','/?rest_route=/','no'),(446,'Premier Sports','Premier Football News Collection','https://www.sportmyanmar.fun','https://www.sportmyanmar.fun/wp-content/uploads/2023/06/s-logo.jpg',158,'sport အားကစား','2024-02-23 07:56:38','2024-02-25 13:23:16','active','',NULL,NULL,'/?rest_route=/','no'),(447,'Western News','မြန်မာဘာသာ','https://www.western.news','https://www.western.news/wp-content/themes/western/media/logo.svg',20,'Western','2024-02-23 07:56:38','2024-02-25 14:49:01','disable','ERR_NETWORK','2024-02-25 14:49:01','Hein Soe','/?rest_route=/','no'),(448,'Hello 4B','blog','https://hello4b.com','https://hello4b.com/wp-content/uploads/2023/12/cropped-filename__6_-removebg-preview.png',356,' ','2024-02-23 07:56:38','2024-02-25 15:27:43','active','',NULL,NULL,'/?rest_route=/','yes'),(449,'Cele Thadin','','https://celethadin.com','',230,' ','2024-02-23 07:56:38','2024-02-25 14:48:25','active','CORS','2024-02-25 14:48:09','Hein Soe','/?rest_route=/','no'),(450,'Myanmar End User','Top Tech News, Tutorials &amp; Guides','https://myanmarenduser.com','https://myanmarenduser.com/wp-content/uploads/2023/01/cropped-favicon.png',251,'End user','2024-02-23 07:56:38','2024-02-25 13:23:16','active','',NULL,NULL,'/?rest_route=/','no'),(451,'NewPosts','Tech And Advertising','https://www.newposts.xyz','',20,' ','2024-02-23 07:56:38','2024-02-25 13:23:16','active','',NULL,NULL,'/?rest_route=/','no'),(452,'exchange rates','exchange rates','https://achawlaymyar.com','https://banner2.cleanpng.com/20180324/rse/kisspng-computer-icons-united-states-dollar-dollar-sign-do-dollar-5ab6e7e0a640e4.668921391521936352681.jpg',248,' ','2024-02-23 07:56:38','2024-02-25 14:46:24','active','',NULL,NULL,'/?rest_route=/','no'),(453,'Thutazone Blog','News','https://web.thutazone.org/articles','null',20,' ','2024-02-23 07:56:38','2024-02-25 14:43:32','disable','','2024-02-25 14:43:22','Hein Soe','/?rest_route=/','no'),(454,'royalthazin','News &amp; Entertainment','https://royalthazin.net','https://royalthazin.net/wp-content/uploads/2019/03/cropped-179778126.jpg',20,' ','2024-02-23 07:56:38','2024-02-25 14:43:17','disable','ERR_NETWORK','2024-02-25 14:42:53','Hein Soe','/?rest_route=/','no'),(455,'မြန်မာ မြင်ကွင်းစုံ','Blog','https://asonepl.xyz/blog','null',20,' ','2024-02-23 07:56:38','2024-02-25 14:26:13','disable','ERR_NETWORK','2024-02-25 14:26:13','Hein Soe','/?rest_route=/','no'),(456,'စုံလင္သုတအိမ္ရွင္မ','eainshinma.com','https://eainshinma.com','https://i0.wp.com/eainshinma.com/wp-content/uploads/2020/02/cropped-20200215_125150.png?fit=512%2C512&ssl=1',360,' ','2024-02-23 07:56:38','2024-02-26 11:12:37','disable','ERR_NETWORK','2024-02-26 11:12:37','Hein Soe','/?rest_route=/','no'),(457,'PK Movies','the Myanmar movie collection','https://pk.pyaykyi.one','https://pk.pyaykyi.one/wp-content/uploads/2023/03/cropped-pyaykyi-logo-1.png',100,'မြန်မာ ဇတ်ကား','2024-02-23 07:56:38','2024-02-25 14:36:45','active','ERR_NETWORK','2024-02-25 14:36:45','Hein Soe','/?rest_route=/','no'),(458,'Beginb ','Your Daily Dose of News & Entertainment','https://beginb.com/news','https://beginb.com/news/wp-content/uploads/2023/01/cropped-Beginb-logo.png',20,' ','2024-02-23 07:56:38','2024-02-25 13:23:16','disable','ERR_NETWORK','2024-02-23 08:22:05','Hein Soe','/?rest_route=/','no'),(459,'Cele Main News Link','Entertainment','https://news.mainnewslink.com','',20,' ','2024-02-23 07:56:38','2024-02-26 09:36:51','disable','ERR_NETWORK','2024-02-26 09:36:51','Hein Soe','/?rest_route=/','no'),(460,'Knowledgeworms','Upload Knowledge to your brain!','https://knowledgeworms.com','https://knowledgeworms.com/wp-content/uploads/2020/12/cropped-11.jpg',20,' ','2024-02-23 07:56:38','2024-02-25 13:23:16','disable','ERR_NETWORK','2024-02-23 09:23:03','Hein Soe','/?rest_route=/','no'),(461,'စုံလင္သုတအိမ္ရွင္မ','eainshinma.com','https://eainshinma.com','https://i0.wp.com/eainshinma.com/wp-content/uploads/2020/02/cropped-20200215_125150.png?fit=512%2C512&ssl=1',20,' ','2024-02-23 07:56:38','2024-02-26 11:12:37','disable','ERR_NETWORK','2024-02-26 11:12:37','Hein Soe','/?rest_route=/','no'),(462,'Bagan Thar','News','https://shwehealth.xyz','https://shwehealth.xyz/wp-content/uploads/2020/11/cropped-logo.png',20,' ','2024-02-23 07:56:38','2024-02-25 14:00:35','disable','ERR_NETWORK','2024-02-25 14:00:35','Hein Soe','/?rest_route=/','no'),(463,'Gutener Magazine','Heart of Magazine','https://sorpyitkaung.xyz','null',20,' ','2024-02-23 07:56:38','2024-02-25 14:00:20','disable','ERR_NETWORK','2024-02-25 14:00:20','Hein Soe','/?rest_route=/','no'),(464,'Arakan Bay News','News &amp; Media for Rakhine | Arakan | Arakha','https://arakanbaynews.com','https://i0.wp.com/arakanbaynews.com/wp-content/uploads/2022/09/cropped-arakanbaynewslogo3.transsmall.png?fit=512%2C512&ssl=1',20,'arakan','2024-02-23 07:56:38','2024-02-25 14:00:15','active','',NULL,NULL,'/?rest_route=/','no'),(465,'The Arakan Express News ','Beyond Stories ','https://www.thearakanexpress.com','null',223,'arakan news','2024-02-23 07:56:38','2024-02-25 13:23:16','disable','ERR_NETWORK','2024-02-25 10:02:45','Hein Soe','/?rest_route=/','no'),(466,'News Zone',' ','https://newszone.lovediary.icu','null',20,'null','2024-02-23 07:56:38','2024-02-25 13:59:36','disable','ERR_NETWORK','2024-02-25 13:59:36','Hein Soe','/?rest_route=/','no'),(467,'MyTech Myanmar','MyTech Myanmar က နည္းပညာ၊ စမတ္ဖုန္းေတြ၊ လွ်ပ္စစ္ပစၥည္းေတြ၊ ကားေတြအေၾကာင္း တင္ဆက္ေပးထားပါသည္။','https://mytechmyanmar.com','https://mytechmyanmar.com/wp-content/uploads/2017/02/cropped-favicon.png',20,'pc Tech','2024-02-23 07:56:38','2024-02-25 13:59:23','active','',NULL,NULL,'/?rest_route=/','no'),(468,'Jav Cele','','https://javcele.com','',223,'adult','2024-02-23 07:56:38','2024-02-25 13:59:10','active','',NULL,NULL,'/?rest_route=/','yes'),(469,'Arakan Music','ရခိုင်သခြင်းချစ်သူရို့အတွက် အကောင်းဆုံးနီရာ.. Arakan Songs Listen and Download','http://www.arakanmusic.art','https://static.vecteezy.com/system/resources/thumbnails/008/653/792/small/music-man-gamer-line-pop-art-potrait-logo-colorful-design-with-dark-background-abstract-illustration-isolated-black-background-for-t-shirt-poster-clothing-merch-apparel-badge-design-vector.jpg',200,'Music','2024-02-23 07:56:38','2024-02-25 13:58:00','active','',NULL,NULL,'/?rest_route=/','no'),(470,'My Blog','My WordPress Blog','https://shwetadin.com','',20,'','2024-02-23 07:56:38','2024-02-25 13:54:57','active','','2024-02-25 13:53:11','Hein Soe','/?rest_route=/','no'),(471,'My Blog','My WordPress Blog','https://yaungnee.xyz','',20,'Adult','2024-02-23 07:56:38','2024-02-25 13:23:16','active','','2024-02-25 10:09:05','Hein Soe','/?rest_route=/','no'),(472,'SN','Myanmar','http://successnumber.xyz','https://successnumber.xyz/wp-content/uploads/2023/11/cropped-filename-removebg-preview.png',20,'Adult','2024-02-23 07:56:38','2024-02-28 09:58:54','active','ERR_NETWORK','2024-02-28 09:58:54','Hein Soe','/?rest_route=/','no'),(473,'2in1','Live','https://2in1news.xyz','https://2in1news.xyz/wp-content/uploads/2023/11/cropped-filename__21_-removebg-preview.png',20,'Adult','2024-02-23 07:56:38','2024-02-25 13:51:32','active','','2024-02-25 09:53:07','CLIENT','/?rest_route=/','yes'),(474,'Boss Data','News','https://bossdatabase.xyz','https://bossdatabase.xyz/wp-content/uploads/2023/11/cropped-filename__34_-removebg-preview.png',20,'Adult','2024-02-23 07:56:38','2024-02-25 13:52:14','active','',NULL,NULL,'/?rest_route=/','no'),(475,'My Blog','My WordPress Blog','https://yaungnee.xyz','',20,'Adult','2024-02-23 07:56:38','2024-02-25 13:23:16','active','','2024-02-25 10:09:05','Hein Soe','/?rest_route=/','no'),(476,'8 daily','book series','https://8daily.xyz','https://8daily.xyz/wp-content/uploads/2023/11/cropped-8daily.png',20,'Adult','2024-02-23 07:56:38','2024-02-26 11:13:24','active','','2024-02-23 08:10:40','Hein Soe','/wp-json/','yes'),(477,'HD Movie Collection','Best collection of Full HD Movie in One Place','https://hd.arthurpyay.com','',0,'Adult','2024-02-23 07:56:38','2024-02-25 17:57:05','active','','2024-02-25 13:49:20','Hein Soe','/?rest_route=/','yes'),(478,'365 Daily','News Magazine','https://365daily.xyz','https://365daily.xyz/wp-content/uploads/2023/11/cropped-filename__9_-removebg-preview.png',20,'Adult','2024-02-23 07:56:38','2024-02-25 13:23:16','active','','2024-02-25 10:07:32','Hein Soe','/?rest_route=/','no'),(479,'110 Plus','News','https://110plus.xyz','',20,'','2024-02-23 07:56:38','2024-02-25 13:23:16','active','','2024-02-25 10:06:32','Hein Soe','/?rest_route=/','no'),(480,'My Blog','My WordPress Blog','http://worldinthemyanmar.website','',20,'Adult','2024-02-23 07:56:38','2024-02-28 09:24:20','active','ERR_NETWORK','2024-02-28 09:24:20','Hein Soe','/?rest_route=/','no'),(481,'SN','Myanmar','http://successnumber.xyz','https://successnumber.xyz/wp-content/uploads/2023/11/cropped-filename-removebg-preview.png',20,'Adult','2024-02-23 07:56:38','2024-02-28 09:58:54','active','ERR_NETWORK','2024-02-28 09:58:54','Hein Soe','/?rest_route=/','no'),(482,'XYZ News','blog','http://xyzmm.xyz','https://xyzmm.xyz/wp-content/uploads/2023/11/cropped-filename__31_-removebg-preview.png',20,'Adult','2024-02-23 07:56:38','2024-02-28 09:28:30','active','ERR_NETWORK','2024-02-28 09:28:30','Hein Soe','/?rest_route=/','no'),(483,'TM','Myanmar','https://trendmyanmar.club','https://trendmyanmar.club/wp-content/uploads/2023/11/cropped-filename__23_-removebg-preview-1.png',20,'Adult','2024-02-23 07:56:38','2024-02-28 09:28:20','active','ERR_NETWORK','2024-02-28 09:28:20','Hein Soe','/?rest_route=/','yes'),(484,'Shwe Khit Online TV','News &amp; Entertainment','https://www.shwekhitonlinetv.com','https://i0.wp.com/www.shwekhitonlinetv.com/wp-content/uploads/2019/07/cropped-Untitled-design-31.png?fit=512%2C512&ssl=1',200,'shwe khit','2024-02-23 07:56:38','2024-02-25 15:57:15','active','ERR_NETWORK','2024-02-25 15:57:15','Hein Soe','/?rest_route=/','no');
/*!40000 ALTER TABLE `website` ENABLE KEYS */;

--
-- Dumping routines for database 'wp_dir'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-28 16:39:26
