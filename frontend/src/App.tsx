import { Flex, Text, Card } from "@radix-ui/themes";
import ContactTable from "./components/Table/contact.component.table";
import ContactFilter from "./components/Popover/contact.filter";
import ContactDialog from "./components/Dialog/component.dialog.create_contact";
import { useCreateContact, useListContacts, useUpdateContact } from "./hooks/use.contacts";

function App() {
  const { data: contacts, isLoading, error } = useListContacts();
  // const createContact = useCreateContact();
  // const updateContact = useUpdateContact();

  const handleRowClick = () => {
    console.log("Row clicked");
  };

  if (isLoading) return <div>Loading Contacts...</div>;
  if (error) return <div>Error al cargar contactos: {error.message}</div>;

  return (
    <Card 
      className="min-h-screen items-center justify-center"
    >
      <Flex direction="column" align="center" gap="6" p="4" m="9">
        <Text size="8" className="text-gray-800 font-semibold">
          My Contacts
        </Text>

        <Flex direction="row" gap="4" justify="center">
          <ContactFilter />
          <ContactDialog />
        </Flex>

        <ContactTable contacts={contacts} onRowClick={handleRowClick} />
      </Flex>
    </Card>
  );
}

export default App;