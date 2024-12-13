import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, InfoCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Button, Callout, Select, Text, TextField } from "@radix-ui/themes";
import styles from "../../styles/modules/dialog.module.css";
import { Contact } from "../../entities/Contact";
import { useCreateContact } from "../../hooks/useContacts";
import { TrcpValidationError } from "../../utils/trpc.client";
import { validateContact, ValidationErrors } from "../../utils/validateContact";


const DialogDemo: React.FC = () => {
    const [form, setForm] = useState<Omit<Contact, 'createdAt' | 'updatedAt'>>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        position: "",
        status: "New",
    });
    const [errors, setErrors] = useState<TrcpValidationError[]>([]);
    const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});
    const createContact = useCreateContact();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const validationErrors: ValidationErrors = validateContact(form);
            setFieldErrors(validationErrors);

            if (Object.keys(validationErrors).length > 0) {
                return;
            }

            await createContact.mutateAsync(form);
        } catch (err: any) {
            setErrors(JSON.parse(err.message));
        }
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button className="button">
                    <PlusCircledIcon /> Create Contact
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.Overlay} />
                <Dialog.Content className={styles.Content}>
                    <Dialog.Title className={styles.Title}>Create Contact</Dialog.Title>
                    <Dialog.Description className={styles.Description}>
                        Create your new contact here. Click save when you're done.
                    </Dialog.Description>

                    {errors && errors.map((e) => { 
                        return (
                            <Callout.Root color="red">
                                <Callout.Icon>
                                    <InfoCircledIcon />
                                </Callout.Icon>
                                <Callout.Text>
                                    { e.message }
                                </Callout.Text>
                            </Callout.Root>
                        )
                    })}

                    {["firstName", "lastName", "email", "phone", "company", "position"].map((field) =>
                        <div>
                            <fieldset className={styles.Fieldset} key={"create-" + field}>
                                <Text className={styles.Label} htmlFor={field}>
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </Text>
                                <TextField.Root
                                    className={styles.Input}
                                    id={field}
                                    name={field}
                                    value={form[field as keyof typeof form]}
                                    onChange={handleChange}
                                    required={true}
                                />
                            </fieldset>

                            {fieldErrors && Object.keys(fieldErrors).includes(field) && (
                                <Text color="red">{eval(`fieldErrors.${field}`)}</Text>
                            )}

                        </div>
                    )}

                    <fieldset className={styles.Fieldset}>
                        <Text className={styles.Label} htmlFor="status">
                            Status
                        </Text>
                        <Select.Root name="status" value={form.status} onValueChange={(value) => setForm({ ...form, status: value as 'New' | 'Contacted' | 'Qualified' | 'Lost' })}>
                            <Select.Trigger className={styles.Select} placeholder="Select a status..." />
                            <Select.Content>
                                <Select.Group>
                                    {['New', 'Contacted', 'Qualified', 'Lost'].map((status) => (
                                        <Select.Item key={status} value={status}>{status}</Select.Item>
                                    ))}
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                    </fieldset>

                    <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
                        <Button className="button" onClick={handleSubmit}>Save changes</Button>
                    </div>
                    <Dialog.Close asChild>
                        <button className={styles.IconButton} aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default DialogDemo;