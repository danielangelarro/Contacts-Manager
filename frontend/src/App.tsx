import { Flex, Container, Box, Heading } from "@radix-ui/themes";
import ContactTable from "./components/TableContact/TableContact";
import ContactFilter, { Filter } from "./components/FilterContact/FilterPopover";
import ContactDialog from "./components/CreateContact/CreateContact";
import EditContactDialog from "./components/UpdateContact/EditContact";
import { useListContacts } from "./hooks/useContacts";
import { EditableContact } from "./entities/Contact";
import { useState } from "react";
import FilterList from "./components/FilterContact/FilterList";
import Message from "./components/Message/Message";


function App() {
  const [message, setMessage] = useState<{ type: 'error' | 'success' | 'info'; text: string } | null>(null);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedContact, setSelectedContact] = useState<EditableContact | null>(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const { data: contacts, isLoading, error } = useListContacts();
  
  const handleFilterChange = (newFilters: Filter[]) => {
    setFilters(newFilters);
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
        <ContactDialog />
        <EditContactDialog
          contact={selectedContact}
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
        />
        <ContactFilter onFilterChange={handleFilterChange} />
      </Flex>

      <Box ml="2" mb="2">
        <FilterList filters={filters} onRemoveFilter={removeFilter} />
      </Box>

      <Box>
        {message && <Message type={message.type} message={message.text} />}

        {isLoading ? (
          <Message type="info" message="Loading contacts..." />
        ) : error ? (
          <Message type="error" message={`Error loading contacts: ${error}`} />
        ) : (
          <ContactTable contacts={contacts} filters={filters} onEdit={openEditDialog} />
        )}
      </Box>
    </Container>
  );
}

export default App;