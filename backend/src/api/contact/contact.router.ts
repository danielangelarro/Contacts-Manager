import { initTRPC } from "@trpc/server";
import { CreateContactUseCase } from "src/application/use-cases/create-contact.use-case";
import { ListContactsUseCase } from "src/application/use-cases/list-contacts.use-case";
import { UpdateContactUseCase } from "src/application/use-cases/update-contact.use-case";
import { ContactRepositoryImpl } from "src/infrastructure/repositories/contact.repository.impl";
import { z } from "zod";
import { ContactRouterMapper } from "./contact.router.dto";
import { Injectable } from "@nestjs/common";


@Injectable()
export class ContactRouter {
    constructor(
        private readonly createContactUseCase: CreateContactUseCase,
        private readonly listContactsUseCase: ListContactsUseCase,
        private readonly updateContactUseCase: UpdateContactUseCase,
    ) { }

    t = initTRPC.create();
    mapper = new ContactRouterMapper();

    _router = this.t.router({
        createContact: this.t.procedure
            .input(
                z.object({
                    firstName: z.string(),
                    lastname: z.string(),
                    email: z.string().email(),
                    phone: z.string(),
                    company: z.string(),
                    position: z.string(),
                    status: z.enum(["New", "Contacted", "Qualified", "Lost"]),
                })
            )
            .mutation(async ({ input }) => {
                const contact = this.mapper.to_entitie(input);
                await this.createContactUseCase.execute(contact);
            }),

        updateContact: this.t.procedure
            .input(
                z.object({
                    id: z.number(),
                    firstName: z.string(),
                    lastname: z.string(),
                    email: z.string().email(),
                    phone: z.string(),
                    company: z.string(),
                    position: z.string(),
                    status: z.enum(["New", "Contacted", "Qualified", "Lost"]),
                })
            )
            .mutation(async ({ input }) => {
                const contact = this.mapper.to_entitie(input);
                contact.id = input.id;

                await this.updateContactUseCase.execute(contact);
            }),
        
        listContactsUseCase: this.t.procedure
            .query(async () => await this.listContactsUseCase.execute()),
    });
}
