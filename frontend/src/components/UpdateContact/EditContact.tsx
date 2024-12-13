import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import { Button, Callout, Select, Text, TextField } from "@radix-ui/themes";
import styles from "../../styles/modules/dialog.module.css";
import { EditableContact } from "../../entities/Contact";
import { useUpdateContact } from "../../hooks/useContacts";
import { TrcpValidationError } from "../../utils/trpc.client";
import { ValidationErrors, validateContact } from "../../utils/validateContact";

interface EditContactDialogProps {
    contact: EditableContact | null;
    isOpen: boolean;
    onClose: () => void;
}

const EditContactDialog: React.FC<EditContactDialogProps> = ({ contact, isOpen, onClose }) => {
    const [form, setForm] = useState<EditableContact>({
        id: 0,
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
    const updateContact = useUpdateContact();

    useEffect(() => {
        if (contact) {
            setForm(contact);
        }
    }, [contact]);

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

            await updateContact.mutateAsync(form as EditableContact);
        } catch (err: any) {
            setErrors(JSON.parse(err.message));
        }

        onClose();
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Trigger asChild>
                <div className="hidden" />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.Overlay} />
                <Dialog.Content className={styles.Content}>
                    <Dialog.Title className={styles.Title}>Edit Contact</Dialog.Title>
                    <Dialog.Description className={styles.Description}>
                        Edit your contact details here. Click save when you're done.
                    </Dialog.Description>

                    {errors && errors.map((e) => {
                        return (
                            <Callout.Root color="red">
                                <Callout.Icon>
                                    <InfoCircledIcon />
                                </Callout.Icon>
                                <Callout.Text>
                                    {e.message}
                                </Callout.Text>
                            </Callout.Root>
                        )
                    })}

                    {["firstName", "lastName", "email", "phone", "company", "position"].map((field) =>
                        <div>
                            <fieldset className={styles.Fieldset} key={"edit-" + field}>
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
                        <Button className='button' onClick={handleSubmit}>Save changes</Button>
                    </div>
                    <Dialog.Close asChild>
                        <Button className={styles.IconButton} aria-label="Close">
                            <Cross2Icon />
                        </Button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default EditContactDialog;