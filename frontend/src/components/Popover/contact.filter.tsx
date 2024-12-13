import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";
import styles from "../../styles/popover.module.css";
import { Button, Text, TextField } from "@radix-ui/themes";


export const PopoverDemo = () => {
    const [filters, setFilters] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        position: '',
        status: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleStatusChange = (status: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            status,
        }));
    };

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button>
                    <MixerHorizontalIcon /> Filters
                </Button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className={styles.Content} sideOffset={5}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <p className={styles.Text} style={{ marginBottom: 10 }}>
                            Filters
                        </p>
                        {['firstName', 'lastName', 'email', 'company', 'position'].map((field) => (
                            <fieldset className={styles.Fieldset} key={field}>
                                <Text
                                    className={styles.Label}
                                    htmlFor={field}
                                >
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </Text>
                                <TextField.Root
                                    className={styles.Input}
                                    id={field}
                                    name={field}
                                    value={filters[field as keyof typeof filters]}
                                    onChange={handleInputChange}
                                />
                            </fieldset>
                        ))}
                        <fieldset className={styles.Fieldset}>
                            <Text
                                className={styles.Label}
                                htmlFor="status"
                            >
                                Status
                            </Text>
                            <select
                                className={styles.Select}
                                id="status"
                                name="status"
                                value={filters.status}
                                onChange={(e) => handleStatusChange(e.target.value)}
                            >
                                <option value="">Select Status</option>
                                {['New', 'Contacted', 'Qualified', 'Lost'].map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </fieldset>
                    </div>
                    <Popover.Close className={styles.Close} aria-label="Close">
                        <Cross2Icon />
                    </Popover.Close>
                    <Popover.Arrow className={styles.Arrow} />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default PopoverDemo;
