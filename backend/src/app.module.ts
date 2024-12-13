import { Module } from '@nestjs/common';
import { ContactRepositoryImpl } from './infrastructure/repositories/contact.repository.impl';
import { CreateContactUseCase } from './application/use-cases/create-contact.use-case';
import { ListContactsUseCase } from './application/use-cases/list-contacts.use-case';
import { UpdateContactUseCase } from './application/use-cases/update-contact.use-case';
import { DatabaseConfig } from './infrastructure/database/database.config';
import { createTrpcContext } from './api/trpc/trpc.context'; 
import { TrpcService } from './api/trpc/trpc.server';

@Module({
  providers: [
    TrpcService,
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
    {
      provide: 'TrpcContext',
      useFactory: (
        createContactUseCase: CreateContactUseCase,
        listContactsUseCase: ListContactsUseCase,
        updateContactUseCase: UpdateContactUseCase
      ) =>
        createTrpcContext({
          createContactUseCase,
          listContactsUseCase,
          updateContactUseCase,
        }),
      inject: [CreateContactUseCase, ListContactsUseCase, UpdateContactUseCase],
    },
  ],
})
export class AppModule {}
