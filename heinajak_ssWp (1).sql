-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 26, 2024 at 12:24 AM
-- Server version: 10.6.19-MariaDB-cll-lve
-- PHP Version: 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `heinajak_ssWp`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL COMMENT 'Primary Key',
  `name` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text DEFAULT NULL,
  `updated_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `description`, `updated_time`, `created_time`) VALUES
(12, 'Entertainment', '', '2024-02-23 17:27:46', '2024-02-21 03:26:09'),
(13, 'Technology', '', '2024-02-23 17:27:24', '2024-02-21 03:27:18'),
(14, 'Knowledge', 'Knowledge', '2024-02-23 17:27:02', '2024-02-21 03:30:39'),
(15, 'Sports', 'sports Channel', '2024-02-23 17:30:38', '2024-02-22 16:42:55'),
(16, 'music', NULL, '2024-02-25 13:55:42', '2024-02-25 13:55:42'),
(17, 'news', NULL, '2024-02-25 14:00:03', '2024-02-25 14:00:03'),
(18, 'business', NULL, '2024-02-25 14:44:49', '2024-02-25 14:44:49'),
(19, 'movie', NULL, '2024-02-25 15:50:10', '2024-02-25 15:50:10'),
(20, 'adult', NULL, '2024-02-25 15:50:18', '2024-02-25 15:50:18'),
(21, 'Cele', NULL, '2024-02-26 09:38:43', '2024-02-26 09:38:43'),
(22, 'Revolution', NULL, '2024-02-26 09:47:44', '2024-02-26 09:47:44'),
(23, 'life style', NULL, '2024-08-15 10:32:44', '2024-08-15 10:32:44');

-- --------------------------------------------------------

--
-- Table structure for table `fb_page`
--

CREATE TABLE `fb_page` (
  `id` int(11) NOT NULL COMMENT 'Primary Key',
  `create_time` datetime DEFAULT NULL COMMENT 'Create Time',
  `name` varchar(255) DEFAULT NULL,
  `access_token` text DEFAULT NULL,
  `page_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `fb_page`
--

