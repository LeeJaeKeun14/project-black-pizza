-- 컨텐츠 정보 테이블
CREATE TABLE `BlackPizza`.`contents` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) UNIQUE NOT NULL,
    `origin_title` VARCHAR(255) UNIQUE,
    `open_year` INT NOT NULL,
    `score` INT NOT NULL,
    `runtime` TIME NOT NULL,
    `director` VARCHAR(80) NOT NULL,
    `synopsis` TEXT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

-- 컨텐츠마다 장르 정보 테이블
CREATE TABLE `BlackPizza`.`genre` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `contents_id` INT NOT NULL,
    `genre` VARCHAR(80) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`contents_id`) REFERENCES contents (`id`)
);

-- 컨텐츠마다 출연진 정보 테이블
CREATE TABLE `BlackPizza`.`actor` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `contents_id` INT NOT NULL,
    `actor` VARCHAR(80) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`contents_id`) REFERENCES contents (`id`)
);

-- 컨텐츠마다 스트리밍+가격 정보 테이블
CREATE TABLE `BlackPizza`.`streaming` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `contents_id` INT NOT NULL,
    `ott` VARCHAR(80) NOT NULL,
    `price` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`contents_id`) REFERENCES contents (`id`)
);

-- 컨텐츠마다 구매가능ott+가격 정보 테이블
CREATE TABLE `BlackPizza`.`buy` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `contents_id` INT NOT NULL,
    `ott` VARCHAR(80) NOT NULL,
    `price` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`contents_id`) REFERENCES contents (`id`)
);

-- 컨텐츠마다 대여가능ott+가격 정보 테이블
CREATE TABLE `BlackPizza`.`rent` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `contents_id` INT NOT NULL,
    `ott` VARCHAR(80) NOT NULL,
    `price` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`contents_id`) REFERENCES contents (`id`)
);