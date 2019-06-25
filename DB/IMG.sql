/*
 Navicat MySQL Data Transfer

 Source Server         : IMG
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : 192.168.150.129:3306
 Source Schema         : IMG

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 25/06/2019 14:20:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for img_mian
-- ----------------------------
DROP TABLE IF EXISTS `img_mian`;
CREATE TABLE `img_mian`  (
  `idimg_id` bigint(255) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `serchcode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '唯一碼',
  `host` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '網址',
  `title` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '標題',
  `description` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '簡介',
  PRIMARY KEY (`idimg_id`) USING BTREE,
  UNIQUE INDEX `idimg_id_UNIQUE`(`idimg_id`) USING BTREE,
  UNIQUE INDEX `serchcode_UNIQUE`(`serchcode`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for img_path
-- ----------------------------
DROP TABLE IF EXISTS `img_path`;
CREATE TABLE `img_path`  (
  `img_path_id` bigint(255) NOT NULL AUTO_INCREMENT,
  `img_path_fk` bigint(255) NULL DEFAULT NULL,
  `img_path_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`img_path_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Procedure structure for del_img
-- ----------------------------
DROP PROCEDURE IF EXISTS `del_img`;
delimiter ;;
CREATE PROCEDURE `del_img`(in id_ int)
BEGIN
SET SQL_SAFE_UPDATES=0;
DELETE FROM img_path 
WHERE
    img_path_fk = id_;
SET SQL_SAFE_UPDATES=1;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
