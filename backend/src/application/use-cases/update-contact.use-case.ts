import { ContactRepository } from "../../domain/repositories/contact.repository";
import { Contact } from "../../domain/entities/contact.entity";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class UpdateContactUseCase {
  constructor(@Inject("ContactRepository") private readonly contactRepository: ContactRepository) {}

  async execute(contact: Contact): Promise<Contact> {
    return this.contactRepository.update(contact);
  }
}
