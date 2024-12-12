import { Contact } from "src/domain/entities/contact.entity";


export class ContactRepositoryMapper {
    public to_table(contact: Contact) {
        return {
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            phone: contact.phone,
            company: contact.company,
            position: contact.position,
            status: contact.status,
        };
    }

    public to_entitie(contact: any) {
        return new Contact(
            contact.firstName,
            contact.lastName,
            contact.email,
            contact.phone,
            contact.company,
            contact.position,
            contact.status,
        );
    }

    public to_entities(contacts: any[]) {
        return contacts.map((contact: any) => this.to_entitie(contact));
    }
}