-- MySQL dump 10.13  Distrib 5.7.10, for Linux (x86_64)
--
-- Host: snugg-next-dev2.cnvjbymvmfla.us-east-1.rds.amazonaws.com    Database: snuggnextdev
-- ------------------------------------------------------
-- Server version	5.6.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `password_reset_link` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `certifications` varchar(255) DEFAULT NULL,
  `hours_of_operation` text,
  `gets_newsletter` tinyint(1) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `program_admin` int(11) DEFAULT NULL,
  `last_used_company` int(11) DEFAULT NULL,
  `doe_assessor_id` varchar(255) DEFAULT NULL,
  `adgroup` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `offer` varchar(255) DEFAULT NULL,
  `tours` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `program_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `accounts_companies`
--

DROP TABLE IF EXISTS `accounts_companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_companies` (
  `account_id` int(10) unsigned NOT NULL,
  `company_id` int(10) unsigned NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `suspended` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`account_id`,`company_id`),
  KEY `accounts_companies_account_id_company_id_index` (`account_id`,`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address_1` varchar(255) DEFAULT NULL,
  `address_2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `hours_of_operation` text,
  `company_photo_uuid` varchar(1024) DEFAULT NULL,
  `company_photo_name` varchar(1024) DEFAULT NULL,
  `company_photo_url` varchar(1024) DEFAULT NULL,
  `stripe_id` varchar(255) DEFAULT NULL,
  `cached_stripe_last4` varchar(255) DEFAULT NULL,
  `cached_stripe_exp` varchar(255) DEFAULT NULL,
  `card_declined` tinyint(1) DEFAULT '0',
  `demo_company` tinyint(1) DEFAULT '0',
  `disabled` tinyint(1) DEFAULT '0',
  `pricing_plan` varchar(255) DEFAULT NULL,
  `notes` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `adgroup` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `offer` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3384 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `companies_programs`
--

DROP TABLE IF EXISTS `companies_programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies_programs` (
  `program_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  KEY `companies_programs_program_id_company_id_index` (`program_id`,`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `invitations`
--

DROP TABLE IF EXISTS `invitations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invitations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(10) unsigned DEFAULT NULL,
  `account_id` int(10) unsigned DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'user',
  `status` varchar(255) NOT NULL DEFAULT 'sent',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `job_recommendation_caption_rows`
--

DROP TABLE IF EXISTS `job_recommendation_caption_rows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_recommendation_caption_rows` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_recommendation_id` int(11) DEFAULT NULL,
  `caption` text,
  `left_photo_uuid` varchar(255) DEFAULT NULL,
  `left_photo_name` varchar(255) DEFAULT NULL,
  `left_photo_url` text,
  `right_photo_uuid` text,
  `right_photo_name` text,
  `right_photo_url` text,
  `left_photo_height` int(11) DEFAULT NULL,
  `left_photo_width` int(11) DEFAULT NULL,
  `right_photo_height` int(11) DEFAULT NULL,
  `right_photo_width` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_recommendation_caption_rows_job_recommendation_id_index` (`job_recommendation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=596175 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `job_recommendations`
--

DROP TABLE IF EXISTS `job_recommendations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_recommendations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `touched` tinyint(1) DEFAULT '0',
  `touched_cost` tinyint(1) DEFAULT '0',
  `type` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `savings` varchar(255) DEFAULT NULL,
  `sir` varchar(255) DEFAULT NULL,
  `cost` varchar(255) DEFAULT NULL,
  `homeowner_notes` text,
  `contractor_notes` text,
  `why_it_matters` text,
  PRIMARY KEY (`id`),
  KEY `job_recommendations_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=799525 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `job_report`
--

DROP TABLE IF EXISTS `job_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_report` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `logo_photo_uuid` varchar(1024) DEFAULT NULL,
  `logo_photo_name` varchar(1024) DEFAULT NULL,
  `logo_photo_url` varchar(1024) DEFAULT NULL,
  `cover_photo_uuid` varchar(1024) DEFAULT NULL,
  `cover_photo_name` varchar(1024) DEFAULT NULL,
  `cover_photo_url` varchar(1024) DEFAULT NULL,
  `cover_title` text,
  `serviced_by_title` text,
  `service_date_title` text,
  `cover_text_area` text,
  `toggled_pages` varchar(255) DEFAULT NULL,
  `toggled_elements` varchar(255) DEFAULT NULL,
  `concerns_sidebar` text,
  `solutions_title` text,
  `approximate_cost_text` text,
  `estimated_savings_text` text,
  `safety_overview` text,
  PRIMARY KEY (`id`),
  KEY `job_report_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38704 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `job_totals`
--

DROP TABLE IF EXISTS `job_totals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_totals` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `total_savings` decimal(10,0) DEFAULT NULL,
  `installed_costs` decimal(10,0) DEFAULT NULL,
  `sir` decimal(10,1) DEFAULT NULL,
  `mirr` decimal(10,2) DEFAULT NULL,
  `payback_years` varchar(255) DEFAULT NULL,
  `total_co2_tons_base` decimal(10,1) DEFAULT NULL,
  `total_co2_tons` decimal(10,1) DEFAULT NULL,
  `saved_kwh` decimal(10,1) DEFAULT NULL,
  `saved_kwh_percent` decimal(3,0) DEFAULT NULL,
  `saved_co2_tons` decimal(10,1) DEFAULT NULL,
  `saved_co2_percent` decimal(3,0) DEFAULT NULL,
  `saved_mbtu` decimal(10,0) DEFAULT NULL,
  `mbtu_base` decimal(10,0) DEFAULT NULL,
  `mbtu_improved` decimal(10,0) DEFAULT NULL,
  `saved_mbtu_percent` decimal(3,0) DEFAULT NULL,
  `yearly_energy_cost` decimal(10,0) DEFAULT NULL,
  `yearly_energy_cost_improved` decimal(10,0) DEFAULT NULL,
  `annual_electric_kWh_used` decimal(10,1) DEFAULT NULL,
  `annual_electric_kWh_improved` decimal(10,1) DEFAULT NULL,
  `annual_electric_dollars_spent` decimal(10,0) DEFAULT NULL,
  `annual_electric_dollars_improved` decimal(10,0) DEFAULT NULL,
  `annual_fuel_therms_used` decimal(10,0) DEFAULT NULL,
  `annual_fuel_therms_improved` decimal(10,0) DEFAULT NULL,
  `annual_fuel_therms_saved` decimal(10,0) DEFAULT NULL,
  `annual_fuel_dollars_spent` decimal(10,0) DEFAULT NULL,
  `annual_fuel_dollars_improved` decimal(10,0) DEFAULT NULL,
  `touched` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_totals_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=282 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobform_appliances`
--

DROP TABLE IF EXISTS `jobform_appliances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobform_appliances` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `range_fuel` varchar(255) DEFAULT NULL,
  `dryer_fuel` varchar(255) DEFAULT NULL,
  `freezer_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobform_appliances_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32387 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobform_attics`
--

DROP TABLE IF EXISTS `jobform_attics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobform_attics` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `insulation_depth` varchar(255) DEFAULT NULL,
  `insulation_type` varchar(255) DEFAULT NULL,
  `shared_ceiling_percent` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobform_attics_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32204 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobform_buildings`
--

DROP TABLE IF EXISTS `jobform_buildings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobform_buildings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `year_built` int(4) DEFAULT NULL,
  `conditioned_area` int(11) DEFAULT NULL,
  `floors_above_grade` decimal(5,3) DEFAULT NULL,
  `avg_wall_height` decimal(5,3) DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `occupant_count` decimal(4,2) DEFAULT NULL,
  `home_type` varchar(255) DEFAULT '',
  `plan_rotation` varchar(255) DEFAULT '',
  `tuck_under_garage` tinyint(1) DEFAULT NULL,
  `garage_size` decimal(5,3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobform_buildings_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37458 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobform_concerns`
--

DROP TABLE IF EXISTS `jobform_concerns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobform_concerns` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `detail` text,
  PRIMARY KEY (`id`),
  KEY `jobform_concerns_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=67791 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobform_dhws`
--

DROP TABLE IF EXISTS `jobform_dhws`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobform_dhws` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `fuel` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `temp` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobform_dhws_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32344 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobform_doors`
--

DROP TABLE IF EXISTS `jobform_doors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobform_doors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobform_doors_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=69093 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobform_foundations`
--

DROP TABLE IF EXISTS `jobform_foundations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobform_foundations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `above_grade_height` decimal(5,3) DEFAULT NULL,
  `insulation_basement` varchar(255) DEFAULT NULL,
  `insulation_crawlspace` varchar(255) DEFAULT NULL,
  `floors_shared_percent` int(11) DEFAULT NULL,
  `shared_basement` int(11) DEFAULT NULL,
  `shared_crawl` int(11) DEFAULT NULL,
  `shared_slab` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobform_foundations_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33908 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobform_health`
--

DROP TABLE IF EXISTS `jobform_health`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobform_health` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `ambient_carbon_monoxide` int(11) DEFAULT '0',
  `nat_cond_spillage` int(11) DEFAULT '0',
  `worst_case_dep` int(11) DEFAULT '0',
  `worst_case_spill` int(11) DEFAULT '0',
  `undiluted_flue_co` int(11) DEFAULT '0',
  `draft_pressure` int(11) DEFAULT '0',
  `gas_leak` int(11) DEFAULT '0',
  `venting` int(11) DEFAULT '0',
  `mold` int(11) DEFAULT '0',
  `radon` int(11) DEFAULT '0',
  `asbestos` int(11) DEFAULT '0',
  `lead` int(11) DEFAULT '0',
  `electrical` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `jobform_health_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33852 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobform_hvacs`
--

DROP TABLE IF EXISTS `jobform_hvacs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobform_hvacs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `equipment` varchar(255) DEFAULT NULL,
  `energy_source` varchar(255) DEFAULT NULL,
  `heating_age` varchar(255) DEFAULT NULL,
  `cooling_age` varchar(255) DEFAULT NULL,
  `heating_size` varchar(255) DEFAULT NULL,
  `cooling_size` varchar(255) DEFAULT NULL,
  `cooling_capacity` int(11) DEFAULT NULL,
  `heating_capacity` int(11) DEFAULT NULL,
  `load_percent_heating` varchar(255) DEFAULT NULL,
  `load_percent_cooling` varchar(255) DEFAULT NULL,
  `ducts_location` varchar(255) DEFAULT NULL,
  `ducts_leakage` varchar(255) DEFAULT NULL,
  `ducts_leakage_value` int(11) DEFAULT NULL,
  `ducts_insulation` varchar(255) DEFAULT NULL,
  `om_heating_spot` int(11) DEFAULT NULL,
  `om_cooling_spot` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobform_hvacs_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57253 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobform_leakage`
--

DROP TABLE IF EXISTS `jobform_leakage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobform_leakage` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `initial_air_leakage` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobform_leakage_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34441 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobform_lighting`
--

DROP TABLE IF EXISTS `jobform_lighting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobform_lighting` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `percent_cfl` varchar(255) DEFAULT NULL,
  `light_fixture_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobform_lighting_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32370 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobform_refrigerators`
--

DROP TABLE IF EXISTS `jobform_refrigerators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobform_refrigerators` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobform_refrigerators_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48663 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobform_thermostat`
--

DROP TABLE IF EXISTS `jobform_thermostat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobform_thermostat` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `programmable_thermostat` tinyint(1) DEFAULT NULL,
  `heating_setpoint_high` int(11) DEFAULT NULL,
  `heating_setpoint_low` int(11) DEFAULT NULL,
  `cooling_setpoint_high` int(11) DEFAULT NULL,
  `cooling_setpoint_low` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobform_thermostat_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32638 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobform_utilities`
--

DROP TABLE IF EXISTS `jobform_utilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobform_utilities` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `account` varchar(255) DEFAULT NULL,
  `units` varchar(255) DEFAULT NULL,
  `primary_fuel_type` varchar(255) DEFAULT NULL,
  `simple_fuel_units` varchar(255) DEFAULT NULL,
  `high_bill` int(11) DEFAULT NULL,
  `low_bill` int(11) DEFAULT NULL,
  `fuel_amount` int(11) DEFAULT NULL,
  `month1_start_date` date DEFAULT NULL,
  `month1_end_date` date DEFAULT NULL,
  `month1_value` decimal(8,2) DEFAULT NULL,
  `month2_end_date` date DEFAULT NULL,
  `month2_value` decimal(8,2) DEFAULT NULL,
  `month3_end_date` date DEFAULT NULL,
  `month3_value` decimal(8,2) DEFAULT NULL,
  `month4_end_date` date DEFAULT NULL,
  `month4_value` decimal(8,2) DEFAULT NULL,
  `month5_end_date` date DEFAULT NULL,
  `month5_value` decimal(8,2) DEFAULT NULL,
  `month6_end_date` date DEFAULT NULL,
  `month6_value` decimal(8,2) DEFAULT NULL,
  `month7_end_date` date DEFAULT NULL,
  `month7_value` decimal(8,2) DEFAULT NULL,
  `month8_end_date` date DEFAULT NULL,
  `month8_value` decimal(8,2) DEFAULT NULL,
  `month9_end_date` date DEFAULT NULL,
  `month9_value` decimal(8,2) DEFAULT NULL,
  `month10_end_date` date DEFAULT NULL,
  `month10_value` decimal(8,2) DEFAULT NULL,
  `month11_end_date` date DEFAULT NULL,
  `month11_value` decimal(8,2) DEFAULT NULL,
  `month12_end_date` date DEFAULT NULL,
  `month12_value` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobform_utilities_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=67375 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobform_walls`
--

DROP TABLE IF EXISTS `jobform_walls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobform_walls` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `construction` varchar(255) DEFAULT NULL,
  `siding` varchar(255) DEFAULT NULL,
  `insulated` tinyint(1) DEFAULT NULL,
  `shared_north` int(11) DEFAULT NULL,
  `shared_south` int(11) DEFAULT NULL,
  `shared_east` int(11) DEFAULT NULL,
  `shared_west` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobform_walls_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32458 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobform_windows`
--

DROP TABLE IF EXISTS `jobform_windows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobform_windows` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `frame` varchar(255) DEFAULT NULL,
  `skylight_area` int(11) DEFAULT NULL,
  `overhang_north` decimal(5,3) DEFAULT NULL,
  `overhang_east` decimal(5,3) DEFAULT NULL,
  `overhang_south` decimal(5,3) DEFAULT NULL,
  `overhang_west` decimal(5,3) DEFAULT NULL,
  `area_north` int(11) DEFAULT NULL,
  `area_east` int(11) DEFAULT NULL,
  `area_south` int(11) DEFAULT NULL,
  `area_west` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobform_windows_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32338 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `is_template` tinyint(1) NOT NULL DEFAULT '0',
  `is_calculating` tinyint(1) NOT NULL DEFAULT '0',
  `has_calculated` tinyint(1) NOT NULL DEFAULT '0',
  `account_id` int(10) unsigned DEFAULT NULL,
  `program_id` int(10) unsigned DEFAULT NULL,
  `company_id` int(10) unsigned DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `home_phone` varchar(255) DEFAULT NULL,
  `address_1` varchar(255) DEFAULT NULL,
  `address_2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `renter_owner` tinyint(1) DEFAULT NULL,
  `service_time` datetime DEFAULT NULL,
  `bill_entry_type` varchar(255) DEFAULT NULL,
  `sample_job` tinyint(1) DEFAULT '0',
  `recommendation_order` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  `stage_id` int(10) unsigned DEFAULT NULL,
  `from_template_id` int(10) unsigned DEFAULT NULL,
  `from_job_id` int(10) unsigned DEFAULT NULL,
  `version` tinyint(4) DEFAULT '3',
  `created_by_company_id` int(11) DEFAULT NULL,
  `created_by_account_id` int(11) DEFAULT NULL,
  `created_by_program_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_account_id_index` (`account_id`),
  KEY `jobs_program_id_index` (`program_id`),
  KEY `jobs_company_id_index` (`company_id`),
  KEY `jobs_stage_id_index` (`stage_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41731 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `knex_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `optimiser_submissions`
--

DROP TABLE IF EXISTS `optimiser_submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `optimiser_submissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `optimiser_id` int(11) DEFAULT NULL,
  `submitted_values` text,
  `submitted_varlist` text,
  `received` text,
  `parsed` text,
  `success_response` text,
  `error_response` text,
  `response_code` varchar(255) DEFAULT NULL,
  `hpxml` longtext,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `optimiser_submissions_job_id_index` (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `programs`
--

DROP TABLE IF EXISTS `programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `programs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `cover_logo` varchar(1024) DEFAULT NULL COMMENT 'v3 - Deprecated',
  `cover_footer_logo` varchar(1024) DEFAULT NULL COMMENT 'v3 - Deprecated',
  `footer_logo` varchar(1024) DEFAULT NULL COMMENT 'v3 - Deprecated',
  `jobs_logo` varchar(1024) DEFAULT NULL COMMENT 'v3 - Deprecated',
  `footer_text` varchar(255) DEFAULT NULL,
  `pays_for_job` tinyint(1) NOT NULL DEFAULT '0',
  `expose_account_number` tinyint(1) DEFAULT '1',
  `remove_snugg_logo` tinyint(1) DEFAULT '0',
  `billing_name` varchar(255) DEFAULT NULL,
  `program_help` text,
  `logo_path` varchar(1024) DEFAULT NULL,
  `show_cover_branding` tinyint(1) DEFAULT '1',
  `show_footer_branding` tinyint(1) DEFAULT '1',
  `show_rebates_branding` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programs`
--

LOCK TABLES `programs` WRITE;
/*!40000 ALTER TABLE `programs` DISABLE KEYS */;
INSERT INTO `programs` VALUES (1, 'None', '', '', '', NULL, '', NULL, 'Brought to you by', 0, 1, 0, 'None', NULL, NULL, 0, 0, 0);
/*!40000 ALTER TABLE `programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recommendables`
--

DROP TABLE IF EXISTS `recommendables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recommendables` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `recommendable_id` int(11) DEFAULT NULL,
  `recommendable_type` varchar(255) DEFAULT NULL,
  `group` varchar(255) DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  `base_value` varchar(255) DEFAULT NULL,
  `improved_value` varchar(255) DEFAULT NULL,
  `touched_base` tinyint(1) DEFAULT '0',
  `touched_improved` tinyint(1) DEFAULT '0',
  `collection_num` tinyint(4) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `recommendables_job_id_index` (`job_id`),
  KEY `recommendables_recommendable_id_index` (`recommendable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=358302 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_collection_definitions`
--

DROP TABLE IF EXISTS `v4_collection_definitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_collection_definitions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `min` tinyint(4) NOT NULL DEFAULT '0',
  `max` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_concerns`
--

DROP TABLE IF EXISTS `v4_concerns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_concerns` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `order` smallint(6) DEFAULT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `detail` text,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `v4_concerns_job_id_index` (`job_id`),
  KEY `v4_concerns_order_index` (`order`)
) ENGINE=InnoDB AUTO_INCREMENT=936 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_fields`
--

DROP TABLE IF EXISTS `v4_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_fields` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('Input','Select','Radio','Textarea') DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `description` text,
  `min` decimal(11,2) DEFAULT NULL,
  `max` decimal(11,2) DEFAULT NULL,
  `decimals` tinyint(4) DEFAULT NULL,
  `is_required` tinyint(1) NOT NULL DEFAULT '0',
  `examples` varchar(255) DEFAULT NULL,
  `small_label` varchar(100) DEFAULT NULL,
  `jobform_section_id` int(11) DEFAULT NULL,
  `rec_definition_id` int(11) DEFAULT NULL,
  `collection_definition_id` int(11) DEFAULT NULL,
  `namespace` varchar(100) DEFAULT NULL,
  `a1_migration_table` varchar(100) DEFAULT NULL,
  `a1_migration_column` varchar(100) DEFAULT NULL,
  `migration_r_group` varchar(100) DEFAULT NULL,
  `r_name` varchar(255) DEFAULT NULL,
  `csv` varchar(255) DEFAULT NULL,
  `addtl_info` varchar(255) DEFAULT NULL,
  `is_select` tinyint(1) DEFAULT '0',
  `suffix` varchar(255) DEFAULT NULL,
  `om_a1_base_key` varchar(255) DEFAULT NULL,
  `om_direct_set_base` varchar(255) DEFAULT NULL,
  `om_direct_set_improved` varchar(255) DEFAULT NULL,
  `target_table` varchar(50) DEFAULT NULL,
  `target_column` varchar(50) DEFAULT NULL,
  `base_optiongroup_id` int(11) DEFAULT NULL,
  `imp_optiongroup_id` int(11) DEFAULT NULL,
  `tech_spec_definition_id` int(11) DEFAULT NULL,
  `tech_spec_section_order` int(11) DEFAULT NULL,
  `nowandgoal_rec_id` int(11) DEFAULT NULL,
  `nowandgoal_rec_order` int(11) DEFAULT NULL,
  `hpxml_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `v4_fields_label_unique` (`label`),
  UNIQUE KEY `v4_fields_om_a1_base_key_unique` (`om_a1_base_key`),
  UNIQUE KEY `v4_fields_om_direct_set_base_unique` (`om_direct_set_base`),
  UNIQUE KEY `v4_fields_om_direct_set_improved_unique` (`om_direct_set_improved`),
  KEY `namespace` (`namespace`),
  KEY `collection_definition_id` (`collection_definition_id`),
  KEY `label` (`label`),
  KEY `hpxml_id` (`hpxml_id`)
) ENGINE=InnoDB AUTO_INCREMENT=974 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_financing_products`
--

DROP TABLE IF EXISTS `v4_financing_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_financing_products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `from_product_id` int(11) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `program_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `rate` decimal(5,3) DEFAULT NULL,
  `closing_cost` varchar(255) DEFAULT NULL,
  `term` varchar(5) DEFAULT NULL,
  `min_fico_score` varchar(11) DEFAULT NULL,
  `min_cash_down` varchar(8) DEFAULT NULL,
  `min_purchase` varchar(8) DEFAULT NULL,
  `max_purchase` varchar(8) DEFAULT NULL,
  `eligibility` text,
  `description` text,
  `contact_info` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `v4_financing_products_job_id_index` (`job_id`),
  KEY `v4_financing_products_account_id_index` (`account_id`),
  KEY `v4_financing_products_company_id_index` (`company_id`),
  KEY `v4_financing_products_program_id_index` (`program_id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_health`
--

DROP TABLE IF EXISTS `v4_health`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_health` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `ambient_carbon_monoxide` int(10) DEFAULT '0',
  `nat_cond_spillage` int(10) DEFAULT '0',
  `worst_case_dep` int(10) DEFAULT '0',
  `worst_case_spill` int(10) DEFAULT '0',
  `undiluted_flue_co` int(10) DEFAULT '0',
  `draft_pressure` int(10) DEFAULT '0',
  `gas_leak` int(10) DEFAULT '0',
  `venting` int(10) DEFAULT '0',
  `mold` int(10) DEFAULT '0',
  `radon` int(10) DEFAULT '0',
  `asbestos` int(10) DEFAULT '0',
  `lead` int(10) DEFAULT '0',
  `electrical` int(10) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `v4_health_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=403 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_hes_scores`
--

DROP TABLE IF EXISTS `v4_hes_scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_hes_scores` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned DEFAULT NULL,
  `locked` tinyint(1) DEFAULT NULL,
  `hpxml_event_type1` varchar(255) DEFAULT NULL,
  `hpxml_event_type2` varchar(255) DEFAULT NULL,
  `assessment_type_code` varchar(255) DEFAULT NULL,
  `hpxml_building_id` varchar(255) DEFAULT NULL,
  `xml_transaction_type` varchar(255) DEFAULT NULL,
  `base_score` int(2) DEFAULT NULL,
  `assessment_type` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `conditioned_floor_area` int(10) DEFAULT NULL,
  `year_built` int(10) DEFAULT NULL,
  `cooling_present` tinyint(1) DEFAULT NULL,
  `assessment_date` date DEFAULT NULL,
  `label_number` int(10) DEFAULT NULL,
  `qualified_assessor_id` varchar(255) DEFAULT NULL,
  `hescore_version` varchar(100) DEFAULT NULL,
  `utility_electric` int(10) DEFAULT NULL,
  `utility_natural_gas` int(10) DEFAULT NULL,
  `utility_fuel_oil` int(10) DEFAULT NULL,
  `utility_lpg` int(10) DEFAULT NULL,
  `utility_cord_wood` int(10) DEFAULT NULL,
  `utility_pellet_wood` int(10) DEFAULT NULL,
  `source_energy_total_base` int(10) DEFAULT NULL,
  `source_energy_asset_base` int(10) DEFAULT NULL,
  `building_id` int(10) unsigned DEFAULT NULL,
  `retrieved_inputs` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_hpxml`
--

DROP TABLE IF EXISTS `v4_hpxml`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_hpxml` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sheet` varchar(50) DEFAULT NULL,
  `data_category` varchar(255) DEFAULT NULL,
  `data_element` varchar(255) DEFAULT NULL,
  `data_type` varchar(50) DEFAULT NULL,
  `definition_notes` text,
  `required` varchar(255) DEFAULT NULL,
  `dependent` text,
  `notes` text,
  `hpxml_qualifier` varchar(255) DEFAULT NULL,
  `hpxml_ref_object` varchar(255) DEFAULT NULL,
  `hpxml_path` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=275 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_job_financing`
--

DROP TABLE IF EXISTS `v4_job_financing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_job_financing` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) NOT NULL,
  `financing_product_id` int(11) NOT NULL,
  `total_cost` decimal(10,2) DEFAULT NULL,
  `cash_down` decimal(10,2) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `is_shown` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=251 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_job_stage_history`
--

DROP TABLE IF EXISTS `v4_job_stage_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_job_stage_history` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) NOT NULL,
  `stage_id` int(11) NOT NULL,
  `start_at` datetime NOT NULL,
  `end_at` datetime DEFAULT NULL,
  `changed_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_jobform_sections`
--

DROP TABLE IF EXISTS `v4_jobform_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_jobform_sections` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tag` varchar(100) DEFAULT NULL,
  `short` varchar(100) DEFAULT NULL,
  `long` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_optimiser_sessions`
--

DROP TABLE IF EXISTS `v4_optimiser_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_optimiser_sessions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned DEFAULT NULL,
  `optimiser_id` varchar(255) DEFAULT NULL,
  `optimiser_session` varchar(255) DEFAULT NULL,
  `client_om_data` mediumtext,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `v4_optimiser_sessions_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1127 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_optimiser_submissions`
--

DROP TABLE IF EXISTS `v4_optimiser_submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_optimiser_submissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) NOT NULL,
  `optimiser_id` int(11) DEFAULT NULL,
  `model_count` int(11) DEFAULT '0',
  `request_url` text,
  `client_om_data` mediumtext,
  `response_code` varchar(255) DEFAULT NULL,
  `error_response` mediumtext,
  `raw_response` longtext,
  `parsed_response` mediumtext,
  `hpxml` longtext,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `v4_optimiser_submissions_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_optiongroups`
--

DROP TABLE IF EXISTS `v4_optiongroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_optiongroups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `has_blank` tinyint(1) NOT NULL DEFAULT '0',
  `has_dont_know` tinyint(1) NOT NULL DEFAULT '0',
  `default` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_options`
--

DROP TABLE IF EXISTS `v4_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_options` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `optiongroup_id` int(11) DEFAULT NULL,
  `display_value` varchar(100) DEFAULT NULL,
  `om_value` varchar(100) DEFAULT NULL,
  `om_dval` varchar(100) DEFAULT NULL,
  `migration_value` varchar(100) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `optiongroup_id` (`optiongroup_id`)
) ENGINE=InnoDB AUTO_INCREMENT=576 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_outputs`
--

DROP TABLE IF EXISTS `v4_outputs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_outputs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned DEFAULT NULL,
  `field_id` int(10) unsigned DEFAULT NULL,
  `base_value` text,
  `improved_value` text,
  `base_value_option` int(11) DEFAULT NULL,
  `improved_value_option` int(11) DEFAULT NULL,
  `touched_base` tinyint(1) NOT NULL DEFAULT '0',
  `touched_improved` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `job_id` (`job_id`,`field_id`),
  KEY `v4_outputs_job_id_index` (`job_id`),
  KEY `v4_outputs_field_id_index` (`field_id`),
  KEY `v4_outputs_base_value_option_index` (`base_value_option`),
  KEY `v4_outputs_improved_value_option_index` (`improved_value_option`)
) ENGINE=InnoDB AUTO_INCREMENT=21368 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_outputs_collection`
--

DROP TABLE IF EXISTS `v4_outputs_collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_outputs_collection` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned DEFAULT NULL,
  `field_id` int(10) unsigned DEFAULT NULL,
  `uuid` char(36) DEFAULT NULL,
  `base_value` text,
  `improved_value` text,
  `base_value_option` int(11) DEFAULT NULL,
  `improved_value_option` int(11) DEFAULT NULL,
  `touched_base` tinyint(1) NOT NULL DEFAULT '0',
  `touched_improved` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `job_id` (`job_id`,`field_id`,`uuid`),
  KEY `v4_outputs_collection_job_id_index` (`job_id`),
  KEY `v4_outputs_collection_field_id_index` (`field_id`),
  KEY `v4_outputs_collection_uuid_index` (`uuid`),
  KEY `v4_outputs_collection_base_value_option_index` (`base_value_option`),
  KEY `v4_outputs_collection_improved_value_option_index` (`improved_value_option`)
) ENGINE=InnoDB AUTO_INCREMENT=25430 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_rec_definitions`
--

DROP TABLE IF EXISTS `v4_rec_definitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_rec_definitions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `category` varchar(40) DEFAULT NULL,
  `rec_name` varchar(40) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `inclusion_key` varchar(40) DEFAULT NULL,
  `improved_cost_key` varchar(40) DEFAULT NULL,
  `why_it_matters` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_recommendation_caption_rows`
--

DROP TABLE IF EXISTS `v4_recommendation_caption_rows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_recommendation_caption_rows` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order` smallint(5) unsigned DEFAULT NULL,
  `recommendation_id` int(10) unsigned DEFAULT NULL,
  `caption` text,
  `left_photo_uuid` char(36) DEFAULT NULL,
  `left_photo_name` varchar(255) DEFAULT NULL,
  `left_photo_url` text,
  `right_photo_uuid` char(36) DEFAULT NULL,
  `right_photo_name` text,
  `right_photo_url` text,
  `left_photo_height` int(11) DEFAULT NULL,
  `left_photo_width` int(11) DEFAULT NULL,
  `right_photo_height` int(11) DEFAULT NULL,
  `right_photo_width` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `v4_recommendation_caption_rows_order_index` (`order`),
  KEY `v4_recommendation_caption_rows_recommendation_id_index` (`recommendation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7147 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_recommendations`
--

DROP TABLE IF EXISTS `v4_recommendations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_recommendations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned DEFAULT NULL,
  `order` smallint(5) unsigned NOT NULL DEFAULT '0',
  `rec_definition_id` int(10) unsigned NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `touched_cost` tinyint(1) NOT NULL DEFAULT '0',
  `title` varchar(255) DEFAULT NULL,
  `savings` varchar(255) DEFAULT NULL,
  `sir` varchar(255) DEFAULT NULL,
  `cost` varchar(255) DEFAULT NULL,
  `homeowner_notes` text,
  `contractor_notes` text,
  `why_it_matters` text,
  `measure_code` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `v4_recommendations_job_id_index` (`job_id`),
  KEY `v4_recommendations_order_index` (`order`)
) ENGINE=InnoDB AUTO_INCREMENT=8986 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_reports`
--

DROP TABLE IF EXISTS `v4_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_reports` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned DEFAULT NULL,
  `cover_photo_uuid` char(36) DEFAULT NULL,
  `cover_photo_name` varchar(1024) DEFAULT NULL,
  `cover_photo_url` varchar(1024) DEFAULT NULL,
  `serviced_by_title` varchar(255) DEFAULT 'Audited By',
  `service_date_title` varchar(255) DEFAULT 'Audit Date',
  `cover_text_area` text,
  `toggled_pages` varchar(255) DEFAULT NULL,
  `toggled_elements` varchar(255) DEFAULT NULL,
  `concerns_sidebar` text,
  `solutions_title` text,
  `approximate_cost_text` text,
  `estimated_savings_text` text,
  `safety_overview` text,
  `additional_notes_overview_title` varchar(255) DEFAULT 'About this section',
  `additional_notes_overview` text,
  `title_cover` varchar(50) NOT NULL DEFAULT 'Your Energy Audit',
  `title_concerns` varchar(50) NOT NULL DEFAULT 'Concerns',
  `title_solutions` varchar(50) NOT NULL DEFAULT 'Solutions for Your Home',
  `title_financing` varchar(50) NOT NULL DEFAULT 'Financing',
  `title_additional` varchar(50) NOT NULL DEFAULT 'Additional Notes',
  `title_rebates` varchar(50) NOT NULL DEFAULT 'Rebates & Incentives',
  `title_tech_specs` varchar(50) NOT NULL DEFAULT 'Tech Specs',
  `title_metrics` varchar(50) NOT NULL DEFAULT 'Metrics',
  `title_glossary` varchar(50) NOT NULL DEFAULT 'Glossary',
  `page_cover` tinyint(1) NOT NULL DEFAULT '1',
  `page_financing` tinyint(1) NOT NULL DEFAULT '1',
  `page_concerns` tinyint(1) NOT NULL DEFAULT '1',
  `page_solutions` tinyint(1) NOT NULL DEFAULT '1',
  `page_upgrade_details` tinyint(1) NOT NULL DEFAULT '1',
  `page_health` tinyint(1) NOT NULL DEFAULT '1',
  `page_additional_notes` tinyint(1) NOT NULL DEFAULT '1',
  `page_rebates` tinyint(1) NOT NULL DEFAULT '1',
  `page_tech_specs` tinyint(1) NOT NULL DEFAULT '1',
  `page_metrics` tinyint(1) NOT NULL DEFAULT '1',
  `page_glossary` tinyint(1) NOT NULL DEFAULT '1',
  `element_costs` tinyint(1) NOT NULL DEFAULT '2',
  `element_savings` tinyint(1) NOT NULL DEFAULT '1',
  `element_sir` tinyint(1) NOT NULL DEFAULT '1',
  `element_co2` tinyint(1) NOT NULL DEFAULT '1',
  `element_photos` tinyint(1) NOT NULL DEFAULT '1',
  `element_homeowner_notes` tinyint(1) NOT NULL DEFAULT '1',
  `element_contractor_notes` tinyint(1) NOT NULL DEFAULT '1',
  `element_now_and_goal` tinyint(1) NOT NULL DEFAULT '1',
  `element_why_it_matters` tinyint(1) NOT NULL DEFAULT '1',
  `element_program_info` tinyint(1) DEFAULT '1',
  `title_hes` varchar(50) NOT NULL DEFAULT 'Home Energy Score',
  `page_hes` tinyint(1) NOT NULL DEFAULT '1',
  `theme` int(2) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `v4_reports_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=403 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_stages`
--

DROP TABLE IF EXISTS `v4_stages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_stages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_tech_spec_definitions`
--

DROP TABLE IF EXISTS `v4_tech_spec_definitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_tech_spec_definitions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title_label` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `jobform_section` varchar(100) CHARACTER SET utf8 NOT NULL,
  `collection_definition` varchar(100) CHARACTER SET utf8 NOT NULL,
  `order` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_totals`
