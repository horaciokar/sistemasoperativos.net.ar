-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS `cuestionario`;
USE `cuestionario`;

-- Crear la tabla "Encuestas"
CREATE TABLE IF NOT EXISTS `Encuestas` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `titulo` VARCHAR(255) NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  `fecha_creacion` DATE NOT NULL
);

-- Crear la tabla "Preguntas"
CREATE TABLE IF NOT EXISTS `Preguntas` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `encuesta_id` INT UNSIGNED NOT NULL,
  `texto` VARCHAR(255) NOT NULL,
  CONSTRAINT `fk_preguntas_encuestas` FOREIGN KEY (`encuesta_id`)
    REFERENCES `Encuestas` (`id`) ON DELETE CASCADE
);

-- Crear la tabla "Opciones"
CREATE TABLE IF NOT EXISTS `Opciones` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `pregunta_id` INT UNSIGNED NOT NULL,
  `texto` VARCHAR(255) NOT NULL,
  CONSTRAINT `fk_opciones_preguntas` FOREIGN KEY (`pregunta_id`)
    REFERENCES `Preguntas` (`id`) ON DELETE CASCADE
);

-- Crear la tabla "Respuestas"
CREATE TABLE IF NOT EXISTS `Respuestas` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `encuesta_id` INT UNSIGNED NOT NULL,
  `pregunta_id` INT UNSIGNED NOT NULL,
  `opcion_id` INT UNSIGNED NOT NULL,
  `nombre_usuario` VARCHAR(255) NOT NULL,
  CONSTRAINT `fk_respuestas_encuestas` FOREIGN KEY (`encuesta_id`)
    REFERENCES `Encuestas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_respuestas_preguntas` FOREIGN KEY (`pregunta_id`)
    REFERENCES `Preguntas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_respuestas_opciones` FOREIGN KEY (`opcion_id`)
    REFERENCES `Opciones` (`id`) ON DELETE CASCADE
);
