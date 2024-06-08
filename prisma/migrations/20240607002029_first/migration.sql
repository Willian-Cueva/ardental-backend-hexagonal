-- CreateTable
CREATE TABLE `MedicalAppointment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dniPatient` VARCHAR(191) NOT NULL,
    `namesPatient` VARCHAR(191) NOT NULL,
    `day` INTEGER NOT NULL,
    `month` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `timeStart` VARCHAR(191) NOT NULL,
    `observations` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
