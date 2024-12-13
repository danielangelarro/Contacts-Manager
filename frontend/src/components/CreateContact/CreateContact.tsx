import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BackpackIcon, Cross2Icon, EnvelopeClosedIcon, IdCardIcon, InfoCircledIcon, MobileIcon, PersonIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Box, Button, Callout, Flex, Grid, Select, Text, TextField } from "@radix-ui/themes";
import styles from "../../styles/modules/dialog.module.css";
import { Contact } from "../../entities/Contact";
import { useCreateContact } from "../../hooks/useContacts";
import { TrcpValidationError } from "../../utils/trpc.client";
import { validateContact, ValidationErrors } from "../../utils/validateContact";


interface CreateContactProps {
    setErrorMessage: (message: string) => void;
}

const CreateContact: React.FC<CreateContactProps> = ({ setErrorMessage }) => {
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
            setErrorMessage(`Error editing contact: ${err.message}`);
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
                    <Dialog.Title className="flex flex-col items-center text-xl font-bold text-white bg-blue-600 rounded-lg py-4 px-6 mb-4 shadow-md">
                        <PersonIcon className="w-10 h-10 mb-2" />
                        Create Contact
                    </Dialog.Title>

                    {/* Form Errors */}
                    {errors.map((e) => (
                        <Callout.Root key={e.message} className="mb-4 flex items-center gap-3 bg-red-100 border border-red-500 text-red-700 p-4 rounded-lg">
                            <Callout.Icon>
                                <InfoCircledIcon className="w-5 h-5" />
                            </Callout.Icon>
                            <Callout.Text>{e.message}</Callout.Text>
                        </Callout.Root>
                    ))}

                    {/* Form Fields - Two Column Layout */}
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                        {[
                            { field: "firstName", label: "First Name", placeholder: "Enter first name", icon: <PersonIcon /> },
                            { field: "lastName", label: "Last Name", placeholder: "Enter last name", icon: <PersonIcon /> },
                            { field: "email", label: "Email", placeholder: "Enter email address", icon: <EnvelopeClosedIcon /> },
                            { field: "phone", label: "Phone", placeholder: "Enter phone number", icon: <MobileIcon /> },
                            { field: "company", label: "Company", placeholder: "Enter company name", icon: <BackpackIcon /> },
                            { field: "position", label: "Position", placeholder: "Enter position", icon: <IdCardIcon /> },
                        ].map(({ field, label, placeholder, icon }) => (
                            <div key={field} className="relative">
                                <label htmlFor={field} className="block font-medium text-gray-700 mb-1">
                                    {label}
                                </label>
                                <div className="flex items-center relative">
                                    <div className="absolute left-3 text-gray-400">
                                        {icon}
                                    </div>
                                    <input
                                        id={field}
                                        name={field}
                                        value={form[field as keyof typeof form]}
                                        onChange={handleChange}
                                        placeholder={placeholder}
                                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                                        required
                                    />
                                </div>
                                {fieldErrors && Object.keys(fieldErrors).includes(field) && (
                                    <Text className="text-sm text-red-600 mt-1">{eval(`fieldErrors.${field}`)}</Text>
                                )}

                            </div>
                        ))}
                    </div>

                    {/* Status Dropdown */}
                    < div className="mt-6" >
                        <label htmlFor="status" className="block font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <Select.Root
                            name="status"
                            value={form.status}
                            onValueChange={(value) =>
                                setForm({ ...form, status: value as "New" | "Contacted" | "Qualified" | "Lost" })
                            }
                        >
                            <Select.Trigger
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-left"
                                placeholder="Select a status..."
                            />
                            <Select.Content>
                                <Select.Group>
                                    {["New", "Contacted", "Qualified", "Lost"].map((status) => (
                                        <Select.Item key={status} value={status}>
                                            {status}
                                        </Select.Item>
                                    ))}
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end mt-6">
                        <Button
                            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg transition-all"
                            onClick={handleSubmit}
                        >
                            Save Changes
                        </Button>
                    </div>

                    <Dialog.Close asChild>
                        <button
                            className="absolute top-4 right-4 hover:text-gray-600 bg-red-500 rounded-lg text-white"
                            aria-label="Close"
                        >
                            <Cross2Icon className="w-5 h-5" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default CreateContact;