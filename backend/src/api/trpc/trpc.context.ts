import { CreateContactUseCase } from 'src/application/use-cases/create-contact.use-case';
import { ListContactsUseCase } from 'src/application/use-cases/list-contacts.use-case';
import { UpdateContactUseCase } from 'src/application/use-cases/update-contact.use-case';


export interface TrpcContext {
    createContactUseCase: CreateContactUseCase;
    listContactsUseCase: ListContactsUseCase;
    updateContactUseCase: UpdateContactUseCase;
}

export const createTrpcContext = ({createContactUseCase, listContactsUseCase, updateContactUseCase}: TrpcContext): TrpcContext => {
    return {
        createContactUseCase,
        listContactsUseCase,
        updateContactUseCase,
    };
}
