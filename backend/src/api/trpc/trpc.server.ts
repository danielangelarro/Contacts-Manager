import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { Injectable } from '@nestjs/common';
import { CreateContactUseCase } from 'src/application/use-cases/create-contact.use-case';
import { ListContactsUseCase } from 'src/application/use-cases/list-contacts.use-case';
import { UpdateContactUseCase } from 'src/application/use-cases/update-contact.use-case';
import { contactRouter } from '../contact/contact.router';
import { createTrpcContext } from './trpc.context';


@Injectable()
export class TrpcService {
    constructor(
        private readonly createContactUseCase: CreateContactUseCase,
        private readonly listContactsUseCase: ListContactsUseCase,
        private readonly updateContactUseCase: UpdateContactUseCase
    ) { }

    getHttpHandler() {
        return createHTTPHandler({
            router: contactRouter,
            createContext: () =>
                createTrpcContext({
                    createContactUseCase: this.createContactUseCase,
                    listContactsUseCase: this.listContactsUseCase,
                    updateContactUseCase: this.updateContactUseCase,
                }),
        });
    }
}
