CREATE DATABASE votacao;

USE votacao;

CREATE TABLE IF NOT EXISTS `votacao`.`Enquete` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(255) NULL,
  `inicio` DATE NULL,
  `fim` DATE NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `votacao`.`Resposta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(255) NULL,
  `votos` INT NULL,
  `Enquete_id` INT NOT NULL,
  PRIMARY KEY (`id`)
);
