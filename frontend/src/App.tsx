import { Flex, Text, Card, Grid, Container, Section, Box, Heading } from "@radix-ui/themes";
import ContactTable from "./components/TableContact/contact.component.table";
import ContactFilter, { Filter } from "./components/FilterContact/filter.popover";
import ContactDialog from "./components/CreateContact/component.dialog.create_contact";
import EditContactDialog from "./components/UpdateContact/contact.edit.dialog";
import { useCreateContact, useListContacts, useUpdateContact } from "./hooks/use.contacts";
import { Contact, EditableContact } from "./entities/contact.entity";
import { useState } from "react";
import FilterList from "./components/FilterContact/filter.list";
import { PersonIcon } from "@radix-ui/react-icons";

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
    <Container align="center" className="min-h-screen w-full" display="initial" p="4">
      <Box>
        <Heading size="1" className="text-center text-2xl md:text-3xl" mb="4">
          My Contacts
        </Heading>
      </Box>

      <Flex gap="3">
        <ContactDialog handleCreateContact={handleCreateContact} />
        <EditContactDialog
          contact={selectedContact}
          handleUpdateContact={handleUpdateContact}
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
        />
        <ContactFilter onFilterChange={handleFilterChange} />
      </Flex>

      <Box ml="2" mb="2">
        <FilterList filters={filters} onRemoveFilter={removeFilter} />
      </Box>

      <Box>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text className="error">Error loading contacts</Text>
        ) : (
          <ContactTable contacts={contacts} filters={filters} onEdit={openEditDialog} />
        )}
      </Box>
    </Container>
  );
}

export default App;