import { trpc } from '../utils/trpc.client';
import { Contact } from '../entities/Contact';
import { contactSchema } from '../schemas/contactSchemas';


export const useListContacts = () => {
    return trpc.listContacts.useQuery();
};

export const useCreateContact = () => {
    return trpc.createContact.useMutation({
        onError: (error: any) => {
            return error;
        },
        onSuccess: (data: Contact) => {
            return data;
        },
    });
};

export const useUpdateContact = () => {
    return trpc.updateContact.useMutation({
        onError: (error: any) => {
            return error;
        },
        onSuccess: (data: Contact) => {
            return data;
        },
    });
};

export const validateContact = (contactData: Contact) => {
    try {
        contactSchema.parse(contactData);
        return { valid: true };
    } catch (error: any) {
        return { valid: false, errors: error.message };
    }
};
