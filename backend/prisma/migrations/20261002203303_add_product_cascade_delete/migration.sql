-- DropForeignKey
ALTER TABLE `Conversation` DROP FOREIGN KEY `Conversation_productId_fkey`;

-- DropIndex
DROP INDEX `Conversation_productId_fkey` ON `Conversation`;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
