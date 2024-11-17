/*
  Warnings:

  - You are about to drop the `content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contenttype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `field` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fieldtype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mapcontenttaxonomy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mapcontenttypetaxonomytype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `taxonomy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `taxonomytype` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `Content_ibfk_1`;

-- DropForeignKey
ALTER TABLE `field` DROP FOREIGN KEY `Field_ibfk_1`;

-- DropForeignKey
ALTER TABLE `fieldtype` DROP FOREIGN KEY `FieldType_ibfk_1`;

-- DropForeignKey
ALTER TABLE `mapcontenttaxonomy` DROP FOREIGN KEY `map_Content_Taxonomy_ibfk_1`;

-- DropForeignKey
ALTER TABLE `mapcontenttaxonomy` DROP FOREIGN KEY `map_Content_Taxonomy_ibfk_2`;

-- DropForeignKey
ALTER TABLE `mapcontenttypetaxonomytype` DROP FOREIGN KEY `map_ContentType_TaxonomyType_ibfk_1`;

-- DropForeignKey
ALTER TABLE `mapcontenttypetaxonomytype` DROP FOREIGN KEY `map_ContentType_TaxonomyType_ibfk_2`;

-- DropForeignKey
ALTER TABLE `taxonomy` DROP FOREIGN KEY `Taxonomy_ibfk_1`;

-- DropTable
DROP TABLE `content`;

-- DropTable
DROP TABLE `contenttype`;

-- DropTable
DROP TABLE `field`;

-- DropTable
DROP TABLE `fieldtype`;

-- DropTable
DROP TABLE `mapcontenttaxonomy`;

-- DropTable
DROP TABLE `mapcontenttypetaxonomytype`;

-- DropTable
DROP TABLE `taxonomy`;

-- DropTable
DROP TABLE `taxonomytype`;

-- CreateTable
CREATE TABLE `Experance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position` VARCHAR(200) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `organization` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdDt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `imageId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position` VARCHAR(200) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `organization` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdDt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `imageId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `body` TEXT NOT NULL,
    `imageId` INTEGER NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdDt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `caption` VARCHAR(191) NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `createdDt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mapCategoryExperance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ExperanceId` INTEGER NOT NULL,
    `CategoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mapCategoryProject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ProjectId` INTEGER NOT NULL,
    `CategoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mapCategoryNote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `NoteId` INTEGER NOT NULL,
    `CategoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mapTagsExperance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ExperanceId` INTEGER NOT NULL,
    `TagsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mapTagsProject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ProjectId` INTEGER NOT NULL,
    `TagsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mapTagsNote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `NoteId` INTEGER NOT NULL,
    `TagsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Experance` ADD CONSTRAINT `Experance_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapCategoryExperance` ADD CONSTRAINT `mapCategoryExperance_ExperanceId_fkey` FOREIGN KEY (`ExperanceId`) REFERENCES `Experance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapCategoryExperance` ADD CONSTRAINT `mapCategoryExperance_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapCategoryProject` ADD CONSTRAINT `mapCategoryProject_ProjectId_fkey` FOREIGN KEY (`ProjectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapCategoryProject` ADD CONSTRAINT `mapCategoryProject_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapCategoryNote` ADD CONSTRAINT `mapCategoryNote_NoteId_fkey` FOREIGN KEY (`NoteId`) REFERENCES `Note`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapCategoryNote` ADD CONSTRAINT `mapCategoryNote_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapTagsExperance` ADD CONSTRAINT `mapTagsExperance_ExperanceId_fkey` FOREIGN KEY (`ExperanceId`) REFERENCES `Experance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapTagsExperance` ADD CONSTRAINT `mapTagsExperance_TagsId_fkey` FOREIGN KEY (`TagsId`) REFERENCES `Tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapTagsProject` ADD CONSTRAINT `mapTagsProject_ProjectId_fkey` FOREIGN KEY (`ProjectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapTagsProject` ADD CONSTRAINT `mapTagsProject_TagsId_fkey` FOREIGN KEY (`TagsId`) REFERENCES `Tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapTagsNote` ADD CONSTRAINT `mapTagsNote_NoteId_fkey` FOREIGN KEY (`NoteId`) REFERENCES `Note`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapTagsNote` ADD CONSTRAINT `mapTagsNote_TagsId_fkey` FOREIGN KEY (`TagsId`) REFERENCES `Tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
