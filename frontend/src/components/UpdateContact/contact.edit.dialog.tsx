import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Button, Select, Text, TextField } from "@radix-ui/themes";
import styles from "../../styles/modules/dialog.module.css";
import { EditableContact } from "../../entities/contact.entity";

interface EditContactDialogProps {
    contact: EditableContact | null;
    handleUpdateContact: (contact: EditableContact) => void;
    isOpen: boolean;
    onClose: () => void;
}

const EditContactDialog: React.FC<EditContactDialogProps> = ({ contact, handleUpdateContact, isOpen, onClose }) => {
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

    useEffect(() => {
        if (contact) {
            setForm(contact);
        }
    }, [contact]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        handleUpdateContact(form as EditableContact);
        onClose();
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Trigger asChild>
                <Button>
                    <PlusCircledIcon /> Edit Contact
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.Overlay} />
                <Dialog.Content className={styles.Content}>
                    <Dialog.Title className={styles.Title}>Edit Contact</Dialog.Title>
                    <Dialog.Description className={styles.Description}>
                        Edit your contact details here. Click save when you're done.
                    </Dialog.Description>

                    {["firstName", "lastName", "email", "phone", "company", "position"].map((field) =>
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
                        <Button className={`${styles.Button} green`} onClick={handleSubmit}>Save changes</Button>
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

export default EditContactDialog;