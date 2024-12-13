import { Contact } from "src/domain/entities/contact.entity";


export class ContactRouterMapper {
    public to_entitie(input: any) {
        return new Contact(
            input.firstName,
            input.lastName,
            input.email,
            input.phone,
            input.company,
            input.position,
            input.status,
        );
    }
}
