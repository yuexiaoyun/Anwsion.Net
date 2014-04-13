-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.5-10.0.10-MariaDB - mariadb.org binary distribution
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  8.3.0.4694
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出  表 wenda.t_answer 结构
DROP TABLE IF EXISTS `t_answer`;
CREATE TABLE IF NOT EXISTS `t_answer` (
  `answer_id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `answer_content` text NOT NULL,
  `add_time` int(10) NOT NULL DEFAULT '0',
  `uid` int(11) NOT NULL,
  `comment_count` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `ip` int(11) NOT NULL,
  PRIMARY KEY (`answer_id`),
  KEY `add_time` (`add_time`),
  KEY `uid` (`uid`),
  KEY `question_id` (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='回答';

-- 数据导出被取消选择。


-- 导出  表 wenda.t_answer_comments 结构
DROP TABLE IF EXISTS `t_answer_comments`;
CREATE TABLE IF NOT EXISTS `t_answer_comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `answer_id` int(10) unsigned NOT NULL DEFAULT '0',
  `uid` int(10) unsigned NOT NULL DEFAULT '0',
  `message` int(10) unsigned NOT NULL DEFAULT '0',
  `time` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `time` (`time`),
  KEY `answer_id` (`answer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。


-- 导出  表 wenda.t_question 结构
DROP TABLE IF EXISTS `t_question`;
CREATE TABLE IF NOT EXISTS `t_question` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `question_content` varchar(255) NOT NULL DEFAULT '' COMMENT '问题内容',
  `add_time` int(11) NOT NULL COMMENT '添加时间',
  `update_time` int(11) DEFAULT NULL,
  `published_uid` int(11) DEFAULT NULL COMMENT '发布用户UID',
  `answer_count` int(11) DEFAULT '0' COMMENT '回答计数',
  `answer_users` int(11) DEFAULT '0' COMMENT '回答人数',
  `view_count` int(11) DEFAULT '0' COMMENT '浏览次数',
  `comment_count` int(11) DEFAULT '0' COMMENT '评论数',
  `category_id` int(11) DEFAULT '0' COMMENT '分类 ID',
  `best_answer` int(11) DEFAULT '0' COMMENT '最佳回复 ID',
  `has_attach` tinyint(1) DEFAULT '0' COMMENT '是否存在附件',
  `unverified_modify` text,
  `ip` bigint(11) DEFAULT NULL,
  `last_answer` int(11) DEFAULT '0' COMMENT '最后回答 ID',
  PRIMARY KEY (`question_id`),
  KEY `category_id` (`category_id`),
  KEY `update_time` (`update_time`),
  KEY `add_time` (`add_time`),
  KEY `published_uid` (`published_uid`),
  KEY `answer_count` (`answer_count`),
  KEY `question_content` (`question_content`),
  KEY `best_answer` (`best_answer`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='问题列表';

-- 数据导出被取消选择。
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