--

DROP TABLE IF EXISTS `v4_totals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_totals` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned DEFAULT NULL,
  `total_savings` decimal(10,0) DEFAULT NULL,
  `installed_costs` decimal(10,0) DEFAULT NULL,
  `sir` decimal(10,1) DEFAULT NULL,
  `mirr` decimal(10,2) DEFAULT NULL,
  `payback_years` decimal(10,1) DEFAULT NULL,
  `total_co2_tons` decimal(10,1) DEFAULT NULL,
  `saved_kwh` decimal(10,1) DEFAULT NULL,
  `saved_kwh_percent` decimal(3,0) DEFAULT NULL,
  `saved_co2_tons` decimal(10,0) DEFAULT NULL,
  `saved_co2_percent` decimal(3,1) DEFAULT NULL,
  `saved_mbtu` decimal(10,0) DEFAULT NULL,
  `saved_mbtu_percent` decimal(5,2) DEFAULT NULL,
  `yearly_energy_cost` decimal(10,0) DEFAULT NULL,
  `annual_electric_kWh_used` decimal(10,1) DEFAULT NULL,
  `annual_electric_dollars_spent` decimal(10,0) DEFAULT NULL,
  `annual_fuel_therms_used` decimal(10,0) DEFAULT NULL,
  `annual_fuel_dollars_spent` decimal(10,0) DEFAULT NULL,
  `annual_fuel_therms_improved` decimal(10,0) DEFAULT NULL,
  `annual_electric_kWh_improved` decimal(10,1) DEFAULT NULL,
  `mbtu_base` decimal(10,0) DEFAULT NULL,
  `mbtu_improved` decimal(10,0) DEFAULT NULL,
  `annual_fuel_dollars_improved` decimal(10,0) DEFAULT NULL,
  `annual_electric_dollars_improved` decimal(10,0) DEFAULT NULL,
  `yearly_energy_cost_improved` decimal(10,0) DEFAULT NULL,
  `total_co2_tons_base` decimal(10,1) DEFAULT NULL,
  `annual_fuel_therms_saved` decimal(10,0) DEFAULT NULL,
  `touched` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `v4_totals_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=399 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_utilities`
--

DROP TABLE IF EXISTS `v4_utilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_utilities` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `bill_entry_type` int(11) DEFAULT NULL,
  `electric_name` varchar(255) DEFAULT NULL,
  `electric_account_number` varchar(255) DEFAULT NULL,
  `simple_electric_high` int(11) DEFAULT NULL,
  `simple_electric_low` int(11) DEFAULT NULL,
  `electric_detailed_units` int(11) DEFAULT NULL,
  `electric_start_date` date DEFAULT NULL,
  `electric_date_1` date DEFAULT NULL,
  `electric_date_2` date DEFAULT NULL,
  `electric_date_3` date DEFAULT NULL,
  `electric_date_4` date DEFAULT NULL,
  `electric_date_5` date DEFAULT NULL,
  `electric_date_6` date DEFAULT NULL,
  `electric_date_7` date DEFAULT NULL,
  `electric_date_8` date DEFAULT NULL,
  `electric_date_9` date DEFAULT NULL,
  `electric_date_10` date DEFAULT NULL,
  `electric_date_11` date DEFAULT NULL,
  `electric_date_12` date DEFAULT NULL,
  `electric_value_1` decimal(8,2) DEFAULT NULL,
  `electric_value_2` decimal(8,2) DEFAULT NULL,
  `electric_value_3` decimal(8,2) DEFAULT NULL,
  `electric_value_4` decimal(8,2) DEFAULT NULL,
  `electric_value_5` decimal(8,2) DEFAULT NULL,
  `electric_value_6` decimal(8,2) DEFAULT NULL,
  `electric_value_7` decimal(8,2) DEFAULT NULL,
  `electric_value_8` decimal(8,2) DEFAULT NULL,
  `electric_value_9` decimal(8,2) DEFAULT NULL,
  `electric_value_10` decimal(8,2) DEFAULT NULL,
  `electric_value_11` decimal(8,2) DEFAULT NULL,
  `electric_value_12` decimal(8,2) DEFAULT NULL,
  `fuel_name` varchar(255) DEFAULT NULL,
  `fuel_account_number` varchar(255) DEFAULT NULL,
  `fuel_primary_type` int(11) DEFAULT NULL,
  `simple_fuel_units` int(11) DEFAULT NULL,
  `simple_electric_winter` int(11) DEFAULT NULL,
  `simple_fuel_gas_high` int(11) DEFAULT NULL,
  `simple_fuel_gas_low` int(11) DEFAULT NULL,
  `simple_fuel_total_12` int(11) DEFAULT NULL,
  `fuel_detailed_units` int(11) DEFAULT NULL,
  `fuel_start_date` date DEFAULT NULL,
  `fuel_date_1` date DEFAULT NULL,
  `fuel_date_2` date DEFAULT NULL,
  `fuel_date_3` date DEFAULT NULL,
  `fuel_date_4` date DEFAULT NULL,
  `fuel_date_5` date DEFAULT NULL,
  `fuel_date_6` date DEFAULT NULL,
  `fuel_date_7` date DEFAULT NULL,
  `fuel_date_8` date DEFAULT NULL,
  `fuel_date_9` date DEFAULT NULL,
  `fuel_date_10` date DEFAULT NULL,
  `fuel_date_11` date DEFAULT NULL,
  `fuel_date_12` date DEFAULT NULL,
  `fuel_value_1` decimal(8,2) DEFAULT NULL,
  `fuel_value_2` decimal(8,2) DEFAULT NULL,
  `fuel_value_3` decimal(8,2) DEFAULT NULL,
  `fuel_value_4` decimal(8,2) DEFAULT NULL,
  `fuel_value_5` decimal(8,2) DEFAULT NULL,
  `fuel_value_6` decimal(8,2) DEFAULT NULL,
  `fuel_value_7` decimal(8,2) DEFAULT NULL,
  `fuel_value_8` decimal(8,2) DEFAULT NULL,
  `fuel_value_9` decimal(8,2) DEFAULT NULL,
  `fuel_value_10` decimal(8,2) DEFAULT NULL,
  `fuel_value_11` decimal(8,2) DEFAULT NULL,
  `fuel_value_12` decimal(8,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `v4_utilities_job_id_index` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=403 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `v4_uuids`
--

DROP TABLE IF EXISTS `v4_uuids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_uuids` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned NOT NULL,
  `collection_id` int(10) unsigned NOT NULL,
  `uuid` char(36) DEFAULT NULL,
  `order` smallint(5) unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `v4_uuids_job_id_index` (`job_id`),
  KEY `v4_uuids_collection_id_index` (`collection_id`),
  KEY `v4_uuids_uuid_index` (`uuid`),
  KEY `v4_uuids_order_index` (`order`)
) ENGINE=InnoDB AUTO_INCREMENT=4346 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-02-29 20:50:45
-- MySQL dump 10.13  Distrib 5.7.10, for Linux (x86_64)
--
-- Host: snugg-next-dev2.cnvjbymvmfla.us-east-1.rds.amazonaws.com    Database: snuggnextdev
-- ------------------------------------------------------
-- Server version	5.6.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `v4_rec_definitions`
--

DROP TABLE IF EXISTS `v4_rec_definitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_rec_definitions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `category` varchar(40) DEFAULT NULL,
  `rec_name` varchar(40) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `inclusion_key` varchar(40) DEFAULT NULL,
  `improved_cost_key` varchar(40) DEFAULT NULL,
  `why_it_matters` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `v4_rec_definitions`
--

LOCK TABLES `v4_rec_definitions` WRITE;
/*!40000 ALTER TABLE `v4_rec_definitions` DISABLE KEYS */;
INSERT INTO `v4_rec_definitions` VALUES (1,'air_leakage','Air Leakage','AirSeal','Seal Air Leaks','AirSeal','ImpInfilCost','Air sealing is typically the most cost effective improvement you can make to your home. To properly seal out air leaks, a large fan called a blower door is used to depressurize your house. This makes air leaks easy to find, so corrective measures can be taken. A good air sealing job will dramatically increase the comfort of your home and help you save significant energy.'),(2,'attic','Attic','Attic','Insulate Attic','InsulateAttic','ImpAtticCost','Adding insulation to your attic can lead to a significant reduction in your utility bills. This process is often combined with careful air sealing of the ceiling from the attic side to ensure the new insulation perform at its maximum level.'),(3,'basement','Basement','BsmtSlab','Insulate Basement','InsulateBG','ImpBGCost','Insulating your basement walls will increase the overall temperature of your basement and make the floors above more comfortable. A fiberglass blanket with a vinyl backing can be installed along the basement walls. Or the walls can be framed out, insulated, and finished with drywall to make a \"finished basement\".'),(4,'cooling','Cooling System','Cooling','Upgrade Cooling System','CoolingSystem','ImpCoolingCost','Install a more efficient air conditioner or evaporative cooler. Depending on the age of the unit, substantial savings may be gained by replacing it with an ENERGY STAR rated appliance. If it doesn\'t quite make sense to replace your air conditioner now, be prepared to choose a high efficiency ENERGY STAR unit (14 SEER or higher) when it finally wears out.'),(5,'crawl','Crawl Space','Crawl','Insulate Crawl Space','InsulateCrawl','ImpCrawlCost','Insulating and \"conditioning\" your crawl space will increase the overall temperature of the space and make the floors above it more comfortable. Crawlspaces can be converted from an unconditioned to a conditioned space which includes sealing off any vents to the outside, insulating the foundation walls, and installing a vapor barrier on top of the dirt floor. It often includes adding a jump vent to the main conditioned space in the house or ducting the furnace and/or A/C into the crawlspace as well.'),(6,'dhw','Water Heater','DHW','Upgrade Water Heater','UpgradeDHW','ImpDHWCost','Replace your water heater with a tankless model or a heat pump water heater to save energy and reduce the ability for dangerous Carbon Monoxide to leak into your home.'),(7,'dhw_temp','Hot Water Temperature','DHWTemp','Lower Hot Water Temp','LowerDHWTemp','ImpDHWTempCost1','Set water heater to deliver at 122 F (use a cooking thermometer to test the temperature at the faucet) or the lowest practical setting for your preferences. A good measure is if you can take a shower using only hot water (not adding cold water), but still above 122 F. This will reduce standby energy loss and risk of scalding.'),(8,'doors','Doors','Door','Replace Doors or Add Storm Doors','NewDoor','ImpDoorCost','Adding storm door(s) or replacing your current exterior door(s) with insulated ones will help save energy and help reduce drafts.'),(9,'duct','Ducts','SealDucts','Seal Duct Work','SealDucts','ImpDuctCost','If you have a forced air system for heating or cooling, sealing the connections and penetrations with mastic will ensure that all of the air makes it to where it was designed to go. This increases the efficiency of your heating and cooling system and improves comfort. If you have a boiler system for heating, insulating the pipes will increase the effectiveness of the system.'),(10,'floor','Frame Floor','Floor','Insulate Frame Floor','InsulateFloor','ImpFloorCost','Insulating floors above the garage and cantilevers can dramatically increase the comfort of bedrooms and other living spaces. This is done by drilling holes in the ceiling of the garage or floor of the cantilever and then filling the cavity between the floor joists with blown-in insulation.'),(11,'freezer','Freezer','Freezer','Replace Freezer','Freezer','ImpFreezerCost','Old freezers can easily cost twice as much to operate as a new freezers. Replace your old freezer with a new ENERGY STAR model and be sure to recycle the old one (keeping it running in your garage or basement will use even more energy).'),(12,'heating','Heating System','Heating','Upgrade Heating System','HeatingSystem','ImpHeatCost','Install a more efficient furnace, boiler or heat pump. Depending on the age of the unit, substantial savings may be gained by replacing it with an ENERGY STAR rated appliance. If you\'re heating with gas, look for a sealed combustion unit. They\'re much safer since the exhaust pathway from the unit is sealed and goes directly outside. If it doesn\'t quite make sense to replace your heating system now, be prepared to replace it with a high efficiency ENERGY STAR unit when it finally wears out.'),(13,'lighting','Lighting','CFL','Upgrade Lighting','CFL','ImpCFLCost','Compact Florescent Lightbulbs (CFLs) use 1/4 of the energy of regular incandescent light bulbs and last 8 to 15 times as long. Light Emitting Diode (LED) bulbs use 12% of the energy of regular incandescent light bulbs and last up to 50 times as long. Replacing incandescent bulbs with CFLs or LEDs will save significant energy and replacement costs over time.'),(14,'refrigerators','Refrigerator','Refrigerator','Refrigerator','Refrigerator','ImpRefrigeratorCost','Old refrigerators can often cost twice as much to operate as a new refrigerator. Replace your old refrigerator with a new ENERGY STAR model and be sure to recycle the old one (keeping it running in your garage or basement will use even more energy).'),(15,'thermostat','Thermostat','Thermostat','Thermostat Set Points','SetbackThermostat','ImpThermostatCost','Installing a programmable thermostat (or correctly setting the one you currently have) will help you to use less energy when you\'re not at home or when you\'re sleeping.'),(16,'wall','Walls','Walls','Insulate Walls','InsulateWalls','ImpWallCost','Insulating your walls can lead to a significant reduction in utility bills. The is done by drilling small holes in the wall cavities either from the inside or outside and filling the space with cellulose, fiberglass, or even foam insulation. If it\'s time to replace your exterior siding, then be sure to ask your contractor about adding a layer of rigid foam underneath the new sheathing of 1\" or more.'),(17,'window','Windows','Windows','Upgrade Windows','Windows','ImpWindowCost','Adding storm windows, solar screens or replacing your current windows can save energy and help reduce drafts or solar gain.'),(18,'health','Health & Safety',NULL,'Health & Safety',NULL,NULL,NULL),(19,'custom','Custom',NULL,'Custom Recommendation',NULL,NULL,NULL),(20,'vault','Vaulted Ceiling','Ceiling','Insulate Vault','InsulateVault','ImpCeilingCost','Vaulted ceilings are almost always poorly insulated. If your roof is in need of replacement, it\'s a perfect time to also insulate the area between the interior drywall and the roof deck. Dense packing this cavity with blown fiberglass or cellulose will help prevent significant heat loss.'),(21,'pool','Pool Pumps','Pool','Upgrade Pool Pump','PoolPump','ImpPoolPumpCost','Single-speed pool pumps can often equate to half of an entire home\'s electricity demand. Substantial energy savings can be achieved by replacing it with a variable speed pool pump.'),(22,'dishwasher','Dishwasher','Dishwasher','Upgrade Dishwasher','Dishwasher','ImpDishWasherCost','Old dishwashers can be energy and water hogs. When your current dishwasher breaks or otherwise needs to be replaced, be sure to choose an ENERGY STAR model with the highest Energy Factor (EF) that\'s within your budget. More information is available at http://www.energystar.gov.'),(23,'clotheswasher','Clotheswasher','ClothesWasher','Upgrade Clotheswasher','ClothesWasher','ImpClothesWasherCost','Old clothes washers can be energy and water hogs. When your current clothes washer breaks or otherwise needs to be replaced, be sure to choose a front loading ENERGY STAR model with the highest Modified Energy Factor (MEF) that\'s within your budget. More information is available at http://www.energystar.gov.');
/*!40000 ALTER TABLE `v4_rec_definitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `v4_collection_definitions`
--

DROP TABLE IF EXISTS `v4_collection_definitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_collection_definitions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `min` tinyint(4) NOT NULL DEFAULT '0',
  `max` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `v4_collection_definitions`
--

LOCK TABLES `v4_collection_definitions` WRITE;
/*!40000 ALTER TABLE `v4_collection_definitions` DISABLE KEYS */;
INSERT INTO `v4_collection_definitions` VALUES (1,'attic',0,2),(2,'dhw',1,2),(3,'door',2,5),(4,'freezer',0,3),(5,'hvac',1,0),(6,'refrigerator',1,4),(7,'vault',0,2),(8,'wall',1,2),(9,'window',1,2),(10,NULL,0,0),(11,'caz',1,3);
/*!40000 ALTER TABLE `v4_collection_definitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `v4_fields`
--

