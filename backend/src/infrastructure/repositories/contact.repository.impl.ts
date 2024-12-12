import { ContactRepository } from "../../domain/repositories/contact.repository";
import { Contact } from "../../domain/entities/contact.entity";
import { contactsTable } from "../database/contact.schema";
import { eq } from "drizzle-orm";
import { ContactRepositoryMapper } from "./contact.repository.dto";
import { Inject } from "@nestjs/common";
import { DatabaseConfig } from "../database/database.config";


export class ContactRepositoryImpl implements ContactRepository {
    mapper = new ContactRepositoryMapper();

    constructor(@Inject('DatabaseConfig') private readonly databaseConfig: DatabaseConfig) { }

    async create(contact: Contact): Promise<Contact> {
        (await this.databaseConfig.get_db())
            .insert(contactsTable)
            .values(this.mapper.to_table(contact));

        return contact;
    }

    async update(contact: Contact): Promise<Contact> {
        (await this.databaseConfig.get_db())
            .update(contactsTable)
            .set(this.mapper.to_entitie(contact))
            .where(eq(contactsTable.id, contact.id));
        
        return contact;
    }

    async findAll(): Promise<Contact[]> {
        const db = await this.databaseConfig.get_db();
        const result = await db.select().from(contactsTable);

        return this.mapper.to_entities(result);
    }
}
