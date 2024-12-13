import { Flex, Text, Card, Grid } from "@radix-ui/themes";
import ContactTable from "./components/TableContact/contact.component.table";
import ContactFilter, { Filter } from "./components/FilterContact/filter.popover";
import ContactDialog from "./components/CreateContact/component.dialog.create_contact";
import EditContactDialog from "./components/UpdateContact/contact.edit.dialog";
import { useCreateContact, useListContacts, useUpdateContact } from "./hooks/use.contacts";
import { Contact, EditableContact } from "./entities/contact.entity";
import { useState } from "react";
import FilterList from "./components/FilterContact/filter.list";

function App() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedContact, setSelectedContact] = useState<EditableContact | null>(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const { data: contacts, isLoading, error } = useListContacts();
  const createContact = useCreateContact();
  const updateContact = useUpdateContact();

  const handleFilterChange = (newFilters: Filter[]) => {
    setFilters(newFilters);
  };

  const handleUpdateContact = (updatedContact: EditableContact) => {
    updateContact.mutate(updatedContact);
  };

  const openEditDialog = (contact: EditableContact) => {
    setSelectedContact(contact);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedContact(null);
  };

  const removeFilter = (index: number) => {
    const updatedFilters = filters.filter((_, i) => i !== index);
    setFilters(updatedFilters);
  };

  const handleCreateContact = (contact: Contact) => {
    const response = createContact.mutate(contact);
    console.log(response);
  }

  if (isLoading) return <div>Loading Contacts...</div>;
  if (error) return <div>Error al cargar contactos: {error.message}</div>;

  return (
    <Flex direction="column" align="center" className="min-h-screen" p="4">
      <Text size="8" className="text-center text-2xl md:text-3xl" mb="4">Contact List</Text>
      <div className="glass w-full">
        <ContactDialog handleCreateContact={handleCreateContact} />
        <EditContactDialog
          contact={selectedContact}
          handleUpdateContact={handleUpdateContact}
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
        />

        <ContactFilter onFilterChange={handleFilterChange} />

        <FilterList filters={filters} onRemoveFilter={removeFilter} />

        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text className="error">Error loading contacts</Text>
        ) : (
          <ContactTable contacts={contacts} filters={filters} onEdit={openEditDialog} />
        )}
      </div>
    </Flex>
  );
}

export default App;