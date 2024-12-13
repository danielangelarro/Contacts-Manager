import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Button, Select, Text, TextField } from "@radix-ui/themes";

import styles from "../../styles/dialog.module.css";



const DialogDemo: React.FC = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        position: "",
        status: "New",
    });
    
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button>
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
                    
                    {["firstName", "lastName", "email", "phone", "company", "position"].map((field) =>
                        <fieldset className={styles.Fieldset} key={"create-" + field}>
                            <Text className={styles.Label} htmlFor="name">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </Text>
                            <TextField.Root
                                className={styles.Input}
                                id="field"
                                defaultValue=""
                            />
                        </fieldset>
                    )}

                    <fieldset className={styles.Fieldset}>
                        <Text
                            className={styles.Label}
                            htmlFor="status"
                        >
                            Status
                        </Text>

                        <Select.Root size="2">
                            <Select.Trigger className={styles.Select} placeholder="Select a status..."/>
                            <Select.Content>
                                <Select.Group>
                                    {['New', 'Contacted', 'Qualified', 'Lost'].map((status) => (
                                        <Select.Item value={status}>{status}</Select.Item>
                                    ))}
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                    </fieldset>
                    
                    <div
                        style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
                    >
                        <Dialog.Close asChild>
                            <button className={`${styles.Button} green`}>Save changes</button>
                        </Dialog.Close>
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
