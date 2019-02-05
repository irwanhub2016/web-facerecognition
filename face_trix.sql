-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2019 at 03:21 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.1.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `face_trix`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(10) NOT NULL,
  `username` varchar(15) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `photo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `username`, `email`, `password`, `photo`) VALUES
(5, 'Icumcumicumi', 'admin@gmail.com', '21232f297a57a5a743894a0e4a801fc3', 'avatar5.png'),
(7, 'adhe2018', 'ade@gmail.com', 'A562CFA07C2B1213B3A5C99B756FC206', 'avatar04.png');

-- --------------------------------------------------------

--
-- Table structure for table `lampu`
--

CREATE TABLE `lampu` (
  `id_lampu` int(10) NOT NULL,
  `status_lampu` varchar(20) NOT NULL,
  `time` varchar(20) NOT NULL,
  `id_admin` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lampu`
--

INSERT INTO `lampu` (`id_lampu`, `status_lampu`, `time`, `id_admin`) VALUES
(1, 'OFF', '19.06.57', 5);

-- --------------------------------------------------------

--
-- Table structure for table `pengisian`
--

CREATE TABLE `pengisian` (
  `id_pengisian` varchar(50) NOT NULL,
  `date_pengisian` varchar(30) DEFAULT NULL,
  `time` varchar(20) NOT NULL,
  `harga` varchar(25) NOT NULL,
  `berat` varchar(10) DEFAULT NULL,
  `id_admin` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pengisian`
--

INSERT INTO `pengisian` (`id_pengisian`, `date_pengisian`, `time`, `harga`, `berat`, `id_admin`) VALUES
('Peng-0h9BLzN0', '10 Mei 2018', '17:29:50', '5000', '19.624', 5),
('Peng-0lX3oUH7', '10 Mei 2018', '11:56:17', '5000', '0.4', 5),
('Peng-0uD7tPC9', '10 Mei 2018', '17:03:29', '5000', '29.09', 5),
('Peng-1KeGvAA4', '10 Mei 2018', '18:01:04', '5000', '0', 5),
('Peng-2WdDl134', '10 Mei 2018', '18:15:54', '5000', '0', 5),
('Peng-35EZkNg7', '10 Mei 2018', '16:53:47', '5000', '1.94', 5),
('Peng-3VYm5VQ9', '10 Mei 2018', '17:28:09', '5000', '22.522', 5),
('Peng-406b8I41', '10 Mei 2018', '17:26:11', '5000', '19', 5),
('Peng-4FCPDoi2', '9 Mei 2018', '16.07.52', '5000', '2.69', 5),
('Peng-4zTH5nD6', '10 Mei 2018', '17:25:56', '5000', '190', 5),
('Peng-5RE9YHx1', '10 Mei 2018', '17:29:41', '5000', '19.795', 5),
('Peng-5ucfIKH6', '10 Mei 2018', '16:47:56', '5000', '3.52', 5),
('Peng-5VsRKH67', '10 Mei 2018', '17:22:27', '5000', '10', 5),
('Peng-6EkxXWe5', '10 Mei 2018', '17:02:45', '5000', '1892', 5),
('Peng-6GvGncT0', '9 Mei 2018', '16.04.20', '5000', '0.025', 5),
('Peng-6sPNczF8', '10 Mei 2018', '17:18:18', '5000', '23', 5),
('Peng-75Ht53h7', '10 Mei 2018', '17:29:57', '5000', '19.174', 5),
('Peng-7rkbbkd4', '10 Mei 2018', '17:40:44', '5000', '18.401', 5),
('Peng-87uPEjB6', '10 Mei 2018', '17:22:16', '5000', '90', 5),
('Peng-8Lphi7u3', '10 Mei 2018', '16:56:23', '5000', '3.68', 5),
('Peng-8nEmmeJ2', '10 Mei 2018', '17:19:52', '5000', '15', 5),
('Peng-90Y6dPo4', '10 Mei 2018', '18:14:24', '5000', '0', 5),
('Peng-9DRQrpn4', '10 Mei 2018', '17:25:44', '5000', '10', 5),
('Peng-9qRNo7f0', '10 Mei 2018', '17:14:10', '5000', '20.24098', 5),
('Peng-AhaOHZZ8', '10 Mei 2018', '18:49:48', '5000', '1.649', 5),
('Peng-apFYlY80', '10 Mei 2018', '17:13:30', '5000', '3.20969', 5),
('Peng-AQ5vkpm5', '10 Mei 2018', '16:59:25', '5000', '35.14', 5),
('Peng-aXGlx1e7', '10 Mei 2018', '17:42:37', '5000', '19.943', 5),
('Peng-B9yEuzy0', '10 Mei 2018', '17:17:30', '5000', '3', 5),
('Peng-bHkw2YG0', '10 Mei 2018', '19:22:30', '5000', '19.02', 5),
('Peng-bkevaex9', '10 Mei 2018', '16:53:19', '5000', '1.9', 5),
('Peng-BluYW3f6', '10 Mei 2018', '16:57:16', '5000', '3.48', 5),
('Peng-BPrT88n9', '10 Mei 2018', '17:21:39', '5000', '90', 5),
('Peng-BvCDgOG9', '10 Mei 2018', '19:02:39', '5000', '0.05167', 5),
('Peng-CfpkqdU5', '10 Mei 2018', '17:42:05', '5000', '19.914', 5),
('Peng-clnwJut8', '10 Mei 2018', '16:56:58', '5000', '34.74', 5),
('Peng-coA7tu11', '10 Mei 2018', '17:37:31', '5000', '19.435', 5),
('Peng-CoRVIBe6', '10 Mei 2018', '17:24:46', '5000', '59', 5),
('Peng-d0gtUkm2', '10 Mei 2018', '18:44:52', '5000', '1.67', 5),
('Peng-dEWtraz3', '10 Mei 2018', '17:17:53', '5000', '2.3', 5),
('Peng-DML5fNV0', '10 Mei 2018', '17:20:40', '5000', '90', 5),
('Peng-dmzUBgs4', '10 Mei 2018', '18:15:04', '5000', '0', 5),
('Peng-dQcggF85', '9 Mei 2018', '17.59.35', '5000', '1.88', 5),
('Peng-dSVyOBP2', '10 Mei 2018', '18:15:22', '5000', '7.233', 5),
('Peng-Dvig9yJ3', '10 Mei 2018', '18:20:03', '5000', '0', 5),
('Peng-E5wCHQq5', '10 Mei 2018', '17:19:35', '5000', '20', 5),
('Peng-E7tZ1US1', '10 Mei 2018', '17:28:51', '5000', '20.9', 5),
('Peng-ecxaHd06', '10 Mei 2018', '17:39:36', '5000', '19.451', 5),
('Peng-egasaKd9', '9 Mei 2018', '16.13.49', '5000', '0', 5),
('Peng-fet6LCU1', '10 Mei 2018', '17:13:11', '5000', '23.456', 5),
('Peng-FfEVJvS0', '10 Mei 2018', '18:51:50', '5000', '3.515', 5),
('Peng-fMek1uy9', '10 Mei 2018', '16:57:39', '5000', '3.434', 5),
('Peng-g34Ydzv2', '10 Mei 2018', '17:29:32', '5000', '18.887', 5),
('Peng-G4Q3is46', '10 Mei 2018', '17:04:26', '5000', '1.25', 5),
('Peng-gbO40Kz8', '10 Mei 2018', '17:26:28', '5000', '1', 5),
('Peng-gNuewqx9', '9 Mei 2018', '18.42.59', '5000', '0', 5),
('Peng-hB2uZQV1', '9 Mei 2018', '16.05.41', '5000', '2.45', 5),
('Peng-HIopSrm4', '9 Mei 2018', '16.05.54', '5000', '2.45', 5),
('Peng-Hq0Qnum0', '10 Mei 2018', '18:14:40', '5000', '0.08322', 5),
('Peng-HUvIeYo0', '9 Mei 2018', '16.04.30', '5000', '0.025', 5),
('Peng-IuuQLwD6', '10 Mei 2018', '17:26:56', '5000', '19.567', 5),
('Peng-iVAkd0R0', '10 Mei 2018', '17:02:20', '5000', '1940', 5),
('Peng-IYQpMuT7', '10 Mei 2018', '17:19:27', '5000', '10', 5),
('Peng-j4nOj608', '10 Mei 2018', '17:29:08', '5000', '19.221', 5),
('Peng-J5ZpyIN2', '10 Mei 2018', '17:03:12', '5000', '18.55', 5),
('Peng-jBSHULi9', '10 Mei 2018', '17:38:39', '5000', '19.275', 5),
('Peng-jDySt102', '10 Mei 2018', '18:20:12', '5000', '0', 5),
('Peng-kA73jLO0', '10 Mei 2018', '17:20:20', '5000', '15.67', 5),
('Peng-KZBOlw62', '10 Mei 2018', '17:24:22', '5000', '59', 5),
('Peng-L1PGnPd9', '10 Mei 2018', '18:35:19', '5000', '0', 5),
('Peng-LAkYyi49', '10 Mei 2018', '17:56:29', '5000', '0', 5),
('Peng-LiR1sw99', '10 Mei 2018', '17:05:09', '5000', '0.181', 5),
('Peng-Lp5E5dp6', '10 Mei 2018', '17:35:06', '5000', '19.923', 5),
('Peng-Ltgkup55', '10 Mei 2018', '18:51:15', '5000', '0.07103', 5),
('Peng-MLGnLfK3', '10 Mei 2018', '18:43:33', '5000', '1.737', 5),
('Peng-MMPKLzk9', '10 Mei 2018', '17:41:39', '5000', '19.906', 5),
('Peng-Mq0tIth9', '9 Mei 2018', '17.54.49', '5000', '2.46', 5),
('Peng-MwohUJW8', '10 Mei 2018', '17:25:18', '5000', '10', 5),
('Peng-n2RiKp96', '9 Mei 2018', '16.08.26', '5000', '2.69', 5),
('Peng-NQqBSFK6', '10 Mei 2018', '17:25:06', '5000', '124.56', 5),
('Peng-On4Kb0W0', '10 Mei 2018', '18:00:20', '5000', '0', 5),
('Peng-OWiwF0U8', '10 Mei 2018', '17:06:08', '5000', '2.345', 5),
('Peng-P7vi7PW1', '10 Mei 2018', '17:17:11', '5000', '0', 5),
('Peng-po4i9Vw1', '10 Mei 2018', '18:29:31', '5000', '0', 5),
('Peng-pwhyuUn0', '10 Mei 2018', '17:40:20', '5000', '19.489', 5),
('Peng-PyTouWz8', '10 Mei 2018', '17:07:48', '5000', '23.456', 5),
('Peng-qKhgmt78', '9 Mei 2018', '18.40.38', '5000', '0', 5),
('Peng-RwHaNed5', '9 Mei 2018', '16.05.05', '5000', '0.25', 5),
('Peng-s080ZNv7', '10 Mei 2018', '17:21:57', '5000', '90', 5),
('Peng-s7M2XwQ7', '10 Mei 2018', '17:41:17', '5000', '18.534', 5),
('Peng-sBOUzFc1', '9 Mei 2018', '16.09.01', '5000', '2.8', 5),
('Peng-sT2GO1w3', '10 Mei 2018', '17:27:13', '5000', '1.231', 5),
('Peng-t7eTxr25', '10 Mei 2018', '18:14:55', '5000', '8.435', 5),
('Peng-T9eLvbn7', '10 May 2018', '11:55:37', '5000', '0.4', 5),
('Peng-TboSnpS4', '10 Mei 2018', '18:15:14', '5000', '3.628', 5),
('Peng-tcM8baJ9', '10 Mei 2018', '19:04:09', '5000', '0.0347', 5),
('Peng-tCwWTt71', '10 Mei 2018', '17:36:21', '5000', '20.064', 5),
('Peng-tdMeHji1', '10 Mei 2018', '17:24:11', '5000', '90', 5),
('Peng-TgAyUqu9', '9 Mei 2018', '16.14.09', '5000', '0', 5),
('Peng-tqGBg1Q3', '10 Mei 2018', '17:31:03', '5000', '18.901', 5),
('Peng-tuIAqGR0', '10 Mei 2018', '17:18:30', '5000', '50', 5),
('Peng-U0Z1UnB5', '10 Mei 2018', '16:54:25', '5000', '2.01', 5),
('Peng-Ud6vuhH2', '10 Mei 2018', '18:13:02', '5000', '0.01986', 5),
('Peng-v08i4lT5', '10 Mei 2018', '16:57:55', '5000', '2.074', 5),
('Peng-VfSkVm80', '10 Mei 2018', '17:13:50', '5000', '0.46805', 5),
('Peng-vsH4i7Y5', '10 Mei 2018', '18:51:25', '5000', '3.499', 5),
('Peng-W3vWcmP7', '10 Mei 2018', '17:27:27', '5000', '0.1', 5),
('Peng-WdZ5A7I7', '10 Mei 2018', '19:19:27', '5000', '19.744', 5),
('Peng-WeG2ihz5', '9 Mei 2018', '18.40.15', '5000', '0', 5),
('Peng-WjET7v12', '10 Mei 2018', '17:08:22', '5000', '0.92', 5),
('Peng-WKkLIoW4', '10 Mei 2018', '17:07:04', '5000', '5', 5),
('Peng-wQa48Ww9', '10 Mei 2018', '17:29:19', '5000', '19.857', 5),
('Peng-WRQDxCx8', '10 Mei 2018', '16:59:48', '5000', '20.75', 5),
('Peng-xANfZ5Y4', '10 Mei 2018', '18:39:34', '5000', '0', 5),
('Peng-XLBc7UH1', '10 Mei 2018', '17:21:51', '5000', '90', 5),
('Peng-XM6UQT74', '9 Mei 2018', '18.41.34', '5000', '0', 5),
('Peng-YFTCBnn0', '9 Mei 2018', '17.55.40', '5000', '2.13', 5),
('Peng-YJKv5f47', '10 Mei 2018', '16:47:47', '5000', '1.11', 5),
('Peng-YOQiTl24', '10 Mei 2018', '17:08:04', '5000', '5', 5),
('Peng-ysnoQyr8', '9 Mei 2018', '18.43.08', '5000', '2.52', 5),
('Peng-yyBFxDv0', '10 Mei 2018', '16:46:00', '5000', '0', 5),
('Peng-z16FU3C5', '10 Mei 2018', '17:32:35', '5000', '19.115', 5),
('Peng-zhIlVNd0', '10 Mei 2018', '17:08:50', '5000', '245.99999', 5);

-- --------------------------------------------------------

--
-- Table structure for table `sms_pengirim`
--

CREATE TABLE `sms_pengirim` (
  `time` varchar(20) NOT NULL,
  `date` varchar(30) DEFAULT NULL,
  `isi_sms` varchar(200) DEFAULT NULL,
  `status_sms` varchar(15) DEFAULT NULL,
  `id_sms` int(10) NOT NULL,
  `no_telp_pengirim` int(12) DEFAULT NULL,
  `id_admin` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sms_pengirim`
--

INSERT INTO `sms_pengirim` (`time`, `date`, `isi_sms`, `status_sms`, `id_sms`, `no_telp_pengirim`, `id_admin`) VALUES
('22:41:37', '22 Mei 2018', 'Selamat malam. Saya dengan pak mahdi ingin pesan air, tolong segera dikirim hari ini. Mohon konfirmasi ke nomor saya 082155572233. Terima kasih. -Bapak Mahdi Lenteng Agung', 'full', 61, 123, NULL),
('12', '12-1-2', 'halo', 'full', 62, 897877612, NULL),
('12', '12-1-2', 'halo', 'full', 212, 897877612, 5),
('00:42:37', '2 Juni 2018', 'Selamat pagi. Saya dengan pak mahdi ingin pesan air, tolong segera dikirim hari ini. Mohon konfirmasi ke nomor saya 082155572233. Terima kasih. -Bapak Mahdi Lenteng Agung', 'full', 213, 123, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `table_akademik`
--

CREATE TABLE `table_akademik` (
  `nik_akademik` varchar(30) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `tanggal_lahir` varchar(50) DEFAULT NULL,
  `alamat` text,
  `no_telp` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `table_akademik`
--

INSERT INTO `table_akademik` (`nik_akademik`, `nama`, `password`, `tanggal_lahir`, `alamat`, `no_telp`) VALUES
('11111', 'Hani', '76e105c3a61db1b3f13207774aeccc3c', '22 Januari', 'Bekasi', '0987776534273'),
('22222', 'Dani', '55b7e8b895d047537e672250dd781555', '09 Maret 1987', 'Bojong', '0897363636363'),
('33333', 'Rio', 'd5ed38fdbf28bc4e58be142cf5a17cf5', '12 Desember 1997', 'BSD', '0897363636354');

-- --------------------------------------------------------

--
-- Table structure for table `table_dosen`
--

CREATE TABLE `table_dosen` (
  `nik_dosen` varchar(30) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `tanggal_lahir` varchar(50) DEFAULT NULL,
  `alamat` text,
  `no_telp` varchar(20) DEFAULT NULL,
  `id_status` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `table_dosen`
--

INSERT INTO `table_dosen` (`nik_dosen`, `nama`, `password`, `tanggal_lahir`, `alamat`, `no_telp`, `id_status`) VALUES
('010101', 'Harry ', '3b87c97d15e8eb11e51aa25e9a5770e9', '08 Juli 1972', 'Bekasi', '0897363639999', 1),
('020202', 'Sari', ' a87bcf310c4fdf2a80f2f3d97f1f9424', '09 Maret 1987', 'Pondok Indah', '0897363637778', 0),
('030303', 'Retno', 'edd39370424d54db23ccec123f0ce66b', '09 Mei 1966', 'Bekasi', '098888882822', 0),
('040404', 'Diki', ' 43b93443937ea642a9a43e77fd5d8f77', '06 Januari 1966', 'BSD', '0897777377373', 0);

-- --------------------------------------------------------

--
-- Table structure for table `table_dosen_matkul`
--

CREATE TABLE `table_dosen_matkul` (
  `id_matkul` varchar(30) NOT NULL,
  `nik_dosen` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `table_info`
--

CREATE TABLE `table_info` (
  `no` int(10) NOT NULL,
  `nim` varchar(30) NOT NULL,
  `tgl_absen` varchar(30) NOT NULL,
  `jam_absen` varchar(30) NOT NULL,
  `id_matkul` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `table_info`
--

INSERT INTO `table_info` (`no`, `nim`, `tgl_absen`, `jam_absen`, `id_matkul`) VALUES
(6, '116103006', '2018-12-10', '09.45', 'MT-4');

-- --------------------------------------------------------

--
-- Table structure for table `table_jadwalmatkul`
--

CREATE TABLE `table_jadwalmatkul` (
  `no` int(30) NOT NULL,
  `nik_dosen` varchar(30) NOT NULL,
  `jumlah_mahasiswa` int(30) NOT NULL,
  `id_ruang` varchar(10) NOT NULL,
  `jam_mulai` varchar(10) NOT NULL,
  `jam_selesai` varchar(10) NOT NULL,
  `id_matkul` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `table_jadwalmatkul`
--

INSERT INTO `table_jadwalmatkul` (`no`, `nik_dosen`, `jumlah_mahasiswa`, `id_ruang`, `jam_mulai`, `jam_selesai`, `id_matkul`) VALUES
(1, '010101', 6, 'A21', '09.45', '12.12', 'MT-1');

-- --------------------------------------------------------

--
-- Table structure for table `table_mahasiswa`
--

CREATE TABLE `table_mahasiswa` (
  `nim` varchar(30) NOT NULL,
  `nama_mahasiswa` varchar(30) NOT NULL,
  `tgl_lahir` varchar(30) NOT NULL,
  `foto` varchar(100) NOT NULL,
  `id_status_mahasiswa` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `table_mahasiswa`
--

INSERT INTO `table_mahasiswa` (`nim`, `nama_mahasiswa`, `tgl_lahir`, `foto`, `id_status_mahasiswa`) VALUES
('116103001', 'Reynaldi Prathama ', '08 Agustus 1999', '', 1),
('116103003', 'Oviana Rosita Putri', '03 Juli 1998', '', 1),
('116103004', 'M Dzaky Prakasa ', '08 Januari 1998', '', 1),
('116103005', 'Dea Oktaviani ', '12 Oktober 1998', '', 1),
('116103006', 'Sitta Fadillah ', '09 September 1998', '', 1),
('116103007', 'Nazifa Putri', '02 Februari 1999', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `table_matakuliah`
--

CREATE TABLE `table_matakuliah` (
  `id_matkul` varchar(30) NOT NULL,
  `mata_kuliah` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `table_matakuliah`
--

INSERT INTO `table_matakuliah` (`id_matkul`, `mata_kuliah`) VALUES
('MT-1', 'APII'),
('MT-2', 'Game Pemprograman'),
('MT-3', 'AI'),
('MT-4', 'Basis Data'),
('MT-5', 'HCI');

-- --------------------------------------------------------

--
-- Table structure for table `table_status`
--

CREATE TABLE `table_status` (
  `id_status` int(5) NOT NULL,
  `keterangan` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `table_status`
--

INSERT INTO `table_status` (`id_status`, `keterangan`) VALUES
(0, 'non_aktif'),
(1, 'aktif');

-- --------------------------------------------------------

--
-- Table structure for table `toren`
--

CREATE TABLE `toren` (
  `ketinggian` varchar(20) NOT NULL,
  `time` varchar(20) NOT NULL,
  `date` varchar(30) DEFAULT NULL,
  `id_admin` int(20) DEFAULT NULL,
  `jenis_toren` varchar(10) DEFAULT NULL,
  `id_monitoring_toren` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `toren`
--

INSERT INTO `toren` (`ketinggian`, `time`, `date`, `id_admin`, `jenis_toren`, `id_monitoring_toren`) VALUES
('7', '00:25:44', '22 Mei 2018', 5, 'Toren 2', 806),
('6', '00:25:44', '22 Mei 2018', 5, 'Toren 1', 807),
('3', '22:26:17', '22 Mei 2018', 5, 'Toren 2', 808),
('5', '22:26:17', '22 Mei 2018', 5, 'Toren 1', 809),
('7', '22:41:34', '22 Mei 2018', 5, 'Toren 2', 810),
('5', '22:41:34', '22 Mei 2018', 5, 'Toren 1', 811),
('7', '00:42:29', '2 Juni 2018', 5, 'Toren 2', 812),
('5', '00:42:29', '2 Juni 2018', 5, 'Toren 1', 813),
('45', '17:18:54', '2 Juni 2018', 5, 'Toren 2', 814),
('12', '17:18:54', '2 Juni 2018', 5, 'Toren 1', 815),
('17', '17:22:24', '2 Juni 2018', 5, 'Toren 2', 816),
('-49', '17:22:24', '2 Juni 2018', 5, 'Toren 1', 817),
('16', '17:22:32', '2 Juni 2018', 5, 'Toren 2', 818),
('121', '17:22:32', '2 Juni 2018', 5, 'Toren 1', 819),
('15', '17:22:39', '2 Juni 2018', 5, 'Toren 2', 820),
('-48', '17:22:39', '2 Juni 2018', 5, 'Toren 1', 821),
('16', '17:22:47', '2 Juni 2018', 5, 'Toren 2', 822),
('-48', '17:22:47', '2 Juni 2018', 5, 'Toren 1', 823),
('51', '17:22:54', '2 Juni 2018', 5, 'Toren 2', 824),
('-49', '17:22:54', '2 Juni 2018', 5, 'Toren 1', 825),
('151', '17:23:01', '2 Juni 2018', 5, 'Toren 2', 826),
('193', '17:23:01', '2 Juni 2018', 5, 'Toren 1', 827),
('150', '17:23:08', '2 Juni 2018', 5, 'Toren 2', 828),
('194', '17:23:08', '2 Juni 2018', 5, 'Toren 1', 829),
('15', '17:23:15', '2 Juni 2018', 5, 'Toren 2', 830),
('-48', '17:23:15', '2 Juni 2018', 5, 'Toren 1', 831),
('-81', '17:23:23', '2 Juni 2018', 5, 'Toren 2', 832),
('-49', '17:23:23', '2 Juni 2018', 5, 'Toren 1', 833);

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `date` varchar(30) DEFAULT NULL,
  `id_admin` int(10) DEFAULT NULL,
  `jumlah_pengisian` int(10) DEFAULT NULL,
  `id_transaksi` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `lampu`
--
ALTER TABLE `lampu`
  ADD PRIMARY KEY (`id_lampu`),
  ADD KEY `fk_lampu_admin` (`id_admin`);

--
-- Indexes for table `pengisian`
--
ALTER TABLE `pengisian`
  ADD PRIMARY KEY (`id_pengisian`),
  ADD KEY `fk_pengisian_admin` (`id_admin`);

--
-- Indexes for table `sms_pengirim`
--
ALTER TABLE `sms_pengirim`
  ADD PRIMARY KEY (`id_sms`),
  ADD KEY `id_admin` (`id_admin`);

--
-- Indexes for table `table_akademik`
--
ALTER TABLE `table_akademik`
  ADD PRIMARY KEY (`nik_akademik`);

--
-- Indexes for table `table_dosen`
--
ALTER TABLE `table_dosen`
  ADD PRIMARY KEY (`nik_dosen`),
  ADD KEY `id_status` (`id_status`);

--
-- Indexes for table `table_dosen_matkul`
--
ALTER TABLE `table_dosen_matkul`
  ADD KEY `id_matkul` (`id_matkul`),
  ADD KEY `nik_dosen` (`nik_dosen`);

--
-- Indexes for table `table_info`
--
ALTER TABLE `table_info`
  ADD PRIMARY KEY (`no`),
  ADD KEY `nim` (`nim`),
  ADD KEY `mata_kuliah` (`id_matkul`);

--
-- Indexes for table `table_jadwalmatkul`
--
ALTER TABLE `table_jadwalmatkul`
  ADD PRIMARY KEY (`no`),
  ADD KEY `nik_dosen` (`nik_dosen`),
  ADD KEY `id_matkul` (`id_matkul`);

--
-- Indexes for table `table_mahasiswa`
--
ALTER TABLE `table_mahasiswa`
  ADD PRIMARY KEY (`nim`),
  ADD KEY `id_status_mahasiswa` (`id_status_mahasiswa`);

--
-- Indexes for table `table_matakuliah`
--
ALTER TABLE `table_matakuliah`
  ADD PRIMARY KEY (`id_matkul`);

--
-- Indexes for table `table_status`
--
ALTER TABLE `table_status`
  ADD PRIMARY KEY (`id_status`);

--
-- Indexes for table `toren`
--
ALTER TABLE `toren`
  ADD PRIMARY KEY (`id_monitoring_toren`),
  ADD KEY `fk_toren_admin` (`id_admin`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `fk_transaksi_admin` (`id_admin`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sms_pengirim`
--
ALTER TABLE `sms_pengirim`
  MODIFY `id_sms` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=214;

--
-- AUTO_INCREMENT for table `table_info`
--
ALTER TABLE `table_info`
  MODIFY `no` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `table_jadwalmatkul`
--
ALTER TABLE `table_jadwalmatkul`
  MODIFY `no` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `toren`
--
ALTER TABLE `toren`
  MODIFY `id_monitoring_toren` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=834;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `lampu`
--
ALTER TABLE `lampu`
  ADD CONSTRAINT `fk_lampu_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pengisian`
--
ALTER TABLE `pengisian`
  ADD CONSTRAINT `fk_pengisian_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sms_pengirim`
--
ALTER TABLE `sms_pengirim`
  ADD CONSTRAINT `sms_pengirim_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`);

--
-- Constraints for table `table_dosen`
--
ALTER TABLE `table_dosen`
  ADD CONSTRAINT `fk_status_dosen` FOREIGN KEY (`id_status`) REFERENCES `table_status` (`id_status`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `table_dosen_matkul`
--
ALTER TABLE `table_dosen_matkul`
  ADD CONSTRAINT `fk_id_matkul_matakuliah` FOREIGN KEY (`id_matkul`) REFERENCES `table_matakuliah` (`id_matkul`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_nik_dosen` FOREIGN KEY (`nik_dosen`) REFERENCES `table_dosen` (`nik_dosen`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `table_info`
--
ALTER TABLE `table_info`
  ADD CONSTRAINT `fk_mata_kuliah_info` FOREIGN KEY (`id_matkul`) REFERENCES `table_matakuliah` (`id_matkul`),
  ADD CONSTRAINT `fk_nim_info` FOREIGN KEY (`nim`) REFERENCES `table_mahasiswa` (`nim`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `table_jadwalmatkul`
--
ALTER TABLE `table_jadwalmatkul`
  ADD CONSTRAINT `fk_id_matkul` FOREIGN KEY (`id_matkul`) REFERENCES `table_matakuliah` (`id_matkul`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_nik_dosen_index` FOREIGN KEY (`nik_dosen`) REFERENCES `table_dosen` (`nik_dosen`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `table_mahasiswa`
--
ALTER TABLE `table_mahasiswa`
  ADD CONSTRAINT `fk_status_mahasiswa_index` FOREIGN KEY (`id_status_mahasiswa`) REFERENCES `table_status` (`id_status`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `toren`
--
ALTER TABLE `toren`
  ADD CONSTRAINT `fk_toren_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `fk_transaksi_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
