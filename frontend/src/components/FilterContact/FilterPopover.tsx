import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { contactSchema } from '../../schemas/contactSchemas';
import { Button } from '@radix-ui/themes';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';

export interface Filter {
    field: string;
    operator: 'contains' | 'is' | 'greaterThan' | 'lessThan';
    value: string;
}

const fields = Object.keys(contactSchema.shape); // Obtener campos del esquema
const operators = ['contains', 'is', 'greaterThan', 'lessThan'];

const ContactFilter: React.FC<{ onFilterChange: (filters: Filter[]) => void }> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState<Filter[]>([]);
    const [selectedField, setSelectedField] = useState<string>('');
    const [selectedOperator, setSelectedOperator] = useState<'contains' | 'is' | 'greaterThan' | 'lessThan'>('contains');
    const [filterValue, setFilterValue] = useState<string>('');

    const addFilter = () => {
        if (selectedField && filterValue) {
            const newFilter = { field: selectedField, operator: selectedOperator, value: filterValue };
            const updatedFilters = [...filters, newFilter];
            setFilters(updatedFilters);
            onFilterChange(updatedFilters);
            setFilterValue('');
        }
    };

    return (
        <Popover.Root>
            <Popover.Trigger>
                <Button className='button'>
                    <MixerHorizontalIcon/> Filters
                </Button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className="bg-white p-4 rounded shadow lg:w-64">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <div className="flex flex-col space-y-2 mb-4">
                        <select
                            value={selectedField}
                            onChange={(e) => setSelectedField(e.target.value)}
                            className="border p-2 rounded"
                        >
                            <option value="">Select Field</option>
                            {fields.map((field) => (
                                <option key={field} value={field}>{field}</option>
                            ))}
                        </select>
                        <select
                            value={selectedOperator}
                            onChange={(e) => setSelectedOperator(e.target.value as 'contains' | 'is' | 'greaterThan' | 'lessThan')}
                            className="border p-2 rounded"
                        >
                            {operators.map((operator) => (
                                <option key={operator} value={operator}>{operator}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                            placeholder="Filter value"
                            className="border p-2 rounded"
                        />
                        <Button onClick={addFilter} className="button">Add Filter</Button>
                    </div>
                    
                    <Popover.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">✖</Popover.Close>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default ContactFilter;