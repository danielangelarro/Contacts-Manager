import { Table } from '@radix-ui/themes';
import { Contact } from '../../entities/contact.entity';
import React from 'react';
import { Pencil2Icon } from '@radix-ui/react-icons';


interface ContactTableProps {
  contacts: Contact[];
  onRowClick?: (contact: Contact) => void;
}


export const ContactTable: React.FC<ContactTableProps> = ({ contacts, onRowClick }) => {
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
            <Table.Cell
              key={`row-${contact.id}-firstName`}
              className="p-2"
            >
              {contact.firstName}
            </Table.Cell>

            <Table.Cell
              key={`row-${contact.id}-lastName`}
              className="p-2"
            >
              {contact.lastName}
            </Table.Cell>

            <Table.Cell
              key={`row-${contact.id}-email`}
              className="p-2"
            >
              {contact.email}
            </Table.Cell>

            <Table.Cell
              key={`row-${contact.id}-phone`}
              className="p-2"
            >
              {contact.phone}
            </Table.Cell>

            <Table.Cell
              key={`row-${contact.id}-company`}
              className="p-2"
            >
              {contact.company}
            </Table.Cell>

            <Table.Cell
              key={`row-${contact.id}-position`}
              className="p-2"
            >
              {contact.position}
            </Table.Cell>

            <Table.Cell
              key={`row-${contact.id}-status`}
              className="p-2"
              align='center'
            >
              <span className={`px-2 py-1 rounded-full text-xs ${statusColors[contact.status]}`}>
                {contact.status}
              </span>
            </Table.Cell>
            
            <Table.Cell
              key={`row-${contact.id}-position`}
              className="p-2"
              align='center'
            >
              <Pencil2Icon className="w-4 h-4 text-green-500" />
            </Table.Cell>

          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default ContactTable;