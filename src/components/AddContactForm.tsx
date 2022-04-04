import { Button, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { newContact } from "../store/slices/contactsSlice";
import { Contact } from "../types/contact";
import * as Yup from "yup";
import { Box } from "@mui/system";

type ModalFormType = {
  user: string;
  closeModal: () => void;
  isOpen: boolean;
};

const AddContactForm = ({ user, closeModal, isOpen }: ModalFormType) => {
  const dispatch = useAppDispatch();

  const initialValues: Contact = {
    id: Math.floor(Math.random() * 100),
    user,
    name: "",
    phone: +7,
    email: "",
  };

  const validationSchema = Yup.object().shape({
    id: Yup.number(),
    user: Yup.string().required(),
    name: Yup.string().min(2).required(),
    phone: Yup.string()
      .matches(
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
        { message: "Please enter valid number.", excludeEmptyString: false }
      )
      .min(9)
      .required(),
    email: Yup.string().email().required(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(newContact(values));
      closeModal();
    },
  });

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 3,
      }}
    >
      <Box sx={{ background: "white", padding: 3, borderRadius: 5 }}>
        <Typography variant="h4">Add a new contact</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            sx={{ mt: 2, mb: 2, width: "100%" }}
            type="text"
            id="name"
            name="name"
            label="name"
            placeholder="enter name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            sx={{ mt: 2, mb: 2, width: "100%" }}
            type="text"
            id="phone"
            name="phone"
            label="phone"
            placeholder="enter phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <TextField
            sx={{ mt: 2, mb: 2, width: "100%" }}
            type="email"
            id="email"
            name="email"
            label="email"
            placeholder="enter email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Button sx={{mb: 2}} variant="outlined" color="success"  fullWidth type="submit">
            create contact
          </Button>
          <Button variant="outlined" color="error" fullWidth onClick={closeModal}>
            cancel
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddContactForm;
