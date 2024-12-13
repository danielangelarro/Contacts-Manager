import { Flex, Container, Box, Heading, Section } from "@radix-ui/themes";
import ContactTable from "./components/TableContact/TableContact";
import ContactFilter, { Filter } from "./components/FilterContact/FilterPopover";
import CreateContactDialog from "./components/CreateContact/CreateContact";
import EditContactDialog from "./components/UpdateContact/EditContact";
import { useListContacts } from "./hooks/useContacts";
import { EditableContact } from "./entities/Contact";
import { useState } from "react";
import FilterList from "./components/FilterContact/FilterList";
import Message from "./components/Message/Message";
import LoadingPage from "./pages/LoadingPage";
import ErrorPage from "./pages/ErrorPage";
import ToastAlert from "./components/Alert/Alert";


function App() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'error' | 'success' | 'info'; text: string } | null>(null);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedContact, setSelectedContact] = useState<EditableContact | null>(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const { data: contacts, isLoading, error } = useListContacts();

  const handleErrorClose = () => {
    setErrorMessage(null);
  };

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

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  return (
    <Container align="center" className="min-h-screen w-full" display="initial" p="4">
      {errorMessage && (
        <ToastAlert message={errorMessage} onClose={handleErrorClose} />
      )}

      <Box className="navbar">
        <Heading size="1" className="app-name">
          My Contacts
        </Heading>
      </Box>

      <Section />

      <Flex gap="3">
        <CreateContactDialog setErrorMessage={ setErrorMessage }/>
        <EditContactDialog
          contact={selectedContact}
          isOpen={isEditDialogOpen}
          setErrorMessage={setErrorMessage}
          onClose={closeEditDialog}
        />
        <ContactFilter onFilterChange={handleFilterChange} />
      </Flex>

      <Box ml="2" mb="2">
        <FilterList filters={filters} onRemoveFilter={removeFilter} />
      </Box>

      <Box>
        {message && <Message type={message.type} message={message.text} />}

        <ContactTable contacts={contacts} filters={filters} onEdit={openEditDialog} />
      </Box>
    </Container>
  );
}

export default App;