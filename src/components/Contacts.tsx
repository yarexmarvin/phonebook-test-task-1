import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  changeContact,
  deleteContact,
  fetchContacts,
  newContact,
} from "../store/slices/contactsSlice";
import { Contact } from "../types/contact";
import AddContactForm from "./AddContactForm";

const Contacts = () => {
  const contacts = useAppSelector((state) => state.contacts);
  const [search, setSearch] = useState<string>('');
  const user = useAppSelector((state) => state.user.user.login);
  const navigate = useNavigate();
  const [modal, setModal] = useState<boolean>(false);

  const [target, setTarget] = useState<Contact>();
  const dispatch = useAppDispatch();

  console.log(contacts);

 
  function removeContact(id: number) {
    dispatch(deleteContact(id));
  }
  function editContact() {
    if (target) {
      dispatch(changeContact(target));
    }
  }
  function editContactProp(prop: keyof Contact, value: string) {
    if (target) {
      setTarget({ ...target, [prop]: value });
    }
  }

  useEffect(() => {
      if(user){
        dispatch(fetchContacts({ user }));
      } else {
          navigate('/login')
      }
  }, []);

  

  return (
    <Container sx={{pb: 3, textAlign: 'center'}}>
      <Typography variant="h2" sx={{ m: 5 }}>
        Contacts
      </Typography>
      <TextField placeholder="find contact"  value={search} onChange={e => setSearch(e.target.value)} />
      {contacts.ids.length &&
        contacts.ids
        .filter(contact => contacts?.entities[contact]?.name.includes(search))
        .map((contactId, _) => {
          return (
            <Card key={contactId} sx={{ m: 2 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
                  Contact {contacts.entities[contactId]?.id}
                </Typography>
                {target?.id === contactId ? (
                  <div>
                    <TextField
                      sx={{ m: 1 }}
                      fullWidth
                      value={target.name}
                      onChange={(e) => editContactProp("name", e.target.value)}
                    />
                    <TextField
                      sx={{ m: 1 }}
                      fullWidth
                      type="tel"
                      value={target.phone}
                      onChange={(e) => editContactProp("phone", e.target.value)}
                    />
                    <TextField
                      sx={{ m: 1 }}
                      fullWidth
                      type="email"
                      value={target.email}
                      onChange={(e) => editContactProp("email", e.target.value)}
                    />
                  </div>
                ) : (
                  <div>
                    <Typography variant="h5" component="div">
                      {contacts.entities[contactId]?.name}
                    </Typography>
                    <Typography variant="body2">
                      {contacts.entities[contactId]?.phone}
                    </Typography>
                    <Typography variant="body2">
                      {contacts.entities[contactId]?.email}
                    </Typography>
                  </div>
                )}
              </CardContent>
              <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                {target?.id === contactId ? (
                  <>
                    <Button
                      sx={{ m: 1 }}
                      variant="outlined"
                      color="success"
                      onClick={() => {
                        editContact();
                        setTarget(undefined);
                      }}
                    >
                      save
                    </Button>
                    <Button
                      sx={{ m: 1 }}
                      color="error"
                      onClick={() => {
                        setTarget(undefined);
                      }}
                    >
                      cancel
                    </Button>{" "}
                  </>
                ) : (
                  <>
                    <Button
                      sx={{ m: 1 }}
                      variant="contained"
                      color="error"
                      onClick={() => removeContact(Number(contactId))}
                    >
                      delete
                    </Button>
                    <Button
                      sx={{ m: 1 }}
                      variant="contained"
                      color="info"
                      onClick={() => setTarget(contacts.entities[contactId])}
                    >
                      edit
                    </Button>
                  </>
                )}
              </CardActions>
            </Card>
          );
        })}
      {modal ? (
        <AddContactForm
          user={user}
          closeModal={() => setModal(false)}
          isOpen={modal}
        />
      ) : (
        <Button
          onClick={() => setModal(true)}
          variant="contained"
          color="warning"
        >
          {" "}
          add contact
        </Button>
      )}
    </Container>
  );
};

export default Contacts;