INSERT INTO `fb_page` (`id`, `create_time`, `name`, `access_token`, `page_id`) VALUES
(1, NULL, 'kyaw gree', 'EAANbR1ZAmfE0BOwksEQaDK654W0oFcbNQljpZB9Aopoz7c6KHKXRdZCxtnToQYkTgZAZCj16yuhYex7MGwPrzRyolgaejELZAgFC8AHelgqTy4ekIyywMBNt0Rkt7svHKLQ80cbZAlZBXcp6Tlc13TluZBDZAIjsGEwLtPIr8n6fPcqJATgc3R10k6UyfTsyZA0wZCZBtE0ZAf9wJZC8zf6gDgSEXHPXe0ZD', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `link`
--

CREATE TABLE `link` (
  `id` int(11) NOT NULL COMMENT 'Primary Key',
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `imageUrl` text DEFAULT NULL,
  `trueUrl` text DEFAULT NULL,
  `create_time` datetime DEFAULT NULL COMMENT 'Create Time'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `link`
--

INSERT INTO `link` (`id`, `title`, `description`, `imageUrl`, `trueUrl`, `create_time`) VALUES
(1, 'á€¡á€±á€¬á€„á€ºá€žá€€á€ºá€‘á€½á€”á€ºá€¸á€¦á€¸á€†á€±á€¬á€„á€ºá€žá€±á€¬ á€›á€½á€¾á€±á€œá€°á€„á€šá€º á€œá€€á€ºá€™á€¾á€á€ºá€¡á€›á€±á€¬á€„á€ºá€¸á€Œá€¬á€” page á€¡á€á€¯á€–á€¼á€„á€ºá€· á€œá€­á€™á€ºá€œá€Šá€ºá€žá€°á€Ÿá€¯á€žá€¶á€žá€šá€›á€¾á€­á€žá€° á„á€¦á€¸', 'á€¡á€±á€¬á€„á€ºá€žá€€á€ºá€‘á€½á€”á€ºá€¸, á€‘á€½á€”á€ºá€¸á€‘á€½á€”á€ºá€¸á€™á€„á€ºá€¸, á€™á€žá€°á€‡á€¬ ...', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR48cPI2JrDUVFc8Mo5iVkcqscD_bxzaPa0-n81OJs2VCAl4piFgmfQTSO42FN6ZQPB2kg&usqp=CAU', 'https://himyanmar.online/482', NULL),
(2, 'á€†á€„á€ºá€†á€¬á€™á€•á€« á€‚á€»á€•á€”á€º', '', 'https://javcele.com/wp-content/uploads/2023/10/FC2PPV3793031.jpg', 'https://himyanmar.online/468/5082', NULL),
(3, 'The Rifleman of the Voroshilov Regiment', 'á€žá€¯á€¶á€¸á€šá€±á€¬á€€á€ºá€”á€²á€·á€á€…á€ºá€šá€±á€¬á€€á€º', 'https://i.ytimg.com/vi/99xJab0Kius/hqdefault.jpg', 'https://youtu.be/99xJab0Kius?t=617', NULL),
(4, 'á€¡á€„á€ºá€‚á€»á€„á€ºá€”á€®á€šá€¬á€™á€œá€±á€¸', 'á€¡á€„á€ºá€‚á€»á€„á€ºá€”á€®á€šá€¬á€™á€œá€±á€¸ á€‘á€½á€”á€ºá€¸á€™á€±á€¬á€„á€ºá€á€­á€¯á€·á€á€…á€ºá€›á€¯á€¶á€¸á€œá€¯á€¶á€¸ á€…á€­á€á€ºá€œá€¾á€¯á€•á€ºá€›á€¾á€¬á€¸á€”á€±á€€á€¼á€žá€Šá€º á‹ á€›á€¯á€¶á€¸á€€á€­á€¯á€…á€¬á€á€„á€ºá€‘á€¬á€¸á€žá€Šá€ºá‹ á€¡á€„á€ºá€‚á€»á€„á€ºá€”á€®á€šá€¬á€™á€™á€á€…á€ºá€šá€±á€¬á€€á€º á€¡á€žá€…á€ºá€á€„á€ºá€œá€¬á€™á€Šá€ºá€á€²á€·á‹ á€¡á€„á€ºá€‚á€»á€„á€ºá€”á€®á€šá€¬á€™á€™á€™á€›á€±á€¬á€€á€ºá€á€„á€ºá€á€Šá€ºá€¸á€€ á€žá€°á€”á€±á€–á€­á€¯á€·á€¡á€á€”á€ºá€¸ á€›á€±á€á€»á€­á€¯á€¸á€á€”á€ºá€¸á€¡á€­á€™á€ºá€žá€¬á€€á€¡á€… á€‘á€½á€”á€ºá€¸á€™á€±á€¬á€„á€ºá€á€­á€¯á€·á€¡á€–á€½á€²á€·á€€ á€•á€¼á€„á€ºá€†á€„á€ºá€•á€±á€¸á€‘á€¬á€¸á€€á€¼á€›á€žá€Šá€ºá‹ á€™á€”á€ºá€”á€±á€‚á€»á€¬á€€á€¼á€®á€¸á€€á€á€±á€¬á€· á€’á€®á€”á€±á€·á€œá€¬á€™á€šá€ºá€œá€­á€¯á€·á€‘á€½á€”á€ºá€¸á€™á€±á€¬á€„á€ºá€á€­á€¯á€·á€€á€­á€¯ á€¡á€žá€­á€•á€±á€¸á€‘á€¬á€¸á€œá€±á€›á€²á€·á‹ á€¡á€›á€„á€ºá€á€Šá€ºá€¸á€€ á€¡á€½á€”á€ºá€œá€­á€¯á€„á€ºá€¸ á€™á€¾á€¬ á€¡á€„á€ºá€‚á€»á€„á€ºá€”á€®á€šá€¬á€™á€™á€á€½á€±á€›á€²á€·á€•á€¯á€¶á€á€½á€±á€™á€¼á€„á€ºá€–á€°á€¸á€‘á€¬á€¸á€á€±á€¬á€· á€•á€¯á€¶á€‘á€²á€€á€œá€­á€¯ á€¡á€œá€¾á€•á€‚á€±á€¸á€œá€±á€¸á€á€…á€ºá€šá€±á€¬á€€á€ºá€œá€¬á€™á€šá€ºá€†á€­á€¯á€á€¬á€á€±á€¬á€· á€‘á€½á€”á€ºá€¸á€™á€±á€¬á€„á€ºá€á€­á€¯á€·á€€á€¼á€­á€¯á€žá€­á€”á€±á€€á€¼á€žá€Šá€ºâ€¦â€¦', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhCinnTzZyijmo2KG129u-7Qv7JjnMy10bHu-DJhQsBBYfvDXdu44QJJNQr1u3CvKZA6d0fPHs0Flliv8hDfdV9yeF20NqqIUN3z9pAZzcaPycDZ9UYwf45jtQQrwp0UmXO19rdr_Ctb2WbybZdJ54ty_c1J5RRDd5FW9iBI2Q9DXiXnHnw9PtO3Tx4Dcc/s320/nSpfpGJvdkufvdk-huawmh-2022-12-10T232116.257-1024x561.jpg', 'https://www.apyarsarphay.site/2024/03/blog-post_58.html', NULL),
(5, 'Social App á€œá€¯á€•á€ºá€”á€Šá€ºá€¸', 'Facebook Twitter á€œá€­á€¯á€™á€»á€­á€¯á€¸ android app á€€á€­á€¯ á€œá€½á€šá€ºá€œá€½á€šá€ºá€œá€¯á€•á€ºá€€á€¼á€™á€šá€º', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTdulZrg3ihbyvg3KrM_2FkfJQASqJfv_NHegLCTmi_Q&sorld-cup-2014.jpg', 'https://www.heinsoe.com', NULL),
(6, 'á€á€¬á€™á€½á€± á€¡á€á€­á€¯á€„á€ºá€¸ á€¡á€á€á€ºá€—á€œá€¬á€¡á€™á€»á€­á€¯á€¸á€žá€™á€®á€¸ á€”á€¾á€…á€ºá€¦á€¸á€¡á€¬á€¸ á€–á€™á€ºá€¸á€†á€®á€¸', NULL, 'https://modernbrazil.files.wordpress.com/2014/06/super-hot-almost-naked-brazilian-prostitutes-waiting-on-the-street-for-customers-in-belo-horizonte-brazil-world-cup-2014.jpg', 'https://himyanmar.online/', NULL),
(7, 'á€™á€„á€ºá€¸á€¡á€±á€¬á€„á€ºá€œá€¾á€­á€¯á€„á€º á€žá€™á€®á€¸á€—á€½á€®á€’á€®á€šá€­á€¯á€–á€­á€¯á€„á€º á€•á€±á€«á€€á€ºá€€á€¼á€¬á€¸', 'á€™á€„á€ºá€¸á€¡á€±á€¬á€„á€ºá€œá€¾á€­á€¯á€„á€º á€žá€™á€®á€¸á€—á€½á€®á€’á€®á€šá€­á€¯á€–á€­á€¯á€„á€º á€•á€±á€«á€€á€ºá€€á€¼á€¬á€¸', 'https://media.istockphoto.com/id/1388870711/video/portrait-of-woman-in-dark-room-at-night.jpg?s=640x640&k=20&c=8tHAIlbY2gjW2Y8Vir78pvPpozwBQlmiMfgJp94tjNc=', 'https://himyanmar.online/28/4679', NULL),
(8, 'tast', 'á€¡á€…á€™á€ºá€¸á€žá€˜á€±á€¬', 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg', 'http://google.com/', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `map_category_website`
--

CREATE TABLE `map_category_website` (
  `id` int(11) NOT NULL COMMENT 'Primary Key',
  `category_id` int(11) DEFAULT NULL,
  `website_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `map_category_website`
--

INSERT INTO `map_category_website` (`id`, `category_id`, `website_id`) VALUES
(118, 15, 478),
(120, 14, 479),
(124, 15, 483),
(125, 14, 481),
(126, 14, 472),
(127, 14, 474),
(133, 12, 469),
(134, 16, 469),
(135, 12, 468),
(136, 14, 467),
(137, 13, 467),
(138, 17, 464),
(139, 12, 457),
(141, 14, 452),
(142, 18, 452),
(143, 14, 450),
(144, 13, 450),
(146, 15, 446),
(149, 12, 448),
(152, 14, 484),
(153, 12, 484),
(154, 13, 22),
(155, 20, 28),
(157, 15, 32),
(161, 15, 395),
(162, 19, 397),
(163, 12, 397),
(165, 17, 398),
(166, 19, 396),
(167, 17, 399),
(169, 20, 477),
(170, 14, 410),
(171, 21, 403),
(172, 17, 400),
(174, 20, 423),
(175, 21, 423),
(177, 17, 428),
(178, 22, 428),
(179, 21, 429),
(180, 21, 432),
(182, 14, 434),
(184, 21, 436),
(186, 15, 444),
(187, 19, 31),
(188, 17, 33),
(190, 20, 476);

-- --------------------------------------------------------

--
-- Table structure for table `map_website_fb_page`
--

CREATE TABLE `map_website_fb_page` (
  `id` int(11) NOT NULL COMMENT 'Primary Key',
  `fb_page_id` int(11) DEFAULT NULL,
  `website_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `visitor_record`
--

CREATE TABLE `visitor_record` (
  `id` int(11) NOT NULL COMMENT 'Primary Key',
  `tag` varchar(300) DEFAULT NULL,
  `userId` text DEFAULT NULL,
  `isNewUser` varchar(5) DEFAULT NULL,
  `linkId` int(11) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `screenResolution` varchar(100) DEFAULT NULL,
  `fullUrl` text DEFAULT NULL,
  `timezone` varchar(100) DEFAULT NULL,
  `create_time` datetime DEFAULT current_timestamp() COMMENT 'Create Time',
  `lla` text NOT NULL DEFAULT '15.5607352,96.9425132,99'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `visitor_record`
--

INSERT INTO `visitor_record` (`id`, `tag`, `userId`, `isNewUser`, `linkId`, `ip`, `screenResolution`, `fullUrl`, `timezone`, `create_time`, `lla`) VALUES
(1, 'me', '60c87658-e898-442b-a123-df508aa990f4', 'true', 1, '103.84.100.2', '1536x864', 'https://himyanmar.online/t/1/?t=me&p=l', 'Asia/Rangoon', '2024-03-15 04:54:41', '16.8198144,96.17408,4914.284164035488'),
(5, 'me', '60c87658-e898-442b-a123-df508aa990f4', 'false', 1, '103.84.100.2', '1536x864', 'https://himyanmar.online/t/1/?t=me&p=l', 'Asia/Rangoon', '2024-03-15 05:23:52', '16.8198144,96.17408,4914.284164035488'),
(6, 'me', '60c87658-e898-442b-a123-df508aa990f4', 'false', 1, '103.84.100.2', '1536x864', 'https://himyanmar.online/t/1/?t=me&p=l', 'Asia/Rangoon', '2024-03-15 05:24:04', '15.5607352,96.9425132,99'),
(7, 'me', '60c87658-e898-442b-a123-df508aa990f4', 'false', 1, '103.84.100.2', '1536x864', 'https://himyanmar.online/t/1/?t=me&p=l', 'Asia/Rangoon', '2024-03-15 05:24:11', '15.5607352,96.9425132,99'),
(8, 'p', '74639cb7-eb86-4954-992a-2908ca65ab99', 'true', 3, '2a09:bac1:4b00::278:ca', '430x932', 'https://himyanmar.online/t/3/?t=p&p=l', 'Asia/Rangoon', '2024-03-15 13:31:03', '15.5607352,96.9425132,99'),
(9, 'p', '72cba50c-98d4-4abd-a8f7-f893910f08e6', 'true', 3, '2a09:bac1:4b40::23:459', '375x812', 'https://himyanmar.online/t/3/?t=p&p=l&fbclid=IwAR1shrw_D-Yc_WRWlL2dKp2nXgPghgti1l2r-1dbUyYF2j8h-rO8wbMmyeo_aem_AbrqGkE77dOcmMQd0JiVPD0k8upOxBf7IzGvvGoOXKslhBahz13VnlscOgRuC18HEtI', 'Asia/Rangoon', '2024-03-15 14:26:13', '16.807943352756187,96.17647706412514,11.64959617659994'),
(10, 'me', 'f4959aad-00b6-4099-9938-46081f3b1c31', 'true', 3, '2a09:bac1:4b60::279:1d', '1536x864', 'https://himyanmar.online/t/3/?t=me&p=l', 'Asia/Rangoon', '2024-03-15 22:09:05', '16.8198144,96.1544192,4410.003869931264'),
(11, 'PLM', 'c378c639-99a3-4a0d-9897-ad91e8541cfe', 'true', 2, '159.223.49.88', '384x854', 'https://himyanmar.online/t/2/?t=PLM&p=l', 'Asia/Rangoon', '2024-03-17 06:25:07', '16.8695652,96.1310814,100'),
(12, 'PLM', 'c378c639-99a3-4a0d-9897-ad91e8541cfe', 'false', 2, '103.89.179.151', '384x854', 'https://himyanmar.online/t/2/?t=PLM&p=l', 'Asia/Rangoon', '2024-03-17 07:22:20', '16.869561,96.1310828,100'),
(13, 'PLM', 'c378c639-99a3-4a0d-9897-ad91e8541cfe', 'false', 2, '103.134.204.55', '384x854', 'https://himyanmar.online/t/2/?t=PLM&p=l', 'Asia/Rangoon', '2024-03-17 07:23:23', '16.869561,96.1310828,100'),
(14, 'me', 'aa4d6cc3-20b8-4286-af58-be1bf060af46', 'true', 4, '2a09:bac5:492c:1028::19c:45', '1536x864', 'https://himyanmar.online/t/4/?t=me', 'Asia/Rangoon', '2024-03-17 10:04:13', '15.5607352,96.9425132,99'),
(15, 'ta', 'b8a62189-9ab9-46fb-9461-abf924c7cb88', 'true', 3, '2a09:bac5:492b:137d::1f1:1f0', '393x873', 'https://himyanmar.online/t/3/?t=ta&p=l,', 'Asia/Rangoon', '2024-03-18 01:55:53', '16.8629515,96.1091352,1600'),
(16, 'ta', 'b8a62189-9ab9-46fb-9461-abf924c7cb88', 'false', 3, '2a09:bac5:492b:137d::1f1:1f0', '393x873', 'https://himyanmar.online/t/3/?t=ta&p=l,', 'Asia/Rangoon', '2024-03-18 01:56:54', '16.8629515,96.1091352,1600'),
(17, 'ta', '389c37a5-5cff-4f91-9f32-fa514f5b8931', 'true', 3, '2a09:bac5:492b:137d::1f1:1f0', '393x873', 'https://himyanmar.online/t/3/?t=ta&p=l,', 'Asia/Rangoon', '2024-03-18 01:57:15', '15.5607352,96.9425132,99'),
(18, 'ta', '389c37a5-5cff-4f91-9f32-fa514f5b8931', 'false', 3, '2a09:bac5:492b:137d::1f1:1f0', '393x873', 'https://himyanmar.online/t/3/?t=ta&p=l,', 'Asia/Rangoon', '2024-03-18 01:57:38', '15.5607352,96.9425132,99'),
(19, 'ta', '389c37a5-5cff-4f91-9f32-fa514f5b8931', 'false', 3, '2a09:bac5:492b:137d::1f1:1f0', '393x873', 'https://himyanmar.online/t/3/?t=ta&p=l,', 'Asia/Rangoon', '2024-03-18 01:57:47', '16.8641404,96.1094766,16.662399291992188'),
(20, 'ta', '389c37a5-5cff-4f91-9f32-fa514f5b8931', 'false', 3, '2a09:bac5:492b:137d::1f1:1f0', '393x873', 'https://himyanmar.online/t/3/?t=ta&p=l,', 'Asia/Rangoon', '2024-03-18 01:57:59', '16.8641404,96.1094766,33.58420181274414'),
(21, 'ta', '389c37a5-5cff-4f91-9f32-fa514f5b8931', 'false', 3, '2a09:bac5:492b:137d::1f1:1f0', '393x873', 'https://himyanmar.online/t/3/?t=ta&p=l,', 'Asia/Rangoon', '2024-03-18 01:58:09', '16.8641404,96.1094766,46.91080093383789'),
(22, 'ta', 'c3fecb49-716d-4f35-9301-b279f86ec1d1', 'true', 3, '2a09:bac1:4b60::19c:2a', '1920x1080', 'https://himyanmar.online/t/3/?t=ta&p=l', 'Asia/Rangoon', '2024-03-18 02:05:42', '16.8165376,96.17408,5044.327528604226'),
(23, 'ta', '1639ee7f-cc83-4342-ad08-ad11e5de46ad', 'true', 3, '103.84.100.1', '393x873', 'https://himyanmar.online/t/3/?t=ta&p=l,', 'Asia/Rangoon', '2024-04-01 07:07:43', '16.864065,96.10948,100'),
(24, 'NaungLay', '2c6a618b-41b1-411a-a536-bf1f72adefc7', 'true', 2, '202.165.82.244', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-05 20:24:12', '15.5607352,96.9425132,99'),
(25, 'NaungLay', '2c6a618b-41b1-411a-a536-bf1f72adefc7', 'false', 2, '209.141.44.254', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-05 20:25:11', '15.5607352,96.9425132,99'),
(26, 'NaungLay', '2c6a618b-41b1-411a-a536-bf1f72adefc7', 'false', 2, '209.141.44.254', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-05 20:25:47', '15.5607352,96.9425132,99'),
(27, 'HS', '959d394d-5134-4a0b-867a-80e83a5cc350', 'true', 6, '162.19.153.154', '393x873', 'https://himyanmar.online/t/6/?t=HS&p=l', 'Asia/Rangoon', '2024-04-13 12:11:35', '16.8235438,96.2660935,100'),
(28, 'mty', 'df085f98-0da8-4858-95c2-0f62fb4dcbae', 'true', 6, '172.104.62.168', '360x760', 'https://himyanmar.online/t/6/?t=mty&p=l', 'Asia/Rangoon', '2024-04-13 12:22:10', '15.5607352,96.9425132,99'),
(29, 'mty', 'df085f98-0da8-4858-95c2-0f62fb4dcbae', 'false', 6, '172.104.62.168', '360x760', 'https://himyanmar.online/t/6/?t=mty&p=l', 'Asia/Rangoon', '2024-04-13 12:24:34', '15.5607352,96.9425132,99'),
(30, 'mty', 'df085f98-0da8-4858-95c2-0f62fb4dcbae', 'false', 6, '172.104.62.168', '360x760', 'https://himyanmar.online/t/6/?t=mty&p=l', 'Asia/Rangoon', '2024-04-13 12:25:54', '15.5607352,96.9425132,99'),
(31, 'mty', 'df085f98-0da8-4858-95c2-0f62fb4dcbae', 'false', 6, '172.104.62.168', '360x760', 'https://himyanmar.online/t/6/?t=mty&p=l', 'Asia/Rangoon', '2024-04-13 12:27:06', '15.5607352,96.9425132,99'),
(32, 'mty', 'aeba20b3-bca2-4dc0-ba4d-3632254d1529', 'true', 6, '172.104.62.168', '360x760', 'https://himyanmar.online/t/6/?t=mty&p=l', 'Asia/Rangoon', '2024-04-13 12:33:21', '15.5607352,96.9425132,99'),
(33, 'mty', 'dcf72606-2652-4360-9b37-f16f9f8fa23b', 'true', 6, '172.104.62.168', '360x760', 'https://himyanmar.online/t/6/?t=mty&p=l', 'Asia/Rangoon', '2024-04-13 12:37:39', '15.5607352,96.9425132,99'),
(34, 'mty', 'dcf72606-2652-4360-9b37-f16f9f8fa23b', 'false', 6, '172.104.62.168', '360x760', 'https://himyanmar.online/t/6/?t=mty&p=l', 'Asia/Rangoon', '2024-04-13 12:37:54', '15.5607352,96.9425132,99'),
(35, 'mty', 'dcf72606-2652-4360-9b37-f16f9f8fa23b', 'false', 6, '172.104.62.168', '360x760', 'https://himyanmar.online/t/6/?t=mty&p=l', 'Asia/Rangoon', '2024-04-13 12:38:10', '15.5607352,96.9425132,99'),
(36, 'mty', 'dcf72606-2652-4360-9b37-f16f9f8fa23b', 'false', 6, '172.104.62.168', '360x760', 'https://himyanmar.online/t/6/?t=mty&p=l', 'Asia/Rangoon', '2024-04-13 12:38:31', '15.5607352,96.9425132,99'),
(37, 'mty', '58678d21-c2ec-4262-9ca4-6ba66a2a625a', 'true', 5, '172.104.62.168', '360x760', 'https://himyanmar.online/t/5/?t=mty&p=l&f=o', 'Asia/Rangoon', '2024-04-13 12:55:27', '15.5607352,96.9425132,99'),
(38, 'mty', '58678d21-c2ec-4262-9ca4-6ba66a2a625a', 'false', 5, '172.104.62.168', '360x760', 'https://himyanmar.online/t/5/?t=mty&p=l&f=o', 'Asia/Rangoon', '2024-04-13 12:56:15', '15.5607352,96.9425132,99'),
(39, 'mty', '163373a2-a3da-4b68-8d28-9bc17a5376e6', 'true', 5, '202.191.104.171', '360x760', 'https://himyanmar.online/t/5/?t=mty&p=l&f=o', 'Asia/Rangoon', '2024-04-13 12:59:35', '15.5607352,96.9425132,99'),
(40, 'mty', '163373a2-a3da-4b68-8d28-9bc17a5376e6', 'false', 5, '202.191.104.171', '360x760', 'https://himyanmar.online/t/5/?t=mty&p=l&f=o', 'Asia/Rangoon', '2024-04-13 12:59:45', '15.5607352,96.9425132,99'),
(41, 'mty', '8d479681-808d-4db3-9653-45dfb9f4da4d', 'true', 6, '202.191.104.171', '360x760', 'https://himyanmar.online/t/6/?t=mty&p=l', 'Asia/Rangoon', '2024-04-13 13:02:51', '15.5607352,96.9425132,99'),
(42, 'mty', '8d479681-808d-4db3-9653-45dfb9f4da4d', 'false', 5, '202.191.104.171', '360x760', 'https://himyanmar.online/t/5/?t=mty&p=l&f=o', 'Asia/Rangoon', '2024-04-13 13:03:28', '15.5607352,96.9425132,99'),
(43, 'mty', '22b8c111-8bf0-48d0-9e8f-f1e05c55678d', 'true', 5, '202.191.104.171', '360x760', 'https://himyanmar.online/t/5/?t=mty&p=l&f=o', 'Asia/Rangoon', '2024-04-13 13:04:13', '20.8100459,97.0678289,39.599998474121094'),
(44, 'mty', '22b8c111-8bf0-48d0-9e8f-f1e05c55678d', 'false', 5, '202.191.104.171', '360x760', 'https://himyanmar.online/t/5/?t=mty&p=l&f=o', 'Asia/Rangoon', '2024-04-13 13:05:06', '20.8100437,97.0678256,64.0999984741211'),
(45, 'mty', '22b8c111-8bf0-48d0-9e8f-f1e05c55678d', 'false', 5, '202.191.104.171', '360x760', 'https://himyanmar.online/t/5/?t=mty&p=l&f=o', 'Asia/Rangoon', '2024-04-13 13:05:22', '20.8099147,97.0677648,87.5999984741211'),
(46, 'mty', '22b8c111-8bf0-48d0-9e8f-f1e05c55678d', 'false', 5, '202.191.104.171', '360x760', 'https://himyanmar.online/t/5/?t=mty&p=l&f=o', 'Asia/Rangoon', '2024-04-13 13:05:46', '20.8099147,97.0677648,528.7000122070312'),
(47, 'NaungLay', 'cce9adb4-1335-4c60-9fef-04f38892576a', 'true', 2, '209.141.46.132', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-17 15:18:05', '15.5607352,96.9425132,99'),
(48, 'NaungLay', 'cce9adb4-1335-4c60-9fef-04f38892576a', 'false', 2, '209.141.46.132', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-17 15:18:54', '15.5607352,96.9425132,99'),
(49, 'NaungLay', 'cce9adb4-1335-4c60-9fef-04f38892576a', 'false', 2, '209.141.46.132', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-17 15:19:48', '15.5607352,96.9425132,99'),
(50, 'NaungLay', 'a31ba99b-890e-477f-bb6d-bea2a74f4b32', 'true', 2, '209.141.46.132', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-17 15:20:27', '15.5607352,96.9425132,99'),
(51, 'NaungLay', 'a31ba99b-890e-477f-bb6d-bea2a74f4b32', 'false', 2, '51.195.102.60', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-17 15:21:14', '15.5607352,96.9425132,99'),
(52, 'NaungLay', 'a31ba99b-890e-477f-bb6d-bea2a74f4b32', 'false', 2, '51.195.102.60', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-17 15:21:23', '15.5607352,96.9425132,99'),
(53, 'NaungLay', '32c05157-f347-4ccf-8845-d103fb7a699d', 'true', 2, '209.141.35.208', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-17 16:27:02', '18.834439,96.409847,40'),
(54, 'NaungLay', '32c05157-f347-4ccf-8845-d103fb7a699d', 'false', 2, '209.141.46.132', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-17 16:28:45', '18.834439,96.409847,40'),
(55, 'NaungLay', '32c05157-f347-4ccf-8845-d103fb7a699d', 'false', 2, '209.141.46.132', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-17 16:31:50', '18.834439,96.409847,40'),
(56, 'NaungLay', 'f3f141ff-14f2-4b14-86ae-82764ac2b351', 'true', 2, '209.141.35.208', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-17 16:34:11', '18.834437,96.409845,40'),
(57, 'NaungLay', 'f3f141ff-14f2-4b14-86ae-82764ac2b351', 'false', 2, '202.165.84.31', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-17 16:34:41', '18.834437,96.409845,40'),
(58, 'NaungLay', 'd69530e1-6b5e-46b9-a7a4-9ee2f2edf618', 'true', 2, '209.141.55.127', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-17 17:50:04', '18.83444,96.409849,40'),
(59, 'NaungLay', '844ce17a-f1f6-4980-a8f0-7770dd9ab137', 'true', 2, '124.251.57.52', '800x600', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Shanghai', '2024-04-17 20:40:59', '15.5607352,96.9425132,99'),
(60, 'oks', '8b63932c-aebc-4136-8603-9fec07032dfb', 'true', 7, '2a09:bac5:492f:1028::19c:157', '393x851', 'https://himyanmar.online/t/7/?t=oks&p=l', 'Asia/Rangoon', '2024-04-18 23:34:00', '15.5607352,96.9425132,99'),
(61, 'oks', '8b63932c-aebc-4136-8603-9fec07032dfb', 'false', 7, '2a09:bac5:492f:1028::19c:157', '393x851', 'https://himyanmar.online/t/7/?t=oks&p=l', 'Asia/Rangoon', '2024-04-18 23:34:21', '15.5607352,96.9425132,99'),
(62, 'oks', '8b63932c-aebc-4136-8603-9fec07032dfb', 'false', 7, '2a09:bac5:492f:1028::19c:157', '393x851', 'https://himyanmar.online/t/7/?t=oks&p=l', 'Asia/Rangoon', '2024-04-18 23:34:40', '15.5607352,96.9425132,99'),
(63, 'oks', '8b63932c-aebc-4136-8603-9fec07032dfb', 'false', 7, '2a09:bac5:492f:1028::19c:157', '393x851', 'https://himyanmar.online/t/7/?t=oks&p=l', 'Asia/Rangoon', '2024-04-18 23:34:46', '15.5607352,96.9425132,99'),
(64, 'oks', '502ce0b7-c13b-4a9f-b1d8-2ab92bdfdaf8', 'true', 7, '2a09:bac5:492f:1028::19c:157', '393x851', 'https://himyanmar.online/t/7/?t=oks&p=l', 'Asia/Rangoon', '2024-04-18 23:35:20', '15.5607352,96.9425132,99'),
(65, 'oks', '44593df3-32fd-4304-b6cf-84b8c2f67f63', 'true', 7, '2a09:bac5:492f:1028::19c:157', '393x851', 'https://himyanmar.online/t/7/?t=oks&p=l', 'Asia/Rangoon', '2024-04-18 23:35:54', '15.5607352,96.9425132,99'),
(66, 'oks', '44593df3-32fd-4304-b6cf-84b8c2f67f63', 'false', 7, '2a09:bac5:492f:1028::19c:157', '393x851', 'https://himyanmar.online/t/7/?t=oks&p=l', 'Asia/Rangoon', '2024-04-18 23:36:00', '15.5607352,96.9425132,99'),
(67, 'oks', '44593df3-32fd-4304-b6cf-84b8c2f67f63', 'false', 7, '2a09:bac5:492f:1028::19c:157', '393x851', 'https://himyanmar.online/t/7/?t=oks&p=l', 'Asia/Rangoon', '2024-04-18 23:38:35', '15.5607352,96.9425132,99'),
(68, 'oks', '44593df3-32fd-4304-b6cf-84b8c2f67f63', 'false', 7, '2a09:bac5:492f:1028::19c:157', '393x851', 'https://himyanmar.online/t/7/?t=oks&p=l', 'Asia/Rangoon', '2024-04-18 23:38:48', '16.8641422,96.1095216,44.80379867553711'),
(69, 'oks', '44593df3-32fd-4304-b6cf-84b8c2f67f63', 'false', 7, '2a09:bac5:492f:1028::19c:157', '393x851', 'https://himyanmar.online/t/7/?t=oks&p=l', 'Asia/Rangoon', '2024-04-18 23:40:37', '16.8641431,96.1095219,100'),
(70, 'NaungLay', '5a44dd6b-8e21-417d-ac9a-c8b887ac1bd5', 'true', 2, '202.165.83.244', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-20 19:12:53', '15.5607352,96.9425132,99'),
(71, 'NaungLay', '5a44dd6b-8e21-417d-ac9a-c8b887ac1bd5', 'false', 2, '209.141.35.208', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-20 19:13:33', '15.5607352,96.9425132,99'),
(72, 'NaungLay', '5a44dd6b-8e21-417d-ac9a-c8b887ac1bd5', 'false', 2, '209.141.35.208', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-20 19:14:16', '15.5607352,96.9425132,99'),
(73, 'NaungLay', '5a44dd6b-8e21-417d-ac9a-c8b887ac1bd5', 'false', 2, '209.141.35.208', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-20 19:14:30', '15.5607352,96.9425132,99'),
(74, 'NaungLay', '5a44dd6b-8e21-417d-ac9a-c8b887ac1bd5', 'false', 2, '209.141.35.208', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-20 19:14:44', '15.5607352,96.9425132,99'),
(75, 'NaungLay', '5a44dd6b-8e21-417d-ac9a-c8b887ac1bd5', 'false', 2, '209.141.35.208', '360x800', 'https://himyanmar.online/t/2/?t=NaungLay&p=l', 'Asia/Rangoon', '2024-04-20 19:14:55', '15.5607352,96.9425132,99'),
(76, 'p', '68808cac-38f5-467f-9536-795e2b27ec7e', 'true', 4, '2a09:bac1:4b20::278:8a', '430x932', 'https://himyanmar.online/t/4/?t=p&fbclid=IwZXh0bgNhZW0BMQABHafI9qUJEJoqjHAN78lFuYOhILf4upwgwhmCmADC8hxgBtn8fc30ceLQIA_aem_AWq02LB8oodhdn0A42kA363fZKnSzE9z7muVn9IlyoAFhNBkHilHX0r4JfRgUnUsD6I', 'Asia/Rangoon', '2024-04-24 06:35:57', '15.5607352,96.9425132,99'),
(77, NULL, '7cd89600-9575-4f16-bbf6-9915bd57f788', 'true', 8, '45.125.4.60,45.125.4.6', '1536x864', 'https://himyanmar.online/t/8/', 'Asia/Rangoon', '2024-08-06 13:48:27', '15.5607352,96.9425132,99'),
(78, NULL, '8b6642d7-f1fe-46fd-838f-016f0a8a6da5', 'true', 8, '194.5.82.41,194.5.82.4', '1536x864', 'https://himyanmar.online/t/8/', 'Asia/Rangoon', '2024-08-06 13:51:36', '15.5607352,96.9425132,99'),
(79, 'p', 'b9a2340e-1857-4681-8c7a-1571fbd78b70', 'true', 4, '2a03:2880:21ff:1c::face:b00c,2a03:2880:21ff:1c::face:b00', '2000x2000', 'https://himyanmar.online/t/4/?t=p&fbclid=IwZXh0bgNhZW0CMTEAAR2FYsHvtsZIFep37naQ5diq_EH4nFU_Kxy6hshPlHwivEBR9QlYtocdnd8_aem_BBNQ85VUoIEL9SqA5r_o3g', 'America/Los_Angeles', '2024-08-22 12:26:51', '15.5607352,96.9425132,99'),
(80, 'p', 'd8d91016-67df-4ddc-bfa0-b5d80de90490', 'true', 4, '2a03:2880:10ff:c::face:b00c,2a03:2880:10ff:c::face:b00', '2000x2000', 'https://himyanmar.online/t/4/?t=p&fbclid=IwZXh0bgNhZW0CMTEAAR1tDVR46-bzBNkRnkGy-Hu0iXoNGLktjCvwT6TGy6sLLB5LYGsB9ddN-6A_aem_3rLFl0ee_SfPjIgaZh83pQ', 'America/Los_Angeles', '2024-08-28 14:26:10', '15.5607352,96.9425132,99');

-- --------------------------------------------------------

--
-- Table structure for table `website`
--

CREATE TABLE `website` (
  `id` int(11) NOT NULL COMMENT 'Primary Key',
  `name` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` text NOT NULL,
  `site_icon_url` text DEFAULT NULL,
  `color_hue` int(11) NOT NULL DEFAULT 200,
  `keywords` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `error_code` varchar(100) DEFAULT NULL COMMENT 'last fetch http status',
  `last_scan_time` timestamp NULL DEFAULT NULL,
  `scan_by` varchar(100) DEFAULT NULL,
  `api_base_path` varchar(255) NOT NULL DEFAULT '/?rest_route=/',
  `is18Plus` enum('yes','no') NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `website`
--

INSERT INTO `website` (`id`, `name`, `description`, `url`, `site_icon_url`, `color_hue`, `keywords`, `created_time`, `updated_time`, `status`, `error_code`, `last_scan_time`, `scan_by`, `api_base_path`, `is18Plus`) VALUES
(22, 'Hein Soe', 'as a web developer and designer committed to creating visually appealing and highly functional websites. With a focus on the latest trends and technologies, I strive to deliver exceptional web solutions that help businesses succeed online.', 'https://api.heinsoe.com', '', 100, NULL, '2024-02-21 03:35:52', '2024-09-16 14:43:52', 'active', 'ERR_NETWORK', '2024-09-16 14:43:52', 'CLIENT', '/?rest_route=/', 'no'),
(28, 'Wone Dine [အပြာကား]', 'www.wonedine.com', 'https://wonedine.com', '', 200, NULL, '2024-02-21 05:57:16', '2024-09-14 15:32:44', 'active', 'ERR_NETWORK', '2024-09-14 15:32:44', 'CLIENT', '/?rest_route=/', 'yes'),
(31, 'á€±á€–á€¬á€„á€¹á€¸á€’á€­á€¯á€„á€¹á€¸á€…á€¬á€¡á€¯á€•á€¹á€™á€ºá€¬á€¸ á€±á€¡á€¬á€…á€¬á€¡á€¯á€•á€¹á€™á€ºá€¬á€¸ ', 'Blue Book Collection', 'https://blue.lawka-ahla.com', '', 20, NULL, '2024-02-22 03:59:55', '2024-09-24 15:41:31', 'active', 'ERR_NETWORK', '2024-09-24 15:41:31', 'CLIENT', '/?rest_route=/', 'yes'),
(32, 'sportsmyanmar.com', '', 'https://sportsmyanmar.com', 'https://sportsmyanmar.com/wp-content/uploads/2023/03/cropped-loggg.png', 50, NULL, '2024-02-22 15:12:24', '2024-09-25 23:16:34', 'active', 'ERR_NETWORK', '2024-09-25 23:16:34', 'CLIENT', '/?rest_route=/', 'no'),
(33, 'Loe Car', 'Myanmar Love Stories', 'https://mm.loecar.net', '', 200, NULL, '2024-02-23 05:29:08', '2024-09-25 22:07:19', 'active', 'ERR_NETWORK', '2024-09-25 22:07:19', 'CLIENT', '/?rest_route=/', 'yes'),
(34, 'One Day Press', 'MEDIA AND ENTERTAINMENT', 'https://news.oneday.press', 'https://news.oneday.press/wp-content/uploads/onedaypress/2023/07/cropped-68t.jpg', 200, NULL, '2024-02-23 06:29:43', '2024-09-21 20:01:04', 'active', 'ERR_NETWORK', '2024-09-21 20:01:04', 'CLIENT', '/?rest_route=/', 'no'),
(395, 'sportsmyanmar.com', '', 'https://sportsmyanmar.com', 'https://sportsmyanmar.com/wp-content/uploads/2023/03/cropped-loggg.png', 72, 'sport', '2024-02-23 07:56:38', '2024-09-25 23:16:34', 'active', 'ERR_NETWORK', '2024-09-25 23:16:34', 'CLIENT', '/?rest_route=/', 'no'),
(396, 'Apex Canal', 'ရုပ်ရှင် review', 'https://apexcanal.com', 'https://apexcanal.com/wp-content/uploads/2022/01/cropped-Cover.png', 234, 'ရုပ်ရင် film movie ', '2024-02-23 07:56:38', '2024-08-15 10:27:51', 'disable', 'ERR_NETWORK', '2024-08-15 10:27:51', 'Hein Soe', '/?rest_route=/', 'no'),
(397, 'Channel Myanmar', 'Quality Is Our Priority', 'https://channelmyanmar.org', 'https://lh3.googleusercontent.com/5YjkTnlORhYBuh7FgIwWpNPiWrFSY0FY4hanxTmIeTYg0zjwPxVfx9RWaoMm46A0bw=h200', 50, 'ရုပ်ရင် film movie ', '2024-02-23 07:56:38', '2024-09-24 06:38:42', 'active', 'ERR_NETWORK', '2024-09-24 06:38:42', 'CLIENT', '/?rest_route=/', 'no'),
(398, 'DVB', 'Democratic Voice of Burma', 'https://burmese.dvb.no', 'https://burmese.dvb.no/wp-content/uploads/2020/09/dvb-logo1-min.png', 226, 'news သတင်း', '2024-02-23 07:56:38', '2024-09-20 02:21:29', 'active', 'ERR_NETWORK', '2024-09-20 02:21:29', 'CLIENT', '/wp-json/', 'no'),
(399, 'Arakan Princess Media', '', 'https://arakanprincess.media', 'https://arakanprincess.media/wp-content/uploads/2021/08/cropped-arakanprincessmedia-1.png', 234, 'news သတင်း', '2024-02-23 07:56:38', '2024-09-21 10:31:12', 'active', 'ERR_NETWORK', '2024-09-21 10:31:12', 'CLIENT', '/?rest_route=/', 'no'),
(400, 'Nowadays News', '', 'https://nowadays-news.com', '', 234, 'news သတင်း', '2024-02-23 07:56:38', '2024-09-26 02:31:19', 'active', 'ERR_NETWORK', '2024-09-26 02:31:19', 'CLIENT', '/?rest_route=/', 'no'),
(401, 'Kwee', 'All about Lifestyle, Fashion, Music, Sports and Health', 'https://kwee.co', 'https://kwee.co/wp-content/uploads/2018/07/cropped-KWEE-favicon.png', 291, 'news ?????', '2024-02-23 07:56:38', '2024-09-22 22:39:20', 'active', 'ERR_NETWORK', '2024-09-22 22:39:20', 'CLIENT', '/?rest_route=/', 'no'),
(402, 'Blacker', 'Newsstand', 'https://blackotfb.com', 'https://blackotfb.com/wp-content/uploads/2022/08/cropped-blacker.png', 20, 'Black ot', '2024-02-23 07:56:38', '2024-09-14 09:35:20', 'active', 'ERR_NETWORK', '2024-09-14 09:35:20', 'CLIENT', '/?rest_route=/', 'no'),
(403, 'All Movie Store', 'MEDIA AND ENTERTAINMENT', 'https://media.allmoviestore.com', 'https://media.allmoviestore.com/wp-content/uploads/2024/01/7b6ea6e9788ccf8194599ca94293746d.jpg', 20, 'Movie', '2024-02-23 07:56:38', '2024-09-21 19:54:45', 'active', 'ERR_NETWORK', '2024-09-21 19:54:45', 'CLIENT', '/?rest_route=/', 'no'),
(404, 'Mekong News Myanmar', 'News Media', 'https://mekongnewsmm.com/', 'https://mekongnewsmm.com/wp-content/uploads/2022/11/favicon.png', 349, '???????', '2024-02-23 07:56:38', '2024-09-05 14:41:46', 'active', 'ERR_NETWORK', '2024-09-05 14:41:46', 'CLIENT', '/?rest_route=/', 'no'),
(405, 'Cele Main News Link', 'Entertainment', 'https://news.mainnewslink.com', '', 28, 'ပေါက်ကရ', '2024-02-23 07:56:38', '2024-09-25 23:52:49', 'active', 'ERR_NETWORK', '2024-09-25 23:52:49', 'CLIENT', '/?rest_route=/', 'no'),
(406, 'Welcome IT professional', 'Welcome IT professional', 'https://www.itpedia.nl/my', 'null', 284, '???????', '2024-02-23 07:56:38', '2024-09-14 19:48:08', 'active', 'ERR_NETWORK', '2024-09-14 19:48:08', 'CLIENT', '/?rest_route=/', 'no'),
(407, 'Media Update News', 'Daily News', 'https://mediaupdatenews.com', '', 284, '???????', '2024-02-23 07:56:38', '2024-08-15 10:59:49', 'disable', '', '2024-02-26 09:35:09', 'Hein Soe', '/?rest_route=/', 'no'),
(408, 'SS', '', 'https://www.shwesagar.xyz', 'https://www.shwesagar.xyz/wp-content/uploads/2022/12/cropped-8.png', 284, 'ပေါက်ကရ', '2024-02-23 07:56:38', '2024-08-06 04:48:02', 'active', 'ERR_NETWORK', '2024-08-06 04:48:02', 'CLIENT', '/?rest_route=/', 'no'),
(409, 'ESPN News', 'Knowledges For Everyone', 'https://espnnews.club', '', 259, 'esp', '2024-02-23 07:56:38', '2024-08-15 07:43:23', 'active', 'ERR_NETWORK', '2024-08-15 07:43:23', 'CLIENT', '/?rest_route=/', 'no'),
(410, 'Kwee', 'All about Lifestyle, Fashion, Music, Sports and Health', 'https://kwee.co', 'https://kwee.co/wp-content/uploads/2018/07/cropped-KWEE-favicon.png', 20, '????', '2024-02-23 07:56:38', '2024-09-22 22:39:20', 'active', 'ERR_NETWORK', '2024-09-22 22:39:20', 'CLIENT', '/?rest_route=/', 'no'),
(411, 'Cele Main News Link', 'Entertainment', 'https://news.mainnewslink.com', '', 302, 'Cele', '2024-02-23 07:56:38', '2024-09-25 23:52:49', 'active', 'ERR_NETWORK', '2024-09-25 23:52:49', 'CLIENT', '/?rest_route=/', 'no'),
(412, 'Thadin K-pop News', 'Just another WordPress site', 'https://thadin.kpop-news.xyz', 'null', 313, '  ', '2024-02-23 07:56:38', '2024-02-26 09:31:33', 'disable', '', '2024-02-26 09:31:17', 'Hein Soe', '/?rest_route=/', 'no'),
(413, 'Burmesenew', 'Stay Informed with the Latest News and Updates', 'https://www.burmesenew.xyz', '', 327, '  ', '2024-02-23 07:56:38', '2024-08-12 17:55:21', 'active', 'ERR_NETWORK', '2024-08-12 17:55:21', 'CLIENT', '/?rest_route=/', 'no'),
(414, 'Thadin', ' ', 'https://freshnews37.com', 'null', 327, '  ', '2024-02-23 07:56:38', '2024-02-26 09:30:58', 'disable', 'ERR_NETWORK', '2024-02-26 09:30:58', 'Hein Soe', '/?rest_route=/', 'no'),
(415, 'Pyo Ka Nyar', ' ', 'https://pyokanyar.xyz', 'null', 327, '  ', '2024-02-23 07:56:38', '2024-02-26 09:30:44', 'disable', '', NULL, NULL, '/?rest_route=/', 'no'),
(416, 'Pya Zat', ' ', 'https://pyazat.com', 'null', 327, '  ', '2024-02-23 07:56:38', '2024-02-26 09:48:25', 'disable', 'ERR_NETWORK', '2024-02-26 09:48:25', 'Hein Soe', '/?rest_route=/', 'no'),
(417, 'World info Post', 'Unveiling World&#039;s Stories', 'https://worldinfopost.com', 'https://i0.wp.com/worldinfopost.com/wp-content/uploads/2023/08/cropped-world-info-post-icon.png?fit=512%2C512&ssl=1', 327, '  ', '2024-02-23 07:56:38', '2024-08-24 02:23:05', 'active', 'ERR_NETWORK', '2024-08-24 02:23:05', 'CLIENT', '/?rest_route=/', 'no'),
(418, 'Knowverse', 'Unlocking Knowledge for a Brighter Future', 'https://popularpostnews.com', 'https://popularpostnews.com/wp-content/uploads/2023/06/favicon.png', 327, '  ', '2024-02-23 07:56:38', '2024-09-12 11:42:19', 'active', 'ERR_NETWORK', '2024-09-12 11:42:19', 'CLIENT', '/?rest_route=/', 'no'),
(419, 'Class New 24', 'Cele', 'https://classnews24.com', 'null', 302, ' ', '2024-02-23 07:56:38', '2024-02-26 09:44:45', 'disable', '', '2024-02-26 09:44:35', 'Hein Soe', '/?rest_route=/', 'no'),
(420, 'monywanews', 'My WordPress Blog', 'https://monywanews.online', '', 284, ' ', '2024-02-23 07:56:38', '2024-09-23 17:35:17', 'active', 'ERR_NETWORK', '2024-09-23 17:35:17', 'CLIENT', '/?rest_route=/', 'no'),
(421, 'CeleGabar', '', 'https://celegabar.com', '', 75, 'ဆယ်လီကမ္ဘာ', '2024-02-23 07:56:38', '2024-08-27 10:37:07', 'active', 'ERR_NETWORK', '2024-08-27 10:37:07', 'CLIENT', '/?rest_route=/', 'no'),
(422, 'ONE DAILY MEDIA', 'thutadaily', 'https://thutadaily.xyz', 'null', 75, 'သုတ', '2024-02-23 07:56:38', '2024-02-28 10:03:39', 'disable', 'ERR_NETWORK', '2024-02-28 10:03:39', 'Hein Soe', '/?rest_route=/', 'no'),
(423, 'XmmSub.com', 'ကျော်ကြီးတို့ကမ္ဘာ', 'https://xmmsub.com', '', 250, '', '2024-02-23 07:56:38', '2024-09-05 14:12:57', 'active', 'ERR_NETWORK', '2024-09-05 14:12:57', 'CLIENT', '/?rest_route=/', 'yes'),
(424, 'DVB', 'Democratic Voice of Burma', 'https://burmese.dvb.no/', '/wp-content/uploads/2020/09/dvb-logo1-min.png', 250, 'dvb', '2024-02-23 07:56:38', '2024-08-22 11:29:06', 'active', '', '2024-08-22 11:28:45', 'Hein Soe', '/wp-json/', 'no'),
(425, 'nattarlay', 'nattarlay', 'https://nattarlay.com', 'null', 250, 'လိုး, အပြာ', '2024-02-23 07:56:38', '2024-02-28 09:59:20', 'disable', 'ERR_NETWORK', '2024-02-28 09:59:20', 'Hein Soe', '/?rest_route=/', 'no'),
(426, 'Wone Dine [အပြာကား]', 'ဝုန်းဒိုင်း', 'https://wonedine.com', 'https://static-00.iconduck.com/assets.00/no-one-under-eighteen-emoji-256x256-kudtml05.png', 250, 'လိုး, အပြာ', '2024-02-23 07:56:38', '2024-09-14 15:32:44', 'active', 'ERR_NETWORK', '2024-09-14 15:32:44', 'CLIENT', '/?rest_route=/', 'yes'),
(427, 'Thadin', 'https://crph.xyz/thadin/', 'https://crph.xyz/thadin', 'null', 250, '', '2024-02-23 07:56:38', '2024-02-26 09:46:49', 'disable', '', '2024-02-26 09:46:30', 'Hein Soe', '/?rest_route=/', 'no'),
(428, 'NewsZca', '', 'https://newzca.com', 'false', 280, ' ', '2024-02-23 07:56:38', '2024-09-23 16:16:28', 'active', 'ERR_NETWORK', '2024-09-23 16:16:28', 'CLIENT', '/?rest_route=/', 'no'),
(429, 'San Kyi Par', 'Tech Blog', 'https://www.sankyipar.com', 'https://i0.wp.com/www.sankyipar.com/wp-content/uploads/2019/01/cropped-Untitled-design.png?fit=512%2C512&ssl=1', 20, ' ', '2024-02-23 07:56:38', '2024-09-17 18:54:51', 'active', 'ERR_NETWORK', '2024-09-17 18:54:51', 'CLIENT', '/?rest_route=/', 'no'),
(430, 'Pya Zat', 'Daily Celebrity News', 'https://pyazat.com', 'null', 309, ' ', '2024-02-23 07:56:38', '2024-02-26 09:48:29', 'disable', '', '2024-02-26 09:48:25', 'Hein Soe', '/?rest_route=/', 'no'),
(431, 'San Thitsa', 'Read Every Day', 'https://santhitsanew.com', 'https://santhitsanew.com/wp-content/uploads/2020/03/cropped-ju7.png', 20, ' ', '2024-02-23 07:56:38', '2024-02-26 09:49:08', 'disable', 'DB ERROR', '2024-02-26 09:48:46', 'Hein Soe', '/?rest_route=/', 'no'),
(432, 'Shwe Yoe MM', 'Unlocking Success through Business and Management', 'https://shweyoemm.com', 'https://shweyoemm.com/wp-content/uploads/2023/05/cropped-Shwe-Yoe-web-icon.png', 20, 'ရွှေရိုး', '2024-02-23 07:56:38', '2024-09-25 19:07:28', 'active', 'ERR_NETWORK', '2024-09-25 19:07:28', 'CLIENT', '/?rest_route=/', 'no'),
(433, 'Burma Media Rays', '', 'https://burmamediarays.club', '', 291, ' ', '2024-02-23 07:56:38', '2024-09-22 05:38:46', 'active', 'ERR_NETWORK', '2024-09-22 05:38:46', 'CLIENT', '/?rest_route=/', 'no'),
(434, 'Beesportnews', 'Online Info', 'https://beesportnews.fun', 'https://beesportnews.fun/wp-content/uploads/2020/07/cropped-95419136_246109220131875_923511869509992448_n.jpg', 291, ' ', '2024-02-23 07:56:38', '2024-09-07 03:07:23', 'active', 'ERR_NETWORK', '2024-09-07 03:07:23', 'CLIENT', '/?rest_route=/', 'no'),
(435, 'Say Lo Yar', 'Your latest News', 'https://sayloyar.com', 'null', 20, 'စေလိုရာ', '2024-02-23 07:56:38', '2024-02-26 09:51:17', 'disable', 'ERR_NETWORK', '2024-02-26 09:51:17', 'Hein Soe', '/?rest_route=/', 'no'),
(436, 'Shwe Yoe MM', 'Unlocking Success through Business and Management', 'https://shweyoemm.com', 'https://shweyoemm.com/wp-content/uploads/2023/05/cropped-Shwe-Yoe-web-icon.png', 20, 'ရွှေရိုး', '2024-02-23 07:56:38', '2024-09-25 19:07:28', 'disable', 'ERR_NETWORK', '2024-09-25 19:07:28', 'CLIENT', '/?rest_route=/', 'no'),
(437, 'Update News', 'Celebrity News', 'https://todayupdatenew.com', 'null', 20, ' ', '2024-02-23 07:56:38', '2024-02-26 09:52:19', 'disable', 'EXPIRE', '2024-02-26 09:52:03', 'Hein Soe', '/?rest_route=/', 'no'),
(438, 'Shwe Sar', 'Finance Insights', 'https://shwesar.com', 'https://shwesar.com/wp-content/uploads/2023/11/cropped-ShweSar-icon.png', 259, 'ရွှေစာ', '2024-02-23 07:56:38', '2024-09-14 16:31:55', 'active', 'ERR_NETWORK', '2024-09-14 16:31:55', 'CLIENT', '/?rest_route=/', 'no'),
(439, 'Worldinfo Daily Updates', 'Tech, Science, Knowledge And Business ', 'https://news.worldinfo365.com', 'null', 46, ' ', '2024-02-23 07:56:38', '2024-02-25 14:53:27', 'disable', '', '2024-02-25 14:53:14', 'Hein Soe', '/?rest_route=/', 'no'),
(440, 'Western News', 'westernnewsmm', 'https://westernnewsmm.com', 'https://westernnewsmm.com/wp-content/uploads/2023/09/cropped-6.jpg', 46, ' ', '2024-02-23 07:56:38', '2024-09-25 14:55:31', 'active', 'ERR_NETWORK', '2024-09-25 14:55:31', 'CLIENT', '/?rest_route=/', 'no'),
(441, 'CeleZone', '', 'https://celezone.net', '', 46, ' ', '2024-02-23 07:56:38', '2024-09-26 01:32:26', 'active', 'ERR_NETWORK', '2024-09-26 01:32:26', 'CLIENT', '/?rest_route=/', 'no'),
(442, 'SLN-Business', 'Insurance', 'https://socialnewsmm.com', 'https://socialnewsmm.com/wp-content/uploads/2023/03/cropped-cropped-pupg11.jpg', 46, ' ', '2024-02-23 07:56:38', '2024-08-21 07:42:11', 'active', 'ERR_NETWORK', '2024-08-21 07:42:11', 'CLIENT', '/?rest_route=/', 'no'),
(443, 'Min Mahar', 'မင်းမဟာ', 'https://www.minmahar.com', 'https://i0.wp.com/www.minmahar.com/wp-content/uploads/2022/08/cropped-20220901_020905.png?fit=512%2C512&ssl=1', 306, 'မင်းမဟာ', '2024-02-23 07:56:38', '2024-02-26 11:12:30', 'disable', 'ERR_NETWORK', '2024-02-26 11:12:30', 'Hein Soe', '/?rest_route=/', 'no'),
(444, 'MySport Myanmar', 'Sport and Health', 'https://mysportmyanmar.com', 'false', 20, 'sport ???????', '2024-02-23 07:56:38', '2024-09-25 22:46:07', 'active', 'ERR_NETWORK', '2024-09-25 22:46:07', 'CLIENT', '/?rest_route=/', 'no'),
(445, 'Sports Myanmar', 'Myanmar Sports News', 'https://sportmyanmar.xyz', 'null', 158, 'sport ???????', '2024-02-23 07:56:38', '2024-03-13 12:38:33', 'disable', 'ERR_NETWORK', '2024-03-13 12:38:29', 'Hein Soe', '/?rest_route=/', 'no'),
(446, 'Premier Sports', 'Premier Football News Collection', 'https://www.sportmyanmar.fun', 'https://www.sportmyanmar.fun/wp-content/uploads/2023/06/s-logo.jpg', 158, 'sport အားကစား', '2024-02-23 07:56:38', '2024-09-25 16:00:16', 'active', 'ERR_NETWORK', '2024-09-25 16:00:16', 'CLIENT', '/?rest_route=/', 'no'),
(447, 'Western News', 'မြန်မာဘာသာ', 'https://www.western.news', 'https://www.western.news/wp-content/themes/western/media/logo.svg', 20, 'Western', '2024-02-23 07:56:38', '2024-02-25 14:49:01', 'disable', 'ERR_NETWORK', '2024-02-25 14:49:01', 'Hein Soe', '/?rest_route=/', 'no'),
(448, 'Hello 4B', 'blog', 'https://hello4b.com', 'https://hello4b.com/wp-content/uploads/2023/12/cropped-filename__6_-removebg-preview.png', 356, ' ', '2024-02-23 07:56:38', '2024-09-24 21:00:16', 'active', 'ERR_NETWORK', '2024-09-24 21:00:16', 'CLIENT', '/?rest_route=/', 'yes'),
(449, 'Cele Thadin', '', 'https://celethadin.com', '', 230, ' ', '2024-02-23 07:56:38', '2024-09-25 15:30:45', 'active', 'ERR_NETWORK', '2024-09-25 15:30:45', 'CLIENT', '/?rest_route=/', 'no'),
(450, 'Myanmar End User', 'Top Tech News, Tutorials &amp; Guides', 'https://myanmarenduser.com', 'https://myanmarenduser.com/wp-content/uploads/2023/01/cropped-favicon.png', 251, 'End user', '2024-02-23 07:56:38', '2024-09-04 06:38:35', 'active', 'ERR_NETWORK', '2024-09-04 06:38:35', 'CLIENT', '/?rest_route=/', 'no'),
(451, 'NewPosts', 'Tech And Advertising', 'https://www.newposts.xyz', '', 20, ' ', '2024-02-23 07:56:38', '2024-09-14 11:00:48', 'active', 'ERR_NETWORK', '2024-09-14 11:00:48', 'CLIENT', '/?rest_route=/', 'no'),
(452, 'exchange rates', 'exchange rates', 'https://achawlaymyar.com', 'https://banner2.cleanpng.com/20180324/rse/kisspng-computer-icons-united-states-dollar-dollar-sign-do-dollar-5ab6e7e0a640e4.668921391521936352681.jpg', 248, ' ', '2024-02-23 07:56:38', '2024-09-25 15:30:55', 'active', 'ERR_NETWORK', '2024-09-25 15:30:55', 'CLIENT', '/?rest_route=/', 'no'),
(453, 'Thutazone Blog', 'News', 'https://web.thutazone.org/articles', 'null', 20, ' ', '2024-02-23 07:56:38', '2024-02-25 14:43:32', 'disable', '', '2024-02-25 14:43:22', 'Hein Soe', '/?rest_route=/', 'no'),
(454, 'royalthazin', 'News &amp; Entertainment', 'https://royalthazin.net', 'https://royalthazin.net/wp-content/uploads/2019/03/cropped-179778126.jpg', 20, ' ', '2024-02-23 07:56:38', '2024-02-25 14:43:17', 'disable', 'ERR_NETWORK', '2024-02-25 14:42:53', 'Hein Soe', '/?rest_route=/', 'no'),
(455, 'DVB', 'Democratic Voice of Burma', 'https://english.dvb.no/', 'https://english.dvb.no/wp-content/uploads/2021/10/cropped-LOGO_LANSCAPE-1.png', 20, ' ', '2024-02-23 07:56:38', '2024-09-17 18:54:15', 'active', 'ERR_NETWORK', '2024-09-17 18:54:15', 'CLIENT', '/?rest_route=/', 'no'),
(456, 'စုံလင္သုတအိမ္ရွင္မ', 'eainshinma.com', 'https://eainshinma.com', 'https://i0.wp.com/eainshinma.com/wp-content/uploads/2020/02/cropped-20200215_125150.png?fit=512%2C512&ssl=1', 360, ' ', '2024-02-23 07:56:38', '2024-03-11 13:40:47', 'disable', 'ERR_NETWORK', '2024-03-11 13:40:47', 'Hein Soe', '/?rest_route=/', 'no'),
(457, 'PK Movies', 'the Myanmar movie collection', 'https://pk.pyaykyi.one', 'https://pk.pyaykyi.one/wp-content/uploads/2023/03/cropped-pyaykyi-logo-1.png', 100, 'မြန်မာ ဇတ်ကား', '2024-02-23 07:56:38', '2024-09-19 09:19:42', 'active', 'ERR_NETWORK', '2024-09-19 09:19:42', 'CLIENT', '/?rest_route=/', 'no'),
(458, 'Beginb ', 'Your Daily Dose of News & Entertainment', 'https://beginb.com/news', 'https://beginb.com/news/wp-content/uploads/2023/01/cropped-Beginb-logo.png', 20, ' ', '2024-02-23 07:56:38', '2024-02-25 13:23:16', 'disable', 'ERR_NETWORK', '2024-02-23 08:22:05', 'Hein Soe', '/?rest_route=/', 'no'),
(459, 'Cele Main News Link', 'Entertainment', 'https://news.mainnewslink.com', '', 20, ' ', '2024-02-23 07:56:38', '2024-09-25 23:52:49', 'disable', 'ERR_NETWORK', '2024-09-25 23:52:49', 'CLIENT', '/?rest_route=/', 'no'),
(460, 'Knowledgeworms', 'Upload Knowledge to your brain!', 'https://knowledgeworms.com', 'https://knowledgeworms.com/wp-content/uploads/2020/12/cropped-11.jpg', 20, ' ', '2024-02-23 07:56:38', '2024-08-22 11:31:57', 'disable', 'ERR_NETWORK', '2024-08-22 11:31:57', 'Hein Soe', '/?rest_route=/', 'no'),
(461, 'စုံလင္သုတအိမ္ရွင္မ', 'eainshinma.com', 'https://eainshinma.com', 'https://i0.wp.com/eainshinma.com/wp-content/uploads/2020/02/cropped-20200215_125150.png?fit=512%2C512&ssl=1', 20, ' ', '2024-02-23 07:56:38', '2024-03-11 13:40:47', 'disable', 'ERR_NETWORK', '2024-03-11 13:40:47', 'Hein Soe', '/?rest_route=/', 'no'),
(462, 'Bagan Thar', 'News', 'https://shwehealth.xyz', 'https://shwehealth.xyz/wp-content/uploads/2020/11/cropped-logo.png', 20, ' ', '2024-02-23 07:56:38', '2024-02-25 14:00:35', 'disable', 'ERR_NETWORK', '2024-02-25 14:00:35', 'Hein Soe', '/?rest_route=/', 'no'),
(463, 'Gutener Magazine', 'Heart of Magazine', 'https://sorpyitkaung.xyz', 'null', 20, ' ', '2024-02-23 07:56:38', '2024-02-25 14:00:20', 'disable', 'ERR_NETWORK', '2024-02-25 14:00:20', 'Hein Soe', '/?rest_route=/', 'no'),
(464, 'Arakan Bay News', 'News &amp; Media for Rakhine | Arakan | Arakha', 'https://arakanbaynews.com', 'https://i0.wp.com/arakanbaynews.com/wp-content/uploads/2022/09/cropped-arakanbaynewslogo3.transsmall.png?fit=512%2C512&ssl=1', 20, 'arakan', '2024-02-23 07:56:38', '2024-09-25 22:07:34', 'active', 'ERR_NETWORK', '2024-09-25 22:07:34', 'CLIENT', '/?rest_route=/', 'no'),
(465, 'The Arakan Express News ', 'Beyond Stories ', 'https://www.thearakanexpress.com', 'null', 223, 'arakan news', '2024-02-23 07:56:38', '2024-03-13 12:36:22', 'disable', 'HOST ERROR', '2024-03-13 12:35:56', 'Hein Soe', '/?rest_route=/', 'no'),
(466, 'News Zone', ' ', 'https://newszone.lovediary.icu', 'null', 20, 'null', '2024-02-23 07:56:38', '2024-03-13 12:37:31', 'disable', 'ERR_NETWORK', '2024-03-13 12:37:31', 'Hein Soe', '/?rest_route=/', 'no'),
(467, 'MyTech Myanmar', 'MyTech Myanmar က နည္းပညာ၊ စမတ္ဖုန္းေတြ၊ လွ်ပ္စစ္ပစၥည္းေတြ၊ ကားေတြအေၾကာင္း တင္ဆက္ေပးထားပါသည္။', 'https://mytechmyanmar.com', 'https://mytechmyanmar.com/wp-content/uploads/2017/02/cropped-favicon.png', 20, 'pc Tech', '2024-02-23 07:56:38', '2024-09-14 07:25:49', 'active', 'ERR_NETWORK', '2024-09-14 07:25:49', 'CLIENT', '/?rest_route=/', 'no'),
(468, 'Jav Cele', '', 'https://javcele.com', '', 223, 'adult', '2024-02-23 07:56:38', '2024-09-10 04:33:23', 'active', 'ERR_NETWORK', '2024-09-10 04:33:23', 'CLIENT', '/?rest_route=/', 'yes'),
(469, 'Arakan Music', 'á€›á€á€­á€¯á€„á€ºá€žá€á€¼á€„á€ºá€¸á€á€»á€…á€ºá€žá€°á€›á€­á€¯á€·á€¡á€á€½á€€á€º á€¡á€€á€±á€¬á€„á€ºá€¸á€†á€¯á€¶á€¸á€”á€®á€›á€¬.. Arakan Songs Listen and Download', 'https://www.arakanmusic.art', 'https://static.vecteezy.com/system/resources/thumbnails/008/653/792/small/music-man-gamer-line-pop-art-potrait-logo-colorful-design-with-dark-background-abstract-illustration-isolated-black-background-for-t-shirt-poster-clothing-merch-apparel-badge-design-vector.jpg', 200, 'Music', '2024-02-23 07:56:38', '2024-09-13 23:24:47', 'active', 'ERR_NETWORK', '2024-09-13 23:24:47', 'CLIENT', '/?rest_route=/', 'no'),
(470, 'My Blog', 'My WordPress Blog', 'https://shwetadin.com', '', 20, '', '2024-02-23 07:56:38', '2024-09-17 20:36:52', 'active', 'ERR_NETWORK', '2024-09-17 20:36:52', 'CLIENT', '/?rest_route=/', 'no'),
(471, 'My Blog', 'My WordPress Blog', 'https://yaungnee.xyz', '', 20, 'Adult', '2024-02-23 07:56:38', '2024-09-22 09:14:54', 'active', 'ERR_NETWORK', '2024-09-22 09:14:54', 'CLIENT', '/?rest_route=/', 'no'),
(472, 'SN', 'Myanmar', 'https://successnumber.xyz', 'https://successnumber.xyz/wp-content/uploads/2023/11/cropped-filename-removebg-preview.png', 20, 'Adult', '2024-02-23 07:56:38', '2024-03-13 12:34:16', 'disable', 'ERR_NETWORK', '2024-03-13 12:33:38', 'Hein Soe', '/?rest_route=/', 'no'),
(473, '2in1', 'Live', 'https://2in1news.xyz', 'https://2in1news.xyz/wp-content/uploads/2023/11/cropped-filename__21_-removebg-preview.png', 20, 'Adult', '2024-02-23 07:56:38', '2024-09-18 10:20:15', 'active', 'ERR_NETWORK', '2024-09-18 10:20:15', 'CLIENT', '/?rest_route=/', 'yes'),
(474, 'Boss Data', 'News', 'https://bossdatabase.xyz', 'https://bossdatabase.xyz/wp-content/uploads/2023/11/cropped-filename__34_-removebg-preview.png', 20, 'Adult', '2024-02-23 07:56:38', '2024-09-18 09:51:53', 'active', 'ERR_NETWORK', '2024-09-18 09:51:53', 'CLIENT', '/?rest_route=/', 'no'),
(475, 'My Blog', 'My WordPress Blog', 'https://yaungnee.xyz', '', 20, 'Adult', '2024-02-23 07:56:38', '2024-09-22 09:14:54', 'active', 'ERR_NETWORK', '2024-09-22 09:14:54', 'CLIENT', '/?rest_route=/', 'no'),
(476, '8 daily', 'book series', 'https://8daily.xyz', 'https://8daily.xyz/wp-content/uploads/2023/11/cropped-8daily.png', 20, 'Adult', '2024-02-23 07:56:38', '2024-09-14 09:57:39', 'active', 'ERR_NETWORK', '2024-09-14 09:57:39', 'CLIENT', '/?rest_route=/', 'yes'),
(477, 'HD Movie Collection', 'Best collection of Full HD Movie in One Place', 'https://hd.arthurpyay.com', '', 0, 'Adult', '2024-02-23 07:56:38', '2024-09-10 21:16:36', 'active', 'ERR_NETWORK', '2024-09-10 21:16:36', 'CLIENT', '/?rest_route=/', 'yes'),
(478, '365 Daily', 'News Magazine', 'https://365daily.xyz', 'https://365daily.xyz/wp-content/uploads/2023/11/cropped-filename__9_-removebg-preview.png', 20, 'Adult', '2024-02-23 07:56:38', '2024-08-07 06:13:37', 'active', 'ERR_NETWORK', '2024-08-07 06:13:37', 'CLIENT', '/?rest_route=/', 'no'),
(479, '110 Plus', 'News', 'https://110plus.xyz', '', 20, '', '2024-02-23 07:56:38', '2024-09-13 18:04:50', 'active', 'ERR_NETWORK', '2024-09-13 18:04:50', 'CLIENT', '/?rest_route=/', 'no'),
(480, 'HD Movie Collection', 'Best collection of Full HD Movie in One Place', 'https://hd.arthurpyay.com', '', 20, 'Adult', '2024-02-23 07:56:38', '2024-09-10 21:16:36', 'active', 'ERR_NETWORK', '2024-09-10 21:16:36', 'CLIENT', '/?rest_route=/', 'yes'),
(481, 'Gateway to the Best Collections', 'Gateway to Blue World', 'https://mm.arthurpyay.com', '', 20, 'Adult', '2024-02-23 07:56:38', '2024-09-25 20:30:15', 'active', 'ERR_NETWORK', '2024-09-25 20:30:15', 'CLIENT', '/?rest_route=/', 'yes'),
(482, 'Celebrity News and Knowledge', '', 'https://n.hlataw.xyz', '', 20, 'Adult', '2024-02-23 07:56:38', '2024-09-24 06:24:37', 'active', 'ERR_NETWORK', '2024-09-24 06:24:37', 'CLIENT', '/?rest_route=/', 'yes'),
(483, 'Trend ', 'myanmar', 'https://trendmyanmar.club', '', 20, 'Adult', '2024-02-23 07:56:38', '2024-07-26 16:12:01', 'active', '', '2024-07-11 14:56:24', 'CLIENT', '/?rest_route=/', 'yes'),
(484, 'Shwe Khit Online TV', 'News &amp; Entertainment', 'https://www.shwekhitonlinetv.com', 'https://i0.wp.com/www.shwekhitonlinetv.com/wp-content/uploads/2019/07/cropped-Untitled-design-31.png?fit=512%2C512&ssl=1', 200, 'shwe khit', '2024-02-23 07:56:38', '2024-09-25 03:23:20', 'active', 'ERR_NETWORK', '2024-09-25 03:23:20', 'CLIENT', '/?rest_route=/', 'no'),
(485, 'tanayar.com', 'á€â€‹á€”á€±á€›á€¬', 'https://tanayar.com', 'https://tanayar.com/wp-content/uploads/2024/03/Black-Grey-Minimalist-Real-Estate-Logo.png', 200, NULL, '2024-06-19 14:51:31', '2024-06-19 14:51:31', 'active', NULL, NULL, NULL, '/?rest_route=/', 'no'),
(486, 'Border News Agency', '', 'https://bordernewsagency.com/', 'https://bordernewsagency.com/wp-content/uploads/2024/07/cropped-BNA_site_icon-1.jpg', 200, NULL, '2024-07-26 15:43:45', '2024-09-21 05:08:51', 'active', 'ERR_NETWORK', '2024-09-21 05:08:51', 'CLIENT', '/?rest_route=/', 'no'),
(487, 'DigitalMarketing.com.mm', 'Digital Marketing Agency | Facebook Marketing | Messenger Marketing | Messenger Ecommerce | Web Development | SEO &amp; SEM', 'https://www.digitalmarketing.com.mm', 'https://www.digitalmarketing.com.mm/wp-content/uploads/2020/10/cropped-DM_logo_10_9_2020.png', 200, NULL, '2024-07-26 15:56:16', '2024-08-22 06:33:19', 'active', '', '2024-08-01 14:49:03', 'CLIENT', '/?rest_route=/', 'no'),
(488, 'Channel Myanmar', 'Quality Is Our Priority', 'https://www.channelmyanmar.to', NULL, 200, NULL, '2024-08-10 12:24:30', '2024-09-03 19:17:06', 'active', 'ERR_NETWORK', '2024-09-03 19:17:06', 'CLIENT', '/?rest_route=/', 'no'),
(489, 'YOYARLAY Digital Media and News', 'Breaking, Trending and Latest News about Myanmar, International, Lifestyle, Sport and Health', 'https://yoyarlay.com/', 'https://yoyarlay.com/wp-content/uploads/2019/02/cropped-yyl-icon.png', 200, NULL, '2024-08-15 10:20:31', '2024-08-15 10:21:46', 'active', '', NULL, NULL, '/?rest_route=/', 'no'),
(490, 'Thar Htoo-Be Unique', 'Thar Htoo-Be Unique ', 'https://tharhtoobeunique.com/', 'https://tharhtoobeunique.com/wp-content/uploads/2024/07/cropped-BU-Logo.jpg', 200, NULL, '2024-08-15 10:39:41', '2024-09-22 19:37:11', 'active', 'ERR_NETWORK', '2024-09-22 19:37:11', 'CLIENT', '/?rest_route=/', 'no'),
(491, 'YOYARLAY Digital Media and News', 'Breaking, Trending and Latest News about Myanmar, International, Lifestyle, Sport and Health', 'https://yoyarlay.com/', 'https://yoyarlay.com/wp-content/uploads/2019/02/cropped-yyl-icon.png', 200, NULL, '2024-08-15 10:59:08', '2024-08-15 10:59:08', 'active', NULL, NULL, NULL, '/?rest_route=/', 'no');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fb_page`
--
ALTER TABLE `fb_page`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `link`
--
ALTER TABLE `link`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `map_category_website`
--
ALTER TABLE `map_category_website`
  ADD PRIMARY KEY (`id`),
  ADD KEY `website_id` (`website_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `map_website_fb_page`
--
ALTER TABLE `map_website_fb_page`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visitor_record`
--
ALTER TABLE `visitor_record`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `website`
--
ALTER TABLE `website`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `fb_page`
--
ALTER TABLE `fb_page`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `link`
--
ALTER TABLE `link`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `map_category_website`
--
ALTER TABLE `map_category_website`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=191;

--
-- AUTO_INCREMENT for table `map_website_fb_page`
--
ALTER TABLE `map_website_fb_page`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key';

--
-- AUTO_INCREMENT for table `visitor_record`
--
ALTER TABLE `visitor_record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `website`
--
ALTER TABLE `website`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=492;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
