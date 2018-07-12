CREATE TABLE IF NOT EXISTS `__PREFIX__content_items` (
  `itemRowID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `itemID` int(10) unsigned NOT NULL DEFAULT '0',
  `regionID` int(10) unsigned NOT NULL DEFAULT '0',
  `pageID` int(10) unsigned NOT NULL DEFAULT '0',
  `itemRev` int(10) unsigned NOT NULL DEFAULT '0',
  `itemOrder` int(10) unsigned NOT NULL DEFAULT '1000',
  `itemJSON` mediumtext NOT NULL,
  `itemSearch` mediumtext NOT NULL,
  `itemUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `itemUpdatedBy` char(32) NOT NULL DEFAULT '',
  PRIMARY KEY (`itemRowID`),
  KEY `idx_item` (`itemID`),
  KEY `idx_rev` (`itemRev`),
  KEY `idx_region` (`regionID`),
  KEY `idx_regrev` (`itemID`,`regionID`,`itemRev`),
  KEY `idx_order` (`itemOrder`),
  FULLTEXT KEY `idx_search` (`itemSearch`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__content_regions` (
  `regionID` int(10) NOT NULL AUTO_INCREMENT,
  `pageID` int(10) unsigned NOT NULL,
  `regionKey` varchar(255) NOT NULL DEFAULT '',
  `regionPage` varchar(255) NOT NULL DEFAULT '',
  `regionHTML` longtext NOT NULL,
  `regionNew` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `regionOrder` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `regionTemplate` varchar(255) NOT NULL DEFAULT '',
  `regionMultiple` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `regionOptions` text NOT NULL,
  `regionSearchable` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `regionRev` int(10) unsigned NOT NULL DEFAULT '0',
  `regionLatestRev` int(10) unsigned NOT NULL DEFAULT '0',
  `regionEditRoles` varchar(255) NOT NULL DEFAULT '*',
  `regionPublishRoles` varchar(255) NOT NULL DEFAULT '*',
  `regionUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`regionID`),
  KEY `idx_key` (`regionKey`),
  KEY `idx_path` (`regionPage`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__content_index` (
  `indexID` int(10) NOT NULL AUTO_INCREMENT,
  `itemID` int(10) NOT NULL DEFAULT '0',
  `regionID` int(10) NOT NULL DEFAULT '0',
  `pageID` int(10) NOT NULL DEFAULT '0',
  `itemRev` int(10) NOT NULL DEFAULT '0',
  `indexKey` char(64) NOT NULL DEFAULT '-',
  `indexValue` char(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`indexID`),
  KEY `idx_key` (`indexKey`),
  KEY `idx_val` (`indexValue`),
  KEY `idx_rev` (`itemRev`),
  KEY `idx_item` (`itemID`),
  KEY `idx_keyval` (`indexKey`,`indexValue`),
  KEY `idx_regrev` (`regionID`,`itemRev`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__resources` (
  `resourceID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `resourceApp` char(32) NOT NULL DEFAULT 'content',
  `resourceBucket` char(16) NOT NULL DEFAULT 'default',
  `resourceFile` char(255) NOT NULL DEFAULT '',
  `resourceKey` enum('orig','thumb') DEFAULT NULL,
  `resourceParentID` int(10) NOT NULL DEFAULT '0',
  `resourceType` char(4) NOT NULL DEFAULT '',
  `resourceCreated` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `resourceUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `resourceAWOL` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `resourceTitle` char(255) DEFAULT NULL,
  `resourceFileSize` int(10) unsigned DEFAULT NULL,
  `resourceWidth` int(10) unsigned DEFAULT NULL,
  `resourceHeight` int(10) unsigned DEFAULT NULL,
  `resourceCrop` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `resourceDensity` float NOT NULL DEFAULT '1',
  `resourceTargetWidth` int(10) unsigned DEFAULT NULL,
  `resourceTargetHeight` int(10) unsigned DEFAULT NULL,
  `resourceMimeType` char(64) DEFAULT NULL,
  `resourceInLibrary` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`resourceID`),
  UNIQUE KEY `idx_file` (`resourceBucket`,`resourceFile`),
  KEY `idx_app` (`resourceApp`),
  KEY `idx_key` (`resourceKey`),
  KEY `idx_type` (`resourceType`),
  KEY `idx_awol` (`resourceAWOL`),
  KEY `idx_library` (`resourceInLibrary`),
  FULLTEXT KEY `idx_search` (`resourceTitle`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__resource_tags` (
  `tagID` int(10) NOT NULL AUTO_INCREMENT,
  `tagTitle` varchar(255) NOT NULL DEFAULT '',
  `tagSlug` varchar(255) NOT NULL DEFAULT '',
  `tagCount` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`tagID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

CREATE TABLE IF NOT EXISTS `__PREFIX__resources_to_tags` (
  `resourceID` int(10) NOT NULL DEFAULT '0',
  `tagID` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`resourceID`,`tagID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

CREATE TABLE IF NOT EXISTS `__PREFIX__resource_log` (
  `logID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `appID` char(32) NOT NULL DEFAULT 'content',
  `itemFK` char(32) NOT NULL DEFAULT 'itemRowID',
  `itemRowID` int(10) unsigned NOT NULL DEFAULT '0',
  `resourceID` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`logID`),
  KEY `idx_resource` (`resourceID`),
  KEY `idx_fk` (`itemFK`,`itemRowID`),
  UNIQUE KEY `idx_uni` (`appID`,`itemFK`,`itemRowID`,`resourceID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__page_templates` (
  `templateID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `templateTitle` varchar(255) NOT NULL DEFAULT '',
  `templatePath` varchar(255) NOT NULL DEFAULT '',
  `optionsPageID` int(10) unsigned NOT NULL DEFAULT '0',
  `templateReference` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `templateNavGroups` varchar(255) DEFAULT '',
  PRIMARY KEY (`templateID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__pages` (
  `pageID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pageParentID` int(10) unsigned NOT NULL DEFAULT '0',
  `pagePath` varchar(255) NOT NULL DEFAULT '',
  `pageTitle` varchar(255) NOT NULL DEFAULT '',
  `pageNavText` varchar(255) NOT NULL DEFAULT '',
  `pageNew` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `pageOrder` int(10) unsigned NOT NULL DEFAULT '1',
  `pageDepth` tinyint(10) unsigned NOT NULL DEFAULT '0',
  `pageSortPath` varchar(255) NOT NULL DEFAULT '',
  `pageTreePosition` varchar(64) NOT NULL DEFAULT '',
  `pageSubpageRoles` varchar(255) NOT NULL DEFAULT '',
  `pageSubpagePath` varchar(255) NOT NULL DEFAULT '',
  `pageHidden` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `pageNavOnly` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `pageAccessTags` varchar(255) NOT NULL DEFAULT '',
  `pageCreatorID` int(10) unsigned NOT NULL DEFAULT '0',
  `pageModified` datetime NOT NULL DEFAULT '2014-01-01 00:00:00',
  `pageAttributes` text NOT NULL,
  `pageAttributeTemplate` varchar(255) NOT NULL DEFAULT 'default.html',
  `pageTemplate` char(255) NOT NULL DEFAULT '',
  `templateID` int(10) unsigned NOT NULL DEFAULT '0',
  `pageSubpageTemplates` varchar(255) NOT NULL DEFAULT '',
  `pageCollections` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`pageID`),
  KEY `idx_parent` (`pageParentID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__settings` (
  `settingID` varchar(60) NOT NULL DEFAULT '',
  `userID` int(10) unsigned NOT NULL DEFAULT '0',
  `settingValue` text NOT NULL,
  PRIMARY KEY (`settingID`,`userID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `__PREFIX__settings` (`settingID`, `userID`, `settingValue`)
VALUES
	('headerColour',0,'#ffffff'),
	('content_singlePageEdit',0,'1'),
	('helpURL',0,''),
	('siteURL',0,'/'),
	('hideBranding',0,'0'),
	('content_collapseList',0,'1'),
  ('lang',0,'en-gb'),
	('installedAt',0,'__PERCH_VERSION__'),
  ('update___PERCH_VERSION__',0,'done');

CREATE TABLE IF NOT EXISTS `__PREFIX__user_privileges` (
  `privID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `privKey` varchar(255) NOT NULL DEFAULT '',
  `privTitle` varchar(255) NOT NULL DEFAULT '',
  `privOrder` int(10) unsigned NOT NULL DEFAULT '99',
  PRIMARY KEY (`privID`),
  UNIQUE KEY `idx_key` (`privKey`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `__PREFIX__user_privileges` (`privID`, `privKey`, `privTitle`, `privOrder`)
VALUES
	(1,'perch.login','Log in',1),
	(2,'perch.settings','Change settings',2),
	(3,'perch.users.manage','Manage users',3),
	(4,'perch.updatenotices','View update notices',4),
	(5,'content.regions.delete','Delete regions',1),
	(6,'content.regions.options','Edit region options',2),
	(7,'content.pages.edit','Edit page details',1),
	(8,'content.pages.reorder','Reorder pages',2),
	(9,'content.pages.create','Add new pages',3),
	(10,'content.pages.configure','Configure page settings',5),
  (11,'content.pages.delete','Delete pages',4),
  (12,'content.templates.delete','Delete master pages',6),
  (13,'content.navgroups.configure','Configure navigation groups',7),
  (14,'content.navgroups.create','Create navigation groups',8),
  (15,'content.navgroups.delete','Delete navigation groups',9),
  (16,'content.pages.create.toplevel','Add new top-level pages',3),
	(17,'content.pages.delete.own','Delete pages they created themselves',4),
  (18,'content.templates.configure','Configure master pages',6),
  (19,'content.pages.attributes','Edit page titles and attributes',6),
  (20,'categories.create','Create new categories',1),
  (21,'categories.delete','Delete categories',2),
  (22,'categories.manage','Manage categories',3),
  (23,'categories.sets.create','Create category sets',4),
  (24,'categories.sets.delete','Delete category sets',5),
  (25,'assets.create','Upload assets',1),
  (26,'assets.manage','Manage assets',2),
  (27,'assets.delete','Delete assets',3);

CREATE TABLE IF NOT EXISTS `__PREFIX__user_role_privileges` (
  `roleID` int(10) unsigned NOT NULL,
  `privID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`roleID`,`privID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `__PREFIX__user_role_privileges` (`roleID`, `privID`)
VALUES
	(1,1),
	(2,1);

CREATE TABLE IF NOT EXISTS `__PREFIX__user_roles` (
  `roleID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `roleTitle` varchar(255) NOT NULL DEFAULT '',
  `roleSlug` varchar(255) NOT NULL DEFAULT '',
  `roleMasterAdmin` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`roleID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `__PREFIX__user_roles` (`roleID`, `roleTitle`, `roleSlug`, `roleMasterAdmin`)
VALUES
	(1,'Editor','editor',0),
	(2,'Admin','admin',1);

CREATE TABLE IF NOT EXISTS `__PREFIX__users` (
  `userID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userUsername` varchar(255) NOT NULL DEFAULT '',
  `userPassword` varchar(255) NOT NULL DEFAULT '',
  `userCreated` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `userUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userLastLogin` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `userGivenName` varchar(255) NOT NULL DEFAULT '',
  `userFamilyName` varchar(255) NOT NULL DEFAULT '',
  `userEmail` varchar(255) NOT NULL DEFAULT '',
  `userEnabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `userHash` char(32) NOT NULL DEFAULT '',
  `roleID` int(10) unsigned NOT NULL DEFAULT '1',
  `userMasterAdmin` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `userPasswordToken` char(255) NOT NULL DEFAULT 'expired',
  `userPasswordTokenExpires` datetime NOT NULL DEFAULT '2015-01-01 00:00:00',
  `userLastFailedLogin` datetime DEFAULT NULL,
  `userFailedLoginAttempts` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`userID`),
  KEY `idx_enabled` (`userEnabled`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__user_passwords` (
  `passwordID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userID` int(10) unsigned NOT NULL,
  `userPassword` varchar(255) NOT NULL DEFAULT '',
  `passwordLastUsed` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  PRIMARY KEY (`passwordID`),
  KEY `idx_user` (`userID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__navigation` (
  `groupID` int(10) NOT NULL AUTO_INCREMENT,
  `groupTitle` varchar(255) NOT NULL DEFAULT '',
  `groupSlug` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`groupID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__navigation_pages` (
  `navpageID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pageID` int(10) unsigned NOT NULL DEFAULT '0',
  `groupID` int(10) unsigned NOT NULL DEFAULT '0',
  `pageParentID` int(10) unsigned NOT NULL DEFAULT '0',
  `pageOrder` int(10) unsigned NOT NULL DEFAULT '1',
  `pageDepth` tinyint(10) unsigned NOT NULL,
  `pageTreePosition` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`navpageID`),
  KEY `idx_group` (`groupID`),
  KEY `idx_page_group` (`pageID`,`groupID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__categories` (
  `catID` int(10) NOT NULL AUTO_INCREMENT,
  `setID` int(10) unsigned NOT NULL,
  `catParentID` int(10) unsigned NOT NULL DEFAULT '0',
  `catTitle` char(64) NOT NULL DEFAULT '',
  `catSlug` char(64) NOT NULL DEFAULT '',
  `catPath` char(255) NOT NULL DEFAULT '',
  `catDisplayPath` char(255) NOT NULL DEFAULT '',
  `catOrder` int(10) unsigned NOT NULL DEFAULT '0',
  `catTreePosition` char(255) NOT NULL DEFAULT '000',
  `catDynamicFields` text NOT NULL,
  PRIMARY KEY (`catID`),
  KEY `idx_set` (`setID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__category_counts` (
  `countID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `catID` int(10) unsigned NOT NULL,
  `countType` char(64) NOT NULL DEFAULT '',
  `countValue` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`countID`),
  KEY `idx_cat` (`catID`),
  KEY `idx_cat_type` (`countType`,`catID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__category_sets` (
  `setID` int(10) NOT NULL AUTO_INCREMENT,
  `setTitle` char(64) NOT NULL DEFAULT '',
  `setSlug` char(64) NOT NULL DEFAULT '',
  `setTemplate` char(255) NOT NULL DEFAULT 'set.html',
  `setCatTemplate` char(255) NOT NULL DEFAULT 'category.html',
  `setDynamicFields` text,
  PRIMARY KEY (`setID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__menu_items` (
  `itemID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parentID` int(10) unsigned NOT NULL DEFAULT '0',
  `itemType` enum('menu','app','link') NOT NULL DEFAULT 'app',
  `itemOrder` int(10) unsigned NOT NULL DEFAULT '1',
  `itemTitle` char(64) NOT NULL DEFAULT 'Unnamed item',
  `itemValue` char(255) DEFAULT NULL,
  `itemPersists` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `itemActive` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `privID` int(10) DEFAULT NULL,
  `userID` int(10) unsigned NOT NULL DEFAULT '0',
  `itemInternal` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`itemID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `__PREFIX__menu_items` (`itemID`, `parentID`, `itemType`, `itemOrder`, `itemTitle`, `itemValue`, `itemPersists`, `itemActive`, `privID`, `userID`, `itemInternal`)
VALUES
  (1,0,'menu',1,'My Site',NULL,1,1,NULL,0,0),
  (2,0,'menu',2,'Organise',NULL,1,1,NULL,0,0),
  (3,1,'app',1,'Pages','content',0,1,NULL,0,0),
  (4,2,'app',1,'Categories','categories',0,1,22,0,0),
  (5,2,'app',2,'Assets','assets',0,1,NULL,0,0),
  (7,0,'app',1,'Settings','settings',1,0,NULL,0,1),
  (8,0,'app',1,'Users','users',1,0,NULL,0,1),
  (9,0,'app',1,'Help','help',1,0,NULL,0,1);