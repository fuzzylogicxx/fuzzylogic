
CREATE TABLE IF NOT EXISTS `__PREFIX__collections` (
  `collectionID` int(10) NOT NULL AUTO_INCREMENT,
  `collectionKey` char(64) NOT NULL DEFAULT '',
  `collectionOrder` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `collectionTemplate` char(255) NOT NULL DEFAULT '',
  `collectionOptions` text NOT NULL,
  `collectionSearchable` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `collectionEditRoles` char(255) NOT NULL DEFAULT '*',
  `collectionPublishRoles` char(255) NOT NULL DEFAULT '*',
  `collectionUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `collectionInAppMenu` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`collectionID`),
  KEY `idx_key` (`collectionKey`),
  KEY `idx_appmenu` (`collectionInAppMenu`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__collection_revisions` (
  `itemID` int(10) unsigned NOT NULL,
  `collectionID` int(10) unsigned NOT NULL,
  `itemOrder` int(10) unsigned DEFAULT '1000',
  `itemRev` int(10) unsigned NOT NULL,
  `itemLatestRev` int(10) unsigned NOT NULL,
  `itemCreated` datetime NOT NULL DEFAULT '2014-02-21 06:53:00',
  `itemCreatedBy` char(32) NOT NULL DEFAULT '',
  `itemSearchable` tinyint(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`itemID`),
  KEY `idx_order` (`itemOrder`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__collection_items` (
  `itemRowID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `itemID` int(10) unsigned NOT NULL,
  `itemRev` int(10) unsigned NOT NULL DEFAULT '0',
  `collectionID` int(10) unsigned NOT NULL,
  `itemJSON` mediumtext NOT NULL,
  `itemSearch` mediumtext NOT NULL,
  `itemUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `itemUpdatedBy` char(32) NOT NULL DEFAULT '',
  PRIMARY KEY (`itemRowID`),
  KEY `idx_item` (`itemID`),
  KEY `idx_rev` (`itemRev`),
  KEY `idx_collection` (`collectionID`),
  KEY `idx_regrev` (`itemID`,`collectionID`,`itemRev`),
  FULLTEXT KEY `idx_search` (`itemSearch`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__collection_index` (
  `indexID` int(10) NOT NULL AUTO_INCREMENT,
  `itemID` int(10) NOT NULL DEFAULT '0',
  `collectionID` int(10) NOT NULL DEFAULT '0',
  `itemRev` int(10) NOT NULL DEFAULT '0',
  `indexKey` char(64) NOT NULL DEFAULT '-',
  `indexValue` char(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`indexID`),
  KEY `idx_key` (`indexKey`),
  KEY `idx_val` (`indexValue`),
  KEY `idx_rev` (`itemRev`),
  KEY `idx_item` (`itemID`),
  KEY `idx_keyval` (`indexKey`,`indexValue`),
  KEY `idx_colrev` (`collectionID`,`itemRev`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__page_routes` (
  `routeID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pageID` int(10) unsigned NOT NULL DEFAULT '0',
  `templateID` int(10) unsigned NOT NULL DEFAULT '0',
  `routePattern` char(255) NOT NULL DEFAULT '',
  `routeRegExp` char(255) NOT NULL DEFAULT '',
  `routeOrder` int(10) unsigned NOT NULL,
  `templatePath` char(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`routeID`),
  KEY `idx_page` (`pageID`),
  KEY `idx_template` (`templateID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__backup_runs` (
  `runID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `planID` int(10) unsigned NOT NULL,
  `runDateTime` datetime NOT NULL,
  `runType` enum('db','resources') NOT NULL DEFAULT 'resources',
  `runResult` enum('OK','FAILED','IN PROGRESS') NOT NULL DEFAULT 'OK',
  `runMessage` char(255) NOT NULL DEFAULT '',
  `runDbFile` char(255) NOT NULL,
  PRIMARY KEY (`runID`),
  KEY `idx_plan` (`planID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__backup_resources` (
  `planID` int(10) unsigned NOT NULL,
  `resourceID` int(10) unsigned NOT NULL,
  `runID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`planID`,`resourceID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__backup_plans` (
  `planID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `planTitle` char(255) NOT NULL DEFAULT '',
  `planRole` enum('all','db') NOT NULL DEFAULT 'all',
  `planCreated` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `planCreatedBy` char(32) NOT NULL DEFAULT '',
  `planUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `planUpdatedBy` char(32) NOT NULL DEFAULT '',
  `planActive` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `planDynamicFields` text NOT NULL,
  `planFrequency` int(10) unsigned NOT NULL DEFAULT '24',
  `planBucket` char(16) NOT NULL DEFAULT '',
  PRIMARY KEY (`planID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__content_locks` (
  `lockID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contentKey` char(64) NOT NULL DEFAULT '',
  `userID` int(10) unsigned DEFAULT NULL,
  `lockTime` datetime DEFAULT NULL,
  PRIMARY KEY (`lockID`),
  KEY `idx_key` (`contentKey`),
  KEY `idx_ku` (`contentKey`,`userID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX__user_role_buckets` (
  `urbID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `roleID` int(10) unsigned NOT NULL DEFAULT '0',
  `bucket` char(64) NOT NULL DEFAULT '',
  `roleSelect` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `roleInsert` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `roleUpdate` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `roleDelete` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `roleDefault` tinyint(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`urbID`),
  KEY `idx_rolebucket` (`roleID`,`bucket`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

UPDATE `__PREFIX__settings` SET `settingValue` = 'rgb(54,54,54)' WHERE `settingID` = 'headerColour' LIMIT 1;
INSERT INTO `__PREFIX__settings` (`settingID`, `userID`, `settingValue`) VALUES ('headerScheme',0,'dark');
INSERT INTO `__PREFIX__settings` (`settingID`, `userID`, `settingValue`) VALUES ('update_runway___PERCH_VERSION__',0,'done');
