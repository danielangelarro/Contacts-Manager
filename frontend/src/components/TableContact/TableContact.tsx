import { Button, Table } from '@radix-ui/themes';
import { Contact, EditableContact } from '../../entities/Contact';
import React from 'react';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Filter } from '../FilterContact/FilterPopover';


interface ContactTableProps {
  contacts: Contact[];
  filters: Filter[];
  onEdit: (contact: EditableContact) => void;
}


export const ContactTable: React.FC<ContactTableProps> = ({ contacts, filters, onEdit }) => {
  const columns = [
    { key: 'firstName', header: 'First Name' },
    { key: 'lastName', header: 'Last Name' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'company', header: 'Company' },
    { key: 'position', header: 'Position' },
    { key: 'status', header: 'Status' },
    { key: 'action', header: 'Action' },
  ];

  const statusColors = {
    'New': 'bg-blue-100 text-blue-800',
    'Contacted': 'bg-yellow-100 text-yellow-800',
    'Qualified': 'bg-green-100 text-green-800',
    'Lost': 'bg-red-100 text-red-800'
  };

  const filteredContacts = contacts.filter(contact => {
    return filters.every(filter => {
      const contactValue = contact[filter.field as keyof Contact]?.toString().toLowerCase();

      if (contactValue === undefined) 
        return false;

      switch (filter.operator) {
        case 'contains':
          return contactValue.includes(filter.value.toLowerCase());
        case 'is':
          return contactValue === filter.value.toLowerCase();
        case 'greaterThan':
          return parseFloat(contactValue) > parseFloat(filter.value);
        case 'lessThan':
          return parseFloat(contactValue) < parseFloat(filter.value);
        default:
          return true;
      }
    });
  });

  return (
    <Table.Root className="border-collapse glass">
      <Table.Header className="bg-gray-100">
        <Table.Row className="border-b">
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.key}
              className="text-left p-2 font-semibold"
            >
              {column.header}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {filteredContacts.map((contact) => (
          <Table.Row
            key={contact.id}
            className="hover:bg-gray-50 border-b cursor-pointer"
          >
            <Table.Cell className="p-2">{contact.firstName}</Table.Cell>
            <Table.Cell className="p-2">{contact.lastName}</Table.Cell>
            <Table.Cell className="p-2">{contact.email}</Table.Cell>
            <Table.Cell className="p-2">{contact.phone}</Table.Cell>
            <Table.Cell className="p-2">{contact.company}</Table.Cell>
            <Table.Cell className="p-2">{contact.position}</Table.Cell>

            <Table.Cell className="p-2" align='center'>
              <span className={`px-2 py-1 rounded-full text-xs ${statusColors[contact.status]}`}>
                {contact.status}
              </span>
            </Table.Cell>

            <Table.Cell className="text-blue-500 hover:underline" align='center'>
              <Button className='button' onClick={() => onEdit(contact as EditableContact)}>
                <Pencil2Icon /> Edit
              </Button>
            </Table.Cell>

          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default ContactTable;