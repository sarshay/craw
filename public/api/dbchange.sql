CREATE TABLE link(
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    title VARCHAR(255),
    description TEXT,
    imageUrl TEXT,
    trueUrl TEXT,
    create_time DATETIME COMMENT 'Create Time'
) COMMENT '';
-- Active: 1701964744593@@127.0.0.1@3306@wp_dir
CREATE TABLE visitor_record(
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    targetId Int,
    userId TEXT,
    isNewUser VARCHAR(5),
    linkId Int,
    ip VARCHAR(100),
    screenResolution VARCHAR(100),
    fullUrl TEXT,
    timezone VARCHAR(100),
    create_time DATETIME  DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time'
) COMMENT '';
