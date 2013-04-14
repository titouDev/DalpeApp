/*
 Navicat Premium Data Transfer

 Source Server         : MAMP LOCAL
 Source Server Type    : MySQL
 Source Server Version : 50529
 Source Host           : localhost
 Source Database       : dalpe_construction

 Target Server Type    : MySQL
 Target Server Version : 50529
 File Encoding         : utf-8

 Date: 04/14/2013 17:39:53 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `categorie_materiaux`
-- ----------------------------
DROP TABLE IF EXISTS `categorie_materiaux`;
CREATE TABLE `categorie_materiaux` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `chantiers`
-- ----------------------------
DROP TABLE IF EXISTS `chantiers`;
CREATE TABLE `chantiers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `clientId` int(11) NOT NULL,
  `note` longtext NOT NULL,
  `status` enum('Devis','Encours','Termine','') NOT NULL,
  `creationDate` date NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `lastUpdate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `clientId` (`clientId`),
  CONSTRAINT `chantierLinkClient` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `chantiers_link_documents`
-- ----------------------------
DROP TABLE IF EXISTS `chantiers_link_documents`;
CREATE TABLE `chantiers_link_documents` (
  `chantierId` int(11) NOT NULL,
  `documentId` int(11) NOT NULL,
  PRIMARY KEY (`chantierId`,`documentId`),
  KEY `documentId` (`documentId`),
  CONSTRAINT `chantiers_link_documents_chantier` FOREIGN KEY (`chantierId`) REFERENCES `chantiers` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `chantiers_link_documents_ibfk_2` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `clients`
-- ----------------------------
DROP TABLE IF EXISTS `clients`;
CREATE TABLE `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prenom` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `nom` varchar(255) COLLATE utf8_bin NOT NULL,
  `phone` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `cell` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `fax` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `adresse` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `codePostal` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `mail` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `ville` varchar(255) COLLATE utf8_bin NOT NULL,
  `province` varchar(255) COLLATE utf8_bin NOT NULL,
  `actif` tinyint(4) NOT NULL DEFAULT '1',
  `note` longtext COLLATE utf8_bin NOT NULL,
  `lastUpdate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clientUnique` (`prenom`,`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `document_type`
-- ----------------------------
DROP TABLE IF EXISTS `document_type`;
CREATE TABLE `document_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `documents`
-- ----------------------------
DROP TABLE IF EXISTS `documents`;
CREATE TABLE `documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `path` longtext NOT NULL,
  `type` int(11) NOT NULL,
  `size` int(11) NOT NULL,
  `extension` varchar(255) NOT NULL,
  `note` varchar(255) NOT NULL,
  `creationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `type` (`type`),
  CONSTRAINT `fkDocumentType` FOREIGN KEY (`type`) REFERENCES `document_type` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `employes`
-- ----------------------------
DROP TABLE IF EXISTS `employes`;
CREATE TABLE `employes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prenom` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `cell` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `codePostal` varchar(255) NOT NULL,
  `ville` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `admin` tinyint(4) NOT NULL DEFAULT '0',
  `login` varchar(255) NOT NULL,
  `actif` tinyint(4) NOT NULL,
  `coutHoraire` float DEFAULT NULL,
  `lastUpdate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `photo` longtext,
  `photoSize` float DEFAULT NULL,
  `photoExtension` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employeUnique` (`prenom`,`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `employes_hours`
-- ----------------------------
DROP TABLE IF EXISTS `employes_hours`;
CREATE TABLE `employes_hours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employeId` int(11) NOT NULL,
  `workDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hours` float(11,2) DEFAULT NULL,
  `chantierId` int(11) DEFAULT NULL,
  `checked` tinyint(4) NOT NULL DEFAULT '0',
  `coutHoraire` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_empHours_employes` (`employeId`),
  KEY `chantierId` (`chantierId`),
  CONSTRAINT `fk_empHours_chantier` FOREIGN KEY (`chantierId`) REFERENCES `chantiers` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_empHours_employes` FOREIGN KEY (`employeId`) REFERENCES `employes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `mails`
-- ----------------------------
DROP TABLE IF EXISTS `mails`;
CREATE TABLE `mails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` text CHARACTER SET latin1 NOT NULL,
  `creationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `subject` text CHARACTER SET latin1 NOT NULL,
  `userCreateId` int(11) DEFAULT NULL,
  `chantierId` int(11) DEFAULT NULL,
  `sentDate` timestamp NULL DEFAULT NULL,
  `sent` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `chantierId` (`chantierId`),
  KEY `userCreateId` (`userCreateId`),
  CONSTRAINT `fkMailsChantier` FOREIGN KEY (`chantierId`) REFERENCES `chantiers` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fkMailsEmployes` FOREIGN KEY (`userCreateId`) REFERENCES `employes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=214 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `mails_link_documents`
-- ----------------------------
DROP TABLE IF EXISTS `mails_link_documents`;
CREATE TABLE `mails_link_documents` (
  `mailId` int(11) NOT NULL,
  `documentId` int(11) NOT NULL,
  PRIMARY KEY (`mailId`,`documentId`),
  KEY `documentId` (`documentId`),
  CONSTRAINT `mailDoculink_Docu` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `mailDoculink_Mail` FOREIGN KEY (`mailId`) REFERENCES `mails` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `materiaux`
-- ----------------------------
DROP TABLE IF EXISTS `materiaux`;
CREATE TABLE `materiaux` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `materiaux_link_categorie_materiaux`
-- ----------------------------
DROP TABLE IF EXISTS `materiaux_link_categorie_materiaux`;
CREATE TABLE `materiaux_link_categorie_materiaux` (
  `materiauxId` int(11) NOT NULL,
  `caegorieId` int(11) NOT NULL,
  PRIMARY KEY (`materiauxId`,`caegorieId`),
  KEY `caegorieId` (`caegorieId`),
  CONSTRAINT `materiaux_link_categorie_materiaux_ibfk_1` FOREIGN KEY (`materiauxId`) REFERENCES `materiaux` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `materiaux_link_categorie_materiaux_ibfk_2` FOREIGN KEY (`caegorieId`) REFERENCES `categorie_materiaux` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `soustraitants`
-- ----------------------------
DROP TABLE IF EXISTS `soustraitants`;
CREATE TABLE `soustraitants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `contactName` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `phone` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `cell` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `fax` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `adresse` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `codePostal` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `mail` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `siteWeb` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `licenseRbq` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `tps` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `ville` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `province` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `actif` tinyint(4) NOT NULL DEFAULT '1',
  `note` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `lastUpdate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sousTraitantNameUnique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4447 DEFAULT CHARSET=latin1 COLLATE=latin1_bin ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `soustraitants_link_documents`
-- ----------------------------
DROP TABLE IF EXISTS `soustraitants_link_documents`;
CREATE TABLE `soustraitants_link_documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sousTraitantId` int(11) NOT NULL,
  `documentId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `documentId` (`documentId`),
  KEY `sousTraitantId` (`sousTraitantId`),
  CONSTRAINT `fkDocument_sousTrait` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fkSousTriatntd_docu` FOREIGN KEY (`sousTraitantId`) REFERENCES `soustraitants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `soustraitants_link_mails`
-- ----------------------------
DROP TABLE IF EXISTS `soustraitants_link_mails`;
CREATE TABLE `soustraitants_link_mails` (
  `sousTraitantId` int(11) NOT NULL,
  `mailId` int(11) NOT NULL,
  `sentDate` datetime DEFAULT NULL,
  PRIMARY KEY (`sousTraitantId`,`mailId`),
  KEY `mailId` (`mailId`),
  CONSTRAINT `fkMailIdSousTraitantMail` FOREIGN KEY (`mailId`) REFERENCES `mails` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fkSousTraitantsIdMail` FOREIGN KEY (`sousTraitantId`) REFERENCES `soustraitants` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `soustraitants_link_specialites`
-- ----------------------------
DROP TABLE IF EXISTS `soustraitants_link_specialites`;
CREATE TABLE `soustraitants_link_specialites` (
  `specialiteId` int(11) NOT NULL,
  `sousTraitantId` int(11) NOT NULL,
  PRIMARY KEY (`specialiteId`,`sousTraitantId`),
  KEY `fk_ssTraitants` (`sousTraitantId`),
  CONSTRAINT `fk_linkSousTraitantSpec_spec` FOREIGN KEY (`specialiteId`) REFERENCES `specialites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_linkSousTraitantSpec_ssTraitants` FOREIGN KEY (`sousTraitantId`) REFERENCES `soustraitants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `soustraitants_notes`
-- ----------------------------
DROP TABLE IF EXISTS `soustraitants_notes`;
CREATE TABLE `soustraitants_notes` (
  `id` int(11) NOT NULL,
  `sousTraitantId` int(11) NOT NULL,
  `note` longtext NOT NULL,
  `employeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sousTraitantId` (`sousTraitantId`),
  KEY `employeId` (`employeId`),
  KEY `employeId_2` (`employeId`),
  CONSTRAINT `fk_notesSousTraitant` FOREIGN KEY (`sousTraitantId`) REFERENCES `soustraitants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_notesSousTraitant_employe` FOREIGN KEY (`employeId`) REFERENCES `employes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `specialites`
-- ----------------------------
DROP TABLE IF EXISTS `specialites`;
CREATE TABLE `specialites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=258 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT;

SET FOREIGN_KEY_CHECKS = 1;
