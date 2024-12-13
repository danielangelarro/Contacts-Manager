import { initTRPC } from "@trpc/server";
import { Injectable } from "@nestjs/common";
import { z } from "zod";

import { ContactRouterMapper } from "./contact.router.dto";
import { router, publicProcedure } from "../trpc";
import { contactCreateSchema, contactUpdateSchema } from "./contact.router.schema";


const mapper = new ContactRouterMapper();

export const contactRouter = router({
    createContact: publicProcedure
        .input(contactCreateSchema)
        .mutation(async ({ input, ctx }) => {
            const contact = mapper.to_entitie(input);

            const createContactUseCase = ctx.createContactUseCase;
            const response = await createContactUseCase.execute(contact);

            return response;
        }),

    updateContact: publicProcedure
        .input(contactUpdateSchema)
        .mutation(async ({ input, ctx }) => {
            const contact = mapper.to_entitie(input);
            contact.id = input.id;

            const updateContactUseCase = ctx.updateContactUseCase;
            const response = await updateContactUseCase.execute(contact);

            return response;
        }),

    listContacts: publicProcedure
        .query(async ({ ctx }) => {
            const listContactsUseCase = ctx.listContactsUseCase;
            const response = await listContactsUseCase.execute();

            return response;
        }),
});

export type AppRouter = typeof contactRouter;
