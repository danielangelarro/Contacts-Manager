import React from 'react';
import FilterBadge from './filter.badge';

interface Filter {
    field: string;
    operator: 'contains' | 'is' | 'greaterThan' | 'lessThan';
    value: string;
}

interface FilterListProps {
    filters: Filter[];
    onRemoveFilter: (index: number) => void;
}

const FilterList: React.FC<FilterListProps> = ({ filters, onRemoveFilter }) => {
    return (
        <div className="flex flex-wrap mb-4">
            {filters.map((filter, index) => (
                <FilterBadge
                    key={index}
                    field={filter.field}
                    operator={filter.operator}
                    value={filter.value}
                    onRemove={() => onRemoveFilter(index)}
                />
            ))}
        </div>
    );
};

export default FilterList;