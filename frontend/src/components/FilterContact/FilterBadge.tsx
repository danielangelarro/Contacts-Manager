import { Cross2Icon } from '@radix-ui/react-icons';
import { Button, Flex } from '@radix-ui/themes';
import React from 'react';

interface FilterBadgeProps {
    field: string;
    operator: 'contains' | 'is' | 'greaterThan' | 'lessThan';
    value: string;
    onRemove: () => void;
}

const FilterBadge: React.FC<FilterBadgeProps> = ({ field, operator, value, onRemove }) => {
    return (
        <Flex mb="2" mt="2" align="center" className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
            <span>{`${field} ${operator} ${value}`}</span>
            <Button onClick={onRemove} ml="2" className="bg-blue-400 rounded-lg">
                <Cross2Icon />
            </Button>
        </Flex>
    );
};

export default FilterBadge;