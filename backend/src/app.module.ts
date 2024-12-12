import { Module } from '@nestjs/common';
import { ContactController } from './api/controllers/contact.controller';
import { ContactRepositoryImpl } from './infrastructure/repositories/contact.repository.impl';
import { CreateContactUseCase } from './application/use-cases/create-contact.use-case';
import { ListContactsUseCase } from './application/use-cases/list-contacts.use-case';
import { UpdateContactUseCase } from './application/use-cases/update-contact.use-case';
import { ContactRouter } from './api/contact/contact.router';
import { DatabaseConfig } from './infrastructure/database/database.config';

@Module({
  controllers: [ContactController],
  providers: [
    ContactRouter,
    {
      provide: 'DatabaseConfig',
      useClass: DatabaseConfig,
    },
    {
      provide: 'ContactRepository',
      useClass: ContactRepositoryImpl,
    },
    {
      provide: CreateContactUseCase,
      useFactory: (contactRepository: ContactRepositoryImpl) =>
        new CreateContactUseCase(contactRepository),
      inject: ['ContactRepository'],
    },
    {
      provide: ListContactsUseCase,
      useFactory: (contactRepository: ContactRepositoryImpl) =>
        new ListContactsUseCase(contactRepository),
      inject: ['ContactRepository'],
    },
    {
      provide: UpdateContactUseCase,
      useFactory: (contactRepository: ContactRepositoryImpl) =>
        new UpdateContactUseCase(contactRepository),
      inject: ['ContactRepository'],
    },
  ],
})
export class AppModule {}