DROP TABLE IF EXISTS `v4_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_fields` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('Input','Select','Radio','Textarea') DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `description` text,
  `min` decimal(11,2) DEFAULT NULL,
  `max` decimal(11,2) DEFAULT NULL,
  `decimals` tinyint(4) DEFAULT NULL,
  `is_required` tinyint(1) NOT NULL DEFAULT '0',
  `examples` varchar(255) DEFAULT NULL,
  `small_label` varchar(100) DEFAULT NULL,
  `jobform_section_id` int(11) DEFAULT NULL,
  `rec_definition_id` int(11) DEFAULT NULL,
  `collection_definition_id` int(11) DEFAULT NULL,
  `namespace` varchar(100) DEFAULT NULL,
  `a1_migration_table` varchar(100) DEFAULT NULL,
  `a1_migration_column` varchar(100) DEFAULT NULL,
  `migration_r_group` varchar(100) DEFAULT NULL,
  `r_name` varchar(255) DEFAULT NULL,
  `csv` varchar(255) DEFAULT NULL,
  `addtl_info` varchar(255) DEFAULT NULL,
  `is_select` tinyint(1) DEFAULT '0',
  `suffix` varchar(255) DEFAULT NULL,
  `om_a1_base_key` varchar(255) DEFAULT NULL,
  `om_direct_set_base` varchar(255) DEFAULT NULL,
  `om_direct_set_improved` varchar(255) DEFAULT NULL,
  `target_table` varchar(50) DEFAULT NULL,
  `target_column` varchar(50) DEFAULT NULL,
  `base_optiongroup_id` int(11) DEFAULT NULL,
  `imp_optiongroup_id` int(11) DEFAULT NULL,
  `tech_spec_definition_id` int(11) DEFAULT NULL,
  `tech_spec_section_order` int(11) DEFAULT NULL,
  `nowandgoal_rec_id` int(11) DEFAULT NULL,
  `nowandgoal_rec_order` int(11) DEFAULT NULL,
  `hpxml_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `v4_fields_label_unique` (`label`),
  UNIQUE KEY `v4_fields_om_a1_base_key_unique` (`om_a1_base_key`),
  UNIQUE KEY `v4_fields_om_direct_set_base_unique` (`om_direct_set_base`),
  UNIQUE KEY `v4_fields_om_direct_set_improved_unique` (`om_direct_set_improved`),
  KEY `namespace` (`namespace`),
  KEY `collection_definition_id` (`collection_definition_id`),
  KEY `label` (`label`),
  KEY `hpxml_id` (`hpxml_id`)
) ENGINE=InnoDB AUTO_INCREMENT=974 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `v4_fields`
--

LOCK TABLES `v4_fields` WRITE;
/*!40000 ALTER TABLE `v4_fields` DISABLE KEYS */;
INSERT INTO `v4_fields` VALUES (1,'Input','Year Built','Enter the year the home or building was constructed. If there was a major addition made to the home, the \"Year built\" should be entered as the year the majority of the area that is heated and air conditioned was built.',1800.00,2015.00,0,1,'1923,2003',NULL,1,NULL,NULL,NULL,'jobform_buildings','year_built',NULL,NULL,'Building > Year Built','Building',0,'#','A1YearBuilt',NULL,NULL,NULL,'year_built',NULL,NULL,1,1,NULL,NULL,NULL),(2,'Input','Conditioned Area','Enter the total area of the home that is heated or air conditioned. This may be different from the typical measure of the size of the home, especially if you have a heated garage or similar area of the home that receives heating or air conditioning. Make sure to include any space of the home that has heating or air conditioning, including conditioned basements (unless you mark the next field \"Area Includes Basement\" as No). ',100.00,100000.00,2,0,'850,3600',NULL,1,NULL,NULL,NULL,'jobform_buildings','conditioned_area',NULL,NULL,'Building > Conditioned Area','Building',0,'ft²','A1BaseArea',NULL,NULL,NULL,'conditioned_area',NULL,NULL,1,2,NULL,NULL,NULL),(3,'Input','Average Wall Height','Enter the average floor to ceiling wall height (internal measurement). This is used to calculate the volume of the home as well as the wall surface area. <br><br><strong>Please note:</strong> When we calculate the volume of the house, we add an additional foot of height for the basement rim joists (if there is a basement), and an additional foot of height for every story above one (if there are any).',6.00,20.00,2,0,'7.5,12',NULL,1,NULL,NULL,NULL,'jobform_buildings','avg_wall_height',NULL,NULL,'Building > Average Wall Height','Building',0,'ft','BaseWallHeight',NULL,NULL,NULL,'avg_wall_height',NULL,NULL,1,4,NULL,NULL,NULL),(4,'Input','House Length','Enter the length of the longest side of the smallest rectangle into which the home\'s footprint will fit. <br><br><strong>Please note:</strong> This is used only to calculate the surface area of the exterior walls, and has nothing to do with the conditioned square footage, volume, or any other calculations.<br><br>\n\nThis should give a fairly precise estimate of wall surface area in all circumstances except when the house is shaped like a U. If the home is shaped like a U, you\'ll need to override the total wall sqft in the Wall Details section with the additional surface area. See the knowledge base article on this for more information.',10.00,500.00,1,0,'21.5,60','(Exterior Wall)',1,NULL,NULL,NULL,'jobform_buildings','length',NULL,NULL,'Building > Length','Building',0,'ft','A1BaseLength',NULL,NULL,NULL,'length',NULL,NULL,1,5,NULL,NULL,NULL),(5,'Input','House Width','Enter the width of the longest side of the smallest rectangle into which the home\'s footprint will fit. <br><br><strong>Please note:</strong> This is used only to calculate the surface area of the walls, and has nothing to do with the conditioned square footage, volume, or any other calculations. This should give a fairly precise estimate of wall surface area in all circumstances except when the house is shaped like a U.',10.00,500.00,1,0,'21.5,60','(Exterior Wall)',1,NULL,NULL,NULL,'jobform_buildings','width',NULL,NULL,'Building > Width','Building',0,'ft','A1BaseWidth',NULL,NULL,NULL,'width',NULL,NULL,1,6,NULL,NULL,NULL),(6,'Input','Floors Above Grade','Select the number of stories for the living area of this home, not counting any basement or walkout as a story. If this home is in a multi-story, multi-family complex, report only those stories in the living area of this particular home, which could likely be less than the total number of stories of the building.',1.00,5.00,2,0,'1.5,4',NULL,1,NULL,NULL,NULL,'jobform_buildings','floors_above_grade',NULL,NULL,'Building > Floors Above Grade','Building',0,'#','A1BaseStories',NULL,NULL,NULL,'floors_above_grade',NULL,NULL,1,7,NULL,NULL,NULL),(7,'Input','Number of Occupants','Enter the number of people that live full-time in the home. If there are people that live in the home only part of the year (e.g., a student away at college or an adult that travels for business a significant amount each year) then for purposes of this audit count that individual as only 1/2 (0.5) of a person.',1.00,100.00,1,0,'2,3.5',NULL,1,NULL,NULL,NULL,'jobform_buildings','occupant_count',NULL,NULL,'Building > Occupant Count','Building',0,'#','A1BaseOccupants',NULL,NULL,NULL,'occupant_count',NULL,NULL,1,8,NULL,NULL,NULL),(8,'Select','Type of Home','Select the type of home that most closely resembles this home. Single-family Attached would be a duplex or a townhome with shared walls. <br><br><strong>Please note:</strong> that only multi-family units with independently metered fuel and electricity can be modeled with this software.',NULL,NULL,NULL,0,NULL,NULL,1,NULL,NULL,'hometype','jobform_buildings','home_type',NULL,NULL,'Building > Home Type','Building',1,NULL,'A1BaseBuildingType',NULL,NULL,NULL,'home_type',59,NULL,1,10,NULL,NULL,NULL),(9,'Select','Front of Building Orientation','Select the closest direction that the Length of the house as designated above faces (either of the opposite directions is fine). If the home is square, then choose the direction the main entry door of the home faces.',NULL,NULL,NULL,0,NULL,NULL,1,NULL,NULL,NULL,'jobform_buildings','plan_rotation',NULL,NULL,'Building > Plan Rotation','Building',1,NULL,'A1PlanRotation',NULL,NULL,NULL,'plan_rotation',51,NULL,1,11,NULL,NULL,NULL),(10,'Radio','Tuck Under Garage','Is there any conditioned living space over an unconditioned garage, cantilever, or frame floor that might need floor insulation? <br><br> This data is used for the \"Insulate Floors\" recommendation. For cantilevers, adjust the total sqft on the refine screen or the details section.',NULL,NULL,NULL,0,NULL,NULL,1,NULL,NULL,'','jobform_buildings','tuck_under_garage',NULL,NULL,'Building > Tuck Under Garage','Building',1,NULL,'A1TuckUnder',NULL,NULL,NULL,'tuck_under_garage',1,NULL,1,13,NULL,NULL,NULL),(11,'Radio','Garage Size','Enter the number of cars that could fit in the the parking area of the garage. The software assumes an extra 100 sqft of storage and other space and each car takes up 200 sqft of space.<br><br>This data is used for the \"Insulate Floors\" recommendation. For cantilevers, adjust the total sqft on the refine screen or the details section.',NULL,NULL,NULL,0,NULL,NULL,1,NULL,NULL,'garage','jobform_buildings','garage_size',NULL,NULL,'Building > Garage Size','Building',1,NULL,'A1TuckUnderCars',NULL,NULL,NULL,'garage_size',5,NULL,1,14,NULL,NULL,NULL),(12,'Input','Summary','Type a short sentence that details a concern from the homeowner. This could be regarding comfort, health and safety, energy savings, aesthetics, noise, etc. There is no right or wrong answer.',NULL,255.00,NULL,0,NULL,NULL,2,NULL,NULL,NULL,'jobform_concerns','summary',NULL,NULL,'Concerns > Summary','Homeowner Concerns',0,NULL,NULL,NULL,NULL,'v4_concerns','summary',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'Textarea','Detail','Type a more detailed description of this concern from the homeowner.',NULL,NULL,NULL,0,NULL,NULL,2,NULL,NULL,NULL,'jobform_concerns','detail',NULL,NULL,'Concerns > Detail %{n}','Homeowner Concerns',0,NULL,NULL,NULL,NULL,'v4_concerns','detail',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(56,'Radio','Programmable Thermostat Installed','Is a programmable (setback) thermostat installed in the house? If it is installed, but not used, still check this box and adjust the thermostat settings accordingly. This button determines if a cost is added to the Programmable Thermostat recommendation. If you check Yes, then no cost will be added, but the software will still recommend ideal setpoints for the home for energy savings. If you check No, then a cost will be added to the recommendation and the ideal setpoints will also be shown in the recommendation.',NULL,NULL,NULL,0,NULL,NULL,4,NULL,NULL,NULL,'jobform_thermostat','programmable_thermostat',NULL,NULL,'Thermostat > Programmable Installed','Thermostat',1,NULL,'A1ThermostatImp',NULL,NULL,NULL,NULL,1,NULL,5,1,NULL,NULL,NULL),(57,'Input','Heating Setpoint High','Enter the heating thermostat temperature setting (&deg;F) that is used most often when the home is occupied and used by people for normal daily activities. This is often the setting used when people are at home in the mornings before going to school or work and again when they return home from school and work in the afternoon or evening before they go to sleep for the night.<br><br>\n\n<strong>Note:</strong> The goal of this is to determine the average temperature of the home for this time period and situation (cooling or heating). If the heating system just can\'t keep up and never meets the setpoint on cold days or similar for the cooling system, then adjust the setpoint to closer resemble the actual temperature of the home. Since this is hard to determine, you may enter a range of temperatures for each of the setpoints separated by a dash (no spaces). For example, you can set the Low temp setpoint for heating at 60-65 and the High temp setpoint at 68-71.',50.00,90.00,NULL,0,'65,71,63-68','(at home)',4,15,NULL,NULL,'jobform_thermostat','heating_setpoint_high','thermostat','heating_high','Thermostat > Heating Setpoint High','Thermostat',0,'°F','A1BaseTemp1',NULL,'A1ImpTemp1',NULL,NULL,NULL,NULL,5,2,15,NULL,NULL),(58,'Input','Heating Setpoint Low','Enter the heating thermostat temperature setting (&deg;F) that is used most often when the home is not occupied. This is often the setting used when people have left the home in the mornings to go to school or work and again when they have gone to sleep for the night.<br><br>\n\n<strong>Note:</strong> The goal of this is to determine the average temperature of the home for this time period and situation (cooling or heating). If the heating system just can\'t keep up and never meets the setpoint on cold days or similar for the cooling system, then adjust the setpoint to closer resemble the actual temperature of the home. Since this is hard to determine, you may enter a range of temperatures for each of the setpoints separated by a dash (no spaces). For example, you can set the Low temp setpoint for heating at 60-65 and the High temp setpoint at 68-71.',50.00,90.00,NULL,0,'62,65,58-65','(not at home/sleeping)',4,15,NULL,NULL,'jobform_thermostat','heating_setpoint_low','thermostat','heating_low','Thermostat > Heating Setpoint Low','Thermostat',0,'°F','A1BaseTemp2',NULL,'A1ImpTemp2',NULL,NULL,NULL,NULL,5,3,15,NULL,NULL),(59,'Input','Cooling Setpoint High','Enter the cooling thermostat temperature setting (&deg;F) that is used most often when the home is not occupied. This is often the setting used when people have left the home in the mornings to go to school or work and again when they have gone to sleep for the night.<br><br>\n\n<strong>Note:</strong> The goal of this is to determine the average temperature of the home for this time period and situation (cooling or heating). If the heating system just can\'t keep up and never meets the setpoint on cold days or similar for the cooling system, then adjust the setpoint to closer resemble the actual temperature of the home. Since this is hard to determine, you may enter a range of temperatures for each of the setpoints separated by a dash (no spaces). For example, you can set the Low temp setpoint for heating at 60-65 and the High temp setpoint at 68-71.',50.00,90.00,NULL,0,'78,82,74-80','(not at home)',4,15,NULL,NULL,'jobform_thermostat','cooling_setpoint_high','thermostat','cooling_high','Thermostat > Cooling Setpoint High','Thermostat',0,'°F','A1BaseCoolingTemp2',NULL,'ImpCoolingTemp1',NULL,NULL,NULL,NULL,5,4,15,NULL,NULL),(60,'Input','Cooling Setpoint Low','Enter the cooling thermostat temperature setting (&deg;F) that is used most often when the home is occupied and used by people for normal daily activities. This is often the setting used when people are at home in the mornings before going to school or work and again when they return home from school and work in the afternoon or evening before they go to sleep for the night.<br><br>\n\n<strong>Note:</strong> The goal of this is to determine the average temperature of the home for this time period and situation (cooling or heating). If the heating system just can\'t keep up and never meets the setpoint on cold days or similar for the cooling system, then adjust the setpoint to closer resemble the actual temperature of the home. Since this is hard to determine, you may enter a range of temperatures for each of the setpoints separated by a dash (no spaces). For example, you can set the Low temp setpoint for heating at 60-65 and the High temp setpoint at 68-71.',50.00,90.00,NULL,0,'70,74,70-76','(at home)',4,15,NULL,NULL,'jobform_thermostat','cooling_setpoint_low','thermostat','cooling_low','Thermostat > Cooling Setpoint Low','Thermostat',0,'°F','A1BaseCoolingTemp1',NULL,'ImpCoolingTemp4',NULL,NULL,NULL,NULL,5,5,15,NULL,NULL),(61,'Input','System Name',NULL,NULL,NULL,NULL,0,NULL,NULL,5,NULL,5,'hvac','jobform_hvacs','name',NULL,NULL,'HVAC > System %{n} Name','HVAC',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,1,NULL,NULL,NULL),(62,'Select','System %{n} Type','You can have an HVAC system that is either standalone Heating, standalone Cooling, or a combined heating and cooling system (Both). If the heating and cooling systems share duct work, then choose Both. If the delivery method (duct work) is not shared between heating and cooling units, then choose a standalone heating system, and add another system and designate it as cooling. Also, if you have three heating systems that are identical in age and type and duct work details, then there\\\'s no need to create three systems here. You can just create one system and add up the total capacity. Same with cooling. But if the age and/or type are different, then you need to break them out separately.',NULL,NULL,NULL,0,NULL,NULL,5,NULL,5,'hvac:type','jobform_hvacs','type',NULL,NULL,'HVAC > System %{n} Type','HVAC',1,NULL,NULL,NULL,NULL,NULL,NULL,11,NULL,4,2,NULL,NULL,NULL),(63,'Select','Heating Equipment','Select the type of heating system or equipment type that is used for the home.',NULL,NULL,NULL,0,NULL,NULL,5,12,5,'hvac:equipment:heat','jobform_hvacs','equipment','heating','equipment','HVAC > Heating System %{n} Type','HVAC - Heating',1,NULL,'BaseHeatType%{heatingIndex}',NULL,'ImpHeatType%{heatingIndex}',NULL,NULL,12,12,4,3,12,1,NULL),(64,'Select','Heating Energy Source','This is the primary fuel source. It is used to set prices and energy content.',NULL,NULL,NULL,0,NULL,NULL,5,12,5,'hvac:heat','jobform_hvacs','energy_source','heating','fuel_type','HVAC > Heating System %{n} Fuel','HVAC - Heating',1,NULL,'A1BaseHeatFuel%{heatingIndex}',NULL,'ImpHeatFuel%{heatingIndex}',NULL,NULL,17,17,4,4,12,2,NULL),(66,'Select','Age of Heating Equipment','Select the age range of the heating or cooling equipment.',NULL,NULL,NULL,0,NULL,NULL,5,NULL,5,'hvac:heat','jobform_hvacs','heating_age',NULL,NULL,'HVAC > Heating System %{n} Age','HVAC - Heating',1,NULL,'A1BaseHeatAge%{heatingIndex}',NULL,NULL,NULL,NULL,15,NULL,4,5,NULL,NULL,NULL),(67,'Input','% of Total Heating Load','Enter the proportion of the total load for heating or cooling that this system represents. The combined heating load percentage for all heating systems specified must add up to 100%. Similarly, the combined cooling load percentage for all cooling systems specified must add up to 100%.',0.00,100.00,0,0,NULL,NULL,5,12,5,'hvac:heat:load','jobform_hvacs','load_percent_heating','heating','load_percent_heating','HVAC > Heating System %{n} % of Load','HVAC - Heating',0,'%','A1BaseHeatPct%{heatingIndex}',NULL,'ImpHeatPct%{heatingIndex}',NULL,NULL,NULL,NULL,4,6,12,3,NULL),(68,'Input','Heating Capacity','Enter the output capacity of the heating equipment in (Btu/hr). <br><br><strong>NOTE:</strong> This has changed since v3 of Snugg Pro. v4 and later requires the number be in Btu/hr, not kBtu/hr. All v3 jobs that were migrated to v4 have been converted to the proper number by multiplying it by 1000.',1000.00,1000000.00,0,0,'48000,100000',NULL,5,12,5,'hvac:heat','jobform_hvacs','heating_capacity','heating','capacity','HVAC > Heating System %{n} Capacity','HVAC - Heating',0,'BTU/h','BaseHeatSize%{heatingIndex}',NULL,'ImpHeatSize%{heatingIndex}',NULL,NULL,NULL,NULL,4,7,12,4,NULL),(69,'Select','Duct Location','Select the location of the duct work for this system.',NULL,NULL,NULL,0,NULL,NULL,5,9,5,'hvac:duct:location','jobform_hvacs','ducts_location',NULL,NULL,'HVAC > Duct System %{n} Location','HVAC - Duct',1,NULL,'Base%{__duct_type__}Delivery%{n}/value',NULL,'Imp%{__duct_type__}Delivery%{n}/value',NULL,NULL,18,18,4,40,9,NULL,NULL),(71,'Select','Duct Insulation','Select the type of insulation installed over the duct work for this system. Note: If ducts are covered wholly or partially by incidental insulation present in the cavity in which they are installed, then select the insulation type that most closely matches the average R-value of the insulation. If you know the actual duct insulation R-value, choose Measured (R-Value) and enter the data in the field below.',NULL,NULL,NULL,0,NULL,NULL,5,9,5,'hvac:duct:insulation','jobform_hvacs','ducts_insulation',NULL,NULL,'HVAC > Duct System %{n} Insulation','HVAC - Duct',1,NULL,'Base%{__duct_type__}DuctInsul%{n}/value',NULL,'Imp%{__duct_type__}DuctInsul%{n}/value',NULL,NULL,20,46,4,40,9,NULL,NULL),(72,'Select','Duct Leakage Value','If you perform a duct blaster test, please enter the tested leakage to outside at 25 Pa per RESNET Standard Section 803.7.',0.00,9999.00,2,0,NULL,NULL,5,9,5,'hvac:duct:leakage:value','jobform_hvacs','ducts_leakage_value','duct','(heating|cooling)_leakage_value','HVAC > Duct System %{n} Leakage Value','HVAC - Duct',0,'CFM25','Base%{__duct_type__}DuctLeakage%{n}',NULL,'Imp%{__duct_type__}DuctLeakage%{n}',NULL,NULL,NULL,NULL,4,40,9,NULL,NULL),(73,'Select','Range Fuel Type','Select the type of energy source used by the range and oven in the home. If the home has more than one range and oven, select the one that is used the most. If the range and oven are dual fuel (i.e., have both a fuel heating source and an electricity heating source) select the type that is used to cook most often.',NULL,NULL,NULL,0,NULL,NULL,6,NULL,NULL,NULL,'jobform_appliances','range_fuel',NULL,NULL,'Appliances > Range Fuel','Appliances',1,NULL,'A1BaseRangeFuel',NULL,NULL,NULL,NULL,21,NULL,3,1,NULL,NULL,NULL),(74,'Select','Dryer Fuel Type','Select the type of clothes dryer used in the home. If the home has more than one clothes dryer, select the one that is used most often.',NULL,NULL,NULL,0,NULL,NULL,6,NULL,NULL,NULL,'jobform_appliances','dryer_fuel',NULL,NULL,'Appliances > Dryer Fuel','Appliances',1,NULL,'A1BaseDryerFuel',NULL,NULL,NULL,NULL,22,NULL,3,2,NULL,NULL,NULL),(76,'Select','Refrigerator Age','Select the age range of this refrigerator.',NULL,NULL,NULL,0,NULL,NULL,7,NULL,6,NULL,'jobform_refrigerators','age',NULL,NULL,'Refrigerator > %{n} Age','Refrigerators',1,NULL,'A1BaseRefrigeratorAge%{n}',NULL,NULL,NULL,NULL,56,NULL,20,2,NULL,NULL,NULL),(77,'Select','Refrigerator Size','Select the size range of this refrigerator.',NULL,NULL,NULL,0,NULL,NULL,7,NULL,6,NULL,'jobform_refrigerators','size',NULL,NULL,'Refrigerator > %{n} Size','Refrigerators',1,NULL,'A1BaseRefrigeratorSize%{n}',NULL,NULL,NULL,NULL,58,NULL,20,3,NULL,NULL,NULL),(78,'Input','Refrigerator Name','Select the age range and the size range in cubic feet of the refrigerator. For HPXML purposes, always enter the house\'s \"primary\" refrigerator first.',NULL,30.00,NULL,0,NULL,NULL,7,NULL,6,NULL,'jobform_refrigerators','name',NULL,NULL,'Refrigerator > %{n} Name','Refrigerators',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,20,1,NULL,NULL,NULL),(80,'Input','Total # of Light Bulbs','Count the number of light bulbs in the home. This count assumes an average of 60 watts for each bulb. Remember to look in closets and other hidden areas for lights as well. In the Details section the Base and Improved numbers are calculated as a total of the number of bulbs for each side. ',0.00,999.00,0,0,'30,134',NULL,8,NULL,NULL,NULL,'jobform_lighting','light_fixture_count',NULL,NULL,'Lighting > Total Bulb Count ','Lighting',0,'#',NULL,'BaseLightFixtures','ImpLightFixtures',NULL,NULL,NULL,NULL,17,2,NULL,NULL,NULL),(81,'Select','Door %{n} Type','Select the type of door construction used for each door.',NULL,NULL,NULL,0,NULL,NULL,9,NULL,3,NULL,'jobform_doors','type',NULL,NULL,'Doors > %{n} Type','Doors',1,NULL,'A1BaseDoorType%{n}',NULL,NULL,NULL,NULL,45,NULL,19,1,NULL,NULL,NULL),(82,'Select','Exterior Wall Siding','Select the type of exterior finish material that covers the outside of this home.',NULL,NULL,NULL,0,NULL,NULL,10,16,8,'walls:siding','jobform_walls','siding',NULL,NULL,'Walls > %{n} Exterior Siding','Walls',1,NULL,'A1BaseWallCladding%{?n}',NULL,NULL,NULL,NULL,49,NULL,22,2,16,NULL,NULL),(83,'Select','Exterior Wall Construction','Select the type of construction material used to build the exterior walls of the home that are above grade (above ground).',NULL,NULL,NULL,0,NULL,NULL,10,16,8,'walls:construction','jobform_walls','construction',NULL,NULL,'Walls > %{n} Exterior Construction','Walls',1,NULL,'A1BaseWallConstruction%{?n}',NULL,NULL,NULL,NULL,48,NULL,22,3,16,NULL,NULL),(84,'Radio','Walls Insulated?','Is there insulation in the wall cavities of this home? If so, how good is it? If unsure, please leave blank.<br><br>\n\n<strong>Well</strong>: All cavities contain insulation at full or near full depth with gaps and voids not exceeding 5%.<br><br>\n<strong>Poor</strong>: Majority of cavities contain insulation, but one or more of the following is suspected: low density, low depth, poor installation.<br><br>\n<strong>Yes</strong>: You can confirm that insulation exists, but are unsure of the installation quality.<br><br>\n<strong>No</strong> - No insulation value is applied to cavities.',NULL,NULL,NULL,0,NULL,NULL,10,NULL,8,'walls:insulated','jobform_walls','insulated',NULL,NULL,'Walls > %{n} Insulated','Walls',1,NULL,'A1BaseWallInsul%{n}',NULL,NULL,NULL,NULL,61,NULL,22,1,NULL,NULL,NULL),(85,'Input','Shared Walls North','Enter the percent of this wall that is shared with another unit (assumed an adiabatic wall). ',0.00,100.00,0,0,NULL,NULL,10,NULL,NULL,'multiFamily','jobform_walls','area_north',NULL,NULL,'MultiFamily > % of North Walls Shared','Walls Shared',0,'%','A1NorthWallsPctShared',NULL,NULL,NULL,NULL,NULL,NULL,22,4,NULL,NULL,NULL),(86,'Select','Insulation Depth','Enter the depth of all installed attic or ceiling insulation. If the insulation is not evenly distributed, estimate an average depth for the area. If the insulation is evenly distributed but has different depths installed in different area, use the depth of insulation that covers the largest area. If there is no attic and instead vaulted ceilings, enter an estimate of the thickness of insulation in the vaulted cavity.',NULL,NULL,NULL,0,NULL,NULL,11,NULL,1,NULL,'jobform_attics','insulation_depth',NULL,NULL,NULL,'Attic',1,NULL,'A1BaseAtticCavInsulDepth%{n}',NULL,NULL,NULL,NULL,52,NULL,23,1,NULL,NULL,NULL),(87,'Select','Insulation Type','Select the type of insulation that is installed in the attic or ceiling. If more than one type of insulation is installed, select the type that covers that largest area.',NULL,NULL,NULL,0,NULL,NULL,11,NULL,1,NULL,'jobform_attics','insulation_type',NULL,NULL,NULL,'Attic',1,NULL,'A1BaseAtticCavInsul%{n}',NULL,'A1ImpAtticCavInsul%{n}',NULL,NULL,53,53,23,2,NULL,NULL,NULL),(88,'Input','% of Ceilings Shared','Select the % of heated or conditioned space (from a separatly metered apartment or unit) above your apartment / condominium / single-family attached home? If this is a single family detached home, leave this blank or at 0.',0.00,100.00,0,0,'25,80',NULL,11,NULL,NULL,'multiFamily','jobform_attics','shared_ceiling_percent',NULL,NULL,'MultiFamily > % of Ceilings Shared','Attic',0,'%','A1BaseCeilingsPctShared',NULL,NULL,NULL,NULL,NULL,NULL,23,9,NULL,NULL,NULL),(89,'Input','% of Floors Shared','Select the % of heated or conditioned space (from a separately metered apartment or unit) below your apartment / condominium / single-family attached home? If this is a single family detached home, leave this blank or at 0.',0.00,100.00,0,0,'0,60',NULL,12,NULL,NULL,'multiFamily','jobform_foundations','floors_shared_percent',NULL,NULL,'MultiFamily > % of Floors Shared','Foundation',0,'%','A1BaseFloorsPctShared',NULL,NULL,NULL,NULL,NULL,NULL,25,9,NULL,NULL,NULL),(90,'Input','Foundation: Basement','Select the percentage of foundation that is <strong>basement</strong>, <strong>crawlspace</strong> or <strong>slab on grade</strong>. Total of all three foundation types cannot exceed 100%.',0.00,100.00,0,0,NULL,NULL,12,NULL,NULL,'foundation:basement','jobform_foundations','shared_basement',NULL,NULL,'Foundation > % Basement','Foundation',0,'%','A1BaseBGArea',NULL,NULL,NULL,NULL,NULL,NULL,25,2,NULL,NULL,NULL),(91,'Input','Foundation Above Grade Height','For the parts of the basement or crawl space that are above grade (above ground), enter the average height (in feet) of this exposed foundation for the entire perimeter of the home.',0.00,4.00,1,0,'2,3.5',NULL,12,NULL,NULL,NULL,'jobform_foundations','above_grade_height',NULL,NULL,'Foundation > Above Grade Height','Foundation',0,'ft','A1BaseBGAboveGrade',NULL,NULL,NULL,NULL,NULL,NULL,25,5,NULL,NULL,NULL),(92,'Select','Basement Wall Insulation','Select the type of materials used, if any, on the basement walls of this home. If more than one type of material is used on the basement walls, select the type of material that is used on the most wall area of the basement. If the basement walls have insulation installed on the exterior of the walls, select the option \"Finished walls with insulation\".',NULL,NULL,NULL,0,NULL,NULL,12,NULL,NULL,NULL,'jobform_foundations','insulation_basement',NULL,NULL,'Basement > Wall Insulation Type','Foundation',1,NULL,'A1BaseBGInsulation',NULL,NULL,NULL,NULL,34,NULL,25,6,NULL,NULL,NULL),(93,'Select','Crawlspace Insulation','What you type here will show up in the details page for \"Insulate Crawl Space\" on the homeowner report.',NULL,NULL,NULL,0,NULL,NULL,12,NULL,NULL,NULL,'jobform_foundations','insulation_crawlspace',NULL,NULL,'Crawlspace > Insulation Type','Foundation',1,NULL,'A1BaseCrawlCondition',NULL,NULL,NULL,NULL,36,NULL,25,NULL,NULL,NULL,NULL),(94,'Select','Window Type','Select the type of windows that are installed in the home. If more than one type of window is installed, add a second window system.',NULL,NULL,NULL,0,NULL,NULL,13,NULL,9,NULL,'jobform_windows','type',NULL,NULL,'Windows > %{n} Type','Windows',1,NULL,'A1BaseWindowType%{n}',NULL,NULL,NULL,NULL,64,NULL,8,2,NULL,NULL,NULL),(95,'Select','Window Frame','Select the type of window frame material that is used for the windows installed in the home. If more than one type of window is installed, add a second window system.',NULL,NULL,NULL,0,NULL,NULL,13,NULL,9,NULL,'jobform_windows','frame',NULL,NULL,'Windows > %{n} Frame','Windows',1,NULL,'A1BaseWindowFrame%{?n}',NULL,NULL,NULL,NULL,63,NULL,8,3,NULL,NULL,NULL),(96,'Input','Window: North Area Percent','Enter the % of EXPOSED wall area for each orientation that is made up of window glass area. If some of the wall is shared with another conditioned unit (multi-family, townhome, etc.) put in the % of the exposed area only.',0.00,100.00,0,0,NULL,NULL,NULL,NULL,9,NULL,'jobform_windows','area_north',NULL,NULL,'Windows > %{n} % of North Wall','Windows - Area',0,'%','A1BaseWindowNorth%{n}',NULL,NULL,NULL,NULL,NULL,NULL,8,4,NULL,NULL,NULL),(97,'Input','Skylight Area','Enter the area of any skylights (in square feet) or roof windows that are installed in the home within the heated or air conditioned space of the home.',0.00,10000.00,2,0,NULL,NULL,13,NULL,NULL,NULL,'jobform_windows','skylight_area',NULL,NULL,'Windows > Skylight Area','Windows',0,'ft²','A1BaseSkylights',NULL,NULL,NULL,NULL,NULL,NULL,29,1,NULL,NULL,NULL),(98,'Input','Blower Door Reading','The baseline airflow, in cubic feet per minute, through leaks in the building when there is a pressure difference between the building and ambient of 50 Pascals. This is the result of your blower door test if you perform one. If you do not enter a number here, the software will determine an appropriate number based on the age and size of the home.<br><br>\nOn the improved side, the default recommendation is a 25% reduction in the air leakage. You may of course override this to whatever number you feel you\'ll be able to achieve.',0.00,99999.00,2,0,'863,2712',NULL,14,1,NULL,'blower','jobform_leakage','initial_air_leakage','air_leakage','air_infiltration','air_leakage_blower_door_reading','Air Leakage',0,'CFM50',NULL,'BaseInfiltration','ImpInfiltration',NULL,NULL,NULL,NULL,18,1,1,NULL,NULL),(99,'Select','DHW Fuel','Select the type of energy source used to provide domestic hot water for the home. Domestic hot water is typically the hot water that comes from the faucets, showers, bathtubs, washing machines and dishwashers in the home. If more than one type of energy source is used to provide hot water, select the type that provides the most gallons of hot water.',NULL,NULL,NULL,0,NULL,NULL,15,NULL,2,'dhw','jobform_dhws','fuel',NULL,NULL,NULL,'DHW',1,NULL,'A1BaseDHWFuel%{n}',NULL,NULL,NULL,NULL,39,NULL,6,NULL,6,1,NULL),(100,'Select','DHW Type','Select the type of the hot water system that stores or delivers the domestic hot water for the home. If more than two type of system is used for hot water in the home, select the type for the one that delivers the most gallons of hot water to the home.<br><br>\n\n<strong>Note</strong>: If you have an Sidearm Tank to a Boiler (Indirect Tank), you will need to manually set the EF on the Water Heater Details. Please refer to the EF Calculator that\'s available in the knowledge base to determine the EF of the total system.',NULL,NULL,NULL,0,NULL,NULL,15,NULL,2,'dhw','jobform_dhws','type',NULL,NULL,NULL,'DHW',1,NULL,'A1BaseDHWType%{n}',NULL,NULL,NULL,NULL,43,NULL,6,NULL,6,2,NULL),(101,'Select','DHW Age','Select the age in years of the hot water system that stores or delivers the domestic hot water for the home. If more than one type of system is used for hot water in the home, select the age for the one that delivers the most gallons of hot water to the home.',NULL,NULL,NULL,0,NULL,NULL,15,NULL,2,'dhw','jobform_dhws','age',NULL,NULL,'DHW > %{n} Age Range','DHW',1,NULL,'A1BaseDHWAge%{n}',NULL,NULL,NULL,NULL,38,NULL,6,NULL,6,3,NULL),(102,'Select','DHW Location','Select the where the hot water system that stores or delivers the domestic hot water for the home is located. If more than one type of system is used for hot water in the home, select the location for the one that delivers the most gallons of hot water to the home.',NULL,NULL,NULL,0,NULL,NULL,15,NULL,2,'dhw','jobform_dhws','location',NULL,NULL,NULL,'DHW',1,NULL,'A1BaseDHWLocation%{n}',NULL,NULL,NULL,NULL,40,NULL,6,NULL,6,4,NULL),(103,'Select','DHW Temperature Settings','Select the temperature setting for the hot water system that stores or delivers the domestic hot water for the home. If more than one type of system is used for hot water in the home, select the temperature setting for the one that delivers the most gallons of hot water to the home.',NULL,NULL,NULL,0,NULL,NULL,15,NULL,2,'dhw','jobform_dhws','temp',NULL,NULL,'DHW > %{n} Temperature','DHW',1,NULL,'A1BaseDHWTemp%{n}',NULL,NULL,NULL,NULL,42,NULL,6,NULL,NULL,5,NULL),(104,'Radio','Ambient Carbon Monoxide','Choose the appropriate description for this test. If you performed an actual test and it passed, then choose \"Passed\", if the test failed, then choose \"Failed\". If you did not perform this test, but suspect there might be issues or have notes to provide the homeowner or contractor, then choose \"Warning\". If you did not perform this test and do not want the test information to show up on the homeowner report, then choose \"Not Tested\".',NULL,NULL,NULL,0,NULL,NULL,17,NULL,NULL,NULL,'jobform_health','ambient_carbon_monoxide',NULL,NULL,'Health & Safety > Ambient Carbon Monoxide','Safety Tests',1,NULL,NULL,NULL,NULL,'v4_health','ambient_carbon_monoxide',32,NULL,NULL,NULL,NULL,NULL,NULL),(105,'Radio','Natural Condition Spillage','Choose the appropriate description for this test. If you performed an actual test and it passed, then choose \"Passed\", if the test failed, then choose \"Failed\". If you did not perform this test, but suspect there might be issues or have notes to provide the homeowner or contractor, then choose \"Warning\". If you did not perform this test and do not want the test information to show up on the homeowner report, then choose \"Not Tested\".',NULL,NULL,NULL,0,NULL,NULL,17,NULL,NULL,NULL,'jobform_health','nat_cond_spillage',NULL,NULL,'Health & Safety > Natural Condition Spillage','Safety Tests',1,NULL,NULL,NULL,NULL,'v4_health','nat_cond_spillage',32,NULL,NULL,NULL,NULL,NULL,NULL),(106,'Radio','Worst Case Depressurization','Choose the appropriate description for this test. If you performed an actual test and it passed, then choose \"Passed\", if the test failed, then choose \"Failed\". If you did not perform this test, but suspect there might be issues or have notes to provide the homeowner or contractor, then choose \"Warning\". If you did not perform this test and do not want the test information to show up on the homeowner report, then choose \"Not Tested\".',NULL,NULL,NULL,0,NULL,NULL,17,NULL,NULL,NULL,'jobform_health','worst_case_dep',NULL,NULL,'Health & Safety > Worst Case Depressurization','Safety Tests',1,NULL,NULL,NULL,NULL,'v4_health','worst_case_dep',32,NULL,NULL,NULL,NULL,NULL,NULL),(107,'Radio','Worst Case Spillage','Choose the appropriate description for this test. If you performed an actual test and it passed, then choose \"Passed\", if the test failed, then choose \"Failed\". If you did not perform this test, but suspect there might be issues or have notes to provide the homeowner or contractor, then choose \"Warning\". If you did not perform this test and do not want the test information to show up on the homeowner report, then choose \"Not Tested\".',NULL,NULL,NULL,0,NULL,NULL,17,NULL,NULL,NULL,'jobform_health','worst_case_spill',NULL,NULL,'Health & Safety > Worst Case Spillage','Safety Tests',1,NULL,NULL,NULL,NULL,'v4_health','worst_case_spill',32,NULL,NULL,NULL,NULL,NULL,NULL),(108,'Radio','Undiluted Flue CO','Choose the appropriate description for this test. If you performed an actual test and it passed, then choose \"Passed\", if the test failed, then choose \"Failed\". If you did not perform this test, but suspect there might be issues or have notes to provide the homeowner or contractor, then choose \"Warning\". If you did not perform this test and do not want the test information to show up on the homeowner report, then choose \"Not Tested\".',NULL,NULL,NULL,0,NULL,NULL,17,NULL,NULL,NULL,'jobform_health','undiluted_flue_co',NULL,NULL,'Health & Safety > Undiluted Flue Co','Safety Tests',1,NULL,NULL,NULL,NULL,'v4_health','undiluted_flue_co',32,NULL,NULL,NULL,NULL,NULL,NULL),(109,'Radio','Draft Pressure','Choose the appropriate description for this test. If you performed an actual test and it passed, then choose \"Passed\", if the test failed, then choose \"Failed\". If you did not perform this test, but suspect there might be issues or have notes to provide the homeowner or contractor, then choose \"Warning\". If you did not perform this test and do not want the test information to show up on the homeowner report, then choose \"Not Tested\".',NULL,NULL,NULL,0,NULL,NULL,17,NULL,NULL,NULL,'jobform_health','draft_pressure',NULL,NULL,'Health & Safety > Draft Pressure','Safety Tests',1,NULL,NULL,NULL,NULL,'v4_health','draft_pressure',32,NULL,NULL,NULL,NULL,NULL,NULL),(110,'Radio','Gas Leak','Choose the appropriate description for this test. If you performed an actual test and it passed, then choose \"Passed\", if the test failed, then choose \"Failed\". If you did not perform this test, but suspect there might be issues or have notes to provide the homeowner or contractor, then choose \"Warning\". If you did not perform this test and do not want the test information to show up on the homeowner report, then choose \"Not Tested\".',NULL,NULL,NULL,0,NULL,NULL,17,NULL,NULL,NULL,'jobform_health','gas_leak',NULL,NULL,'Health & Safety > Gas Leak','Safety Tests',1,NULL,NULL,NULL,NULL,'v4_health','gas_leak',32,NULL,NULL,NULL,NULL,NULL,NULL),(111,'Radio','Venting','Choose the appropriate description for this test. If you performed an actual test and it passed, then choose \"Passed\", if the test failed, then choose \"Failed\". If you did not perform this test, but suspect there might be issues or have notes to provide the homeowner or contractor, then choose \"Warning\". If you did not perform this test and do not want the test information to show up on the homeowner report, then choose \"Not Tested\".',NULL,NULL,NULL,0,NULL,NULL,17,NULL,NULL,NULL,'jobform_health','venting',NULL,NULL,'Health & Safety > Venting','Safety Tests',1,NULL,NULL,NULL,NULL,'v4_health','venting',32,NULL,NULL,NULL,NULL,NULL,NULL),(112,'Radio','Mold & Moisture','Choose the appropriate description for this test. If you performed an actual test and it passed, then choose \"Passed\", if the test failed, then choose \"Failed\". If you did not perform this test, but suspect there might be issues or have notes to provide the homeowner or contractor, then choose \"Warning\". If you did not perform this test and do not want the test information to show up on the homeowner report, then choose \"Not Tested\".',NULL,NULL,NULL,0,NULL,NULL,17,NULL,NULL,NULL,'jobform_health','mold',NULL,NULL,'Health & Safety > Mold & Moisture','Safety Tests',1,NULL,NULL,NULL,NULL,'v4_health','mold',32,NULL,NULL,NULL,NULL,NULL,NULL),(113,'Radio','Radon','Choose the appropriate description for this test. If you performed an actual test and it passed, then choose \"Passed\", if the test failed, then choose \"Failed\". If you did not perform this test, but suspect there might be issues or have notes to provide the homeowner or contractor, then choose \"Warning\". If you did not perform this test and do not want the test information to show up on the homeowner report, then choose \"Not Tested\".',NULL,NULL,NULL,0,NULL,NULL,17,NULL,NULL,NULL,'jobform_health','radon',NULL,NULL,'Health & Safety > Radon','Safety Tests',1,NULL,NULL,NULL,NULL,'v4_health','radon',32,NULL,NULL,NULL,NULL,NULL,NULL),(114,'Radio','Asbestos','Choose the appropriate description for this test. If you performed an actual test and it passed, then choose \"Passed\", if the test failed, then choose \"Failed\". If you did not perform this test, but suspect there might be issues or have notes to provide the homeowner or contractor, then choose \"Warning\". If you did not perform this test and do not want the test information to show up on the homeowner report, then choose \"Not Tested\".',NULL,NULL,NULL,0,NULL,NULL,17,NULL,NULL,NULL,'jobform_health','asbestos',NULL,NULL,'Health & Safety > Asbestos','Safety Tests',1,NULL,NULL,NULL,NULL,'v4_health','asbestos',32,NULL,NULL,NULL,NULL,NULL,NULL),(115,'Radio','Lead','Choose the appropriate description for this test. If you performed an actual test and it passed, then choose \"Passed\", if the test failed, then choose \"Failed\". If you did not perform this test, but suspect there might be issues or have notes to provide the homeowner or contractor, then choose \"Warning\". If you did not perform this test and do not want the test information to show up on the homeowner report, then choose \"Not Tested\".',NULL,NULL,NULL,0,NULL,NULL,17,NULL,NULL,NULL,'jobform_health','lead',NULL,NULL,'Health & Safety > Lead','Safety Tests',1,NULL,NULL,NULL,NULL,'v4_health','lead',32,NULL,NULL,NULL,NULL,NULL,NULL),(116,'Input','Wall Cavity Insulation','Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in this Wall System.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>',0.00,100.00,2,0,NULL,NULL,10,16,8,NULL,'jobform_walls',NULL,'wall','cavity_r_value','Walls > %{n} Cavity Insulation R Value','Walls Rec',0,'R Value',NULL,'BaseWallInsulR%{?n}','ImpWallInsulR%{?n}',NULL,NULL,NULL,NULL,22,8,16,NULL,NULL),(117,'Input','Wall Continuous Insulation','Enter the total R-value of continuous insulation installed or to be installed in this Wall System. Continuous insulation is any insulation like spray foam or rigid foam that is continuous and consistent in R-value across studs, joists, or any framing member.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>\n\n',0.00,100.00,2,0,NULL,NULL,10,16,8,NULL,'jobform_walls',NULL,'wall','continuous_r_value','Walls > %{n} Continuous Insulation R Value','Walls Rec',0,'R Value',NULL,'BaseWallContInsulR%{?n}','ImpWallContInsulR%{?n}',NULL,NULL,NULL,NULL,22,9,16,NULL,NULL),(118,'Input','Modeled Wall Area','This field will be automatically calculated based on the data you entered in the input form for House Length, House Width, and Average Wall Height.<br><br>\n\nThis field designates the total gross exterior wall area, including all window and door openings. It does not include walls shared in common with other conditioned dwelling units. An additional 1\' of wall height is automatically included for every story beyond the first to account for rim joists. First floor (foundation) rim joists are included separately in the basement or crawl space wall areas. <br><br>\n\nThe BASE area designates the sqft of this wall system on the house. The IMPROVED area designates only the sqft that will be improved. If you\'re not improving all of that wall, enter only the sqft that is actually being improved. The IMPROVED area cannot be used to reduce or increase the sqft of wall area in the home. ',10.00,1000000.00,2,0,NULL,'(including shared walls)',10,16,8,NULL,'jobform_walls',NULL,'wall','wall_area','Walls > %{n} Modeled Area','Walls Rec',0,'ft²',NULL,'BaseWallArea%{n}','ImpWallArea%{n}',NULL,NULL,NULL,NULL,NULL,NULL,16,NULL,NULL),(119,'Input','DHW Energy Factor','Enter the rated Energy Factor of the water heater without a decimal. Sometimes, the Energy Factor of a water heater is expressed as 0.56 or 0.82. Enter it here as 56 or 82. The Min and Max values change based on the type of water heater. Energy Factors for most equipment can be found at ahridirectory.org.',1.00,100.00,0,0,'56,82,220',NULL,15,7,2,'dhw','jobform_dhws',NULL,'dhw','energy_factor','DHW > %{n} Energy Factor','DHW Rec',0,'EF',NULL,'BaseDHWEff%{n}','ImpDHWEff%{n}',NULL,NULL,NULL,NULL,6,NULL,6,30,NULL),(120,'Input','Modeled Attic Area','This field will be automatically calculated based on the data you entered in the input form for Conditioned Area and Number of Stories.<br><br>\n\nThis field designates the actual interior surface area of the ceiling. On the improved side, this is the new total sqft of the attic. Reduce this number if you\'re switching the attic from unconditioned to a conditioned space. For instance, if the original house had 1000 sqft of attic space and you converted it to a fully conditioned attic by spray foaming the roof deck and rafters, then set the base side to 1000 sqft and the improved side to 0. Then create a vaulted ceiling that is 0 on the base side and 1118 sqft on the improved side (adding 118 sqft for a 6/12 roof pitch). ',0.00,1000000.00,2,0,NULL,NULL,11,2,1,NULL,'jobform_attics',NULL,'attic','area','Attic > Modeled Area','Attic Insulation Rec',0,'ft²',NULL,'AtticFootprint%{n}','ImpAtticArea%{n}',NULL,NULL,NULL,NULL,NULL,NULL,2,10,NULL),(121,'Input','Attic Insulation','Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in this Attic. Framing factors have already been taken into account, so specify the R-value of the insulation within the cavity.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>',0.00,100.00,2,0,NULL,NULL,11,2,1,NULL,'jobform_attics',NULL,'attic','r_value','attic_insulation_r_value','Attic Insulation Rec',0,'R Value',NULL,'BaseAtticCavR%{n}','ImpAtticCavR%{n}',NULL,NULL,NULL,NULL,23,9,2,10,NULL),(123,'Input','Equivalent NACH','NACH is the number of times in one hour the entire volume of air inside the building leaks to the outside naturally. It is calculated from the Air Infiltration number in CFM50, the number of stories, the wind zone and type of shielding the house has.',NULL,NULL,2,0,NULL,NULL,14,1,NULL,NULL,'jobform_leakage',NULL,'air_leakage','nach','air_leakage_equivalent_nach','Air Leakage Rec',0,'NACH',NULL,'BaseACH','ImpACH',NULL,NULL,NULL,NULL,18,2,1,NULL,NULL),(124,'Input','Conditioned Air Volume','The conditioned air volume is calculated from the Conditioned Area and the Average Wall Height. This is really available for informational purposes and in most cases should not be edited.',100.00,1000000.00,2,0,NULL,NULL,14,1,NULL,NULL,'jobform_leakage',NULL,'air_leakage','conditioned_volume','air_leakage_conditioned_air_volume','Air Leakage Rec',0,'ft<sup>3</sup>',NULL,'HouseAirVolume',NULL,NULL,NULL,NULL,NULL,18,3,1,NULL,NULL),(125,'Input','Effective Leakage Area','Effective (or Equivalent) Leakage Area in square inches. This is the area of a theoretical hole (with rounded edges) in the building envelope that would produce a leakage equivalent to that produced by the actual building at 4 Pascals of pressure.',NULL,NULL,2,0,NULL,NULL,14,1,NULL,NULL,'jobform_leakage',NULL,'air_leakage','leak_area','air_leakage_effective_leakage_area','Air Leakage Rec',0,'in²',NULL,'BaseELA','ImpELA',NULL,NULL,NULL,NULL,18,4,1,NULL,NULL),(126,'Input','Equivalent ACH50','ACH50 is the number of times in one hour the entire volume of air inside the building leaks to the outside when depressurized to 50 Pascals. This number is automatically calculated based on the house volume and the Air Infiltration number in CFM50.',NULL,NULL,2,0,NULL,NULL,14,1,NULL,NULL,'jobform_leakage',NULL,'air_leakage','ach50','air_leakage_equivalent_ach50','Air Leakage Rec',0,'ACH50',NULL,'BaseACH50','ImpACH50',NULL,NULL,NULL,NULL,18,5,1,NULL,NULL),(129,'Input','Door %{n} U Value','This field will be automatically calculated based on the data you entered in the input form. You may override this number with the actual door U-Value.<br><br>\n\n',0.01,9.00,2,0,NULL,NULL,9,8,3,NULL,'jobform_doors',NULL,'doors','u_value','Doors > %{n} U Value','Doors Rec',0,'U Value',NULL,'BaseDoorU%{n}','ImpDoorU%{n}',NULL,NULL,NULL,NULL,19,2,8,NULL,NULL),(141,'Input','Freezer Usage','Enter the annual energy consumption for the freezer in kWh/yr. Search our knowledge base for \"Appliances Product Finder\" for more information.<br><br>\n\n<strong>Note:</strong><br>\nEdit this Base field in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>',0.00,10000.00,2,0,NULL,NULL,6,11,4,NULL,'freezers',NULL,'freezer','usage','Freezer > %{n} Usage','Freezer Rec',0,'kWh/yr',NULL,'BaseFreezerEnergy%{n}','ImpFreezerEnergy%{n}',NULL,NULL,NULL,NULL,26,3,11,NULL,NULL),(151,'Input','Modeled Basement Wall Area','This is the total wall area along the exposed perimeter (i.e. wall area eligible for insulation improvements). Warning: Changing the wall area will not effect the model. Wall area is only used in calculating improvement costs.',0.00,1000000.00,2,0,NULL,NULL,12,3,NULL,NULL,'jobform_foundations',NULL,'basement','wall_area','Basement > Modeled Wall Area','Foundation - Basement Walls Rec',0,'ft²',NULL,'BaseBGWallArea',NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,NULL,NULL),(161,'Input','Basement Cavity Insulation','Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in the framed cavity of the basement walls. If there is no framing, use Continuous Insulation below to specify insulation types such as fiberglass drape or rigid insulation.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>',0.00,50.00,2,0,NULL,NULL,12,3,NULL,NULL,'jobform_foundations',NULL,'basement','cavity_r_value','Basement > Cavity Insulation R Value','Foundation - Basement Walls Rec',0,'R Value',NULL,'BaseBGInsulR','ImpBGInsulR',NULL,NULL,NULL,NULL,25,NULL,3,NULL,NULL),(171,'Input','Basement Continuous Insulation','Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in on the basement walls such as a fiberglass drape or rigid insulation. If the basement walls are framed out, then specify the R-value in the Cavity Insulation field above.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>',0.00,50.00,2,0,NULL,NULL,12,3,NULL,NULL,'jobform_foundations',NULL,'basement','continuous_r_value','Basement > Continuous Insulation R Value','Foundation - Basement Walls Rec',0,'R Value',NULL,'BaseBGContInsulR','ImpBGContInsulR',NULL,NULL,NULL,NULL,25,NULL,3,NULL,NULL),(181,'Input','Floor Cavity Insulation','Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in the Floor Cavity.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>',0.00,100.00,2,0,'0,19',NULL,12,10,NULL,NULL,'jobform_buildings',NULL,'floor','cavity_r_value','Frame Floor > Cavity Insulation R Value','Floors Rec',0,'R Value',NULL,'BaseFloorInsulR','ImpFloorInsulR',NULL,NULL,NULL,NULL,25,NULL,10,NULL,NULL),(191,'Input','Floor Continuous Insulation','Enter the total R-value of continuous insulation installed or to be installed under the Frame Floor. Continuous insulation is any insulation like spray foam or rigid foam that is continuous and consistent in R-value across studs, joists, or any framing member.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>',0.00,100.00,2,0,'5,10',NULL,12,10,NULL,NULL,'jobform_buildings',NULL,'floor','continuous_r_value','Frame Floor > Continuous Insulation R Value','Floors Rec',0,'R Value',NULL,'BaseFloorContInsulR','ImpFloorContInsulR',NULL,NULL,NULL,NULL,25,NULL,10,NULL,NULL),(201,'Input','Modeled Floor Area','This field will be automatically calculated based on the data you entered in the input form for Tuck Under Garage and the associated Garage Size. This field can also be used to identify cantelievers over other unconditioned space.<br><br>\n\nEnter the area of frame floors that serve as a thermal boundary to the conditioned space, excluding those over foundation crawl spaces or basements.',0.00,1000000.00,2,0,'250,525',NULL,12,10,NULL,NULL,'jobform_buildings',NULL,'floor','floor_area','Frame Floor > Modeled Floor Area','Floors Rec',0,'ft²',NULL,'BaseFloorArea',NULL,NULL,NULL,NULL,NULL,NULL,NULL,10,NULL,NULL),(211,'Input','Refrigerator Usage','Enter the annual energy consumption for the refrigerator in kWh/yr. Search our knowledge base for \"Appliances Product Finder\" for more information. <br><br>\n\n<strong>Note:</strong><br>\nEdit this Base field in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>',0.00,10000.00,2,0,NULL,NULL,7,14,6,NULL,'jobform_refrigerators',NULL,'refrigerators','usage','Refrigerator > %{n} Manufacturer','Refrigerators Rec',0,'kWh/yr',NULL,'BaseRefrigeratorEnergy%{n}','ImpRefrigeratorEnergy%{n}',NULL,NULL,NULL,NULL,20,5,14,NULL,NULL),(221,'Input','Efficiency','Enter the average gross window (including frame effects) U-value of the windows installed (BASE) or to be installed (IMPROVED). <br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>',0.01,2.00,2,0,NULL,NULL,13,17,9,'windows:efficiency','jobform_windows',NULL,'window','u_value','Windows > %{n} U Value','Window Rec',0,'U Value',NULL,'BaseWindowU%{n}','ImpWindowU%{n}',NULL,NULL,NULL,NULL,8,16,17,NULL,NULL),(231,'Input','Window Area: North','Enter the total area of windows for this orientation of this Window System. BASE values determine the area of the existing windows in the house. The IMPROVED values represent the area of windows in this orientation that are actually going to be improved. The difference in sqft between BASE and IMPROVED will be assumed as unchanged. \n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>',0.00,10000.00,2,0,NULL,NULL,13,17,9,'windows:area:north','jobform_windows',NULL,'window','n_area','Windows > %{n} North Area','Window Rec',0,'ft²',NULL,'BaseWindowNorth%{n}','ImpWindowNorth%{n}',NULL,NULL,NULL,NULL,NULL,NULL,17,NULL,NULL),(241,'Input','Window Area: East','Enter the total area of windows for this orientation of this Window System. BASE values determine the area of the existing windows in the house. The IMPROVED values represent the area of windows in this orientation that are actually going to be improved. The difference in sqft between BASE and IMPROVED will be assumed as unchanged. \n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>',0.00,10000.00,2,0,NULL,NULL,13,17,9,'windows:area:east','jobform_windows',NULL,'window','e_area','Windows > %{n} East Area','Window Rec',0,'ft²',NULL,'BaseWindowEast%{n}','ImpWindowEast%{n}',NULL,NULL,NULL,NULL,NULL,NULL,17,NULL,NULL),(251,'Input','Window Area: South','Enter the total area of windows for this orientation of this Window System. BASE values determine the area of the existing windows in the house. The IMPROVED values represent the area of windows in this orientation that are actually going to be improved. The difference in sqft between BASE and IMPROVED will be assumed as unchanged. \n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>',0.00,10000.00,2,0,NULL,NULL,13,17,9,'windows:area:south','jobform_windows',NULL,'window','s_area','Windows > %{n} South Area','Window Rec',0,'ft²',NULL,'BaseWindowSouth%{n}','ImpWindowSouth%{n}',NULL,NULL,NULL,NULL,NULL,NULL,17,NULL,NULL),(261,'Input','Window Area: West','Enter the total area of windows for this orientation of this Window System. BASE values determine the area of the existing windows in the house. The IMPROVED values represent the area of windows in this orientation that are actually going to be improved. The difference in sqft between BASE and IMPROVED will be assumed as unchanged. \n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>',0.00,10000.00,2,0,NULL,NULL,13,17,9,'windows:area:west','jobform_windows',NULL,'window','w_area','Windows > %{n} West Area','Window Rec',0,'ft²',NULL,'BaseWindowWest%{n}','ImpWindowWest%{n}',NULL,NULL,NULL,NULL,NULL,NULL,17,NULL,NULL),(271,'Input','Solar Heat Gain Coefficient','Enter the average gross window (including frame effects) Solar Heat Gain Coefficient (SHGC) of the windows installed (BASE) or to be installed (IMPROVED). IMPORTANT! Do not adjust this number to account for the affects of solar screens or shades. Use the Exterior Treatment fields below for this and only change the SHGC if the window unit itself is being replaced.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>',0.01,0.99,2,0,NULL,NULL,13,17,9,NULL,'jobform_windows',NULL,'window','shgc','Windows > %{n} SHGC','Window Rec',0,'SHGC',NULL,'BaseWindowSHGC%{n}','ImpWindowSHGC%{n}',NULL,NULL,NULL,NULL,8,17,17,NULL,NULL),(291,'Input','Shared Walls East','Enter the percent of this wall that is shared with another unit (assumed an adiabatic wall). ',0.00,100.00,0,0,NULL,NULL,10,NULL,NULL,'multiFamily','jobform_walls','area_east',NULL,NULL,'MultiFamily > % of East Walls Shared','Walls Shared',0,'%','A1EastWallsPctShared',NULL,NULL,NULL,NULL,NULL,NULL,22,5,NULL,NULL,NULL),(301,'Input','Shared Walls South','Enter the percent of this wall that is shared with another unit (assumed an adiabatic wall). ',0.00,100.00,0,0,NULL,NULL,10,NULL,NULL,'multiFamily','jobform_walls','area_south',NULL,NULL,'MultiFamily > % of South Walls Shared','Walls Shared',0,'%','A1SouthWallsPctShared',NULL,NULL,NULL,NULL,NULL,NULL,22,6,NULL,NULL,NULL),(311,'Input','Shared Walls West','Enter the percent of this wall that is shared with another unit (assumed an adiabatic wall). ',0.00,100.00,0,0,NULL,NULL,10,NULL,NULL,'multiFamily','jobform_walls','area_west',NULL,NULL,'MultiFamily > % of West Walls Shared','Walls Shared',0,'%','A1WestWallsPctShared',NULL,NULL,NULL,NULL,NULL,NULL,22,7,NULL,NULL,NULL),(321,'Input','Foundation: Crawlspace','Select the percentage of foundation that is <strong>basement</strong>, <strong>crawlspace</strong> or <strong>slab on grade</strong>. Total of all three foundation types cannot exceed 100%.',0.00,100.00,0,0,NULL,NULL,12,NULL,NULL,NULL,'jobform_foundations','shared_crawl',NULL,NULL,'Foundation > % Crawlspace','Foundation',0,'%','A1BaseCrawlArea',NULL,NULL,NULL,NULL,NULL,NULL,25,3,NULL,NULL,NULL),(331,'Input','Foundation: Slab','Select the percentage of foundation that is <strong>basement</strong>, <strong>crawlspace</strong> or <strong>slab on grade</strong>. Total of all three foundation types cannot exceed 100%.',0.00,100.00,0,0,'20,75',NULL,12,NULL,NULL,NULL,'jobform_foundations','shared_slab',NULL,NULL,'Foundation > % Slab','Foundation',0,'%','A1BaseSlabArea',NULL,NULL,NULL,NULL,NULL,NULL,25,4,NULL,NULL,NULL),(351,'Input','Window: East Area Percent','Enter the % of EXPOSED wall area for each orientation that is made up of window glass area. If some of the wall is shared with another conditioned unit (multi-family, townhome, etc.) put in the % of the exposed area only.',0.00,100.00,0,0,NULL,NULL,NULL,NULL,9,'windows:a1area:east','jobform_windows','area_east',NULL,NULL,'Windows > %{n} % of East Wall','Windows - Area',0,'%','A1BaseWindowEast%{n}',NULL,NULL,NULL,NULL,NULL,NULL,8,5,NULL,NULL,NULL),(361,'Input','Window: South Area Percent','Enter the % of EXPOSED wall area for each orientation that is made up of window glass area. If some of the wall is shared with another conditioned unit (multi-family, townhome, etc.) put in the % of the exposed area only.',0.00,100.00,0,0,NULL,NULL,NULL,NULL,9,NULL,'jobform_windows','area_south',NULL,NULL,'Windows > %{n} % of South Wall','Windows - Area',0,'%','A1BaseWindowSouth%{n}',NULL,NULL,NULL,NULL,NULL,NULL,8,6,NULL,NULL,NULL),(371,'Input','Window: West Area Percent','Enter the % of EXPOSED wall area for each orientation that is made up of window glass area. If some of the wall is shared with another conditioned unit (multi-family, townhome, etc.) put in the % of the exposed area only.',0.00,100.00,0,0,'5,25',NULL,NULL,NULL,9,'windows:a1area:west','jobform_windows','area_west',NULL,NULL,'Windows > %{n} % of West Wall','Windows - Area',0,'%','A1BaseWindowWest%{n}',NULL,NULL,NULL,NULL,NULL,NULL,8,7,NULL,NULL,NULL),(381,'Input','North Overhang Depth','Enter the average window overhang width (feet) on the exterior walls for this orientation.',0.00,20.00,0,0,NULL,NULL,13,NULL,9,NULL,'jobform_windows','overhang_north',NULL,NULL,'Windows > %{n} North Overhang Depth','Windows - Overhang',0,'ft','A1BaseWindowOHVertN%{n}',NULL,NULL,NULL,NULL,NULL,NULL,8,8,NULL,NULL,NULL),(391,'Input','East Overhang Depth','Enter the average window overhang width (feet) on the exterior walls for this orientation.',0.00,20.00,0,0,NULL,NULL,13,NULL,9,'windows:overhang:east','jobform_windows','overhang_east',NULL,NULL,'Windows > %{n} East Overhang Depth','Windows - Overhang',0,'ft','A1BaseWindowOHVertE%{n}',NULL,NULL,NULL,NULL,NULL,NULL,8,9,NULL,NULL,NULL),(401,'Input','South Overhang Depth','Enter the average window overhang width (feet) on the exterior walls for this orientation.',0.00,20.00,0,0,NULL,NULL,13,NULL,9,NULL,'jobform_windows','overhang_south',NULL,NULL,'Windows > %{n} South Overhang Depth','Windows - Overhang',0,'ft','A1BaseWindowOHVertS%{n}',NULL,NULL,NULL,NULL,NULL,NULL,8,10,NULL,NULL,NULL),(411,'Input','West Overhang Depth','Enter the average window overhang width (feet) on the exterior walls for this orientation.',0.00,20.00,0,0,NULL,NULL,13,NULL,9,'windows:overhang:west','jobform_windows','overhang_west',NULL,NULL,'Windows > %{n} West Overhang Depth','Windows - Overhang',0,'ft','A1BaseWindowOHVertW%{n}',NULL,NULL,NULL,NULL,NULL,NULL,8,11,NULL,NULL,NULL),(441,'Select','DHW Temp','Enter the temperature of the water produced by the water heating system.',100.00,200.00,0,0,NULL,NULL,15,7,2,'dhw','jobform_dhws',NULL,'dhw_temp','temp','DHW > %{n} Temperature Range','DHW Temp Rec',0,'°F',NULL,'BaseDHWTemp%{n}','ImpDHWTemp%{n}',NULL,NULL,NULL,NULL,6,NULL,7,30,NULL),(451,'Select','% CFLs or LEDs','Select the percentage range that most closely represents the percentage of lamps and fixtures on the home that are fitted with compact fluorescent lights (CLFs).',NULL,NULL,NULL,0,NULL,NULL,8,NULL,NULL,NULL,'jobform_lighting','percent_cfl',NULL,NULL,'Lighting > % CFL or LED Range','Lighting',1,NULL,'A1CFLPct',NULL,NULL,NULL,NULL,30,NULL,17,1,NULL,NULL,NULL),(461,'Input','Crawl Cavity Insulation','Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in the framed cavity of the crawlspace ceiling. This field is active only if you are treating the crawlspace as an unconditioned space.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>',0.00,50.00,2,0,NULL,NULL,12,5,NULL,'crawl:floor','jobform_foundations',NULL,'crawl','floor_cavity_r_value','Crawlspace > Floor Cavity Insulation R Value','Foundation - Crawl Space Rec',0,'R Value',NULL,'BaseCrawlInsulR','ImpCrawlInsulR',NULL,NULL,NULL,NULL,NULL,NULL,5,3,NULL),(471,'Input','Crawl Wall Insulation','Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in on the crawlspace walls such as a fiberglass drape or spray foam insulation. This field is active only if you are treating the crawlspace as a conditioned space.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>\n\n',0.00,50.00,2,0,NULL,NULL,12,5,NULL,'crawl:wall','jobform_foundations',NULL,'crawl','wall_r_value','Crawlspace > Wall Insulation R Value','Foundation - Crawl Space Rec',0,'R Value',NULL,'BaseCrawlContInsulR','ImpCrawlContInsulR',NULL,NULL,NULL,NULL,25,NULL,5,2,NULL),(481,'Input','Modeled Crawl Wall Area','This field will be automatically calculated based on the data you entered in the input form for House Length and House Width. This is the total wall area along the exposed perimeter (i.e. wall area eligible for insulation improvements).<br><br>\n\nWarning: Changing the wall area will not effect the model. Wall area is only used in calculating improvement costs.',0.00,1000000.00,2,0,NULL,NULL,12,5,NULL,'crawl:wall','jobform_foundations',NULL,'crawl','crawl_wall_area','Crawlspace > Modeled Wall Area','Foundation - Crawl Space Rec',0,'ft²',NULL,'BaseCrawlWallArea',NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,4,NULL),(491,'Input','Modeled Crawl Floor Area','This field will be automatically calculated based on the data you entered in the input form for Conditioned Area, Number of Stories, and Foundation Makeup.<br><br>',0.00,1000000.00,2,0,NULL,NULL,12,5,NULL,'crawl:floor','jobform_foundations',NULL,'crawl','crawl_floor_area','Crawlspace > Modeled Floor Area','Foundation - Crawl Space Rec',0,'ft²',NULL,'BaseCrawlArea',NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,5,NULL),(501,'Select','Crawlspace Type','Choose the type of venting and conditioning in the crawlspace. Your choice will enable or disable the Wall and Floor Cavity Insulation fields in the Crawlspace Details section depending on the appropriate situation.<br><br>\n\n<strong>Unvented - Unconditioned Crawl</strong>: This unconditioned crawlspace scenario is where the building floor above the crawl space is the thermal boundary to the home. If there were insulation, it would be applied applied to the building floor (crawlspace ceiling). This crawlspace does not have direct vents to the outside air.<br><br>\n\n<strong>Vented - Year Round</strong>: This is an unconditioned crawlspace where the building floor above the crawl space is the thermal boundary to the home. If there were insulation, it would be applied to the building floor (crawlspace ceiling). This crawlspace has direct vents to the outside air, and those vents remain open all year long.<br><br>\n\n<strong>Vented - Summer Only</strong>: This is an unconditioned crawlspace where the building floor above the crawl space is the thermal boundary to the home. If there were insulation, it would be applied to the building floor (crawlspace ceiling). This crawlspace has direct vents to the outside air, and those vents remain open only during summer months.<br><br>\n\n<strong>Conditioned Crawl</strong>: This is a conditioned crawlspace where the foundation walls and ground/slab of the crawl space are the thermal boundary. If there is insulation, it would be applied to the foundation wall and rim joists. In this scenario, there is no venting to the outside and the crawlspace floor is covered with a vapor barrier on top of the dirt floor. Building code often requires adding a jump vent to the main conditioned space in the house or ducting the furnace and/or A/C into the crawlspace as well. If the crawl does not have a jump vent or supply ducts, you will likely get a slight overestimate of energy use. The model assumes that the crawl temperature is a mixture of 20% ground temp and 80% indoor temp.\n\nNote: This field also triggers the Rim Joist options for the Crawlspace. You must set this field to Conditioned Crawl to be able to specify the insulation of the Rim Joists in the Crawlspace.',NULL,NULL,NULL,0,NULL,NULL,12,5,NULL,'crawl:type','jobform_foundations',NULL,'crawl','crawlspace_type','Crawlspace > Type','Foundation - Crawl Space Rec',1,NULL,NULL,'BaseCrawlCondition/value','ImpCrawlCondition/value',NULL,NULL,37,37,25,NULL,5,1,NULL),(511,'Input','Duct Efficiency','This is the overall delivery system efficiency for this distribution system. It is calculated based on the above duct leakage, location, and insulation values and is not editable. If you have chosen Intentionally Conditioned Space for the Duct Location, then the Duct Efficiency will always be 100% as the lost energy from the ducts is only lost into the building envolope and not to the outside.<br><br>\n\nAlso, if you have set the % of Total Load for this heating or cooling system to 0% (necessary when creating a brand new heating or cooling system or removing one), you will see the Duct Efficiency at 100%, since there is zero loss on a system that doesn\'t exist. ',NULL,NULL,NULL,0,NULL,NULL,5,9,5,'hvac:duct:efficiency','jobform_hvacs',NULL,'duct','(heating|cooling)_leakage','HVAC > Duct System %{n} Effiiency','HVAC - Duct Rec',0,'%',NULL,'Base%{?__duct_type__}DuctEff%{n}','Imp%{?__duct_type__}DuctEff%{n}',NULL,NULL,NULL,NULL,4,40,9,NULL,NULL),(551,'Select','Age of Cooling Equipment','Select the age range of the heating or cooling equipment.',NULL,NULL,NULL,0,NULL,NULL,5,NULL,5,'hvac:cool','jobform_hvacs','cooling_age',NULL,NULL,'HVAC > Cooling System %{n} Age','HVAC - Cooling',1,NULL,'A1BaseCoolingYear%{coolingIndex}',NULL,NULL,NULL,NULL,16,NULL,4,30,NULL,NULL,NULL),(621,'Input','% of Total Cooling Load','Enter the proportion of the total load for heating or cooling that this system represents. The combined heating load percentage for all heating systems specified must add up to 100%. Similarly, the combined cooling load percentage for all cooling systems specified must add up to 100%.',0.00,100.00,0,0,NULL,NULL,5,4,5,'hvac:cool:load','jobform_hvacs','load_percent_cooling','cooling','load_percent_cooling','HVAC > Cooling System %{n} % of Load','HVAC - Cooling',0,'%','BaseCoolingPct%{coolingIndex}',NULL,'ImpCoolingPct%{coolingIndex}',NULL,NULL,NULL,NULL,4,30,4,3,NULL),(661,'Select','Clothes Washer Type','Enter the type of Clothes Washer, if any, that is installed in the house.',NULL,NULL,NULL,0,NULL,NULL,6,23,NULL,NULL,NULL,NULL,NULL,NULL,'Clothes Washer > Type','Appliances',1,NULL,NULL,'BaseClothesWasherType/value','ImpClothesWasherType/value',NULL,NULL,26,65,3,3,23,NULL,NULL),(671,'Radio','Clothes Washer Energy Star','If a Clothes Washer is installed, choose if it is an ENERGY STAR model.',NULL,NULL,NULL,0,NULL,NULL,6,23,NULL,NULL,NULL,NULL,NULL,NULL,'Clothes Washer > Energy Star','Appliances',1,'',NULL,'BaseClothesWasherEStar','ImpClothesWasherEStar',NULL,NULL,23,23,3,4,23,NULL,NULL),(681,'Input','Clothes Washer Manufacturer','Enter the Manufacturer for the Clothes Washer.',NULL,NULL,NULL,0,NULL,NULL,6,23,NULL,NULL,NULL,NULL,NULL,NULL,'Clothes Washer > Manufacturer','Appliances',1,NULL,NULL,'ClothesWasherBrand','ImpClothesWasherBrand',NULL,NULL,25,25,3,5,23,NULL,NULL),(691,'Input','Clothes Washer Model','Enter the Model number for the Clothes Washer.',NULL,NULL,NULL,0,NULL,NULL,6,23,NULL,NULL,NULL,NULL,NULL,NULL,'Clothes Washer > Model','Appliances',0,NULL,NULL,'ClothesWasherModelNum','ImpClothesWasherModelNum',NULL,NULL,NULL,NULL,3,NULL,23,NULL,NULL),(701,'Input','Clothes Washer MEF','Enter the Clothes Washer\'s Integrated Modified Energy Factor (IMEF) if available. The higher the IMEF, the more efficient the dishwasher. Search our knowledge base for \"Appliances Product Finder\" for more information. ',0.00,10.00,2,0,'1.3,2.4',NULL,6,23,NULL,NULL,NULL,NULL,NULL,NULL,'Clothes Washer > Modified Energy Factor','Appliances',0,'IMEF',NULL,'BaseClothesWasherMEF','ImpClothesWasherMEF',NULL,NULL,NULL,NULL,3,NULL,23,NULL,NULL),(711,'Radio','Dishwasher Energy Star','Choose Yes if the Dishwaher is an ENERGY STAR model.',NULL,NULL,NULL,0,NULL,NULL,6,22,NULL,'dishwasher:bool',NULL,NULL,NULL,NULL,'Dishwasher > Energy Star','Appliances',1,'','BaseDishWasherEStar',NULL,'ImpDishWasherEStar',NULL,NULL,23,23,3,NULL,22,NULL,NULL),(741,'Input','Dishwasher Energy Factor','Enter the Dishwasher\'s Energy Factor (EF) if available. The higher the EF, the more efficient the dishwasher. Search our knowledge base for \"Appliances Product Finder\" for more information. ',0.00,10.00,2,0,'.64,.89,1.3',NULL,6,22,NULL,NULL,NULL,NULL,NULL,NULL,'Dishwasher > Energy Factor','Appliances',0,'EF',NULL,'BaseDishWasherEF','ImpDishWasherEF',NULL,NULL,NULL,NULL,3,NULL,22,NULL,NULL),(751,'Input','Refrigerator Manufacturer','Enter the Manufacturer of the Refrigerator.',NULL,NULL,NULL,0,NULL,NULL,7,14,6,NULL,NULL,NULL,NULL,NULL,'Refrigerator > %{n} Manufacturer','Refrigerators',1,NULL,NULL,'FridgeBrand%{?n}','ImpRefrigeratorBrand%{n}',NULL,NULL,57,57,20,6,14,NULL,NULL),(761,'Input','Refrigerator Model','Enter the Model number for the Refrigerator.',NULL,NULL,NULL,0,NULL,NULL,7,14,6,NULL,NULL,NULL,NULL,NULL,'Refrigerator > %{n} Model','Refrigerators',0,NULL,NULL,'FridgeModelNum%{?n}','ImpRefrigeratorModelNum%{n}',NULL,NULL,NULL,NULL,20,7,14,NULL,NULL),(771,'Radio','Refrigerator Energy Star','If a Refrigerator is installed in the home, choose if it is an ENERGY STAR model.',NULL,NULL,NULL,0,NULL,NULL,7,14,6,NULL,NULL,NULL,NULL,NULL,'Refrigerator > %{n} Energy Star','Refrigerators',1,NULL,'BaseRefrigeratorEStar%{n}',NULL,'ImpRefrigeratorEStar%{n}',NULL,NULL,23,23,20,4,14,NULL,NULL),(772,'Select','Electrical','Choose the appropriate description for this test. If you performed an actual test and it passed, then choose \"Passed\", if the test failed, then choose \"Failed\". If you did not perform this test, but suspect there might be issues or have notes to provide the homeowner or contractor, then choose \"Warning\". If you did not perform this test and do not want the test information to show up on the homeowner report, then choose \"Not Tested\".',NULL,NULL,NULL,0,NULL,NULL,17,NULL,NULL,NULL,'jobform_health','electrical',NULL,NULL,'Health & Safety > Electrical','Safety Tests',1,NULL,NULL,NULL,NULL,NULL,'electrical',32,NULL,NULL,NULL,NULL,NULL,NULL),(773,'Select','Cooling Equipment','Select the type of cooling system that is used for the home.',NULL,NULL,NULL,0,NULL,NULL,5,4,5,'hvac:equipment:cool','jobform_hvacs','equipment','cooling','equipment','HVAC > Cooling System %{n} Equipment','HVAC - Cooling',1,NULL,'BaseCoolingType%{coolingIndex}',NULL,'ImpCoolingType%{coolingIndex}',NULL,NULL,13,13,4,30,4,1,NULL),(774,'Select','Dual Equipment',NULL,NULL,NULL,NULL,0,NULL,NULL,5,NULL,5,'hvac:equipment:dual','jobform_hvacs','equipment',NULL,NULL,NULL,'HVAC',1,NULL,NULL,NULL,NULL,NULL,NULL,14,NULL,4,30,NULL,NULL,NULL),(775,'Input','Cooling Capacity','Enter the output capacity of the cooling equipment in (Btu/hr). <br><br>Reminder: cooling systems are often rated in tons. 1 ton = 12,000 Btu/hr.<br><br><strong>NOTE:</strong> This has changed since v3 of Snugg Pro. v4 and later requires the number be in Btu/hr, not kBtu/hr. All v3 jobs that were migrated to v4 have been converted to the proper number by multiplying it by 1000.',1000.00,1000000.00,0,0,'24000,48000',NULL,5,4,5,'hvac:cool','jobform_hvacs','cooling_capacity','cooling','capacity','HVAC > Cooling System %{n} Capacity','HVAC - Cooling',0,'BTU/h','BaseCoolingSize%{coolingIndex}',NULL,'ImpCoolingSize%{coolingIndex}',NULL,NULL,NULL,NULL,4,30,4,2,NULL),(776,'Input','% CFL or LED','Use this field to override the number of CFLs or LEDs that exist in the home before the retrofit.',0.00,999.00,0,0,NULL,NULL,NULL,13,NULL,NULL,'',NULL,'lighting','percent_cfl','Lighting > % CFL or LED','Lighting Rec',0,'%',NULL,'BaseCFLPct','ImpCFLPct',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(777,'Input','Cooling System Efficiency','The Seasonal Energy Efficiency Ratio (SEER) is the average annual cooling efficiency of an air-conditioning or heat pump system as a weighted average of EERs over a range of rate outside air conditions following a standard test method. It includes energy of auxiliary systems such as the indoor and outdoor fans. Units: Btu/Wh. <br><br>\n\nThe Energy Efficiency Ratio (EER) is the measurement of the cooling capacity for a unit (in Btu/hour) divided by electrical energy it uses (in watts) at a specific temperature of 95ºF. Units: Btu/Wh. EER is only used for Room AC units.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>',0.00,100.00,1,0,NULL,NULL,5,4,5,'hvac:cool','jobform_hvacs',NULL,'cooling','cooling_system_efficiency','HVAC > Cooling System %{n} Efficiency','HVAC - Cooling Rec',0,'SEER',NULL,'BaseCoolingEff%{coolingIndex}/controlvalue','ImpCoolingEff%{coolingIndex}/controlvalue',NULL,NULL,NULL,NULL,4,30,4,30,NULL),(778,'Input','Heating System Efficiency','Annual Fuel Utilization Efficiency (AFUE) is a percentage representing the ratio of heat energy units provided to the total energy value of fuel consumed in identical units. It is most commonly used for combustion based heating as well as electric resistance heating.<br><br>\n\nHeating Seasonal Performance Factor (HSPF) is the ratio of Btus of heat energy provided to the watt-hours of electrciity consumed. It is most commonly used for air and ground source heat pumps.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>',0.00,500.00,1,0,'78,95',NULL,5,12,5,'hvac:heat','jobform_hvacs',NULL,'heating','heating_system_efficiency','HVAC > Heating System %{n} Efficiency','HVAC - Heating Rec',0,'AFUE',NULL,'BaseHeatEff%{heatingIndex}/controlvalue','ImpHeatEff%{heatingIndex}/controlvalue',NULL,NULL,NULL,NULL,4,30,12,30,NULL),(781,'Select','Duct Leakage','Choose the estimated leakage to the outside through the duct system as a percentage of the total air handler flow. If you actually performed a duct blaster test, choose Measured (CFM25) and enter a value in the field below.',NULL,NULL,NULL,0,NULL,NULL,5,9,5,'hvac:duct:leakage','jobform_hvacs','ducts_leakage',NULL,NULL,'HVAC > Duct System %{n} Leakage ','HVAC - Duct',1,NULL,'Base%{__duct_type__}DuctSealing%{n}/value',NULL,'Imp%{__duct_type__}DuctSealing%{n}/controlvalue',NULL,NULL,19,29,4,40,9,NULL,NULL),(783,'Select','Wind Zone','Select the Wind Zone from the map.\n',NULL,NULL,NULL,0,NULL,NULL,14,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Air Leakage',1,'',NULL,'NACHZone',NULL,NULL,NULL,62,NULL,18,6,1,NULL,NULL),(791,'Select','Shielding','Shielding type used to determine NACH N-factor:<br/><br/>\n<ul>\n  <li><strong>Well-Shielded</strong> - urban areas with high buildings or sheltered areas</li>\n  <li><strong>Normal</strong> - surrounded by trees or other buildings</li>\n  <li><strong>Exposed</strong> - dwelling is not surrounded by any objects</li>\n</ul>',NULL,NULL,NULL,0,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Building > Shielding','General - Air Leakage',1,'','NACHShielding/value',NULL,NULL,NULL,'shielding',4,NULL,1,12,NULL,NULL,NULL),(793,'Input','N-Factor','Correlation Factor developed by Lawrence Berkeley Laboratory for the calculation of NACH.',NULL,NULL,2,0,NULL,NULL,14,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Air Leakage',0,'',NULL,'NACHNFactorCell/value',NULL,NULL,NULL,NULL,NULL,18,7,1,NULL,NULL),(794,'Input','Knee Wall Area','Enter the total surface area of knee wall adjoining this attic space.',0.00,1000000.00,2,0,NULL,NULL,11,2,1,NULL,NULL,NULL,NULL,NULL,'Attic > Knee Wall Area','Attic Insulation Rec',0,'ft²',NULL,'KneeArea%{n}','ImpKneeArea%{n}',NULL,NULL,NULL,NULL,23,9,2,23,NULL),(796,'Input','Knee Wall Insulation','Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in this Knee Wall.',0.00,100.00,2,0,NULL,NULL,11,2,1,NULL,NULL,NULL,NULL,NULL,'Attic > Knee Wall Insulation R Value','Attic Insulation Rec',0,'R Value',NULL,'BaseKneeCavR%{n}','ImpKneeCavR%{n}',NULL,NULL,NULL,NULL,23,9,2,22,NULL),(797,'Radio','Has Knee Wall?','Choose Yes if there is a knee wall in this attic space.',NULL,NULL,NULL,0,NULL,NULL,11,2,1,'attic:bool',NULL,NULL,NULL,NULL,NULL,'Attic Insulation Rec',1,'',NULL,NULL,NULL,NULL,NULL,1,NULL,23,9,2,21,NULL),(800,'Select','Exterior Treatment: North','Choose the type of exterior shading device that\'s attached to windows on this side of the home. IMPORTANT! Do not adjust the SHGC number to account for the affects of solar screens or shades and only change the SHGC if the window unit itself is being replaced.',NULL,NULL,NULL,0,NULL,NULL,13,17,9,NULL,NULL,NULL,NULL,NULL,'Windows > %{n} North Exterior Treatment','Window Rec',1,NULL,NULL,'BaseWindowExtTreatN%{n}/value','ImpWindowExtTreatN%{n}/value',NULL,NULL,47,76,8,12,17,NULL,NULL),(802,'Select','Exterior Treatment: East','Choose the type of exterior shading device that\'s attached to windows on this side of the home. IMPORTANT! Do not adjust the SHGC number to account for the affects of solar screens or shades and only change the SHGC if the window unit itself is being replaced.',NULL,NULL,NULL,0,NULL,NULL,13,17,9,NULL,NULL,NULL,NULL,NULL,'Windows > %{n} East Exterior Treatment','Window Rec',1,NULL,NULL,'BaseWindowExtTreatE%{n}/value','ImpWindowExtTreatE%{n}/value',NULL,NULL,47,76,8,13,17,NULL,NULL),(803,'Select','Exterior Treatment: South','Choose the type of exterior shading device that\'s attached to windows on this side of the home. IMPORTANT! Do not adjust the SHGC number to account for the affects of solar screens or shades and only change the SHGC if the window unit itself is being replaced.',NULL,NULL,NULL,0,NULL,NULL,13,17,9,NULL,NULL,NULL,NULL,NULL,'Windows > %{n} South Exterior Treatment','Window Rec',1,NULL,NULL,'BaseWindowExtTreatS%{n}/value','ImpWindowExtTreatS%{n}/value',NULL,NULL,47,76,8,14,17,NULL,NULL),(804,'Select','Exterior Treatment: West','Choose the type of exterior shading device that\'s attached to windows on this side of the home. IMPORTANT! Do not adjust the SHGC number to account for the affects of solar screens or shades and only change the SHGC if the window unit itself is being replaced.',NULL,NULL,NULL,0,NULL,NULL,13,17,9,NULL,NULL,NULL,NULL,NULL,'Windows > %{n} West Exterior Treatment','Window Rec',1,NULL,NULL,'BaseWindowExtTreatW%{n}/value','ImpWindowExtTreatW%{n}/value',NULL,NULL,47,76,8,15,17,NULL,NULL),(805,'Input','Number of Bedrooms','2005 RESNET Standards define a bedroom as: A room or space \r70 square feet or greater, with egress window and closet, used or \rintended to be used for sleeping. A \"den\", \"library\", \"home office\" \rwith a closet, egress window, and 70 square feet or greater or other \rsimilar rooms shall count as a bedroom, but living rooms and foyers shall not.',1.00,100.00,1,0,'2,5',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Building > Bedroom Count','Building',0,'#','BaseBedrooms',NULL,NULL,NULL,'bedroom_count',NULL,NULL,1,9,NULL,NULL,NULL),(806,'Input','Cooling System Manufacturer','Enter the Manufacturer of the Cooling Equipment.',NULL,NULL,NULL,0,NULL,NULL,5,4,5,'hvac:cool',NULL,NULL,NULL,NULL,'HVAC > Cooling System %{n} Manufacturer','HVAC - Cooling Rec',1,'',NULL,'ACCondBrand%{?coolingIndex}','ImpACCondBrand%{coolingIndex}',NULL,NULL,35,35,4,30,4,30,NULL),(807,'Input','Cooling System Model','Enter the Model # of the Cooling Equipment.<br><br>\n\n<strong>Pro-tip</strong>: Always capture an image of the nameplate on the existing equipment and store it in the photos section for future reference. ',NULL,NULL,NULL,0,NULL,NULL,5,4,5,'hvac:cool',NULL,NULL,NULL,NULL,'HVAC > Cooling System %{n} Model','HVAC - Cooling Rec',0,'',NULL,'ACCondModelNum%{?coolingIndex}','ImpACCondModelNum%{coolingIndex}',NULL,NULL,NULL,NULL,4,30,4,30,NULL),(810,'Input','Cooling System Model Year','Enter the Year the Cooling Equipment was built.',1900.00,2030.00,0,0,'1995,2014',NULL,5,4,5,'hvac:cool',NULL,NULL,NULL,NULL,'HVAC > Cooling System %{n} Model Year','HVAC - Cooling Rec',0,'',NULL,'ACCondMfgDate%{?coolingIndex}','ImpACCondYear%{coolingIndex}',NULL,NULL,NULL,NULL,4,30,4,30,NULL),(811,'Input','Heating System Manufacturer','Enter the Manufacturer of the Heating Equipment.',NULL,NULL,NULL,0,NULL,NULL,5,12,5,'hvac:heat',NULL,NULL,NULL,NULL,'HVAC > Heating System %{n} Manufacturer','HVAC - Heating Rec',1,'',NULL,'HeaterBrand%{?heatingIndex}','ImpHeaterBrand%{heatingIndex}',NULL,NULL,24,24,4,30,12,30,NULL),(812,'Input','Dishwasher Model','Enter the Model number for the Dishwasher.',NULL,NULL,NULL,0,NULL,NULL,6,22,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Appliances',0,'',NULL,'DishWasherModelNum','ImpDishwasherModelNum',NULL,NULL,NULL,NULL,3,NULL,22,NULL,NULL),(815,'Input','Heating System Model Year','Enter the Year the Heating Equipment was built.',1900.00,2030.00,0,0,'1998,2014',NULL,5,12,5,'hvac:heat',NULL,NULL,NULL,NULL,'HVAC > Heating System %{n} Model Year','HVAC - Heating Rec',0,'',NULL,'HeaterMfgDate%{?heatingIndex}','ImpHeaterYear%{heatingIndex}',NULL,NULL,NULL,NULL,4,30,12,30,NULL),(816,'Input','DHW Manufacturer','Enter the Manufacturer of the water heater.',NULL,NULL,NULL,0,NULL,NULL,15,7,2,NULL,NULL,NULL,NULL,NULL,'DHW > %{n} Manufacturer','DHW Rec',1,NULL,NULL,'DHWBrand%{?n}','ImpDHWBrand%{n}',NULL,NULL,41,41,6,NULL,6,30,NULL),(817,'Input','DHW Model','Enter the Model number of the water heater.',NULL,NULL,NULL,0,NULL,NULL,15,7,2,NULL,NULL,NULL,NULL,NULL,'DHW > %{n} Model','DHW Rec',0,NULL,NULL,'DHWModelNum%{?n}','ImpDHWModelNum%{n}',NULL,NULL,NULL,NULL,6,NULL,6,30,NULL),(818,'Input','DHW Model Year','Enter the model year of the water heater.',1900.00,2030.00,0,0,'1998,2014',NULL,15,7,2,NULL,NULL,NULL,NULL,NULL,'DHW > %{n} Model Year','DHW Rec',0,NULL,NULL,'DHWMfgDate%{?n}','ImpDHWYear%{n}',NULL,NULL,NULL,NULL,6,NULL,6,30,NULL),(819,'Input','Dishwasher Manufacturer','Enter the Manufacturer of the Dishwasher.',NULL,NULL,NULL,0,NULL,NULL,6,22,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Appliances',1,'',NULL,'DishWasherBrand','ImpDishwasherBrand',NULL,NULL,27,27,3,NULL,22,NULL,NULL),(820,'Input','Dishwasher Model Year','Enter the Model Year of the Dishwasher.',1900.00,2030.00,0,0,'1998,2014',NULL,6,22,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Appliances',0,'',NULL,'DishWasherMfgDate','ImpDishwasherYear',NULL,NULL,NULL,NULL,3,NULL,22,NULL,NULL),(824,'Input','Heating System Model','Enter the Model # of the Heating Equipment.<br><br>\n\n<strong>Pro-tip</strong>: Always capture an image of the nameplate on the existing equipment and store it in the photos section for future reference. ',NULL,NULL,NULL,0,NULL,NULL,5,12,5,'hvac:heat',NULL,NULL,NULL,NULL,'HVAC > Heating System %{n} Model','HVAC - Heating Rec',0,'',NULL,'HeaterModelNum%{?heatingIndex}','ImpHeaterModelNum%{heatingIndex}',NULL,NULL,NULL,NULL,4,30,12,30,NULL),(826,'Input','Clothes Washer Model Year','Enter the Model Year of the Clothes Washer.',1900.00,2030.00,0,0,'1998,2015',NULL,6,23,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Appliances',0,NULL,NULL,'ClothesWasherMfgDate','ImpClothesWasherYear',NULL,NULL,NULL,NULL,3,NULL,23,NULL,NULL),(828,'Select','Freezer Manufacturer','Enter the Manufacturer of the Freezer.',NULL,NULL,NULL,0,NULL,NULL,6,11,4,NULL,NULL,NULL,NULL,NULL,'Freezer > %{n} Manufacturer','Freezer Rec',1,'',NULL,'FreezerBrand%{?n}','ImpFreezerBrand%{n}',NULL,NULL,50,50,26,4,11,NULL,NULL),(829,'Input','Freezer Model Year','Enter the Model Year of the Freezer.',1900.00,2030.00,0,0,'1998,2014',NULL,6,11,4,NULL,NULL,NULL,NULL,NULL,'Freezer > %{n} Model Year','Freezer Rec',0,'',NULL,'FreezerMfgDate%{?n}','ImpFreezerYear%{n}',NULL,NULL,NULL,NULL,26,5,11,NULL,NULL),(831,'Input','Freezer Model','Enter the Model number for the Freezer.',NULL,NULL,NULL,0,NULL,NULL,6,11,4,NULL,NULL,NULL,NULL,NULL,'Freezer > %{n} Model','Freezer Rec',0,'',NULL,'FreezerModelNum%{?n}','ImpFreezerModelNum%{n}',NULL,NULL,NULL,NULL,26,6,11,NULL,NULL),(832,'Input','Duct Insulation Value','If you know the actual R-value of the duct insulation, you may enter it here.',0.00,100.00,2,0,NULL,NULL,5,9,5,'hvac:duct:insulation:value',NULL,NULL,NULL,NULL,'HVAC > Duct System %{n} Insulation Value ','HVAC - Duct',0,'R Value','Base%{__duct_type__}DuctInsulR%{n}',NULL,'Imp%{__duct_type__}DuctInsulR%{n}',NULL,NULL,NULL,NULL,4,40,9,NULL,NULL),(833,'Input','# of Incandescents','This field displays the number of Incandescents that exist in the home before the retrofit. It is calculated based on the number of CFLs or LEDs and the Total # of Light Fixtures.',0.00,999.00,0,0,NULL,NULL,NULL,13,NULL,NULL,NULL,NULL,NULL,NULL,'Lighting > Incandescent Count','Lighting Rec',0,'#',NULL,'BaseLights','ImpLights',NULL,NULL,NULL,NULL,NULL,NULL,13,NULL,NULL),(834,'Input','# of CFLs installed','Use this field to override the number of LEDs that exist in the home before (Base) or after (Improved) the retrofit.',0.00,999.00,0,0,NULL,NULL,NULL,13,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Lighting Rec',0,'#',NULL,NULL,NULL,NULL,NULL,NULL,NULL,17,3,13,NULL,NULL),(835,'Input','# of CFLs or LEDs','Use this field to override the number of CFLs that exist in the home before (Base) or after (Improved) the retrofit.',0.00,999.00,0,0,NULL,NULL,NULL,13,NULL,NULL,NULL,NULL,NULL,NULL,'Lighting > CFL Count','Lighting Rec',0,'#',NULL,'BaseCFL','ImpCFL',NULL,NULL,NULL,NULL,17,4,13,NULL,NULL),(836,'Input','Refrigerator Model Year','Enter the Model Year of the Refrigerator.',1900.00,2030.00,0,0,NULL,NULL,7,14,6,NULL,NULL,NULL,NULL,NULL,'Refrigerator > %{n} Model Year','Refrigerators',0,NULL,NULL,'FridgeMfgDate%{?n}','ImpRefrigeratorYear%{n}',NULL,NULL,NULL,NULL,20,8,14,NULL,NULL),(837,'Radio','Radiant Barrier?','Please designate if the base or improved attic has a radiant barrier. Costs will not be adjusted for this nor will the R-Value of the attic insulation. The energy savings will be calculated in addition to the R-Value of the attic. ',NULL,NULL,NULL,0,NULL,NULL,11,2,1,NULL,NULL,NULL,NULL,NULL,'Attic > Radiant Barrier','Attic Insulation Rec',1,'',NULL,'BaseAttic%{n}Radiant','ImpAttic%{n}Radiant',NULL,NULL,1,1,23,9,2,30,NULL),(838,'Input','Modeled Vault Area','This field will be automatically calculated based on the data you entered in the input form for Conditioned Area and Number of Stories. This is the actual surface area of the vaulted ceiling. It includes a default roof pitch of 5/12. When you override this number, be sure to include the complete sqft of the vault that\'s covering conditioned space.<br><br>\n\nThis field designates the interior surface area of the vaulted ceiling. On the improved side, this is the new total sqft of the vaulted ceiling. Increase this number if you\'re switching the attic from unconditioned to a conditioned space.<br><br>\n\nFor instance, if the original house had 1000 sqft of attic space and you converted it to a fully conditioned attic by spray foaming the roof deck and rafters, then set the base side to 1000 sqft and the improved side to 0. Then create a vaulted ceiling that is 0 on the base side and 1118 sqft on the improved side (adding 118 sqft for a 6/12 roof pitch). ',0.00,1000000.00,2,0,NULL,NULL,11,20,7,NULL,NULL,NULL,NULL,'area','Vault > %{n} Modeled Area','Vault Insulation Rec',0,'ft²',NULL,'CeilingArea%{n}','ImpCeilingArea%{n}',NULL,NULL,NULL,NULL,23,9,20,NULL,NULL),(839,'Input','Vault Cavity Insulation','Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in this Vaulted Ceiling.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>',0.00,100.00,2,0,NULL,NULL,11,20,7,NULL,NULL,NULL,NULL,'r_value','Vault > %{n} Cavity Insulation R Value','Vault Insulation Rec',0,'R Value',NULL,'BaseCeilingCavR%{n}','ImpCeilingCavR%{n}',NULL,NULL,NULL,NULL,23,9,20,NULL,NULL),(840,'Input','Vault Continuous Insulation','Enter the total R-value of continuous insulation installed or to be installed in this Vaulted Ceiling. Continuous insulation is any insulation like spray foam or rigid foam that is continuous and consistent in R-value across studs, joists, or any framing member.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you\'re confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>\n\n',0.00,100.00,2,0,NULL,NULL,11,20,7,NULL,NULL,NULL,NULL,'r_value','Vault > %{n} Continuous Insulation R Value','Vault Insulation Rec',0,'R Value',NULL,'BaseCeilingContR%{n}','ImpCeilingContR%{n}',NULL,NULL,NULL,NULL,23,9,20,NULL,NULL),(842,'Select','DHW Type2','Enter the type of water heater installed (BASE) or to be installed (IMPROVED).<br><br>\n\n<strong>Note</strong>: If you have an Sidearm Tank to a Boiler (Indirect Tank), you will need to choose \"Standard tank\" as the DHW type and manually set the EF on for Base and Improved. Please refer to the EF Calculator that\'s available in the knowledge base to determine the EF of the total system.',NULL,NULL,NULL,0,NULL,NULL,15,7,2,'dhw',NULL,NULL,NULL,NULL,'DHW > %{n} Type','DHW Rec',1,'',NULL,'BaseDHWType%{n}','ImpDHWType%{n}',NULL,NULL,44,44,NULL,NULL,NULL,NULL,NULL),(843,'Radio','Hot Tub','Does this house have an electrically heated hot tub? If yes, 2,040 kWh/yr of electricity consumption is added to the baseload.',NULL,NULL,NULL,0,NULL,NULL,16,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Hot Tub > Existing','Pools',1,NULL,'A1BaseHotTub',NULL,NULL,NULL,'has_hot_tub',1,NULL,9,7,NULL,NULL,NULL),(844,'Radio','Pool','Does the home have a pool?',NULL,NULL,NULL,0,NULL,NULL,16,NULL,NULL,'pool:bool',NULL,NULL,NULL,NULL,'Pool > Existing','Pools',1,NULL,'A1BasePool',NULL,NULL,NULL,'has_pool',1,NULL,9,1,NULL,NULL,NULL),(846,'Select','Pool Pump Type','Select the Pump Type from Single Speed, Two Speed, or Variable Speed (or No Improvement or None). Enter the HP (or leave blank for the default) for a Single Speed or Two Speed pump, or Turnover for a variable speed pump. Wattage of variable speed pumps depends on the speed the pump is running, and the speed will depend on the turnover, so electrical usage is determined by turnover (number of times all the water in the pool circulates through the filter in a day). The Variable Speed Pump analysis includes an optimization routine that calculates the minimal electrical usage for a variable speed pump for the selected turnover. Therefore proper setup of the pump is required to achieve these results.',NULL,NULL,NULL,0,NULL,NULL,16,21,NULL,'pool',NULL,NULL,NULL,NULL,'Pool > Pump Type','Pools',1,NULL,'BasePoolPumpType/value',NULL,'ImpPoolPumpType/value',NULL,NULL,55,55,9,2,21,NULL,NULL),(847,'Select','Pool Pump Horsepower','Select the Horsepower for this Pool Pump. Only necessary for Single-Speed or Two-Speed pumps.',NULL,NULL,NULL,0,NULL,NULL,16,NULL,NULL,'pool',NULL,NULL,NULL,NULL,'Pool > Pump Horsepower','Pools',1,NULL,'BasePoolPumpHP/value',NULL,'ImpPoolPumpHP/value',NULL,NULL,54,54,9,3,NULL,NULL,NULL),(849,'Select','Basement Heating','Please decribe the heating situation in the basement.<br><br>\n\n<strong>Intentional:</strong><br>\n<ul>\n	<li>Basement receives heat in the same manner as the rest of the house.</li>\n</ul>\r<strong>Intentional w/ continuous circulation:</strong><br>\r<ul>\n	<li>Basement air is continuously exchanged with upper floors, equalizing temperatures.</li>\n</ul>\r<strong>Incidental-Desired (e.g. leaky ducts):</strong><br>\r<ul>\n	<li>Basement is semi-conditioned by presence of HVAC equipment.</li>\n	<li>Semi-conditioning is desired and measures will not be taken to eliminate it.</li>\r	<li>Themal boundary for model will be located at basement walls and floor.</li>\r</ul>\r<strong>None or Undesired Incidental:</strong><br>\r<ul>\n	<li>Basement is not intentially conditioned.</li>\n	<li>Incidental conditioning is undesired and considered wasted energy.</li>	<li>Themal boundary for model will be the building floor above the basement.</li>\n</ul>',NULL,NULL,NULL,0,NULL,NULL,12,3,NULL,NULL,NULL,NULL,NULL,NULL,'Basement > Conditioning for Heating','Foundation',1,NULL,'BaseBGHeating/value',NULL,'ImpBGHeating',NULL,NULL,33,33,NULL,NULL,3,NULL,NULL),(850,'Select','Basement Cooling','Please decribe the cooling situation in the basement.<br><br>\n\n<strong>Intentional:</strong><br>\n<ul>\n	<li>Basement receives cooling in the same manner as the rest of the house.</li>\n</ul>\r<strong>Intentional w/ continuous circulation:</strong><br>\r<ul>\n	<li>Basement air is continuously exchanged with upper floors, equalizing temperatures.</li>\n</ul>\r<strong>Incidental-Desired (e.g. leaky ducts):</strong><br>\r<ul>\n	<li>Basement is semi-conditioned by presence of HVAC equipment.</li>\n	<li>Semi-conditioning is desired and measures will not be taken to eliminate it.</li>\r	<li>Themal boundary for model will be located at basement walls and floor.</li>\r</ul>\r<strong>None or Undesired Incidental:</strong><br>\r<ul>\n	<li>Basement is not intentially conditioned.</li>\n	<li>Incidental conditioning is undesired and considered wasted energy.</li>	<li>Themal boundary for model will be the building floor above the basement.</li>\n</ul>\n\n<strong>Note:</strong> If you choose \"None or Undesired Incidental\", then be sure to NOT include the basement square footage in the conditioned area of the home under the Building inputs.',NULL,NULL,NULL,0,NULL,NULL,12,3,NULL,NULL,NULL,NULL,NULL,NULL,'Basement > Conditioning for Cooling','Foundation',1,NULL,'BaseBGCooling/value',NULL,'ImpBGCooling',NULL,NULL,33,33,NULL,NULL,3,NULL,NULL),(855,'Input','Attic Percent','Enter the % of the total footprint that is attributed to each attic or vault area.',NULL,NULL,0,0,NULL,NULL,11,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,'Attic',0,'%','A1BaseAtticPct%{n}',NULL,NULL,NULL,NULL,NULL,NULL,23,9,NULL,NULL,NULL),(856,'Radio','Vault %{n}','Is there insulation in the vaulted ceiling cavities of this home? If so, how good is it? If unsure, please leave blank.<br><br>\n\n<strong>Well</strong>: All cavities contain insulation at full or near full depth with gaps and voids not exceeding 5%.<br><br>\n<strong>Poor</strong>: Majority of cavities contain insulation, but one or more of the following is suspected: low density, low depth, poor installation.<br><br>\n<strong>Yes</strong>: You can confirm that insulation exists, but are unsure of the installation quality.<br><br>\n<strong>No</strong> - No insulation value is applied to cavities.',NULL,NULL,NULL,0,NULL,NULL,11,NULL,7,NULL,NULL,NULL,NULL,NULL,'Vault > %{n} Insulated','Vault',1,NULL,'A1BaseVaultInsul%{n}',NULL,NULL,NULL,NULL,60,NULL,23,9,NULL,NULL,NULL),(857,'Input','Vault Percent','Enter the % of the total footprint that is attributed to each attic or vault area.',NULL,NULL,0,0,NULL,NULL,11,NULL,7,NULL,NULL,NULL,NULL,NULL,'Vault > %{n} % of Footprint','Vault',0,'%','A1BaseVaultPct%{n}',NULL,NULL,NULL,NULL,NULL,NULL,23,9,NULL,NULL,NULL),(860,'Input','Freezer Name',NULL,NULL,NULL,NULL,0,NULL,NULL,6,NULL,4,NULL,NULL,NULL,NULL,NULL,'Freezer > %{n} Name','Freezers',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,26,1,NULL,NULL,NULL),(868,'Radio','Freezer Energy Star','If a Freezer is installed in the home, choose if it is an ENERGY STAR model.',NULL,NULL,NULL,0,NULL,NULL,6,11,4,'freezer',NULL,NULL,NULL,NULL,'Freezer > %{n} Energy Star','Freezers',1,NULL,'BaseFreezerEStar%{n}',NULL,'ImpFreezerEStar%{n}',NULL,NULL,23,23,26,2,11,NULL,NULL),(869,'Select','DHW % Load','Percent of the annual DHW load met by this system. Both systems must add up to 100%.',0.00,100.00,0,0,'40,80',NULL,15,NULL,2,'dhw','jobform_dhws',NULL,NULL,NULL,'DHW > %{n} % of Load','DHW',0,'%','BaseDHWPct%{n}',NULL,'ImpDHWPct%{n}',NULL,NULL,NULL,NULL,6,NULL,6,6,NULL),(870,'Input','Pool Size','Pool water volume in gallons.',100.00,1000000.00,0,0,NULL,NULL,NULL,21,NULL,'pool',NULL,NULL,NULL,NULL,'Pool > Size','Pools',0,'Gallons',NULL,'PoolSize',NULL,NULL,NULL,NULL,NULL,NULL,NULL,21,NULL,NULL),(873,'Input','Pool Pump Turnover','Number of times all the water in the pool circulates through the filter in a day. Must be used to set variable speed pump usage. It is ignored for all other pump types.',0.50,24.00,1,0,NULL,NULL,16,21,NULL,'pool',NULL,NULL,NULL,NULL,'Pool > Pump Turnover','Pools',0,'#',NULL,'BasePoolVariableTurnover','ImpPoolVariableTurnover',NULL,NULL,NULL,NULL,9,4,21,NULL,NULL),(874,'Input','Pool Pump Hours','Number of hours the pump runs per day. This is only applicable to single speed and two speed pumps. It can be ignored for all other pump types.',0.00,24.00,1,0,NULL,NULL,NULL,21,NULL,'pool',NULL,NULL,NULL,NULL,'Pool > Pump Hours','Pools',0,'Hours',NULL,'BasePoolPumpHours','ImpPoolPumpHours',NULL,NULL,NULL,NULL,NULL,NULL,21,NULL,NULL),(875,'Input','Pool Pump Manufacturer','Enter the Manufacturer of the Pool Pump.',NULL,NULL,NULL,0,NULL,NULL,16,21,NULL,'pool',NULL,NULL,NULL,NULL,'Pool > Pump Manufacturer','Pools',1,NULL,NULL,'BasePoolPumpManufacturer','ImpPoolPumpManufacturer',NULL,NULL,67,67,9,5,21,NULL,NULL),(876,'Input','Pool Pump Model','Enter the model number of the Pool Pump.',NULL,NULL,NULL,0,NULL,NULL,16,21,NULL,'pool',NULL,NULL,NULL,NULL,'Pool > Pump Model','Pools',0,NULL,NULL,'BasePoolPumpModel','ImpPoolPumpModel',NULL,NULL,NULL,NULL,9,6,21,NULL,NULL),(877,'Select','Wall System % of Total','If there is more than one wall system type, enter the % of all walls that this system represents. Both wall systems must add up to 100%. If there is only one type of wall system in the house, then enter 100%.',0.00,100.00,0,0,'40,75',NULL,10,NULL,8,NULL,NULL,NULL,NULL,NULL,'Walls > %{n} % of Total Walls','Walls',0,'%','A1BaseWallPct%{n}',NULL,NULL,NULL,NULL,NULL,NULL,22,10,NULL,NULL,NULL),(879,'Input','Pool Pump Days Per Year','Number of days the pool is used per year.',0.00,365.00,0,0,NULL,NULL,NULL,21,NULL,'pool',NULL,NULL,NULL,NULL,'Pool > Pump Days Per Year','Pools',0,'Days',NULL,'BasePoolDaysPerYear','ImpPoolDaysPerYear',NULL,NULL,NULL,NULL,NULL,NULL,21,NULL,NULL),(882,'Radio','Dishwasher Installed?','Choose Yes if an automatic dishwasher is installed in the home.',NULL,NULL,NULL,0,NULL,NULL,6,22,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Appliances',1,'',NULL,'BaseDishWasherType/value','ImpDishWasherType/value',NULL,NULL,28,70,3,6,22,NULL,NULL),(883,'Input','Modeled Basement Floor Area','This field will be automatically calculated based on the data you entered in the input form for Conditioned Area, Number of Stories, and Foundation Makeup.<br><br>\n',0.00,1000000.00,2,0,NULL,NULL,12,3,NULL,NULL,NULL,NULL,NULL,NULL,'Basement > Modeled Floor Area','Foundation - Basement Walls Rec',0,'ft²',NULL,'BaseBGArea',NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,NULL,NULL),(884,'Input','Modeled Basement Perimeter','This field will be automatically calculated based on the data you entered in the input form for House Length and House Width.<br><br>\n',0.00,780.00,2,0,NULL,NULL,12,3,NULL,NULL,NULL,NULL,NULL,NULL,'Basement > Modeled Perimeter','Foundation - Basement Walls Rec',0,'ft',NULL,'BaseBGPerimeter',NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,NULL,NULL),(885,'Input','Door Area','This field will be automatically calculated based on the data you entered in the input form. You may override this number with the actual door sizes for the home.<br><br>\n\nFor doors with glazing area of greater than or equal to 50% of the rough frame opening, model the entire door as a window with area equal to the rough frame opening. Note that even full-light swinging doors are usually less than 50% glazing.',0.00,1000.00,2,0,NULL,NULL,9,8,3,NULL,NULL,NULL,NULL,NULL,'Doors > %{n} Area','Door Rec',0,'ft²',NULL,'BaseDoorArea%{n}','ImpDoorArea%{n}',NULL,NULL,NULL,NULL,19,3,8,NULL,NULL),(888,'Radio','Includes Basement','Mark this as Yes if the conditioned area above includes the basement area.',NULL,NULL,NULL,0,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Building > Area Includes Basement','Building',1,NULL,'A1IncludeBasement',NULL,NULL,NULL,NULL,1,NULL,1,3,NULL,NULL,NULL),(889,'Input','Utility Price: Natural Gas','Enter a your own price for Natural Gas to override the software\'s existing regional defaults from the EIA.',0.00,5000.00,2,0,'0.82,1.31',NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Utility Price > Natural Gas','Utility Price Override',0,'$/Therm',NULL,'CostGasTherm',NULL,NULL,NULL,NULL,NULL,10,NULL,NULL,NULL,NULL),(892,'Input','Utility Price: Propane','Enter a your own price for Propane to override the software\'s existing regional defaults from the EIA.',0.00,5000.00,2,0,'1.54,3.65',NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Utility Price > Propane','Utility Price Override',0,'$/Gallon',NULL,'CostPropaneTherm/controlvalue',NULL,NULL,NULL,NULL,NULL,10,NULL,NULL,NULL,NULL),(893,'Input','Utility Price: Fuel Oil','Enter a your own price for Fuel Oil to override the software\'s existing regional defaults from the EIA.',0.00,5000.00,2,0,'2.32,4.25',NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Utility Price > Fuel Oil','Utility Price Override',0,'$/Gallon',NULL,'CostFuelOilTherm/controlvalue',NULL,NULL,NULL,NULL,NULL,10,NULL,NULL,NULL,NULL),(894,'Input','Utility Price: Electricity','Enter a your own price for Electricity to override the software\'s existing regional defaults from the EIA.',0.00,5000.00,2,0,'0.09,0.15',NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Utility Price > Electricity','Utility Price Override',0,'$/kWh',NULL,'CostEleckWh',NULL,NULL,NULL,NULL,NULL,10,NULL,NULL,NULL,NULL),(895,'Input','Heating Design Load',NULL,NULL,NULL,0,0,NULL,NULL,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Metrics > Heating Design Load','Design Loads',0,'Btu/hr',NULL,'BaseHeatDesignLoad','ProposedHeatDesignLoad',NULL,NULL,NULL,NULL,4,30,NULL,NULL,NULL),(896,'Input','Cooling Sensible Design Load',NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Metrics > Cooling Sensible Design Load','Design Loads',0,'Btu/hr',NULL,'BaseCoolSensibleDesignLoadNoFormat/value','ProposedCoolSensibleDesignLoadNoFormat/value',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(898,'Input','Cooling Latent Design Load',NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Metrics > Cooling Latent Design Load','Design Loads',0,'Btu/hr',NULL,'BaseCoolLatentDesignLoadNoFormat/value','ProposedCoolLatentDesignLoadNoFormat/value',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(901,'Input','Design Temp: Winter Outdoor',NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Metrics > Winter Outdoor Design Temp','Design Loads',0,'ºF',NULL,'BaseHeatDesignTemp',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(903,'Input','Design Temp: Summer Outdoor',NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Metrics > Summer Outdoor Design Temp','Design Loads',0,'ºF',NULL,'BaseCoolDesignTemp',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(904,'Input','Design Temp: Winter Indoor',NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Metrics > Winter Indoor Design Temp','Design Loads',0,'ºF',NULL,'HeatIndoorDesignTemp',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(906,'Input','Design Temp: Summer Indoor',NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Metrics > Summer Indoor Design Temp','Design Loads',0,'ºF',NULL,'CoolIndoorDesignTemp',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(907,'Input','Utility Price: Wood','Enter a your own price for wood. We do not have default costs for wood, therefore this must be filled out unless the wood supply is free.',0.00,5000.00,2,0,'0.09,0.15',NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Utility Price > Wood','Utility Price Override',0,'$/cord',NULL,'CostWoodTherm/controlvalue',NULL,NULL,NULL,NULL,NULL,10,NULL,NULL,NULL,NULL),(909,'Input','Utility Price: Pellets','Enter a your own price for wood pellets. We do not have default costs for wood pellets, therefore this must be filled out if pellets are chosen in the heating system fuel options.',0.00,5000.00,2,0,'0.09,0.15',NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Utility Price > Pellets','Utility Price Override',0,'$/Ton',NULL,'CostPelletsTherm/controlvalue',NULL,NULL,NULL,NULL,NULL,10,NULL,NULL,NULL,NULL),(918,'Input','CAZ Name',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,11,'caz',NULL,NULL,NULL,NULL,'CAZ > %{n} Name','CAZ Zone',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(919,'Radio','CAZ Number',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,11,'caz',NULL,NULL,NULL,NULL,NULL,'CAZ Zone',1,NULL,NULL,NULL,NULL,NULL,NULL,73,NULL,NULL,NULL,NULL,NULL,NULL),(921,'Radio','Door Energy Star','Select Yes if this door is ENERGY STAR Certified.',NULL,NULL,NULL,0,NULL,NULL,9,8,3,NULL,NULL,NULL,NULL,NULL,'Doors > %{n} Energy Star','Doors Rec',1,NULL,NULL,'BaseDoorEStar%{n}','ImpDoorEStar%{n}',NULL,NULL,23,23,19,2,8,NULL,NULL),(924,'Radio','Window Energy Star','Select Yes if this window system is ENERGY STAR Certified.',NULL,NULL,NULL,0,NULL,NULL,13,17,9,NULL,NULL,NULL,NULL,NULL,'Windows > %{n} Energy Star','Window Rec',1,NULL,NULL,'BaseWindowEStar%{n}','ImpWindowEStar%{n}',NULL,NULL,23,23,8,17,17,NULL,NULL),(925,'Select','Heat Pump Inverter','Select Yes if this heat pump has a variable speed or Inverter driven compressor. These extremely high efficiency units perform to much lower outside air temperatures than single speed units and require much less or no electric resistance backup heat.',NULL,NULL,NULL,0,NULL,NULL,5,12,5,'hvac:equipment:heat',NULL,NULL,NULL,NULL,'HVAC > Heating System %{n} Heat Pump Inverter','HVAC - Heating',1,NULL,NULL,'BaseHeatInverter%{heatingIndex}','ImpHeatInverter%{heatingIndex}',NULL,NULL,1,1,4,3,12,1,NULL),(926,'Radio','DHW Energy Star','Select Yes if this Water Heater is ENERGY STAR Certified.',NULL,NULL,NULL,0,NULL,NULL,15,7,2,'dhw',NULL,NULL,NULL,NULL,'DHW > %{n} Energy Star','DHW Rec',1,NULL,NULL,NULL,'ImpDHWEStar%{n}',NULL,NULL,23,23,6,NULL,6,30,NULL),(927,'Input','Number of Units','If this unit is part of a multi-family building, enter the total number of units in the building.',1.00,1000.00,1,0,'4,25',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Multi-Family > Number of Units In Building','Building',0,'#','BaseBuildingUnits',NULL,NULL,NULL,NULL,NULL,NULL,1,9,NULL,NULL,NULL),(928,'Input','CAZ Ambient CO','Ambient Carbon Monoxide in Parts Per Million. Should not exceed 35 ppm per BPI Protocol.',NULL,NULL,0,0,NULL,NULL,NULL,NULL,11,'caz',NULL,NULL,NULL,NULL,'CAZ > %{n} Ambient CO','CAZ Zone',0,'PPM',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,49),(929,'Input','CAZ Poor Case Test','The poor case CAZ depressurization test is configured by determining the largest combustion appliance zone depressurization attainable at the time of testing due to the combined effects of door position, exhaust appliance operation, and air handler fan operation. A base pressure must be measured with all fans off and doors open. The poor case CAZ depressurization measurement is the pressure difference between the largest depressurization attained at the time of testing and the base pressure.',NULL,NULL,0,0,NULL,NULL,NULL,NULL,11,'caz',NULL,NULL,NULL,NULL,'CAZ > %{n} Poor Case Test','CAZ Zone',0,'PA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,52),(930,'Input','CAZ Notes','CAZ Zone Notes',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,11,'caz',NULL,NULL,NULL,NULL,'CAZ > %{n} Zone Notes','CAZ Zone',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,53),(931,'Input','CAZ Appliance CO Current Condition','CAZ Appliance CO Current Condition',NULL,NULL,0,0,NULL,NULL,NULL,NULL,11,'caz',NULL,NULL,NULL,NULL,'CAZ > %{n} Appliance CO Current Condition','CAZ Appliance',0,'PPM',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,33),(932,'Input','CAZ Max Ambient CO','Ambient Carbon Monoxide in Parts Per Million. Monitored throughout assessment, not just appliance testing',NULL,NULL,0,0,NULL,NULL,NULL,NULL,11,'caz',NULL,NULL,NULL,NULL,'CAZ > %{n} Max Ambient CO','CAZ Appliance',0,'PPM',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,42),(933,'Input','CAZ Appliance CO Poor Scenario','CAZ Appliance CO Poor Scenario',NULL,NULL,0,0,NULL,NULL,NULL,NULL,11,'caz',NULL,NULL,NULL,NULL,'CAZ > %{n} Appliance CO Poor Scenario','CAZ Appliance',0,'PPM',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,35),(934,'Radio','CAZ Appliance CO Test Result','CAZ Appliance CO Test Results: Passed or Failed',NULL,NULL,0,0,NULL,NULL,NULL,NULL,11,'caz',NULL,NULL,NULL,NULL,'CAZ > %{n} Appliance CO Test Result','CAZ Appliance',1,NULL,NULL,NULL,NULL,NULL,NULL,74,74,NULL,NULL,NULL,NULL,34),(935,'Input','CAZ Appliance Flue Current Condition','CAZ Appliance Flue Test Result',NULL,NULL,0,0,NULL,NULL,NULL,NULL,11,'caz',NULL,NULL,NULL,NULL,'CAZ > %{n} Appliance Flue Current Condition','CAZ Appliance',0,'PA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,112),(936,'Input','CAZ Appliance Flue Poor Condition','CAZ Appliance Flue Test Poor Condition',NULL,NULL,0,0,NULL,NULL,NULL,NULL,11,'caz',NULL,NULL,NULL,NULL,'CAZ > %{n} Appliance Flue Poor Condition','CAZ Appliance',0,'PA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,113),(937,'Radio','CAZ Appliance Flue Test Result','CAZ Appliance CO Test Results: Passed or Failed',NULL,NULL,0,0,NULL,NULL,NULL,NULL,11,'caz',NULL,NULL,NULL,NULL,'CAZ > %{n} Appliance Flue Test Result','CAZ Appliance',1,NULL,NULL,NULL,NULL,NULL,NULL,74,74,NULL,NULL,NULL,NULL,34),(938,'Input','CAZ Appliance Spillage Current Condition','CAZ Appliance Spillage Test in Seconds',NULL,NULL,0,0,NULL,NULL,NULL,NULL,11,'caz',NULL,NULL,NULL,NULL,'CAZ > %{n} Appliance Spillage Current Condition','CAZ Appliance',0,'Seconds',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,220),(939,'Input','CAZ Appliance Spillage Poor Condition','CAZ Appliance Spillage Test Poor Condition in Seconds',NULL,NULL,0,0,NULL,NULL,NULL,NULL,11,'caz',NULL,NULL,NULL,NULL,'CAZ > %{n} Appliance Spillage Poor Condition','CAZ Appliance',0,'Seconds',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,222),(940,'Radio','CAZ Appliance Spillage Test Result','CAZ Appliance Spillage Test Results: Passed or Failed',NULL,NULL,0,0,NULL,NULL,NULL,NULL,11,'caz',NULL,NULL,NULL,NULL,'CAZ > %{n} Appliance Spillage Test Result','CAZ Appliance',1,NULL,NULL,NULL,NULL,NULL,NULL,74,74,NULL,NULL,NULL,NULL,221),(941,'Select','CAZ Appliance Vent System Type','CAZ Appliance Vent System Type	',NULL,NULL,0,0,NULL,NULL,NULL,NULL,11,'caz',NULL,NULL,NULL,NULL,'CAZ > %{n} Appliance Vent System Type','CAZ Appliance',1,NULL,NULL,NULL,NULL,NULL,NULL,75,75,NULL,NULL,NULL,NULL,60),(942,'Select','CAZ Water Heater Orphaned','Water Heater Combustion Ventilation Orphaned',NULL,NULL,0,0,NULL,NULL,NULL,NULL,11,'caz',NULL,NULL,NULL,NULL,'CAZ > %{n} Water Heater Orphaned','CAZ Appliance',1,NULL,NULL,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,254),(943,'Input','Attic Roof Absorptance','Enter the Solar Absorptance of the roofing material above this attic space. Solar Absorptance is equal to 1 - Solar Reflectance. For example, if the ENERGY STAR website gives a Initial Solar Reflectance of 0.27, enter 0.73. Default numbers will be supplied automatically, so don\'t change these settings unless you plan to specify a cool roof as an improvement.',0.00,1.00,2,0,'0.80,0.57',NULL,NULL,2,1,NULL,'jobform_attics',NULL,NULL,NULL,NULL,'Attic Insulation Rec',0,'#',NULL,'BaseAtticAbsorptance%{n}','ImpAtticAbsorptance%{n}',NULL,NULL,NULL,NULL,23,9,NULL,10,NULL),(945,'Input','Attic Roof Emissivity','Enter the Thermal Emittance or Emissivity of the roofing material above this attic space. Default numbers will be supplied automatically, so don\'t change these settings unless you plan to specify a cool roof as an improvement.',0.00,1.00,2,0,'0.76,0.89',NULL,NULL,2,1,NULL,'jobform_attics',NULL,NULL,NULL,NULL,'Attic Insulation Rec',0,'#',NULL,'BaseAtticEmittance%{n}','ImpAtticEmittance%{n}',NULL,NULL,NULL,NULL,23,9,NULL,10,NULL),(946,'Input','Vault Roof Absorptance','Enter the Solar Absorptance of the roofing material above this vaulted ceiling. Solar Absorptance is equal to 1 - Solar Reflectance. For example, if the ENERGY STAR website gives a Initial Solar Reflectance of 0.27, enter 0.73. Default numbers will be supplied automatically, so don\'t change these settings unless you plan to specify a cool roof as an improvement.',0.00,1.00,2,0,'0.80,0.57',NULL,NULL,20,7,NULL,NULL,NULL,NULL,NULL,'Vault > %{n} Roof Absorptance','Vault Insulation Rec',0,'#',NULL,'BaseCeilingAbsorptance%{n}','ImpCeilingAbsorptance%{n}',NULL,NULL,NULL,NULL,23,9,NULL,NULL,NULL),(947,'Input','Vault Roof Emissivity','Enter the Thermal Emittance or Emissivity of the roofing material above this vaulted ceiling. Default numbers will be supplied automatically, so don\'t change these settings unless you plan to specify a cool roof as an improvement.',0.00,1.00,2,0,'0.76,0.89',NULL,NULL,20,7,NULL,NULL,NULL,NULL,NULL,'Vault > %{n} Roof Emissivity','Vault Insulation Rec',0,'#',NULL,'BaseCeilingEmittance%{n}','ImpCeilingEmittance%{n}',NULL,NULL,NULL,NULL,23,9,NULL,NULL,NULL),(948,'Input','DHW Heating Capacity','Enter the rated input capacity of the water heater in BTU/hr.',1.00,9999999.00,0,0,'36000,54000',NULL,NULL,7,2,'dhw',NULL,NULL,NULL,NULL,'DHW > %{n} Heating Capacity','DHW Rec',0,'BTU/hr',NULL,'BaseDHWSize%{n}','ImpDHWSize%{n}/value',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(949,'Input','DHW Tank Size','Enter the tank size the water heater in gallons.',0.00,120.00,0,0,'40,50',NULL,NULL,7,2,'dhw',NULL,NULL,NULL,NULL,'DHW > %{n} Tank Size','DHW Rec',0,'Gallons',NULL,'BaseDHWGallons%{n}','ImpDHWGallons%{n}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(950,'Radio','Attic Cool Roof?','Choose yes if you would like to specify characteristics of a cool roof (such as ENERGY STAR qualified roof products) for either the base or improved home. Default numbers will be supplied automatically. Most contractors will not use this option unless they are actually planning to replace a roof as part of an improvement package. ',NULL,NULL,NULL,0,NULL,NULL,11,2,1,'attic:bool',NULL,NULL,NULL,NULL,NULL,'Attic Insulation Rec',1,'',NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),(951,'Radio','Vault Cool Roof?','Choose yes if you would like to specify characteristics of a cool roof (such as ENERGY STAR qualified roof products) for either the base or improved home. Default numbers will be supplied automatically. Most contractors will not use this option unless they are actually planning to replace a roof as part of an improvement package. ',NULL,NULL,NULL,0,NULL,NULL,11,2,1,'attic:bool',NULL,NULL,NULL,NULL,NULL,'Attic Insulation Rec',1,'',NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),(954,'Select','DHW Location2','Select the where the hot water system that stores or delivers the domestic hot water for the home is located. If more than one type of system is used for hot water in the home, select the location for the one that delivers the most gallons of hot water to the home.',NULL,NULL,NULL,0,NULL,NULL,15,NULL,2,'dhw','jobform_dhws','location',NULL,NULL,'DHW > %{n} Location','DHW',1,NULL,NULL,NULL,NULL,NULL,NULL,40,NULL,6,NULL,6,4,NULL),(957,'Input','# of LEDs','Use this field to override the number of LEDs that exist in the home before (Base) or after (Improved) the retrofit.',0.00,999.00,0,0,NULL,NULL,NULL,13,NULL,NULL,NULL,NULL,NULL,NULL,'Lighting > LED Count','Lighting Rec',0,'#',NULL,'BaseLED','ImpLED',NULL,NULL,NULL,NULL,17,4,13,NULL,NULL),(959,'Select','DHW Fuel2','Select the type of energy source used to provide domestic hot water for the home. Domestic hot water is typically the hot water that comes from the faucets, showers, bathtubs, washing machines and dishwashers in the home. If more than one type of energy source is used to provide hot water, select the type that provides the most gallons of hot water.',NULL,NULL,NULL,0,NULL,NULL,15,NULL,2,'dhw','jobform_dhws','fuel',NULL,NULL,'DHW > %{n} Fuel','DHW',1,NULL,NULL,'BaseDHWFuel%{n}','ImpDHWFuel%{n}',NULL,NULL,68,68,6,NULL,6,1,NULL),(960,'Radio','Pv','Does the home have a Solar PV System?',NULL,NULL,NULL,0,NULL,NULL,17,24,NULL,'pv:bool',NULL,NULL,NULL,NULL,NULL,'Pv',1,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),(961,'Input','PV Production','PV system production in kWh.',0.00,100000.00,0,0,NULL,NULL,NULL,24,NULL,'pv',NULL,NULL,NULL,NULL,NULL,'PV',0,'kWh',NULL,'PVArraykWhDelToGridCellVIEW',NULL,NULL,NULL,NULL,NULL,NULL,NULL,24,NULL,NULL),(963,'Input','Crawlspace Rim Joist Length','This field will be automatically calculated based on the data you entered in the input form for House Length and House Width. This is the total length of the exposed perimeter of the rim joist for the crawlspace.<br><br>\n\n<strong>Note</strong>: This field is always displayed, regardless if the Rim Joist is actually insulated in the Crawlspace. In order for the Rim Joist to be counted in the modeling and be designated in the HPXML output, the Crawlspace Type must be set as Conditioned Crawl. Otherwise, the Rim Joist is counted as part of the Frame Floor (the crawlspace ceiling). ',0.00,1000000.00,2,0,NULL,NULL,12,5,NULL,'crawl:type',NULL,NULL,NULL,NULL,'Crawlspace > Rim Joist Length','Foundation - Crawl Space Rec',0,'ft',NULL,'BaseCrawlRJLength',NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,4,NULL),(964,'Select','Crawlspace Rim Joist Treatment','Choose whether or not the Rim Joist is treated in the same was as the Crawlspace Wall or separately.<br><br>\n\n<strong>Note</strong>: This field is triggered by the Crawlspace Type. In order for the Rim Joist to be counted in the modeling and be designated in the HPXML output, the Crawlspace Type must be set as Conditioned Crawl. Otherwise, the Rim Joist is counted as part of the Frame Floor (the crawlspace ceiling). ',NULL,NULL,NULL,0,NULL,NULL,12,5,NULL,'crawl:type',NULL,NULL,NULL,NULL,'Crawlspace > Rim Joist Treatment','Foundation - Crawl Space Rec',1,NULL,NULL,'BaseCrawlRJTreat/value','ImpCrawlRJTreat/value',NULL,NULL,77,77,25,NULL,5,4,NULL),(966,'Input','Crawlspace Rim Joist Insulation','Enter the R-value of the insulation for the Base or Improved Rim Joist in the Crawlspace.<br><br>\n\n<strong>Note</strong>: This field is triggered by the Crawlspace Type. In order for the Rim Joist to be counted in the modeling and be designated in the HPXML output, the Crawlspace Type must be set as Conditioned Crawl. Otherwise, the Rim Joist is counted as part of the Frame Floor (the crawlspace ceiling). ',0.00,100.00,0,0,NULL,NULL,NULL,5,NULL,'crawl:type',NULL,NULL,NULL,NULL,'Crawlspace > Rim Joist Insulation R Value','Foundation - Crawl Space Rec',0,'R Value',NULL,'BaseCrawlRJInsulR','ImpCrawlRJInsulR',NULL,NULL,NULL,NULL,25,NULL,5,4,NULL),(967,'Input','Basement Rim Joist Length','This field will be automatically calculated based on the data you entered in the input form for House Length and House Width. This is the total length of the exposed perimeter of the rim joist for the crawlspace.<br><br>',0.00,1000000.00,2,0,NULL,NULL,12,3,NULL,NULL,NULL,NULL,NULL,NULL,'Basement > Rim Joist Length','Foundation - Basement Walls Rec',0,'ft',NULL,'BaseBsmtRJLength',NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,4,NULL),(968,'Select','Basement Rim Joist Treatment','Choose whether or not the Rim Joist is treated in the same way as the Basement Wall or separately.',NULL,NULL,NULL,0,NULL,NULL,12,3,NULL,NULL,NULL,NULL,NULL,NULL,'Basement > Rim Joist Treatment','Foundation - Basement Walls Rec',1,NULL,NULL,'BaseBsmtRJTreat/value','ImpBsmtRJTreat/value',NULL,NULL,78,78,NULL,NULL,3,4,NULL),(970,'Input','Basement Rim Joist Insulation','Enter the R-value of the insulation for the Base or Improved Rim Joist in the Crawlspace.',0.00,100.00,0,0,NULL,NULL,12,3,NULL,NULL,NULL,NULL,NULL,NULL,'Basement > Rim Joist Insulation R Value','Foundation - Basement Walls Rec',0,'R Value',NULL,'BaseBsmtRJInsulR','ImpBsmtRJInsulR',NULL,NULL,NULL,NULL,NULL,NULL,3,4,NULL),(971,'Input','Demand kW',NULL,NULL,NULL,2,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'CA Only > Demand kW','CA Demand kW',0,NULL,NULL,'BaseCADemandkW','ImpCADemandkW',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(972,'Input','Demand kW Savings',NULL,NULL,NULL,2,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'CA Only > Demand kW Savings','CA Demand kW Savings',0,NULL,NULL,'CADemandkWSavings',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(973,'Radio','Has Ducts','Choose \"Yes\" if this is a ducted heat pump',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `v4_fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `v4_tech_spec_definitions`
--

