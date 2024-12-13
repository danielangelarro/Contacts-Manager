import { Table } from '@radix-ui/themes';
import { Contact } from '../../entities/contact.entity';
import React from 'react';


interface ContactTableProps {
  contacts: Contact[];
  onRowClick?: (contact: Contact) => void;
}


export const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  onRowClick
}) => {
  const columns = [
    { key: 'firstName', header: 'First Name' },
    { key: 'lastName', header: 'Last Name' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'company', header: 'Company' },
    { key: 'position', header: 'Position' },
    { key: 'status', header: 'Status' }
  ];

  const statusColors = {
    'New': 'bg-blue-100 text-blue-800',
    'Contacted': 'bg-yellow-100 text-yellow-800',
    'Qualified': 'bg-green-100 text-green-800',
    'Lost': 'bg-red-100 text-red-800'
  };

  return (
    <Table.Root className="w-full border-collapse">
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
        {contacts.map((contact) => (
          <Table.Row
            key={contact.id}
            className="hover:bg-gray-50 border-b cursor-pointer"
            onClick={() => onRowClick && onRowClick(contact)}
          >
            {columns.map((column) => (
              <Table.Cell
                key={column.key}
                className="p-2"
              >
                <span className={`px-2 py-1 rounded-full text-xs ${statusColors[contact.status]}`}>
                  {contact.status}
                </span>
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default ContactTable;