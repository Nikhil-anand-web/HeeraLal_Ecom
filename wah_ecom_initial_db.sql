-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: wahEcom
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_comboTovarient`
--

DROP TABLE IF EXISTS `_comboTovarient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_comboTovarient` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `_comboTovarient_AB_unique` (`A`,`B`),
  KEY `_comboTovarient_B_index` (`B`),
  CONSTRAINT `_comboTovarient_A_fkey` FOREIGN KEY (`A`) REFERENCES `combo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_comboTovarient_B_fkey` FOREIGN KEY (`B`) REFERENCES `varient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_comboTovarient`
--

LOCK TABLES `_comboTovarient` WRITE;
/*!40000 ALTER TABLE `_comboTovarient` DISABLE KEYS */;
INSERT INTO `_comboTovarient` VALUES ('118f09e2-9d76-4e9c-89b7-4f07cebc2106','4d620296-151a-4491-ac5a-0bb9941c20ba'),('0cfcc27e-399e-47e1-8eb2-02a3814a4cac','7a667df8-e3ab-4221-ab87-6852866d77f7'),('0f9fa5a8-6e0d-480b-aeb3-10293f2308b8','7a667df8-e3ab-4221-ab87-6852866d77f7'),('118f09e2-9d76-4e9c-89b7-4f07cebc2106','7a667df8-e3ab-4221-ab87-6852866d77f7');
/*!40000 ALTER TABLE `_comboTovarient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('039791be-198e-4952-851c-107499ed7aea','0b468c5167bfd2e4d2ddd8cb381a0966b9fe04130adfd4b3c7365e7fe2724736','2024-08-23 05:55:19.335','20240823055357_cleaned',NULL,NULL,'2024-08-23 05:55:19.186',1),('074fb3e9-b9f0-4a6a-97bc-5b8732bb0e71','1e0f6cd497da9785ca95b0267762a0960af2f4967de510b09afee8e79b14c0cf','2024-08-23 05:55:16.292','20240729121110_category',NULL,NULL,'2024-08-23 05:55:16.087',1),('08379f77-83d7-4c36-805c-fc3b49c1ed9b','f06780979e48c0eb3a38465ca5deb5f69c5ff8404f9db9539feb1902346413f9','2024-09-12 06:31:35.801','20240912063135_order_modified',NULL,NULL,'2024-09-12 06:31:35.739',1),('0d6942c6-3d84-4452-b9bf-d129a58c1dff','74261fc44d60f1569c61bcd0f561341200f4ed23cce2b5544d52fdfed55ccced','2024-08-23 05:55:15.916','20240726174421_recipee_added',NULL,NULL,'2024-08-23 05:55:15.875',1),('0ffeef01-3441-45ea-95ee-1e01aa522c05','db7208c036c1d8d015a0018e09ceaa9b6fc755942c54c07d141e8e8957e78b80','2024-08-23 05:55:18.974','20240820115651_role_to_user',NULL,NULL,'2024-08-23 05:55:18.932',1),('103a9b0c-46fa-4e67-82a6-13d27317ec84','80fbc7f7e24aeedb9ef38b69d932fa5f8fc57edd2000fa9d76f0e417d1df439c','2024-08-23 05:55:18.606','20240817100929_reinit',NULL,NULL,'2024-08-23 05:55:17.334',1),('10fa4451-a91e-4c8f-922a-e226ba61b0ca','8a8e6266dcb9be3cd3bd2877d8ddcc750bd6efe04df904185ee549c047701f28','2024-09-04 05:56:48.749','20240904055648_modified_order4',NULL,NULL,'2024-09-04 05:56:48.694',1),('125e2c88-eee1-4f6d-99e7-d4c03d669787','da164bbc23eec0e5a13c65cf4bc35b5b17e34c617b13a4c0f216c876d83a2eaf','2024-08-23 06:41:03.949','20240823064103_data_types',NULL,NULL,'2024-08-23 06:41:03.780',1),('13799645-dae4-404f-8c85-a00ca69229be','cc2877a8a738a69cea8192bcaaa5ab00beabb57789f4ea9fef43f0e3d8e608e2','2024-08-23 05:55:16.590','20240729121457_category',NULL,NULL,'2024-08-23 05:55:16.298',1),('14abf346-1ff2-402b-964d-274395163635','b98738f260b27f355f4d8ee04bbaa4d8a3427a449f6ffc9406f248fe118287d3','2024-09-09 17:10:31.121','20240909171030_refral',NULL,NULL,'2024-09-09 17:10:30.903',1),('193175bb-fba4-4e5b-9b9c-ed1c28f0abde','2cbfda13c6797b7f7854e384df92a87f0587f9e4fd17e0a325e02679fa02a8a2','2024-09-09 18:50:35.147','20240909185034_spelling_corrected',NULL,NULL,'2024-09-09 18:50:34.939',1),('1b98658f-5cc8-465e-99a0-afa11a9d959b','eeb3c76103822d9b69922d76f95a3a30a0380a7560c99f7fbe93d1155835ec68','2024-08-23 05:55:15.406','20240725170354_updated',NULL,NULL,'2024-08-23 05:55:15.357',1),('1ba55c39-4f73-4602-893f-caf02838ced1','2c712dc1915d1b7e00256891373891e25021d76b405dab9d927d9ef63699173b','2024-08-27 15:22:50.368','20240827152250_cartcombo',NULL,NULL,'2024-08-27 15:22:50.027',1),('20a2cf83-4132-4de7-aada-3dab8c6d91b3','ba0be2570a4ff05806fd8af9321ccc8255ebd3dae23a2ecb9c5af9bebef4d478','2024-09-15 17:34:21.191','20240915173421_new_permission',NULL,NULL,'2024-09-15 17:34:21.123',1),('28cce520-4c40-4597-b6b8-67fd94417a7b','f9a1dcb074d30ac1ec9de13a59c40e838fbeda9e3d4e0cb61c31b26be278beb1','2024-08-24 18:27:57.610','20240824182757_def',NULL,NULL,'2024-08-24 18:27:57.580',1),('2baccc05-3038-48ec-af81-a240b56954e9','21afb54e7e9f5caefd24ba17aaa756e9ac979c609278eb06937ae45a8c83172b','2024-08-23 05:55:16.642','20240729190326_permission',NULL,NULL,'2024-08-23 05:55:16.597',1),('2ee3804c-1018-4e60-b7ba-a6857a5d0b6e','72111841644ba88e53e9884f12b301c86dd4f6834c7044804c0b149dad016ab0','2024-08-23 05:57:28.007','20240823055727_tags_added',NULL,NULL,'2024-08-23 05:57:27.958',1),('2eea9774-f5e0-42af-af35-3679d153a5db','f2595bfc5822282c456e4a6462d27c88b2b01c4939fd4f055f668c21c3e40030','2024-09-07 06:16:11.314','20240907061611_static_info_added',NULL,NULL,'2024-09-07 06:16:11.258',1),('2f4aa0ea-d8c0-412a-a4cd-a883864ca091','ddfd6e327ef473f6a8c8a1acc0a7c53930036da9c03c72b8472060308d1e0bf0','2024-08-23 05:55:17.200','20240809182130_cleaned',NULL,NULL,'2024-08-23 05:55:17.147',1),('33f8f430-a09d-406f-afea-2d9889aa943a','4bea5e25b00fa750565d39e938eca39a02f20722afd51ee820a0d4d0da983773','2024-08-23 05:55:15.541','20240726140153_image_optional',NULL,NULL,'2024-08-23 05:55:15.414',1),('3529c1d1-e574-49e9-8e32-deb1e1e8a888','9727b8585159c1939c946af431bb5d7009ec32a04906d8ce07b330961a7e3416','2024-08-27 06:27:08.482','20240827062708_isbulk',NULL,NULL,'2024-08-27 06:27:08.390',1),('3551ed2c-a6a2-48e5-8949-69fba2a586b7','95a25f597f7bb1b4e5e6dd0eecf1149c267570021eb2bb54e387f45f41e22120','2024-08-30 10:47:30.602','20240830104730_bool_at_recipee',NULL,NULL,'2024-08-30 10:47:30.561',1),('397f50e0-8c06-4569-a36d-ea5fba891a0d','81ec28601decca63a12a61afd153bba6a166033e02dab57e55dd772d9f7cd78a','2024-08-25 09:29:26.332','20240825092926_per_added',NULL,NULL,'2024-08-25 09:29:26.276',1),('3b9174bd-e3c6-4920-8827-dfbd52a6d5e1','995b914bd46c09ff7161df4ab30465af74fd8c01acfd2608b6e72aa1affd02f0','2024-09-05 10:25:21.514','20240905102521_order_modified',NULL,NULL,'2024-09-05 10:25:21.359',1),('4296395f-4920-4ee4-89ac-5e83c8394967','a94e0dcd7aca9a973e4df621a88e86fda25fa47443a9c8621870f690486125eb','2024-08-23 05:55:19.180','20240823053502_tag_product',NULL,NULL,'2024-08-23 05:55:19.130',1),('44652b9e-0844-4a93-a81c-48575a05c69d','545b746a1c3c8509331b6bdde578b0ab90cefeac143e0d94818356af1d8d905b','2024-08-26 19:08:41.827','20240826190841_combo_modified',NULL,NULL,'2024-08-26 19:08:41.484',1),('47eacd0d-a934-4036-bf65-3fdc97821100','2d7763cdf99664b96ab09373bb8ea935c7a6d16039dfca21963e6104aefc79b9','2024-09-12 07:07:38.065','20240912070737_modified_refral',NULL,NULL,'2024-09-12 07:07:37.995',1),('49e49b85-4750-4f37-aebb-d09b27319680','8b13f8bcabc7b01222838f853dcbd4ed62048cffde7422257d890bbe6f77ab97','2024-08-23 05:55:16.957','20240731080739_status',NULL,NULL,'2024-08-23 05:55:16.928',1),('582ba566-ee49-4db4-83a8-a5d71afcc050','c75f530fb3a83b4c2ca790173e00727aa3d0f1e5c530285504ea4573a253ba29','2024-09-12 06:45:32.317','20240912064532_cart_modified',NULL,NULL,'2024-09-12 06:45:32.267',1),('5dda963a-69ca-4e4b-bd34-87b9ce0c1b31','2f0f149cb9913516ceece19ae6355a21a2c30719a099724a32e1703a535bbbb9','2024-09-12 06:17:58.638','20240912061758_refral_modified',NULL,NULL,'2024-09-12 06:17:58.465',1),('6ef1844d-b295-4c3d-8a91-1f4ceee25f5c','fb75092293b0311ec34252dfaeb177eec9f40e641dafa1fa3e92eefba8d60af3','2024-08-23 05:55:17.328','20240811084212_cleaned',NULL,NULL,'2024-08-23 05:55:17.206',1),('6fcb5577-31d7-4de9-9adb-d17a50d666e3','eada73ea6ca017fc42952c3a487bbe241ec6f2380eeaf0be799e9126c8f8d121','2024-09-04 05:10:43.124','20240904051043_order_modified',NULL,NULL,'2024-09-04 05:10:43.076',1),('727451bf-298a-42a5-aea3-ad6bfa26cef6','fb82f958c5c5ebaeb2ffd8ae2f91bc3ef82db157d41b26607bdbafdff678b2f3','2024-08-27 11:30:26.168','20240827113026_constrain_removed',NULL,NULL,'2024-08-27 11:30:26.099',1),('79583acc-de9f-4b24-90ad-c6ce696c5f33','847a6227ac7ceee66f778b2cc370581814a2d436cd20c9f0f94f8df2d8b67139','2024-08-23 05:55:15.869','20240726173945_updated_permision',NULL,NULL,'2024-08-23 05:55:15.817',1),('79dd3d7c-7229-4360-ad15-95563b4f5b31','63a8d02815b8dcfac0bd0a62f5f85d856c3d34f3b8c2da866f304a0b029e5eab','2024-09-15 19:56:38.290','20240915195638_error_in_user',NULL,NULL,'2024-09-15 19:56:38.090',1),('7ab0c618-24b4-4ffa-b135-4f1b2ec00d78','c36c9f509f5375ed4e6c3f9029017e2f951e36c39607e8cd79e6c34226959ea8','2024-08-23 15:30:01.270','20240823153001_blog_corrected',NULL,NULL,'2024-08-23 15:30:01.128',1),('7c4d927c-6bc0-4158-8331-3d22131477ed','8a31be0360c02aa703fd7cd3080e09b07f0d30d95b294e209be4b6b4ea4fd887','2024-08-24 19:39:55.771','20240824193955_only_few_available',NULL,NULL,'2024-08-24 19:39:55.715',1),('811e1677-bd12-4630-aa2e-31bca807386b','5d9a460316faed4b4cffe0aac53bab1963c29bcfdabe426fa5593574f01d4719','2024-09-09 18:38:22.901','20240909183822_admin_modified',NULL,NULL,'2024-09-09 18:38:22.690',1),('827e77b8-ff40-4784-a179-f0400a99bff2','1e022cbbf615833239ee95918d5c4c332a049905d58148dfacc6dcc7466d91f9','2024-08-24 11:54:23.174','20240824115422_cart',NULL,NULL,'2024-08-24 11:54:22.999',1),('82dfc670-1d6f-4d83-8eaf-d34e1e924bc5','e5a2f6440fde44d3e6ec2a87d0cb3be8326492fee4e443be2b80685937708275','2024-08-23 05:55:15.810','20240726173442_permision_table',NULL,NULL,'2024-08-23 05:55:15.637',1),('8688f675-0e68-4032-add9-822e9e314145','ab05af233137a55ca9f0ab45e940134ed8a56dfd4068271961ebdf3d40cfd7fc','2024-08-23 05:55:16.080','20240727201519_add_cascade_delete',NULL,NULL,'2024-08-23 05:55:15.924',1),('889daf7a-4070-4347-90c4-3b19ef225b49','d0a4b4a1f5af2440c97fdb44bf0dd34997849d07377206857840abfa02d5ff52','2024-08-23 05:55:16.921','20240731073236_wd',NULL,NULL,'2024-08-23 05:55:16.649',1),('89be4792-07ef-4649-9fd9-f0777f45aed2','087f40bce5ca23429d32dde4dd6453bcc1a0ef956b7d4844cbf80185c265e1ba','2024-08-27 09:18:38.026','20240827091837_coupon',NULL,NULL,'2024-08-27 09:18:37.788',1),('8a172eb7-f17b-4aef-88f8-0eaf1bd5535f','356bc4944ebf22f2f725a7cf1b63aefdfabac16f8dac0d35804efaea5f5f5f57','2024-08-25 08:30:02.175','20240825083001_vegi',NULL,NULL,'2024-08-25 08:30:01.915',1),('8bd5779e-ff4e-4f04-8269-da159672d952','0cac05890c6f57d4ca52d047e0c634b7c1824936f56afc9e1953fabc89fb0421','2024-09-07 06:19:21.394','20240907061921_modifies_pre',NULL,NULL,'2024-09-07 06:19:21.346',1),('8c5c32dc-acfe-41b3-81ad-0d0f2dd039ec','637db8defc342dd21f8b607e07c65dde972cf70b488502b97607e6d968db58db','2024-08-23 05:55:15.349','20240725101335_init',NULL,NULL,'2024-08-23 05:55:15.264',1),('8c7a6fad-6f1e-42a0-a93b-c28a2cdf590a','1a862d9b5aaee1902331621fff415d7db16195020defda3c2fda53f7a7dd3767','2024-08-23 05:55:37.471','20240823055537_cleaned',NULL,NULL,'2024-08-23 05:55:37.426',1),('970c2f1a-3541-4266-9bf0-c603361b3b3d','e0b26a16e2b191f8edf963cc7b74ed34a7c4c704cc37d95c548b37893298e2b5','2024-09-15 19:47:49.431','20240915194749_mobile_unique',NULL,NULL,'2024-09-15 19:47:49.356',1),('97af0512-dc56-4447-8e27-85d727b69b83','22c46f5a74b915d36db8074a184b8435982ce7302687cf70ca1b472a7db38c8f','2024-09-05 10:23:44.110','20240905102343_order_modified',NULL,NULL,'2024-09-05 10:23:43.951',1),('97b2c240-71e2-4f42-91e5-59c843654389','a6553fe32732ef86ca4cf91e017196c0becd78f61631950ddcfb06f9138d2cf6','2024-09-12 14:05:58.343','20240912140558_cart_edit',NULL,NULL,'2024-09-12 14:05:58.287',1),('9df45a60-e976-47ce-93cc-88cd8abce03c','79bfe66602eedf99036db2ead743843bb39cde26a55db9857600e5c3e217bb57','2024-09-07 06:24:13.944','20240907062413_uniq',NULL,NULL,'2024-09-07 06:24:13.888',1),('9e32c5ca-fe56-460e-9895-d80593f93d5f','e36a61098a8e269463cf9bfb46fb8e34d745d5f1a8a6d5961d132903e49af7ad','2024-08-27 10:31:39.311','20240827103139_coupon_to_cart',NULL,NULL,'2024-08-27 10:31:39.130',1),('a07b8d7b-b506-428f-8225-4bd28937d1c9','7de75fda6ad3dd44a08604d2a7a14a518a88f8d7db5391684caaf3957b89a4a1','2024-08-23 05:55:18.925','20240819190037_status_user',NULL,NULL,'2024-08-23 05:55:18.897',1),('aaaad84b-d292-4f6a-be6c-8b62d2f7127e','74fee5ad3ee59add8f4ef9e444fe4b134506a4ecb450e43a0026e5965b9e7050','2024-08-27 10:02:33.741','20240827100233_coupons_updated',NULL,NULL,'2024-08-27 10:02:33.691',1),('ad572bdc-098c-4112-a6c8-cd088d39e07d','db2263f9996d9d7b4471d8ea387ee1637a65bb980c4a243fd30845455cd73d7c','2024-08-23 05:55:19.122','20240822072352_another_setting_added',NULL,NULL,'2024-08-23 05:55:19.079',1),('ad7da593-9784-42ad-b193-428f6eddee55','0afa63606db79a05729c9ef409f1da52c525e1c7377a040f30a38c48369d8caf','2024-08-23 05:55:18.838','20240819100918_user_implemented',NULL,NULL,'2024-08-23 05:55:18.774',1),('b5a7f161-e2a4-4e6d-b65f-94d7af2f850b','0b9ed95956f016a4d69ea1a9f15bc6e881f620964aada90de049ca51f6d14325','2024-09-04 04:52:00.239','20240904045200_modify_string',NULL,NULL,'2024-09-04 04:52:00.120',1),('b8c1373b-0600-4424-97e0-21ea0e8bbfaf','d998b25bf5827541231aa847993fd4857672d22d1aaaa7bf9d9986648d4f2267','2024-08-27 10:10:30.666','20240827101030_coupon_update_2',NULL,NULL,'2024-08-27 10:10:30.595',1),('bce044cb-fd43-4b6b-9738-b836f0549597','f00de4c01d58ce79cc4e95fb1380ad4af7e74f601d6667c64101ac9086fea17f','2024-08-23 05:55:15.592','20240726140639_gender',NULL,NULL,'2024-08-23 05:55:15.547',1),('c1191528-549e-43fb-a485-e4ccf951e46a','7338f764a92218201c17c26b8b793b413ea372c200a47ccbd05e416e4b268c90','2024-08-23 05:55:15.256','20240725095907_init',NULL,NULL,'2024-08-23 05:55:14.644',1),('c29d5985-f5ec-413b-882f-8d0b450eb48a','a3f52f8d5fd9a96c6062bee357a827b7aad180c98cfd9e2458dac6a7a6afb201','2024-09-12 14:04:19.341','20240912140419_edit_order',NULL,NULL,'2024-09-12 14:04:19.297',1),('c3038330-f963-4b0c-a901-08071aeebb24','919aa2295c3eee505678be2a753bdbfcf256febb317b11df2b348b58f29ebe1c','2024-08-25 07:14:59.577','20240825071459_discount',NULL,NULL,'2024-08-25 07:14:59.530',1),('c663a764-d6c0-435e-b87a-ce1d54474d0a','97117285de8161a73aad45dc3fe6687fc59dc4c98aa79c61a7f5a2607ab2438d','2024-09-03 18:32:13.277','20240903183213_orders',NULL,NULL,'2024-09-03 18:32:13.175',1),('cc6faa03-6c3f-4a5f-bb0d-5b1bfb6d6c64','601c2064b4cfbe2021a9b548bec81b82a419955e885b356bd7f8b143bb0d1353','2024-09-09 19:32:02.466','20240909193202_corrected',NULL,NULL,'2024-09-09 19:32:02.020',1),('cf23bf30-f870-40e5-8dba-4fa6b2114618','2cc3795d7183490d10ab321fb322444abedd2ed91ce91e696bcaa1c89f4e6a65','2024-08-24 12:56:46.724','20240824125646_unq',NULL,NULL,'2024-08-24 12:56:46.649',1),('cff3a541-7a1b-4e5d-be34-adc7a161e338','da43aeae069aad1fd55147ddff6416db0729202a476203f129c3566a06b3ed0d','2024-08-23 05:55:17.013','20240807181819_complementary_content_managment',NULL,NULL,'2024-08-23 05:55:16.966',1),('d1e48b47-7a67-4055-b6f4-f42523078d1c','9f5b52fec7ae13ba7df0b74b34b979631209db4f28e643099f8d7b2c6eb3b9df','2024-08-23 05:55:17.077','20240809171921_cleaned',NULL,NULL,'2024-08-23 05:55:17.020',1),('dd1ee35e-8d8a-4456-a02b-d56911941f3b','a1270865aeb4f56148179b010bb57987515e09adfac30920cc7cb298965869aa','2024-09-04 05:13:46.619','20240904051346_order_modifief_5',NULL,NULL,'2024-09-04 05:13:46.448',1),('e1f26746-4fde-4145-90d9-99c9bea29d3c','3e2ba677c7c4fa3d83123063fae92d72d9bef70e27ccc1a28c90e087fb6550a0','2024-09-09 18:28:26.912','20240909182826_refral_modified',NULL,NULL,'2024-09-09 18:28:26.866',1),('e334a8f1-53ca-421d-b229-65fb90e4a536','65996f24a72f7a960f96c6aedb5ea85ecfa58d6bba75dcaf1e173af1fca0b36e','2024-08-25 09:25:14.528','20240825092513_recipe',NULL,NULL,'2024-08-25 09:25:13.967',1),('e347970a-fe0d-4362-bb42-4a0f34555850','a48af12e2acd88bef1f03c43e99bad676d09fe7cabd79b09b7ee55688cbbb9ec','2024-08-23 05:55:17.138','20240809175446_faq',NULL,NULL,'2024-08-23 05:55:17.083',1),('e465c025-8629-4976-8f12-9f0e42317085','7fe0f5fc6e0d0612f9461cf37e1d71c5e548aa136794ee68c27ad4a846b77952','2024-08-24 11:56:19.566','20240824115619_cart_corrected',NULL,NULL,'2024-08-24 11:56:19.356',1),('ec78e420-d31a-4553-b945-4ca3ccaf3e0a','55c3db8329378bdf7b7ca38526bba4fe83cb866fab73ac6a3b224a04f36c252c','2024-08-23 05:55:18.767','20240818083037_sign',NULL,NULL,'2024-08-23 05:55:18.615',1),('f0562356-3591-477c-ae10-3c38c265a894','0d46539de334108748b9177d4427634f217d08e22ea7b12a594307aa088ef082','2024-09-04 06:05:03.072','20240904060503_orders',NULL,NULL,'2024-09-04 06:05:03.024',1),('f0fbb5ee-c73f-4ed8-a0e5-ad1b2267424f','72f3e687380f7e0086ca92d76220800514ece346c8dc6ba827f9de664426bd77','2024-08-24 12:01:26.077','20240824120125_cart_item_implimented',NULL,NULL,'2024-08-24 12:01:25.779',1),('f3431049-fcac-458b-8136-e4004dc537c8','b6c2befc684352aabbf12275c620060447b256becfe9c689f98dfb1ccd24ac39','2024-08-23 05:55:19.073','20240822062207_banners',NULL,NULL,'2024-08-23 05:55:18.980',1),('f66e5608-3f16-49c9-96f5-962783d4b5be','c019cfcf8441f69161a20bbc829307f4990fbdb7576f7c13c4c7b2a602b718b0','2024-08-27 05:51:17.932','20240827055117_deleted_price',NULL,NULL,'2024-08-27 05:51:17.877',1),('f9984c2d-8b29-43eb-a6c1-fafe44f466eb','49acaa342cba0e43099b11f5d3ef313a5309340c8f8a68d9367bbb138fd6470b','2024-08-23 05:55:15.630','20240726141746_gender_2',NULL,NULL,'2024-08-23 05:55:15.599',1),('fbcaae37-8bcf-49ee-88f3-85b20ed451ac','b7da74e9a973e7382c55cf4fd429824680c82be746210d490c97c9c463427ce2','2024-08-23 05:55:18.889','20240819183038_otp',NULL,NULL,'2024-08-23 05:55:18.846',1),('fbeee8c3-c079-4060-bb8e-1369adfd24ad','8677b4513697dcfbc351bd9e8b5943670fc4f72b14ec26cfd7263917d38938a5','2024-08-23 08:53:39.781','20240823085339_stars',NULL,NULL,'2024-08-23 08:53:39.727',1),('fe4d95d0-216c-47f2-8455-c07d33c3dad5','793e10c719ff786e8bb114445946bb4ab3eee8fee935427bdb4a02cbd6237155','2024-09-04 05:23:50.334','20240904052350_corrected',NULL,NULL,'2024-09-04 05:23:50.287',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_productTorecipe`
--

DROP TABLE IF EXISTS `_productTorecipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_productTorecipe` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `_productTorecipe_AB_unique` (`A`,`B`),
  KEY `_productTorecipe_B_index` (`B`),
  CONSTRAINT `_productTorecipe_A_fkey` FOREIGN KEY (`A`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_productTorecipe_B_fkey` FOREIGN KEY (`B`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_productTorecipe`
--

LOCK TABLES `_productTorecipe` WRITE;
/*!40000 ALTER TABLE `_productTorecipe` DISABLE KEYS */;
INSERT INTO `_productTorecipe` VALUES ('3a6565a9-55a5-4b72-b5bd-b3746473721b','2174a7f4-f0b6-482c-a87f-68550099e09c'),('82233a48-8f8d-433b-b527-b32821316193','2174a7f4-f0b6-482c-a87f-68550099e09c'),('d7adbbcc-6439-4db0-a8a6-b6ef6715cdb5','2174a7f4-f0b6-482c-a87f-68550099e09c'),('82233a48-8f8d-433b-b527-b32821316193','a108e2cb-2fcc-4ba7-a455-ea5bfdcb6fbc'),('82233a48-8f8d-433b-b527-b32821316193','e39a68a9-888a-44a8-8cab-3c2339604f1c'),('d7adbbcc-6439-4db0-a8a6-b6ef6715cdb5','e39a68a9-888a-44a8-8cab-3c2339604f1c');
/*!40000 ALTER TABLE `_productTorecipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profilePic` json DEFAULT NULL,
  `role` int NOT NULL,
  `status` int NOT NULL,
  `lastLogin` datetime(3) NOT NULL,
  `lastLoginIp` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_userName_key` (`userName`),
  UNIQUE KEY `admin_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('729c7fe6-4ace-4071-93ba-8c64042110c4','Mukesh','marco24','$2a$10$VJ8TOJKglpUNvoQ/oiONIedc.sOvLa3tse0C80LiHlOuMxe2JhbkS','null',2,1,'2024-09-14 09:49:39.195','localhost','2024-09-14 09:49:39.198','2024-09-14 11:52:38.080','marco24@gmail.com','1'),('a5c95fd2-7662-4fd1-ba17-e551b313a453','Nikhil Anand','na52m2002','$2a$10$to6x9LlfPxDoHwYDjLZpC.wLc3qVM7zOc9hoe/T1Acx5M5Ow7c6le','\"{\\\"url\\\":\\\"/images/userImages/adminImages/superUser/profileImage.png\\\",\\\"alt\\\":\\\"Profile Picture\\\"}\"',1,1,'2024-09-17 06:43:54.225','::1','2024-08-23 05:56:19.882','2024-09-17 06:43:54.227',NULL,'0');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pageSlug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `displayOrder` int NOT NULL,
  `images` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brief` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `urlSlug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `relatedImages` json NOT NULL,
  `adminId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `thumbnailImage` json NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `blog_urlSlug_key` (`urlSlug`),
  KEY `blog_adminId_fkey` (`adminId`),
  CONSTRAINT `blog_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` VALUES ('040b49db-191a-4b70-b36e-43d0d04a6576','Cons of non-vegi','All our spices are tested on 27 chemical and microbial parameters before they are fumigated, cleaned, and sorted for final processing.','consNonVegi','This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet.\r\n\r\nThis is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet.\r\n\r\nThis is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. ','[{\"alt\": \"blogImage\", \"url\": \"/asset/blog/consNonVegi/0.jpeg\"}]','a5c95fd2-7662-4fd1-ba17-e551b313a453',1,'2024-08-23 15:31:16.492','2024-09-17 06:38:08.837','[{\"alt\": \"thumbnail\", \"url\": \"/asset/blog/consNonVegi/thumbNail.jpeg\"}]'),('1e678362-30a8-4549-bfc8-32c2b4a83f3c','The Green Fitness','All our spices are tested on 27 chemical and microbial parameters before they are fumigated, cleaned, and sorted for final processing.','theGreenFitness','This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet.\r\n\r\nThis is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet.\r\n\r\nThis is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. ','[{\"alt\": \"blogImage\", \"url\": \"/asset/blog/theGreenFitness/0.jpeg\"}]','a5c95fd2-7662-4fd1-ba17-e551b313a453',1,'2024-08-23 15:30:22.794','2024-08-23 15:30:22.794','[{\"alt\": \"thumbnail\", \"url\": \"/asset/blog/theGreenFitness/thumbNail.jpeg\"}]'),('4f13ff59-8b00-42e2-846b-f7fa13ad0910','Pros of Being Vegiterian','All our spices are tested on 27 chemical and microbial parameters before they are fumigated, cleaned, and sorted for final processing.','prosOfBeingVegi','This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet.\r\n\r\nThis is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet.\r\n\r\nThis is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. This is some blog contnet. ','[{\"alt\": \"blogImage\", \"url\": \"/asset/blog/prosOfBeingVegi/0.jpeg\"}]','a5c95fd2-7662-4fd1-ba17-e551b313a453',1,'2024-08-23 15:32:04.428','2024-08-23 15:32:04.428','[{\"alt\": \"thumbnail\", \"url\": \"/asset/blog/prosOfBeingVegi/thumbNail.jpeg\"}]');
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `couponId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refralDiscountAbsolute` double NOT NULL DEFAULT '0',
  `referalCoins` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `cart_userId_key` (`userId`),
  KEY `cart_couponId_fkey` (`couponId`),
  CONSTRAINT `cart_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `coupons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES ('04757829-a226-4eb8-b1ef-689b81022feb','6685f562-f362-4349-94d6-61b4d8344de3','2024-08-26 08:15:51.784','2024-09-13 16:46:11.483','2a6f886b-d426-431e-9d56-57da6a494548',47,47),('91221f9a-f182-4e59-ad60-dcbd69887968','1dd478a3-e167-4baf-a031-cac96ce6b1df','2024-08-26 08:25:49.968','2024-09-12 18:37:28.212',NULL,0,0),('c0e64454-b3a7-4460-b200-b93a33b1faff','e5296065-8266-4284-9bb6-4b15302fd051','2024-09-12 19:52:51.162','2024-09-12 19:52:51.162',NULL,0,0),('e92efd9e-4822-4624-b86f-8c7ab9cad9b4','f66ced9b-8a79-4188-8bca-cb312c198cdf','2024-09-16 16:58:40.549','2024-09-16 16:58:40.549',NULL,0,0);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartComboItems`
--

DROP TABLE IF EXISTS `cartComboItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartComboItems` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cartId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` int NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `comboId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cartComboItems_cartId_fkey` (`cartId`),
  KEY `cartComboItems_comboId_fkey` (`comboId`),
  CONSTRAINT `cartComboItems_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `cartComboItems_comboId_fkey` FOREIGN KEY (`comboId`) REFERENCES `combo` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartComboItems`
--

LOCK TABLES `cartComboItems` WRITE;
/*!40000 ALTER TABLE `cartComboItems` DISABLE KEYS */;
INSERT INTO `cartComboItems` VALUES ('592a7f9d-9af6-4876-aeda-474f2730373a','04757829-a226-4eb8-b1ef-689b81022feb',2,'2024-09-05 13:04:33.141','2024-09-09 17:19:36.442','118f09e2-9d76-4e9c-89b7-4f07cebc2106');
/*!40000 ALTER TABLE `cartComboItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartItem`
--

DROP TABLE IF EXISTS `cartItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartItem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cartId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `varientId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` int NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cartItem_cartId_fkey` (`cartId`),
  KEY `cartItem_varientId_fkey` (`varientId`),
  CONSTRAINT `cartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `cartItem_varientId_fkey` FOREIGN KEY (`varientId`) REFERENCES `varient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartItem`
--

LOCK TABLES `cartItem` WRITE;
/*!40000 ALTER TABLE `cartItem` DISABLE KEYS */;
INSERT INTO `cartItem` VALUES ('7c99d11a-1c42-4cb4-9b96-087ffb4fe349','e92efd9e-4822-4624-b86f-8c7ab9cad9b4','43058322-49f0-404a-96d3-0733f5af707e',2,'2024-09-16 18:10:10.039','2024-09-16 18:10:10.907');
/*!40000 ALTER TABLE `cartItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parentId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `showOnHome` tinyint(1) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `creatorId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_slug_key` (`slug`),
  KEY `category_parentId_fkey` (`parentId`),
  KEY `category_creatorId_fkey` (`creatorId`),
  CONSTRAINT `category_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `admin` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `category_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('12208432-4960-4b98-acc1-c938a47f3bff','Blend Masala','blendMasala',NULL,1,'[{\"url\":\"/asset/categories/undefined/0.jpeg\",\"alt\":\"categoryImage\"}]',1,'2024-08-23 06:03:19.262','2024-08-23 08:23:29.921','a5c95fd2-7662-4fd1-ba17-e551b313a453'),('39ba207c-777a-42a3-95c3-f1e27690bba9','Simple Masala','simpleMasala',NULL,1,'[{\"url\":\"/asset/categories/simpleMasala/0.jpeg\",\"alt\":\"categoryImage\"},{\"url\":\"/asset/categories/simpleMasala/1.jpeg\",\"alt\":\"categoryImage\"}]',1,'2024-08-23 14:16:08.902','2024-09-01 18:11:10.744','a5c95fd2-7662-4fd1-ba17-e551b313a453');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `combo`
--

DROP TABLE IF EXISTS `combo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `combo` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discountInPercent` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `adminId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` int NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `combo_adminId_fkey` (`adminId`),
  CONSTRAINT `combo_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `combo`
--

LOCK TABLES `combo` WRITE;
/*!40000 ALTER TABLE `combo` DISABLE KEYS */;
INSERT INTO `combo` VALUES ('0cfcc27e-399e-47e1-8eb2-02a3814a4cac','test2','test',45,'2024-08-27 14:10:25.591','2024-09-17 15:09:47.068','a5c95fd2-7662-4fd1-ba17-e551b313a453',6,1),('0f9fa5a8-6e0d-480b-aeb3-10293f2308b8','nikhil combo','cgyrtdrt',11,'2024-08-26 19:37:20.998','2024-08-26 20:00:20.790','a5c95fd2-7662-4fd1-ba17-e551b313a453',50,1),('118f09e2-9d76-4e9c-89b7-4f07cebc2106','test','hyhyh',77,'2024-08-26 16:28:06.409','2024-09-07 06:38:53.881','a5c95fd2-7662-4fd1-ba17-e551b313a453',45,1);
/*!40000 ALTER TABLE `combo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `minOrderValue` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `adminId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `discountValue` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `coupons_code_key` (`code`),
  KEY `coupons_adminId_fkey` (`adminId`),
  CONSTRAINT `coupons_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
INSERT INTO `coupons` VALUES ('2a6f886b-d426-431e-9d56-57da6a494548','welcome','percent',5,'2024-08-27 10:22:58.972','2024-08-30 11:39:57.012','a5c95fd2-7662-4fd1-ba17-e551b313a453',1,1);
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faqs`
--

DROP TABLE IF EXISTS `faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faqs` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `question` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqs`
--

LOCK TABLES `faqs` WRITE;
/*!40000 ALTER TABLE `faqs` DISABLE KEYS */;
/*!40000 ALTER TABLE `faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `globalSettings`
--

DROP TABLE IF EXISTS `globalSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `globalSettings` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `settingName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` int NOT NULL,
  `dependency` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `adminId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `globalSettings_adminId_fkey` (`adminId`),
  CONSTRAINT `globalSettings_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `globalSettings`
--

LOCK TABLES `globalSettings` WRITE;
/*!40000 ALTER TABLE `globalSettings` DISABLE KEYS */;
INSERT INTO `globalSettings` VALUES ('32494d46-7706-4e60-acde-dcf1f8a6c4f8','noOfIngredientsPossibleInARecipe',10,0,'2024-08-30 09:53:39.160','2024-08-30 09:53:00.436','a5c95fd2-7662-4fd1-ba17-e551b313a453'),('508adc60-d2fd-4f99-962f-b8e407740cb1','freeShipingCartValue',0,0,'2024-08-27 09:11:06.488','2024-08-27 09:10:39.243','a5c95fd2-7662-4fd1-ba17-e551b313a453'),('790693e3-c066-4dd6-9f9d-002f07bc9bff','noOfVarientPossibleInCombo',10,0,'2024-08-26 14:27:50.870','2024-08-26 16:27:06.090','a5c95fd2-7662-4fd1-ba17-e551b313a453'),('92b8a830-83c2-4910-bf8c-ca29042dfa91','gstRate',8,0,'2024-08-28 18:01:32.896','2024-08-28 18:00:57.129','a5c95fd2-7662-4fd1-ba17-e551b313a453'),('f66b1fe0-6363-4ddb-82c8-a46529e72b7b','refralDiscount',2,20,'2024-08-27 09:11:33.415','2024-09-12 15:24:30.811','a5c95fd2-7662-4fd1-ba17-e551b313a453'),('f88415e7-90a5-43c4-9a3a-eef7dc540298','newUserDiscount',0,0,'2024-08-27 09:10:31.491','2024-08-27 09:10:07.918','a5c95fd2-7662-4fd1-ba17-e551b313a453');
/*!40000 ALTER TABLE `globalSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerMeta` json DEFAULT NULL,
  `productIds` json NOT NULL,
  `couponMeta` json DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `PaymentMode` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentToken` json DEFAULT NULL,
  `paymentStatus` int NOT NULL DEFAULT '0',
  `orderStatus` int NOT NULL DEFAULT '0',
  `shipingStatus` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'initiated',
  `awb` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipingCharges` double DEFAULT NULL,
  `subTotal` double NOT NULL,
  `taxes` double NOT NULL,
  `comboIds` json NOT NULL,
  `comboMeta` json NOT NULL,
  `varientMeta` json NOT NULL,
  `varientIds` json NOT NULL,
  `finalPrice` double DEFAULT NULL,
  `productMeta` json NOT NULL,
  `refralDiscountAbsolute` double NOT NULL DEFAULT '0',
  `referalCoins` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_orderId_key` (`orderId`),
  UNIQUE KEY `orders_awb_key` (`awb`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('9fab317f-e558-4ae7-ae07-ac99dc5517da','172616622088921574','1dd478a3-e167-4baf-a031-cac96ce6b1df','{\"id\": \"1dd478a3-e167-4baf-a031-cac96ce6b1df\", \"city\": \"Chapra\", \"email\": \"na62m2002@gmail.com\", \"state\": \"Bihar\", \"mobile\": \"+918083644022\", \"address\": \"west of ram rajya chowk\", \"pinCode\": 841301, \"lastName\": \"k\", \"firstName\": \"anand\"}','[\"d7adbbcc-6439-4db0-a8a6-b6ef6715cdb5\"]','null','2024-09-12 18:37:00.891','2024-09-12 18:37:28.167','Paytm Gateway','{\"TXNID\": \"20240913210460000041142124562701413\", \"STATUS\": \"TXN_SUCCESS\", \"RESPMSG\": \"Txn Success\", \"CURRENCY\": \"INR\", \"BANKTXNID\": \"425739521417\", \"TXNAMOUNT\": \"1.00\"}',1,0,'initiated',NULL,1,550,8,'[]','[]','[{\"qty\": 10, \"varient\": {\"id\": \"4d620296-151a-4491-ac5a-0bb9941c20ba\", \"mrp\": 55.0, \"size\": \"xl\", \"isBulk\": false, \"weight\": 55.5, \"product\": {\"name\": \"Blend Chicken\", \"category\": {\"categoryName\": \"Blend Masala\"}, \"thumbNail\": [{\"alt\": \"thumbnail\", \"url\": \"/asset/product/blendchicken/thumbNail.jpeg\"}], \"highLights\": \"chdsugcsydgygfysu\"}, \"discount\": 0.0, \"productId\": \"d7adbbcc-6439-4db0-a8a6-b6ef6715cdb5\"}}]','[\"4d620296-151a-4491-ac5a-0bb9941c20ba\"]',541,'[{\"name\": \"Blend Chicken\", \"category\": {\"categoryName\": \"Blend Masala\"}, \"thumbNail\": [{\"alt\": \"thumbnail\", \"url\": \"/asset/product/blendchicken/thumbNail.jpeg\"}], \"highLights\": \"chdsugcsydgygfysu\"}]',50,50);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adminId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userUpdate` tinyint(1) NOT NULL DEFAULT '0',
  `globalSetting` tinyint(1) NOT NULL DEFAULT '0',
  `productAndInventory` tinyint(1) NOT NULL DEFAULT '0',
  `complementaryContentManagment` tinyint(1) NOT NULL DEFAULT '0',
  `siteManagement` tinyint(1) NOT NULL DEFAULT '0',
  `offersAndDiscounts` tinyint(1) NOT NULL DEFAULT '0',
  `consumerAndOrderManagement` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_adminId_key` (`adminId`),
  CONSTRAINT `permissions_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES ('614e0442-48d0-42c7-9bd5-314d751dc081','729c7fe6-4ace-4071-93ba-8c64042110c4',1,1,1,1,1,1,1),('d4280e13-048d-4255-bf58-e98805752c74','a5c95fd2-7662-4fd1-ba17-e551b313a453',1,1,1,1,1,1,1);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `highLights` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbNail` json NOT NULL,
  `images` json NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `showOnHome` tinyint(1) NOT NULL DEFAULT '0',
  `isFeatured` tinyint(1) NOT NULL DEFAULT '0',
  `isBestSeller` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `adminId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tags` json DEFAULT NULL,
  `stars` int unsigned NOT NULL DEFAULT '1',
  `isVegiterian` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_slug_key` (`slug`),
  KEY `product_categoryId_fkey` (`categoryId`),
  KEY `product_adminId_fkey` (`adminId`),
  CONSTRAINT `product_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('3a6565a9-55a5-4b72-b5bd-b3746473721b','39ba207c-777a-42a3-95c3-f1e27690bba9','Haldi Powder','fbyurgfisyfgisfgifgesiyfgesiufhrsufi','ndfbgirgfriufhreiughergur','haldiPowder','[{\"alt\": \"thumbnail\", \"url\": \"/asset/product/haldipowder/thumbNail.jpeg\"}]','[{\"alt\": \"productImage\", \"url\": \"/asset/product/haldipowder/1.jpeg\"}, {\"alt\": \"productImage\", \"url\": \"/asset/product/haldipowder/2.jpeg\"}]',1,1,0,1,'2024-08-25 08:40:04.557','2024-09-14 10:55:05.932','a5c95fd2-7662-4fd1-ba17-e551b313a453','[\"mustHave\"]',1,1),('82233a48-8f8d-433b-b527-b32821316193','12208432-4960-4b98-acc1-c938a47f3bff','Chana Masala','vygvyt','hbuvytvy','chanaMasala','[{\"alt\": \"thumbnail\", \"url\": \"/asset/product/chanamasala/thumbNail.jpeg\"}]','[{\"alt\": \"productImage\", \"url\": \"/asset/product/chanamasala/1.jpeg\"}]',1,1,1,1,'2024-08-23 14:48:26.048','2024-09-14 09:43:24.727','a5c95fd2-7662-4fd1-ba17-e551b313a453','[\"topSelling\", \"mustHave\"]',1,1),('d7adbbcc-6439-4db0-a8a6-b6ef6715cdb5','12208432-4960-4b98-acc1-c938a47f3bff','Blend Chicken a','chdsugcsydgygfysu','skdgfsjfgsjfgsekhf','blendChicken','[{\"alt\": \"thumbnail\", \"url\": \"/asset/product/blendchicken/thumbNail.jpeg\"}]','[{\"alt\": \"productImage\", \"url\": \"/asset/product/blendchicken/1.jpeg\"}]',1,1,1,1,'2024-08-23 12:27:33.202','2024-09-14 12:06:22.730','a5c95fd2-7662-4fd1-ba17-e551b313a453','[\"mustHave\", \"topRated\"]',5,0);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe`
--

DROP TABLE IF EXISTS `recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ingredients` json NOT NULL,
  `videoLink` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `instructions` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `adminId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `recipe_adminId_fkey` (`adminId`),
  CONSTRAINT `recipe_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe`
--

LOCK TABLES `recipe` WRITE;
/*!40000 ALTER TABLE `recipe` DISABLE KEYS */;
INSERT INTO `recipe` VALUES ('2174a7f4-f0b6-482c-a87f-68550099e09c','chicken cury','[\"dhania\", \"sarso tel\"]','https://www.youtube.com/embed/wc2NEd4WTyw?si=syDIAadVnE-RQPB5','lorem ipsum',1,'2024-09-17 12:30:40.062','2024-09-17 12:30:40.062','a5c95fd2-7662-4fd1-ba17-e551b313a453'),('a108e2cb-2fcc-4ba7-a455-ea5bfdcb6fbc','Panir ','[\"dhania\", \"tomato\"]','https://www.youtube.com/embed/wc2NEd4WTyw?si=syDIAadVnE-RQPB5','khgukygjhj',1,'2024-08-30 12:11:22.862','2024-09-17 12:27:50.639','a5c95fd2-7662-4fd1-ba17-e551b313a453'),('e39a68a9-888a-44a8-8cab-3c2339604f1c','chicken tanduri','[\"onion\", \"oil\"]','https://www.youtube.com/embed/wc2NEd4WTyw?si=syDIAadVnE-RQPB5','lorem ipsum',1,'2024-09-17 12:31:52.895','2024-09-17 12:31:52.895','a5c95fd2-7662-4fd1-ba17-e551b313a453');
/*!40000 ALTER TABLE `recipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `referal`
--

DROP TABLE IF EXISTS `referal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `referal` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `coins` int NOT NULL DEFAULT '0',
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `referal_userId_key` (`userId`),
  CONSTRAINT `referal_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `referal`
--

LOCK TABLES `referal` WRITE;
/*!40000 ALTER TABLE `referal` DISABLE KEYS */;
INSERT INTO `referal` VALUES ('4f371d2b-9229-4f87-b917-13db893d7690',71,'6685f562-f362-4349-94d6-61b4d8344de3'),('6df47c49-2677-4c0a-bc0b-3c98081eb402',0,'f66ced9b-8a79-4188-8bca-cb312c198cdf'),('e8ab95bb-b690-453e-ab53-c58ff74b5c7f',0,'1dd478a3-e167-4baf-a031-cac96ce6b1df'),('f2773b0f-7ed5-4c85-a71b-b8cd4210b1f1',0,'e5296065-8266-4284-9bb6-4b15302fd051');
/*!40000 ALTER TABLE `referal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slider`
--

DROP TABLE IF EXISTS `slider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slider` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pageSlug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `displayOrder` int NOT NULL,
  `images` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slider`
--

LOCK TABLES `slider` WRITE;
/*!40000 ALTER TABLE `slider` DISABLE KEYS */;
INSERT INTO `slider` VALUES ('9f74f1e9-221f-45b0-8c44-4c79aef07b99','root',0,'[{\"alt\": \"slider image\", \"url\": \"/asset/slider/root/0.jpeg\", \"link\": \"/account/dashboard\"}, {\"alt\": \"slider image\", \"url\": \"/asset/slider/root/1.jpeg\", \"link\": \"/account/dashboard\"}, {\"alt\": \"slider image\", \"url\": \"/asset/slider/root/2.jpeg\", \"link\": \"/account/dashboard\"}]');
/*!40000 ALTER TABLE `slider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staticInfo`
--

DROP TABLE IF EXISTS `staticInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staticInfo` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` json NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `staticInfo_key_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staticInfo`
--

LOCK TABLES `staticInfo` WRITE;
/*!40000 ALTER TABLE `staticInfo` DISABLE KEYS */;
INSERT INTO `staticInfo` VALUES ('d16c1e38-489d-4e3f-a313-5260b32a06cf','[{\"area\": \"15/240- I, Civil Lines\"}, {\"cityAndState\": \"Kanpur,Uttar Pradesh\"}, {\"country\": \"India\"}]','companyAddress');
/*!40000 ALTER TABLE `staticInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pinCode` int DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `googleId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `googleProfilePic` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `emailVerified` tinyint(1) NOT NULL DEFAULT '0',
  `mobileVerified` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `otpEmail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `otpMobile` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` int NOT NULL DEFAULT '3',
  `adminId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referedById` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email_key` (`email`),
  UNIQUE KEY `user_mobile_key` (`mobile`),
  KEY `user_referedById_fkey` (`referedById`),
  KEY `user_adminId_fkey` (`adminId`),
  CONSTRAINT `user_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_referedById_fkey` FOREIGN KEY (`referedById`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('1dd478a3-e167-4baf-a031-cac96ce6b1df','anand','k','na62m2002@gmail.com','$2a$10$sMUw/SFztipf8TVjdv5.6.zyMLU1MYWBw6jl6ghTKAQiN0z9T7Uyy','west of ram rajya chowk',841301,'Chapra','Bihar',NULL,NULL,'+918083644022',1,0,1,'2024-08-26 08:25:49.956','2024-09-15 20:08:22.085',NULL,'491835',3,'a5c95fd2-7662-4fd1-ba17-e551b313a453','6685f562-f362-4349-94d6-61b4d8344de3'),('6685f562-f362-4349-94d6-61b4d8344de3','Nikhil ','Anand','na52m2002@gmail.com',NULL,'west of ram rajya chowk',841301,'Chapra','Bihar','107727550616127195910','https://lh3.googleusercontent.com/a/ACg8ocJW9TdcKJ-9At9VYoqobsEhFNg5G7MYogZvXT-eMfgd6LmC83aJ=s96-c','+917979864023',1,1,1,'2024-08-24 12:06:44.035','2024-09-16 17:08:21.625','187063','550156',3,NULL,NULL),('e5296065-8266-4284-9bb6-4b15302fd051','Aditya','Anand','sms@gmail.com','$2a$10$27YJZY6OP54PRYg.JPCo.uqiGwa/iMe03NTxQF.1yfmWKDqELZ0NS',NULL,NULL,NULL,NULL,NULL,NULL,'+919955292453',1,0,0,'2024-09-12 19:52:51.151','2024-09-15 20:17:35.802',NULL,NULL,3,'a5c95fd2-7662-4fd1-ba17-e551b313a453',NULL),('f66ced9b-8a79-4188-8bca-cb312c198cdf','609Nikhil','Anand','27609nikhil.2021cse@gmail.com',NULL,NULL,NULL,NULL,NULL,'115942035027610761644','https://lh3.googleusercontent.com/a/ACg8ocIUsHo2ddsmCHq8clkG7APbew49ddxNktNyXeWO1j5OnQFZ9sQ=s96-c','+917979864022',1,1,1,'2024-09-16 16:58:40.537','2024-09-16 18:28:52.709',NULL,'390371',3,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `varient`
--

DROP TABLE IF EXISTS `varient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `varient` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` int unsigned NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `mrp` decimal(10,2) NOT NULL,
  `wholeSalePrice` decimal(10,2) NOT NULL,
  `minQtyForBulkOrder` int unsigned NOT NULL,
  `isDefault` tinyint(1) NOT NULL DEFAULT '0',
  `adminId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `weight` decimal(10,2) NOT NULL,
  `maxQuantityForFewAvailable` int NOT NULL DEFAULT '10',
  `discount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `isBulk` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `varient_slug_key` (`slug`),
  KEY `varient_productId_fkey` (`productId`),
  KEY `varient_adminId_fkey` (`adminId`),
  CONSTRAINT `varient_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `varient_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `varient`
--

LOCK TABLES `varient` WRITE;
/*!40000 ALTER TABLE `varient` DISABLE KEYS */;
INSERT INTO `varient` VALUES ('43058322-49f0-404a-96d3-0733f5af707e','blendChickenxxxxl','d7adbbcc-6439-4db0-a8a6-b6ef6715cdb5','xxxxl',55,1,77.00,77.00,49,1,'a5c95fd2-7662-4fd1-ba17-e551b313a453',10000.00,10,0.00,1),('4d620296-151a-4491-ac5a-0bb9941c20ba','blendChickenXl','d7adbbcc-6439-4db0-a8a6-b6ef6715cdb5','xl',34,1,55.00,66.00,55,0,'a5c95fd2-7662-4fd1-ba17-e551b313a453',55.50,1,0.00,0),('4ff6caf4-4459-43a7-a1b1-a54fd60c3e89','haldiXL','3a6565a9-55a5-4b72-b5bd-b3746473721b','xl',7,1,77.00,77.00,55,1,'a5c95fd2-7662-4fd1-ba17-e551b313a453',500.00,10,0.00,0),('5e395ca2-bbfa-4496-b3f3-61d630017c7d','blendChickenxxxl','d7adbbcc-6439-4db0-a8a6-b6ef6715cdb5','xxxl',55,1,2000.00,1500.00,44,0,'a5c95fd2-7662-4fd1-ba17-e551b313a453',5000.00,10,0.00,1),('7a667df8-e3ab-4221-ab87-6852866d77f7','chanaMasalaxl','82233a48-8f8d-433b-b527-b32821316193','xl',24,1,44.00,44.00,77,1,'a5c95fd2-7662-4fd1-ba17-e551b313a453',500.00,3,0.00,0),('918a9631-c4b7-4504-8177-04df5506a72c','chanaMasalaPxl','82233a48-8f8d-433b-b527-b32821316193','pxl',77,1,77.00,77.00,70,0,'a5c95fd2-7662-4fd1-ba17-e551b313a453',50000.00,10,0.00,1),('9dababdf-449b-493c-8a9e-f53721e64e4a','test','d7adbbcc-6439-4db0-a8a6-b6ef6715cdb5','vl',77,1,50.00,45.00,15,0,'a5c95fd2-7662-4fd1-ba17-e551b313a453',500.00,10,7.00,0),('a103abba-c50f-4e12-a68f-3007cbe92647','blendChickenl','d7adbbcc-6439-4db0-a8a6-b6ef6715cdb5','l',77,1,500.00,400.00,77,0,'a5c95fd2-7662-4fd1-ba17-e551b313a453',1500.00,10,0.00,1);
/*!40000 ALTER TABLE `varient` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-17 20:50:47
