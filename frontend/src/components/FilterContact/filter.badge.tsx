import React from 'react';

interface FilterBadgeProps {
    field: string;
    operator: 'contains' | 'is' | 'greaterThan' | 'lessThan';
    value: string;
    onRemove: () => void;
}

const FilterBadge: React.FC<FilterBadgeProps> = ({ field, operator, value, onRemove }) => {
    return (
        <div className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
            <span>{`${field} ${operator} ${value}`}</span>
            <button onClick={onRemove} className="ml-2 text-blue-600 hover:text-blue-800">
                &times;
            </button>
        </div>
    );
};

export default FilterBadge;