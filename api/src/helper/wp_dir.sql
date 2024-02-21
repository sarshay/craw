CREATE TABLE `website` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `url` text NOT NULL,
  `site_icon_url` text DEFAULT NULL,
  `color_hue` int(11) NOT NULL DEFAULT 996600,
  `keywords` text DEFAULT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `updated_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
CREATE TABLE `map_category_website` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `category_id` int(11) DEFAULT NULL,
  `website_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `website_id` (`website_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `map_category_website_ibfk_1` FOREIGN KEY (`website_id`) REFERENCES `website` (`id`) ON DELETE CASCADE,
  CONSTRAINT `map_category_website_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = latin1