DROP TABLE IF EXISTS `v4_tech_spec_definitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_tech_spec_definitions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title_label` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `jobform_section` varchar(100) CHARACTER SET utf8 NOT NULL,
  `collection_definition` varchar(100) CHARACTER SET utf8 NOT NULL,
  `order` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `v4_tech_spec_definitions`
--

LOCK TABLES `v4_tech_spec_definitions` WRITE;
/*!40000 ALTER TABLE `v4_tech_spec_definitions` DISABLE KEYS */;
INSERT INTO `v4_tech_spec_definitions` VALUES (1,'Property Details','building','',1),(3,'Appliances','appliances','',2),(4,'Heating & Cooling','hvac','hvac',15),(5,'Thermostat','thermostat','',16),(6,'Water Heating','dhw','dhw',17),(8,'Windows','windows','window',11),(9,'Pool & Hot Tub','pools','',17),(17,'Lighting','lighting','',5),(18,'Air Leakage','air_leakage','',14),(19,'Doors','doors','door',13),(20,'Refrigerators','refrigerators','refrigerator',3),(22,'Walls','walls','wall',8),(23,'Attics','attic','attic',6),(25,'Foundation','foundation','',9),(26,'Freezers','appliances','freezer',10),(28,'Vaults','vault','vault',7),(29,'Skylights','skylight','',12);
/*!40000 ALTER TABLE `v4_tech_spec_definitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `v4_options`
--

DROP TABLE IF EXISTS `v4_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_options` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `optiongroup_id` int(11) DEFAULT NULL,
  `display_value` varchar(100) DEFAULT NULL,
  `om_value` varchar(100) DEFAULT NULL,
  `om_dval` varchar(100) DEFAULT NULL,
  `migration_value` varchar(100) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `optiongroup_id` (`optiongroup_id`)
) ENGINE=InnoDB AUTO_INCREMENT=576 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `v4_options`
--

LOCK TABLES `v4_options` WRITE;
/*!40000 ALTER TABLE `v4_options` DISABLE KEYS */;
INSERT INTO `v4_options` VALUES (1,1,'Yes','True',NULL,'1',0,NULL),(2,1,'No','False',NULL,'2',1,NULL),(3,2,'Apartment','Apartment',NULL,'apartment',NULL,NULL),(4,2,'Condominium','Condominium',NULL,'condominium',NULL,NULL),(5,2,'Single Family Detached','Single-family Detached',NULL,'single_family_detached',NULL,NULL),(6,2,'Single Family Attached','Single-family Attached',NULL,'single_family_attached',NULL,NULL),(7,2,'Mobile Home','Mobile Home',NULL,'mobile_home',NULL,NULL),(9,3,'North','North',NULL,'north',0,NULL),(10,3,'North East','NE',NULL,'ne',1,NULL),(11,3,'East','East',NULL,'east',2,NULL),(12,3,'South East','SE',NULL,'se',3,NULL),(13,3,'South','South',NULL,'south',4,NULL),(14,3,'South West','SW',NULL,'sw',5,NULL),(15,3,'West','West',NULL,'west',6,NULL),(16,3,'North West','NW',NULL,'nw',7,NULL),(17,4,'Well-Shielded','1',NULL,NULL,NULL,NULL),(18,4,'Normal','2',NULL,NULL,NULL,NULL),(19,4,'Exposed','3',NULL,NULL,NULL,NULL),(20,5,'1-car','1',NULL,'1-car',NULL,NULL),(21,5,'2-car','2',NULL,'2-car',NULL,NULL),(22,5,'3-car','3',NULL,'3-car',NULL,NULL),(23,5,'4-car','4',NULL,'4-car',NULL,NULL),(24,5,'5-car','5',NULL,'5-car',NULL,NULL),(25,21,'Natural Gas','Gas',NULL,'gas',1,NULL),(26,21,'Electricity','Elec',NULL,'electric',2,NULL),(27,21,'Propane','Propane',NULL,'propane',3,NULL),(28,21,'None','None',NULL,'none',4,NULL),(30,6,'Simple','FALSE',NULL,'simple',2,NULL),(31,6,'Detailed','TRUE',NULL,'detailed',1,NULL),(32,7,'Electricity','Elec',NULL,'electric',2,NULL),(33,7,'Fuel Oil','Fuel Oil',NULL,'fuel_oil',3,NULL),(34,7,'Natural Gas','Gas',NULL,'natural_gas',1,NULL),(35,7,'Propane','Propane',NULL,'propane',4,NULL),(37,7,'None','None',NULL,NULL,8,'2015-05-11 13:55:38'),(38,7,'Pellets','Pellets',NULL,NULL,5,'2015-03-13 13:55:38'),(40,7,'Wood','Wood',NULL,NULL,6,'2015-03-13 13:55:39'),(44,8,'Dollars','Dollars',NULL,'dollars',3,NULL),(45,8,'Gallons','Gallons',NULL,'gallons',2,NULL),(46,9,'kWh','kWh',NULL,'kwh',1,NULL),(47,9,'Dollars','Dollars',NULL,'dollars',2,NULL),(48,10,'Therms','Therms',NULL,'therms',0,NULL),(49,10,'Gallons','Gallons',NULL,'gallons',NULL,NULL),(50,10,'Dollars','Dollars',NULL,'dollars',NULL,NULL),(51,10,NULL,NULL,NULL,NULL,NULL,'2015-03-05 02:17:30'),(52,11,'Heating',NULL,NULL,'heating',1,NULL),(53,11,'Cooling',NULL,NULL,'cooling',2,NULL),(54,11,'Both',NULL,NULL,'dual',3,NULL),(55,12,'Boiler','Boiler',NULL,'boiler',NULL,NULL),(56,12,'Furnace','Furnace',NULL,'furnace',NULL,NULL),(57,12,'Electric Resistance','Electric Baseboard',NULL,'elec_baseboard',NULL,NULL),(58,12,'Direct Heater','Direct Heater',NULL,NULL,NULL,NULL),(59,12,'Stove or Insert','Stove',NULL,NULL,NULL,NULL),(60,12,'Ductless Heat Pump','Room Heat Pump',NULL,'heat_pump',NULL,NULL),(61,12,'Central Heat Pump','Central Heat Pump, Ducted',NULL,NULL,NULL,NULL),(63,14,'Central Heat Pump','__HEAT_PUMP__','','heat_pump',NULL,NULL),(64,13,'Central AC','Central Air Conditioner',NULL,'central_ac',1,NULL),(65,13,'Room AC','Room Air Conditioner',NULL,'room_ac',2,NULL),(66,13,'Evaporative Cooler (direct)','Evaporative Cooler, Direct',NULL,'evap_cooler',3,NULL),(67,13,'Evaporative Cooler (ducted)','Evaporative Cooler, Ducted',NULL,'evap_cooler_duct',4,NULL),(70,13,'Ductless Heat Pump','Room Heat Pump',NULL,'heat_pump',5,NULL),(71,14,'Furnace / Central AC','__FURNACE_AC__',NULL,'furnace_ac',NULL,NULL),(72,15,'0-5','0-5',NULL,'0_5',1,NULL),(73,15,'6-15','6-15',NULL,'6_15',2,NULL),(74,15,'16-40','16-40',NULL,'16_40',3,NULL),(75,15,'41+','41+',NULL,'41_plus',4,NULL),(76,16,'0-5','0-5',NULL,'0_5',1,NULL),(77,16,'6-10','6-10',NULL,'6_10',2,NULL),(78,16,'11-15','11-15',NULL,'11_15',3,NULL),(79,16,'16-20','16-20',NULL,'16_20',4,NULL),(80,16,'21-25','21-25',NULL,'21_25',5,NULL),(81,16,'26-30','26-30',NULL,'26_30',6,NULL),(82,16,'31-35','31-35',NULL,'31_35',7,NULL),(83,16,'36+','36+',NULL,'36_plus',8,NULL),(84,17,'None','None',NULL,'none',1,NULL),(85,17,'Electricity','Elec',NULL,'electric',2,NULL),(86,17,'Fuel Oil','Oil',NULL,'oil',5,NULL),(87,17,'Natural Gas','Gas',NULL,'gas',3,NULL),(88,17,'Pellets','Pellets',NULL,NULL,6,NULL),(89,17,'Propane','Propane',NULL,'propane',4,NULL),(90,17,'Solar','Solar',NULL,'solar',8,NULL),(91,17,'Wood','Wood',NULL,NULL,7,NULL),(92,18,'Intentionally Conditioned Space','2',NULL,'two',1,NULL),(93,18,'Attic (unconditioned)','1',NULL,'one',2,NULL),(94,18,'Basement (unconditioned)','3',NULL,'three',3,NULL),(95,18,'Crawlspace (unconditioned)','4',NULL,'four',4,NULL),(96,18,'50/50 Attic - Basement (both unconditioned)','5',NULL,'five',5,NULL),(97,18,'50/50 Attic (unconditioned) - Conditioned Space','6',NULL,'six',6,NULL),(98,18,'50/50 Attic - Crawlspace (both unconditioned)','7',NULL,'seven',7,NULL),(99,18,'50/50 Basement (unconditioned) - Conditioned Space','8',NULL,'eight',8,NULL),(100,18,'50/50 Crawlspace (unconditioned) - Conditioned Space','9',NULL,'nine',9,NULL),(101,18,'70/30 Conditioned Space - Garage (unconditioned)','10',NULL,'ten',10,NULL),(102,19,'30% - Very leaky','30',NULL,'thirty',1,NULL),(103,19,'15% - Somewhat leaky','15',NULL,'fifteen',2,NULL),(104,19,'6% - Well sealed','6',NULL,'six',3,NULL),(105,19,'3% - Very tight','3',NULL,'three',4,NULL),(106,19,'Measured (CFM25)','Measured',NULL,'measured',5,NULL),(107,19,NULL,NULL,NULL,NULL,NULL,'2015-04-06 15:07:02'),(108,20,'No Insulation','195999999999',NULL,'none',1,NULL),(109,20,'Duct Board 1\"','196099999999',NULL,'board_1',2,NULL),(110,20,'Duct Board 1.5\"','196199999999',NULL,'board_1_5',3,NULL),(111,20,'Duct Board 2\"','196299999999',NULL,'board_2',4,NULL),(112,20,'Fiberglass 1.25\"','196399999999',NULL,'fiberglass_1_25',5,NULL),(113,20,'Fiberglass 2\"','196499999999',NULL,'fiberglass_2',6,NULL),(114,20,'Fiberglass 2.5\"','196599999999',NULL,'fiberglass_2_5',7,NULL),(115,20,'Reflective bubble wrap','196699999999',NULL,'bubble_wrap',8,NULL),(116,20,'Measured (R Value)','195999999999',NULL,NULL,9,NULL),(117,29,'No Improvement','No Improvement','No Improvement','',1,NULL),(118,29,'50% Reduction','202799999999',NULL,NULL,2,'2015-03-08 23:50:32'),(119,29,'Measured (cfm25) - add cost manually','Measured (cfm25)','Measured (cfm25)','',4,NULL),(120,22,'Electricity','Elec',NULL,'electric',2,NULL),(121,22,'None','None',NULL,'none',4,NULL),(122,22,'Natural Gas','Gas',NULL,'gas',1,NULL),(123,22,'Propane','Propane',NULL,'propane',3,NULL),(125,23,'Yes','True',NULL,NULL,1,NULL),(126,23,'No','False',NULL,NULL,2,NULL),(128,24,'Unknown','Unknown',NULL,NULL,1,NULL),(131,25,'Unknown','Unknown',NULL,NULL,1,NULL),(132,25,'Amana','Amana',NULL,NULL,2,NULL),(140,26,'Front Load','1.62',NULL,NULL,1,NULL),(141,26,'Top Load','1.4',NULL,NULL,2,NULL),(142,26,'No Clothes Washer','0',NULL,NULL,3,NULL),(143,27,'Unknown','Unknown',NULL,NULL,1,NULL),(144,27,'Amana','Amana',NULL,NULL,2,NULL),(153,28,'Yes','0.6',NULL,NULL,1,NULL),(154,28,'No','0',NULL,NULL,2,NULL),(155,30,'0%','0-0',NULL,'0_0',1,NULL),(156,30,'1-25%','1-25',NULL,'1_25',2,NULL),(157,30,'26-50%','26-50',NULL,'26_50',3,NULL),(158,30,'51-75%','51-75',NULL,'51_75',4,NULL),(159,30,'76-99%','76-99',NULL,'76_99',5,NULL),(160,30,'100%','100',NULL,'100_100',6,NULL),(161,31,'Yes',NULL,NULL,NULL,NULL,NULL),(162,31,'No',NULL,NULL,NULL,NULL,NULL),(163,32,'Passed',NULL,NULL,'1',1,NULL),(164,32,'Failed',NULL,NULL,'2',2,NULL),(165,32,'Warning',NULL,NULL,'3',3,NULL),(166,32,'Not Tested',NULL,NULL,'4',4,NULL),(167,33,'Intentional','1',NULL,NULL,1,NULL),(168,33,'Intentional w/ continuous circulation','2',NULL,NULL,2,NULL),(169,33,'Incidental-Desired (e.g. leaky ducts)','3',NULL,NULL,3,NULL),(170,33,'None or Undesired Incidental','4',NULL,NULL,4,NULL),(171,34,'None or Bare Walls','None',NULL,'none',1,NULL),(172,34,'Fiberglass blanket or batts on wall','Continuous',NULL,'continuous',2,NULL),(173,34,'Finished wall without Insulation','Finished',NULL,'finished',3,NULL),(174,34,'Finished wall with Insulation','Finished and Insulated',NULL,'finished_insulated',4,NULL),(175,35,'Unknown','Unknown',NULL,NULL,1,NULL),(186,36,'Crawlspace has insulation installed on the exterior wall area','Walls',NULL,'walls',1,NULL),(187,36,'Crawlspace has insulation installed under only the living space floor','Floor',NULL,'floor',2,NULL),(188,36,'Crawlspace is uninsulated','Vented',NULL,'vented',3,NULL),(189,37,'Conditioned Crawl','Wall',NULL,'wall',4,NULL),(190,37,'Unvented - Unconditioned Crawl','Floor',NULL,'floor',1,NULL),(191,38,'0-5','0-5',NULL,'0_5',1,NULL),(192,38,'36+','36+',NULL,'36_plus',8,NULL),(193,38,'6-10','6-10',NULL,'6_10',2,NULL),(194,38,'11-15','11-15',NULL,'11_15',3,NULL),(195,38,'16-20','16-20',NULL,'16_20',4,NULL),(196,38,'21-25','21-25',NULL,'21_25',5,NULL),(197,38,'31-35','31-35',NULL,'31_35',7,NULL),(198,39,'Electricity','Elec',NULL,'electric',1,NULL),(199,39,'Fuel Oil','Oil',NULL,'oil',3,NULL),(200,39,'Natural Gas','Gas',NULL,'gas',2,NULL),(201,39,'Propane','Propane',NULL,'propane',4,NULL),(202,39,'Solar','Solar',NULL,'solar',5,NULL),(203,39,'None','None',NULL,'none',6,NULL),(204,40,'Garage or Unconditioned Space','Garage',NULL,'garage',2,NULL),(205,40,'Indoors and within heated area','Indoors',NULL,'indoors',1,NULL),(206,40,'Outbuilding','Outbuilding',NULL,'outbuilding',3,NULL),(207,41,'Unknown','Unknown',NULL,NULL,1,NULL),(208,41,'Bosch','Bosch',NULL,NULL,4,NULL),(209,41,'Bryant','Bryant',NULL,NULL,6,NULL),(210,41,'Comfort Maker','Comfort Maker',NULL,NULL,7,NULL),(211,41,'Rheem','Rheem',NULL,NULL,13,NULL),(212,41,'A.O. Smith','A.O. Smith',NULL,NULL,2,NULL),(213,41,'Bradford White','Bradford White',NULL,NULL,5,NULL),(214,41,'Rinnai','Rinnai',NULL,NULL,11,NULL),(215,41,'State Industries','State Industries',NULL,NULL,14,NULL),(216,42,'Low (120-130 F)','120-130',NULL,'120_130',1,NULL),(217,42,'Medium (130-140 F)','130-140',NULL,'130_140',2,NULL),(218,42,'High (140-150 F)','140-150',NULL,'140_150',3,NULL),(219,42,'Very High (150+ F)','150+',NULL,'150_plus',4,NULL),(220,43,'Standard tank','Standard',NULL,'standard',1,NULL),(221,43,'Tank with extra insulation','Well Insulated',NULL,'well_insulated',2,NULL),(222,43,'Tankless (on-demand)','Tankless',NULL,'tankless',3,NULL),(223,43,'Sidearm Tank (set EF manually)','Standard',NULL,'sidearm_tank',4,NULL),(224,44,'Tank Water Heater','Tank Water Heater',NULL,NULL,1,NULL),(225,44,'Tankless Water Heater','Tankless Water Heater',NULL,NULL,2,NULL),(228,45,'Steel, hollow','Steel, hollow',NULL,'steel_hollow',NULL,NULL),(229,45,'Steel, hollow with storm','Steel, hollow with storm',NULL,'steel_hollow_storm',NULL,NULL),(230,45,'Steel, insulated','Steel, insulated',NULL,'steel_insulated',NULL,NULL),(231,45,'Wood','Wood',NULL,'wood',NULL,NULL),(232,45,'Wood with Storm','Wood with Storm',NULL,'wood_storm',NULL,NULL),(234,45,'Fiberglass','Fiberglass',NULL,'fiberglass',NULL,NULL),(237,46,'No Insulation Improvement','No Improvement','186799999999',NULL,1,NULL),(238,46,'R-6 Duct Insulation ','21499999999',NULL,NULL,2,NULL),(239,46,'R-8 Duct Insulation','21599999999',NULL,NULL,3,NULL),(240,46,'Measured (R Value) - add cost manually','211299999999',NULL,NULL,4,NULL),(243,47,'Insect Screen (full)','2',NULL,NULL,NULL,NULL),(244,47,'Insect Screen (half)','3',NULL,NULL,NULL,NULL),(245,47,'Solar Screen (summer only)','4',NULL,NULL,NULL,NULL),(246,47,'Solar Screen (all year)','5',NULL,NULL,NULL,NULL),(247,47,'Solar Shades, Vertical Roller (summer only)','6',NULL,NULL,NULL,NULL),(248,47,'Solar Shades, Vertical Roller (all year)','7',NULL,NULL,NULL,NULL),(249,47,'Solar Shades, Louvered (summer only)','8',NULL,NULL,NULL,NULL),(250,47,'Solar Shades, Louvered (all year)','9',NULL,NULL,NULL,NULL),(251,47,'Solar Film (all year)','10',NULL,NULL,NULL,NULL),(252,47,'No Treatment','1',NULL,NULL,NULL,NULL),(253,48,'Concrete Block','Concrete Block',NULL,'concrete_block',1,NULL),(254,48,'Full Brick','Full brick',NULL,'full_brick',2,NULL),(255,48,'Frame','Frame',NULL,'frame',3,NULL),(256,48,'Log','Log',NULL,'log',4,NULL),(257,48,'Straw Bale','Straw Bale',NULL,'straw_bale',5,NULL),(258,49,'Brick Veneer','Brick veneer',NULL,'brick_veneer',NULL,NULL),(259,49,'Metal/vinyl siding','Metal/vinyl siding',NULL,'metal_vinyl',NULL,NULL),(260,49,'Shingle/Composition','Shingle/Composition',NULL,'shingle_composition',NULL,NULL),(261,49,'Stone veneer','Stone veneer',NULL,'stone_veneer',NULL,NULL),(262,49,'Stucco','Stucco',NULL,'stucco',NULL,NULL),(263,49,'Wood/Fiber Cement siding','Wood siding',NULL,'wood_fiber_cement',NULL,NULL),(264,49,'Other','Other',NULL,'other',NULL,NULL),(266,50,'Unknown','Unknown',NULL,NULL,1,NULL),(268,51,'North','North',NULL,'north',1,NULL),(269,51,'North East','NE',NULL,'ne',2,NULL),(270,51,'East','East',NULL,'east',3,NULL),(271,51,'South East','SE',NULL,'se',4,NULL),(272,51,'South','South',NULL,'south',5,NULL),(273,51,'South West','South West',NULL,'sw',6,NULL),(274,51,'West','West',NULL,'west',7,NULL),(275,51,'North West','NW',NULL,'nw',8,NULL),(277,52,'1-3','1-3',NULL,'1_3',2,NULL),(278,52,'4-6','4-6',NULL,'4_6',3,NULL),(279,52,'7-9','7-9',NULL,'7_9',4,NULL),(280,52,'10-12','10-12',NULL,'10_12',5,NULL),(282,52,'16+','16+',NULL,'16+',7,NULL),(283,53,'Fiberglass or Rockwool (batts or blown)','Fiberglass',NULL,'fiberglass',NULL,NULL),(284,53,'Cellulose','Cellulose',NULL,'cellulose',NULL,NULL),(285,53,'Spray Foam','Spray Foam',NULL,'spray_foam',NULL,NULL),(288,54,'0.5','0.5',NULL,NULL,NULL,NULL),(289,54,'0.75','0.75',NULL,NULL,NULL,NULL),(290,54,'1','1',NULL,NULL,NULL,NULL),(291,54,'1.5','1.5',NULL,NULL,NULL,NULL),(292,54,'2','2',NULL,NULL,NULL,NULL),(293,54,'3','3',NULL,NULL,NULL,NULL),(294,55,'Single Speed','2',NULL,NULL,NULL,NULL),(295,55,'Two Speed','3',NULL,NULL,NULL,NULL),(296,55,'Variable Speed','4',NULL,NULL,NULL,NULL),(297,55,'No Pool Pump','5',NULL,NULL,NULL,NULL),(298,56,'0-14','0-14',NULL,'0_5',NULL,NULL),(299,56,'15-21','15-21',NULL,'6_10',NULL,NULL),(300,56,'22-24','22-24',NULL,'11_15',NULL,NULL),(302,56,'25-26','25-26',NULL,'16_20',NULL,NULL),(303,56,'27-30','27-30',NULL,'21_25',NULL,NULL),(304,56,'31-34','31-34',NULL,'26_30',NULL,NULL),(305,56,'35-42','35-42',NULL,'31_35',NULL,NULL),(306,56,'42+','42+',NULL,'36_plus',NULL,NULL),(310,57,'Unknown','Unknown',NULL,NULL,NULL,NULL),(311,57,'Amana','Amana',NULL,NULL,NULL,NULL),(315,58,'1-5','1-5',NULL,'1_5',NULL,NULL),(316,58,'6-12','6-12',NULL,'6_12',NULL,NULL),(317,58,'13-15','13-15',NULL,'13_15',NULL,NULL),(318,58,'16-18','16-18',NULL,'16_18',NULL,NULL),(319,58,'19-21','19-21',NULL,'19_21',NULL,NULL),(320,58,'22+','22+',NULL,'22_plus',NULL,NULL),(326,59,'Apartment','Apartment',NULL,'apartment',NULL,NULL),(327,59,'Condominium','Condominium',NULL,'condominium',NULL,NULL),(328,59,'Single Family Detached','Single-family Detached',NULL,'single_family_detached',NULL,NULL),(329,59,'Single Family Attached','Single-family Attached',NULL,'single_family_attached',NULL,NULL),(330,59,'Mobile Home','Mobile Home',NULL,'mobile_home',NULL,NULL),(331,60,'Well','Well',NULL,NULL,NULL,NULL),(332,60,'Yes','Yes',NULL,NULL,NULL,NULL),(333,41,'American','American',NULL,NULL,3,NULL),(334,41,'Sears','Sears',NULL,NULL,12,NULL),(335,60,'Poorly','Poor',NULL,NULL,NULL,NULL),(336,60,'No','No',NULL,NULL,NULL,NULL),(337,61,'Well','Well',NULL,NULL,1,NULL),(338,61,'Yes','Yes',NULL,'1',3,NULL),(339,61,'Poorly','Poor',NULL,NULL,2,NULL),(340,61,'No','No',NULL,'2',4,NULL),(341,62,'1','1',NULL,NULL,NULL,NULL),(342,62,'2','2',NULL,NULL,NULL,NULL),(343,62,'3','3',NULL,NULL,NULL,NULL),(344,62,'4','4',NULL,NULL,NULL,NULL),(345,63,'Metal','Metal',NULL,'metal',NULL,NULL),(346,63,'Vinyl','Vinyl',NULL,'vinyl',NULL,NULL),(347,63,'Wood or metal clad','Wood',NULL,'wood',NULL,NULL),(348,50,'Amana','Amana',NULL,NULL,0,NULL),(357,64,'Single pane','Single',NULL,'single',NULL,NULL),(358,64,'Single pane + storm','Single + Storm',NULL,'single_storm',NULL,NULL),(359,64,'Double pane','Double',NULL,'double',NULL,NULL),(360,64,'Double pane + low e','Double + Low E',NULL,'double_low_e',NULL,NULL),(361,64,'Triple pane + low e','Triple + Low E',NULL,'triple_low_e',NULL,NULL),(371,6,'No Bills',NULL,NULL,NULL,3,NULL),(372,13,'None','None',NULL,NULL,6,NULL),(373,49,'None','None',NULL,'none',NULL,NULL),(374,24,'AirEase','AirEase',NULL,NULL,2,NULL),(375,24,'Amana','Amana',NULL,NULL,3,NULL),(376,24,'American Standard','American Standard',NULL,NULL,4,NULL),(377,24,'Bosch','Bosch',NULL,NULL,5,NULL),(378,24,'Bryant','Bryant',NULL,NULL,6,NULL),(379,24,'Carrier','Carrier',NULL,NULL,7,NULL),(380,24,'Coleman','Coleman',NULL,NULL,8,NULL),(381,24,'Comfort Master','Comfort Master',NULL,NULL,9,NULL),(382,24,'Goodman','Goodman',NULL,NULL,14,NULL),(383,24,'Janitrol','Janitrol',NULL,NULL,15,NULL),(384,24,'Lennox','Lennox',NULL,NULL,16,NULL),(385,24,'Luxaire','Luxaire',NULL,NULL,18,NULL),(386,24,'Payne','Payne',NULL,NULL,20,NULL),(387,24,'Peerless','Peerless',NULL,NULL,23,NULL),(388,24,'Rheem','Rheem',NULL,NULL,24,NULL),(389,24,'RUUD','RUUD',NULL,NULL,25,NULL),(390,24,'Sears Kenmore','Sears Kenmore',NULL,NULL,27,NULL),(391,24,'Tappan','Tappan',NULL,NULL,28,NULL),(392,24,'Trane','Trane',NULL,NULL,29,NULL),(393,24,'Utica','Utica',NULL,NULL,30,NULL),(394,24,'York','York',NULL,NULL,31,NULL),(395,35,'Amana','Amana',NULL,NULL,3,NULL),(396,35,'American Standard','American Standard',NULL,NULL,4,NULL),(397,35,'Bosch','Bosch',NULL,NULL,5,NULL),(398,35,'Bryant','Bryant',NULL,NULL,6,NULL),(399,35,'Carrier','Carrier',NULL,NULL,7,NULL),(400,35,'Coleman','Coleman',NULL,NULL,8,NULL),(401,35,'Comfort Maker','Comfort Maker',NULL,NULL,9,NULL),(402,35,'Coolerado','Coolerado',NULL,NULL,10,NULL),(403,35,'Fridgidaire','Fridgidaire',NULL,NULL,13,NULL),(404,35,'Goodman','Goodman',NULL,NULL,16,NULL),(405,35,'Lennox','Lennox',NULL,NULL,18,NULL),(406,35,'LG','LG',NULL,NULL,19,NULL),(407,35,'Luxaire','Luxaire',NULL,NULL,20,NULL),(408,35,'Payne','Payne',NULL,NULL,23,NULL),(409,35,'Rheem','Rheem',NULL,NULL,25,NULL),(410,35,'RUUD','RUUD',NULL,NULL,26,NULL),(411,35,'Sears Kenmore','Sears Kenmore',NULL,NULL,28,NULL),(412,35,'Tappan','Tappan',NULL,NULL,29,NULL),(413,35,'Trane','Trane',NULL,NULL,30,NULL),(414,35,'York','York',NULL,NULL,32,NULL),(415,57,'Asko','Asko',NULL,NULL,NULL,NULL),(416,57,'Bosch','Bosch',NULL,NULL,NULL,NULL),(417,57,'Fridgidaire','Fridgidaire',NULL,NULL,NULL,NULL),(418,57,'GE','GE',NULL,NULL,NULL,NULL),(419,57,'Hotpoint','Hotpoint',NULL,NULL,NULL,NULL),(420,57,'KitchenAid','KitchenAid',NULL,NULL,NULL,NULL),(421,57,'LG','LG',NULL,NULL,NULL,NULL),(422,57,'Maytag','Maytag',NULL,NULL,NULL,NULL),(423,57,'Samsung','Samsung',NULL,NULL,NULL,NULL),(424,57,'Sears','Sears',NULL,NULL,NULL,NULL),(425,57,'Sub-Zero','Sub-Zero',NULL,NULL,NULL,NULL),(426,57,'Thermador','Thermado',NULL,NULL,NULL,NULL),(427,57,'Whirlpool','Whirlpool',NULL,NULL,NULL,NULL),(428,50,'Asko','Asko',NULL,NULL,NULL,NULL),(429,50,'Bosch','Bosch',NULL,NULL,NULL,NULL),(430,50,'Fridgidaire','Fridgidaire',NULL,NULL,NULL,NULL),(431,50,'GE','GE',NULL,NULL,NULL,NULL),(432,50,'Igloo','Igloo',NULL,NULL,NULL,NULL),(433,50,'LG','LG',NULL,NULL,NULL,NULL),(434,50,'Maytag','Maytag',NULL,NULL,NULL,NULL),(435,50,'Samsung','Samsung',NULL,NULL,NULL,NULL),(436,50,'Sears','Sears',NULL,NULL,NULL,NULL),(437,50,'Sub-Zero','Sub-Zero',NULL,NULL,NULL,NULL),(438,50,'Thermador','Thermador',NULL,NULL,NULL,NULL),(439,50,'Whirlpool','Whirlpool',NULL,NULL,NULL,NULL),(440,27,'Asko','Asko',NULL,NULL,NULL,NULL),(441,27,'Bosch','Bosch',NULL,NULL,NULL,NULL),(442,27,'Fridgidaire','Fridgidaire',NULL,NULL,NULL,NULL),(443,27,'GE','GE',NULL,NULL,NULL,NULL),(444,27,'Hotpoint','Hotpoint',NULL,NULL,NULL,NULL),(445,27,'KitchenAid','KitchenAid',NULL,NULL,NULL,NULL),(446,27,'LG','LG',NULL,NULL,NULL,NULL),(447,27,'Maytag','Maytag',NULL,NULL,NULL,NULL),(448,27,'Samsung','Samsung',NULL,NULL,NULL,NULL),(449,27,'Sears','Sears',NULL,NULL,NULL,NULL),(450,27,'Thermador','Thermador',NULL,NULL,NULL,NULL),(451,27,'Whirlpool','Whirlpool',NULL,NULL,NULL,NULL),(452,25,'Asko','Asko',NULL,NULL,NULL,NULL),(453,25,'Bosch','Bosch',NULL,NULL,NULL,NULL),(454,25,'Fridgidaire','Fridgidaire',NULL,NULL,NULL,NULL),(455,25,'GE','GE',NULL,NULL,NULL,NULL),(456,25,'Hotpoint','Hotpoint',NULL,NULL,NULL,NULL),(457,25,'LG','LG',NULL,NULL,NULL,NULL),(458,25,'Maytag','Maytag',NULL,NULL,NULL,NULL),(459,25,'Samsung','Samsung',NULL,NULL,NULL,NULL),(460,25,'Sears','Sears',NULL,NULL,NULL,NULL),(461,25,'Westinghouse','Westinghouse',NULL,NULL,NULL,NULL),(462,25,'Whirlpool','Whirlpool',NULL,NULL,NULL,NULL),(463,0,'Don\'t Know',NULL,NULL,NULL,NULL,NULL),(464,0,'',NULL,NULL,NULL,NULL,NULL),(465,65,'No Improvement','100',NULL,NULL,1,NULL),(466,65,'Front Load','1.62',NULL,NULL,NULL,NULL),(467,65,'Top Load','1.4',NULL,NULL,NULL,NULL),(468,65,'No Clothes Washer','0',NULL,NULL,NULL,NULL),(469,7,'Solar','Solar',NULL,NULL,7,NULL),(470,66,'Front Load','1.62',NULL,NULL,NULL,NULL),(471,66,'Top Load','1.4',NULL,NULL,NULL,NULL),(472,66,'No Clothes Washer','0',NULL,NULL,NULL,NULL),(473,67,'Pentair','Pentair',NULL,NULL,NULL,NULL),(474,38,'26-30','26-30',NULL,'26_30',6,NULL),(475,52,'0','0-0',NULL,'0_0',1,NULL),(476,52,'13-15','13-15',NULL,'13_15',6,NULL),(477,68,'Natural Gas','Gas',NULL,NULL,2,NULL),(478,68,'Propane','Propane',NULL,NULL,4,NULL),(479,68,'Fuel Oil','Oil',NULL,NULL,3,NULL),(480,68,'Electricity','Elec',NULL,NULL,1,NULL),(481,68,'Solar','Solar',NULL,NULL,5,NULL),(482,68,'None','None',NULL,NULL,6,NULL),(483,68,NULL,NULL,NULL,NULL,NULL,'2015-03-05 20:29:37'),(484,69,'Indoors and within heated area','1',NULL,NULL,NULL,NULL),(485,69,'Garage or Unconditioned Space','2',NULL,NULL,NULL,NULL),(486,69,'Outbuilding','3',NULL,NULL,NULL,NULL),(487,44,'Heat Pump','Heat Pump (Integrated)',NULL,NULL,NULL,NULL),(488,56,'Don\'t Know','Don\'t Know',NULL,'Don\'t Know',NULL,NULL),(489,45,'Don\'t Know','Don\'t Know',NULL,'Don\'t Know',NULL,'2015-03-11 16:19:33'),(490,70,'No Improvement','100',NULL,NULL,NULL,NULL),(491,70,'Yes','0.6',NULL,NULL,NULL,NULL),(492,70,'No','0',NULL,NULL,NULL,NULL),(493,8,NULL,NULL,NULL,NULL,1,'2015-03-31 08:50:32'),(494,7,'Wood','Wood',NULL,NULL,5,NULL),(495,7,'Pellets','Pellets',NULL,NULL,6,NULL),(499,73,'1',NULL,NULL,NULL,1,NULL),(500,73,'2',NULL,NULL,NULL,2,NULL),(501,73,'3',NULL,NULL,NULL,3,NULL),(502,29,'Seal to 15% Leakage','Seal to 15% Leakage','Seal to 15% Leakage','',2,NULL),(503,29,'Seal to 6% Leakage','196799999999','196799999999',NULL,3,'2015-04-30 11:36:34'),(504,29,'Seal to 6% Leakage','Seal to 6% Leakage','Seal to 6% Leakage',NULL,3,NULL),(505,29,'Seal from 15% to 6% Leakage','196799999999','','',4,'2015-05-04 19:34:41'),(506,29,'No Improvement','229399999999',NULL,NULL,0,'2015-05-04 19:34:46'),(507,29,'50% Reduction','202799999999',NULL,NULL,NULL,'2015-05-04 19:34:44'),(508,29,'Measured (cfm25) - add cost manually','211599999999',NULL,NULL,NULL,'2015-05-04 19:34:44'),(509,74,'passed',NULL,NULL,NULL,1,NULL),(510,74,'fail',NULL,NULL,NULL,2,NULL),(511,74,'not tested',NULL,NULL,NULL,3,NULL),(512,75,'atmospheric',NULL,NULL,NULL,1,NULL),(513,75,'induced draft',NULL,NULL,NULL,2,NULL),(514,75,'power vented (at unit)',NULL,NULL,NULL,3,NULL),(515,75,'power vented (at exterior)',NULL,NULL,NULL,4,NULL),(516,75,'direct vented',NULL,NULL,NULL,5,NULL),(517,75,'sealed combustion',NULL,NULL,NULL,6,NULL),(518,13,'Central Heat Pump','Central Heat Pump, Ducted',NULL,NULL,2,NULL),(519,76,'No Treatment','229799999999',NULL,NULL,15,NULL),(520,76,'Solar Film (all year)','230699999999',NULL,NULL,10,NULL),(521,76,'Solar Shades, Louvered (all year)','230599999999',NULL,NULL,9,NULL),(522,76,'Solar Shades, Louvered (summer only)','230499999999',NULL,NULL,8,NULL),(523,76,'Solar Shades, Vertical Roller (all year)','230399999999',NULL,NULL,7,NULL),(524,76,'Solar Shades, Vertical Roller (summer only)','230299999999',NULL,NULL,6,NULL),(525,76,'Solar Screen (all year)','230199999999',NULL,NULL,5,NULL),(526,76,'Solar Screen (summer only)','230099999999',NULL,NULL,4,NULL),(527,76,'Insect Screen (half)','229999999999',NULL,NULL,2,NULL),(528,76,'Insect Screen (full)','229899999999',NULL,NULL,3,NULL),(529,76,'No Improvement','180799999999',NULL,NULL,1,NULL),(530,24,'Mitsubishi','Mitsubishi',NULL,NULL,19,NULL),(531,35,'Mitsubishi','Mitsubishi',NULL,NULL,21,NULL),(532,24,'Day & Night','Day & Night',NULL,NULL,11,NULL),(533,35,'Day & Night','Day & Night',NULL,NULL,12,NULL),(534,57,'Fisher & Paykel','Fisher & Paykel',NULL,NULL,NULL,NULL),(535,57,'Ikea','Ikea',NULL,NULL,NULL,NULL),(536,57,'Liebherr','Liebherr',NULL,NULL,NULL,NULL),(537,24,'General Electric','General Electric',NULL,NULL,13,NULL),(538,24,'Other','Other',NULL,NULL,50,NULL),(539,25,'Other','Other',NULL,NULL,NULL,NULL),(540,27,'Other','Other',NULL,NULL,NULL,NULL),(541,35,'Other','Other',NULL,NULL,50,NULL),(542,41,'Other','Other',NULL,NULL,18,NULL),(543,50,'Other','Other',NULL,NULL,NULL,NULL),(544,57,'Other','Other',NULL,NULL,NULL,NULL),(545,67,'Other','Other',NULL,NULL,NULL,NULL),(546,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(548,37,'Vented - Year Round','Vented',NULL,NULL,2,NULL),(549,37,'Vented - Summer Only','Summer',NULL,NULL,3,NULL),(550,37,NULL,NULL,NULL,NULL,NULL,'2015-10-13 11:52:12'),(551,41,'Stiebel Eltron','Stiebel Eltron',NULL,NULL,15,NULL),(552,77,'Same as Crawl Wall','0',NULL,NULL,1,NULL),(553,77,'Separately','1',NULL,NULL,2,NULL),(554,78,'Same as Basement Wall','0',NULL,NULL,1,NULL),(555,78,'Separately','1',NULL,NULL,2,NULL),(556,24,'Fujitsu','Fujitsu',NULL,NULL,12,NULL),(557,24,'Daikin','Daikin',NULL,NULL,10,NULL),(558,24,'Panasonic','Panasonic',NULL,NULL,21,NULL),(559,24,'LG','LG',NULL,NULL,17,NULL),(560,24,'Samsung','Samsung',NULL,NULL,26,NULL),(561,35,'AirEase','AirEase',NULL,NULL,2,NULL),(562,35,'Daikin','Daikin',NULL,NULL,11,NULL),(563,35,'Fujitsu','Fujitsu',NULL,NULL,14,NULL),(564,35,'General Electric','General Electric',NULL,NULL,15,NULL),(565,35,'Janitrol','Janitrol',NULL,NULL,17,NULL),(566,35,'Panasonic','Panasonic',NULL,NULL,22,NULL),(567,35,'Peerless','Peerless',NULL,NULL,24,NULL),(568,35,'Samsung','Samsung',NULL,NULL,27,NULL),(569,35,'Utica','Utica',NULL,NULL,31,NULL),(570,41,'Noritz','Noritz',NULL,NULL,10,NULL),(571,41,'Navien','Navien',NULL,NULL,9,NULL),(572,41,'Takaji','Takaji',NULL,NULL,16,NULL),(573,41,'Triangle Tube','Triangle Tube',NULL,NULL,17,NULL),(574,NULL,'Heat Pump','Heat Pump',NULL,NULL,NULL,NULL),(575,41,'GE','GE',NULL,NULL,8,NULL);
/*!40000 ALTER TABLE `v4_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `v4_optiongroups`
--

DROP TABLE IF EXISTS `v4_optiongroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_optiongroups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `has_blank` tinyint(1) NOT NULL DEFAULT '0',
  `has_dont_know` tinyint(1) NOT NULL DEFAULT '0',
  `default` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `v4_optiongroups`
--

LOCK TABLES `v4_optiongroups` WRITE;
/*!40000 ALTER TABLE `v4_optiongroups` DISABLE KEYS */;
INSERT INTO `v4_optiongroups` VALUES (1,'Boolean',0,0,NULL,NULL),(2,'Building - Type of Home',1,1,NULL,NULL),(3,'Building - Orientation',1,0,NULL,NULL),(4,'Building - Shielding',0,0,18,NULL),(5,'Building - Garage Size',0,0,NULL,NULL),(6,'Utility Bills - Entry Type',0,0,NULL,NULL),(7,'Utility Bills - Primary Heating Fuel',1,1,NULL,NULL),(8,'Utility Bills - Simple Fuel Units',0,0,44,NULL),(9,'Utility Bills - Detailed Electric Units',0,0,46,NULL),(10,'Utility Bills - Detailed Fuel Units',0,0,48,NULL),(11,'HVAC - System Type',1,0,NULL,NULL),(12,'HVAC - Heating Equipment',1,0,NULL,NULL),(13,'HVAC - Cooling Equipment',1,0,NULL,NULL),(14,'HVAC - Dual Equipment',1,0,NULL,NULL),(15,'HVAC - Heating Age',1,1,NULL,NULL),(16,'HVAC - Cooling Age',1,1,NULL,NULL),(17,'HVAC - Heating Energy Source',1,1,NULL,NULL),(18,'HVAC - Duct Location',1,0,NULL,NULL),(19,'HVAC - Duct Leakage',1,0,NULL,NULL),(20,'HVAC - Duct Insulation',1,0,NULL,NULL),(21,'Range Fuel Type',1,1,NULL,NULL),(22,'Dryer Fuel Type',1,1,124,NULL),(23,'Energy Star',0,0,NULL,NULL),(24,'Heating System Manufacturer',1,0,NULL,NULL),(25,'Clothes Washer Manufacturer',1,0,NULL,NULL),(26,'Clothes Washer Type - Base',1,0,NULL,NULL),(27,'Dishwasher Manufacturer',1,0,NULL,NULL),(28,'Dishwasher Installed',0,0,NULL,NULL),(29,'HVAC - Duct Leakage - Imp',1,0,NULL,NULL),(30,'% CFLs or LEDs',1,1,NULL,NULL),(32,'Health & Safety Tests',0,0,NULL,NULL),(33,'Basement Conditoning',0,0,167,NULL),(34,'Basement Insulation',1,1,NULL,NULL),(35,'Cooling System Manufacturer',1,0,NULL,NULL),(36,'Crawlspace Insulation',1,1,NULL,NULL),(37,'Crawlspace Type',0,0,NULL,NULL),(38,'DHW Age',1,0,NULL,NULL),(39,'DHW Fuel',1,1,NULL,NULL),(40,'DHW Location',1,1,NULL,NULL),(41,'DHW Manufacturer',1,0,NULL,NULL),(42,'DHW Temperature Settings',1,1,NULL,NULL),(43,'DHW Type',1,1,NULL,NULL),(44,'DHW Type - Base/Imp',1,0,NULL,NULL),(45,'Door Type',1,0,NULL,NULL),(46,'HVAC - Duct Insulation - Imp',0,0,NULL,NULL),(47,'Exterior Window Treatment',1,0,NULL,NULL),(48,'Exterior Wall Construction',1,1,NULL,NULL),(49,'Exterior Wall Siding',1,1,NULL,NULL),(50,'Freezer Manufacturer',1,0,NULL,NULL),(51,'Front of Building Orientation',1,0,NULL,NULL),(52,'Attic Insulation Depth',1,1,NULL,NULL),(53,'Attic Insulation Type',1,1,NULL,NULL),(54,'Pool Pump Horsepower',1,0,NULL,NULL),(55,'Pool Pump Type',1,0,NULL,NULL),(56,'Refrigerator Age',1,0,NULL,NULL),(57,'Refrigerator Manufacturer',1,0,NULL,NULL),(58,'Refrigerator Size',1,1,NULL,NULL),(59,'Type of Home',1,1,NULL,NULL),(60,'Vault Insulation',0,0,NULL,NULL),(61,'Wall Insulation',0,0,NULL,NULL),(62,'Wind Zone',0,0,342,NULL),(63,'Window Frame',1,1,NULL,NULL),(64,'Window Type',1,1,NULL,NULL),(65,'Clothes Washer Type - Improved',0,0,NULL,NULL),(66,'Clothes Washer Type - Jobform',1,0,471,NULL),(67,'Pool Pump Manufacturer',1,0,NULL,NULL),(68,'DHW Fuel - Base/Imp',1,0,NULL,NULL),(69,'DHW Location - Base/Imp',1,0,NULL,NULL),(70,'Dishwasher Installed - Imp',0,0,491,NULL),(73,'CAZ Zone',0,0,NULL,NULL),(74,'CAZ Test Result',0,0,NULL,NULL),(75,'Vent System Type',1,0,NULL,NULL),(76,'Exterior Window Treatment - Imp',1,0,NULL,NULL),(77,'Crawlspace Rim Joist Treatment',0,0,552,NULL),(78,'Basement Rim Joist Treatment',0,0,554,NULL);
/*!40000 ALTER TABLE `v4_optiongroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `v4_jobform_sections`
--

DROP TABLE IF EXISTS `v4_jobform_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v4_jobform_sections` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tag` varchar(100) DEFAULT NULL,
  `short` varchar(100) DEFAULT NULL,
  `long` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `v4_jobform_sections`
--

DROP TABLE IF EXISTS `v5_attic`;
DROP TABLE IF EXISTS `v5_dhw`;
DROP TABLE IF EXISTS `v5_door`;
DROP TABLE IF EXISTS `v5_freezer`;
DROP TABLE IF EXISTS `v5_hvac`;
DROP TABLE IF EXISTS `v5_refrigerator`;
DROP TABLE IF EXISTS `v5_vault`;
DROP TABLE IF EXISTS `v5_wall`;
DROP TABLE IF EXISTS `v5_window`;
DROP TABLE IF EXISTS `v5_caz`;
DROP TABLE IF EXISTS `v5_basedata`;
DROP TABLE IF EXISTS `v5_concern`;
DROP TABLE IF EXISTS `v5_health`;
DROP TABLE IF EXISTS `v5_utilities`;
DROP TABLE IF EXISTS `v5_totals`;
DROP TABLE IF EXISTS `v5_rec_definitions`;
DROP TABLE IF EXISTS `v5_reports`;
DROP TABLE IF EXISTS `v5_stages`;
DROP TABLE IF EXISTS `v5_job_stage_history`;
DROP TABLE IF EXISTS `v5_recommendation_caption_rows`;
DROP TABLE IF EXISTS `v5_recommendations`;
DROP TABLE IF EXISTS `v5_financing_templates`;
DROP TABLE IF EXISTS `v5_job_financing`;
DROP TABLE IF EXISTS `v5_optimiser_submissions`;
DROP TABLE IF EXISTS `v5_optimiser_sessions`;
DROP TABLE IF EXISTS `v5_caz_system`;
DROP TABLE IF EXISTS `v5_oven`;
DROP TABLE IF EXISTS `v5_range`;
DROP TABLE IF EXISTS `v5_clothes_dryer`;


LOCK TABLES `v4_jobform_sections` WRITE;
/*!40000 ALTER TABLE `v4_jobform_sections` DISABLE KEYS */;
INSERT INTO `v4_jobform_sections` VALUES (1,'building','Building','Building'),(2,'concerns','Concerns','Concerns'),(3,'utility','Utility Bills','Utility Bills'),(4,'thermostat','Thermostat','Thermostat'),(5,'hvac','HVAC','Heating & Cooling'),(6,'appliances','Appliances','Appliances'),(7,'refrigerators','Refrigerators','Refrigerators'),(8,'lighting','Lighting','Lighting'),(9,'doors','Doors','Doors'),(10,'walls','Walls','Walls'),(11,'attic','Attic','Attics / Vaulted Ceilings'),(12,'foundation','Foundation','Foundation'),(13,'windows','Windows','Windows'),(14,'air_leakage','Air Leakage','Air Leakage'),(15,'dhw','Hot Water','Hot Water (DHW)'),(16,'pools','Pools','Pools and Hot Tubs'),(17,'health','Health & Safety','Health & Safety'),(18,'caz','CAZ','Combustion Appliance Zones');
/*!40000 ALTER TABLE `v4_jobform_sections` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-02-29 20:50:53
