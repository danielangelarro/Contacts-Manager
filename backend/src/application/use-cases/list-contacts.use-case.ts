import { Inject, Injectable } from "@nestjs/common";
import { ContactRepository } from "../../domain/repositories/contact.repository";
import { Contact } from "src/domain/entities/contact.entity";

@Injectable()
export class ListContactsUseCase {
  constructor(@Inject("ContactRepository") private readonly contactRepository: ContactRepository) {}

  async execute(): Promise<Contact[]> {
    return this.contactRepository.findAll();
  }
}
