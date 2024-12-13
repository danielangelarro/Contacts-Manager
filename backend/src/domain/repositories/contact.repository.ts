import { Contact } from "../entities/contact.entity";


export interface ContactRepository {
  create(contact: Contact): Promise<Contact>;
  update(contact: Contact): Promise<Contact>;
  findAll(): Promise<Contact[]>;
}
