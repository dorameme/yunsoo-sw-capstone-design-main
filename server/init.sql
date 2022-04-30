-- MySQL Script generated by MySQL Workbench
-- Wed Apr  6 18:07:24 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`User` ;

CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `id` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  `coin` INT NULL,
  `admin` TINYINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Novel`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Novel` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Novel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `User_id` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `genre` VARCHAR(45) NULL,
  `coverFileName` VARCHAR(45) NULL,
  `defaultPrice` INT NOT NULL,
  `rating` FLOAT NULL,
  PRIMARY KEY (`id`, `User_id`),
  UNIQUE INDEX `novelID_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_Novel_User1_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_Novel_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Chapter`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Chapter` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Chapter` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Novel_id` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `fileName` VARCHAR(45) NOT NULL,
  `comment` VARCHAR(100) NULL,
  `price` INT NULL,
  PRIMARY KEY (`id`, `Novel_id`),
  INDEX `fk_Chapter_Novel1_idx` (`Novel_id` ASC) VISIBLE,
  CONSTRAINT `fk_Chapter_Novel1`
    FOREIGN KEY (`Novel_id`)
    REFERENCES `mydb`.`Novel` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`OwnedContent`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`OwnedContent` ;

CREATE TABLE IF NOT EXISTS `mydb`.`OwnedContent` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `User_id` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `novelId` INT NOT NULL,
  `chapterId` INT NULL,
  `contentId` INT NULL,
  `own` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_OwnedContent_User1_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_OwnedContent_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`UserComment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`UserComment` ;

CREATE TABLE IF NOT EXISTS `mydb`.`UserComment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Chapter_id` INT NOT NULL,
  `Chapter_Novel_id` INT NOT NULL,
  `userId` VARCHAR(45) NOT NULL,
  `content` TEXT NOT NULL,
  `rating` FLOAT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_UserComment_Chapter1`
    FOREIGN KEY (`Chapter_id` , `Chapter_Novel_id`)
    REFERENCES `mydb`.`Chapter` (`id` , `Novel_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CriticComment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`CriticComment` ;

CREATE TABLE IF NOT EXISTS `mydb`.`CriticComment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Novel_id` INT NOT NULL,
  `Novel_User_id` VARCHAR(45) NOT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  `content` TEXT NOT NULL,
  `rating` FLOAT NULL,
  `likes` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_CriticComment_Novel1_idx` (`Novel_id` ASC, `Novel_User_id` ASC) VISIBLE,
  CONSTRAINT `fk_CriticComment_Novel1`
    FOREIGN KEY (`Novel_id` , `Novel_User_id`)
    REFERENCES `mydb`.`Novel` (`id` , `User_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Illust`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Illust` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Illust` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Chapter_id` INT NOT NULL,
  `Chapter_Novel_id` INT NOT NULL,
  `userId` VARCHAR(45) NOT NULL,
  `price` INT NULL,
  `fileName` VARCHAR(100) NOT NULL,
  `index` INT NOT NULL,
  `likes` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_Illust_Chapter1`
    FOREIGN KEY (`Chapter_id` , `Chapter_Novel_id`)
    REFERENCES `mydb`.`Chapter` (`id` , `Novel_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Music`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Music` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Music` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Chapter_id` INT NOT NULL,
  `Chapter_Novel_id` INT NOT NULL,
  `userId` VARCHAR(45) NOT NULL,
  `price` INT NULL,
  `fileName` VARCHAR(100) NOT NULL,
  `likes` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_Music_Chapter1`
    FOREIGN KEY (`Chapter_id` , `Chapter_Novel_id`)
    REFERENCES `mydb`.`Chapter` (`id` , `Novel_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Report`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Report` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Report` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `User_id` VARCHAR(45) NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `commentId` INT NULL,
  `content` TEXT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `time` DATETIME NULL,
  `solved` TINYINT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_Report_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`LikedContent`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`LikedContent` ;

CREATE TABLE IF NOT EXISTS `mydb`.`LikedContent` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `User_id` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `novelId` INT NOT NULL,
  `chapterId` INT NULL,
  `contentId` INT NULL,
  `like` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_LikedContent_User1_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_LikedContent_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;