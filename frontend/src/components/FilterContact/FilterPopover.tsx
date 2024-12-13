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
                    <MixerHorizontalIcon /> Filters
                </Button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className="bg-white p-4 rounded-lg shadow-md lg:w-64 space-y-4 relative">
                    <h2 className="text-xl font-semibold text-gray-900">Filters</h2>

                    <div className="flex flex-col space-y-3">
                        <select
                            value={selectedField}
                            onChange={(e) => setSelectedField(e.target.value)}
                            className="border border-gray-300 bg-gray-50 text-gray-900 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-200 ease-in-out"
                        >
                            <option value="">Select Field</option>
                            {fields.map((field) => (
                                <option key={field} value={field}>{field}</option>
                            ))}
                        </select>

                        <select
                            value={selectedOperator}
                            onChange={(e) => setSelectedOperator(e.target.value as 'contains' | 'is' | 'greaterThan' | 'lessThan')}
                            className="border border-gray-300 bg-gray-50 text-gray-900 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-200 ease-in-out"
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
                            className="border border-gray-300 bg-gray-50 text-gray-900 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-200 ease-in-out"
                        />

                        <Button
                            onClick={addFilter}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg focus:outline-none transition-colors duration-200 ease-in-out"
                        >
                            Add Filter
                        </Button>
                    </div>

                    <Popover.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer">
                        ✖
                    </Popover.Close>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default ContactFilter;