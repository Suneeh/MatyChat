SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS tChatUser;
DROP TABLE IF EXISTS tUser;
DROP TABLE IF EXISTS tChat;
DROP TABLE IF EXISTS tMessage;
DROP TABLE IF EXISTS tSetting;
DROP TABLE IF EXISTS tBlockList;
DROP TABLE IF EXISTS tSettingValue;
SET FOREIGN_KEY_CHECKS=1;
CREATE TABLE tUser (
    kUser INT PRIMARY KEY AUTO_INCREMENT,
    cUsername VARCHAR(32) NOT NULL COMMENT 'alias of the user',
    cMail VARCHAR(64) NOT NULL COMMENT 'mail address  of the user',
    bConfirmed BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'is true when the mail got confirmed',
    cPassword CHAR(160) NOT NULL COMMENT 'SHA-256 hash of the password, 128B long to make a switch to sha512 possible, plus 32B for a salt',
    dLastActive DATETIME NOT NULL COMMENT 'timestamp of the last action of the user',
    cDescription VARCHAR(10000) COMMENT 'text where the users can describe themselves',
    cProfilePicturePath VARCHAR(256) COMMENT '(relative) path of the profile picture, NULL if there is no profile picture'
);

CREATE TABLE tChat (
    kChat INT PRIMARY KEY AUTO_INCREMENT,
    cName VARCHAR(32) COMMENT 'shown name of the group (not set for 1on1 conversations)',
    cDescription VARCHAR(10000) COMMENT 'shown description of the group',
    cPicturePath VARCHAR(256) COMMENT 'path of the group picture',
    dErstellt DATETIME NOT NULL COMMENT 'creation date of the group'
);
CREATE TABLE tChatUser (
	kChatUser INT PRIMARY KEY AUTO_INCREMENT,
	kChat INT NOT NULL,
	kUser INT NOT NULL,

	FOREIGN KEY (kChat) REFERENCES tChat(kChat),
	FOREIGN KEY (kUser) REFERENCES tUser(kUser)
);

CREATE TABLE tMessage (
    kMessage INT PRIMARY KEY AUTO_INCREMENT COMMENT 'internal key of the message',
    kSendingUser INT NOT NULL COMMENT 'the user that sent this message',
    kReceivingChat INT NOT NULL COMMENT 'ID of the chat in which this message is posted',
    kRefersTo INT COMMENT 'message is a reply to this other message',
    dReceivedByServer DATETIME COMMENT 'determines display order of messages; timestamp of when this message was received by server',
	dCreated DATETIME NOT NULL COMMENT 'timestamp of creation time of this message',
    dEdited DATETIME COMMENT 'timestamp of last edit, NULL if never edited',
    bDeleted BOOLEAN NOT NULL DEFAULT FALSE COMMENT '',
    cContentPath VARCHAR(256) COMMENT 'a single binary/image content of the message',
    cContentText VARCHAR(10000) COMMENT 'text content of the message',

    FOREIGN KEY (kSendingUser) REFERENCES tUser(kUser),
    FOREIGN KEY (kReceivingChat) REFERENCES tChat(kChat),
    FOREIGN KEY (kRefersTo) REFERENCES tMessage(kMessage)
);

CREATE TABLE tSetting (
    kSetting INT PRIMARY KEY AUTO_INCREMENT,
    cSettingName VARCHAR(32) NOT NULL COMMENT 'UI display name of the setting',
    cValues VARCHAR(1024) COMMENT 'list of possible values for this setting, if applicable, otherwise NULL'
);

CREATE TABLE tSettingValue (
    kSettingValue INT PRIMARY KEY AUTO_INCREMENT,
    kUser INT NOT NULL COMMENT 'user to which this setting value belongs to',
    kSetting INT NOT NULL COMMENT 'ths setting of which this is a value of',
    cVarChar VARCHAR(64) NOT NULL COMMENT 'the value of the setting, stored as a string',
    
    FOREIGN KEY (kUser) REFERENCES tUser(kUser),
    FOREIGN KEY (kSetting) REFERENCES tSetting(kSetting)
);

CREATE TABLE tBlockList (
    kBlockList INT PRIMARY KEY AUTO_INCREMENT,
    kBlocker INT NOT NULL COMMENT 'this user blocked the other user, only this user can remove the block',
    kBlockee INT NOT NULL COMMENT 'this user got blocked',
    
    FOREIGN KEY (kBlocker) REFERENCES tUser(kUser),
    FOREIGN KEY (kBlockee) REFERENCES tUser(kUser)
);