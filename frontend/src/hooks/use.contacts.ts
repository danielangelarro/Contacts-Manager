import { trpc } from '../utils/trpc.client';
import { Contact } from '../entities/contact.entity';
import { contactSchema } from '../schemas/contact.schemas';


export const useListContacts = () => {
    return trpc.listContacts.useQuery();
};

export const useCreateContact = () => {
    return trpc.createContact.useMutation({
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            console.log(data);
        },
    });
};

export const useUpdateContact = () => {
    return trpc.updateContact.useMutation({
        onError: (error) => {
            console.error("Error al actualizar contacto:", error);
        },
        onSuccess: (data) => {
            console.log("Contacto actualizado:", data);
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
