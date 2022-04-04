import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";
import { Contact, fetchContact, updateContact } from "../../types/contact";



export const fetchContacts = createAsyncThunk('contacts/fetch', async (props: fetchContact) => {

    try {
        const response = await axios.get<Contact[], any>(`http://localhost:3001/contacts/?user=${props.user}`);
        return response.data
    } catch (e) {
        console.log(e)
    }

})

export const changeContact = createAsyncThunk('contact/patch', async (props: updateContact) => {
    let response = await axios({
        method: 'patch',
        url: `http://localhost:3001/contacts/${props.id}`,
        data: props
})        

return response.data

})

export const deleteContact = createAsyncThunk('contact/delete', async (id: number)=>{
    let response = await axios({
        method: 'delete',
        url: `http://localhost:3001/contacts/${id}`,
    })

    return response.data
})

export const newContact = createAsyncThunk('contact/new', async(contact: Contact)=>{
    let response = await axios({
        method: 'post',
        url: `http://localhost:3001/contacts/`,
        data: contact
    })

    return response.data
})

const contactsAdapter = createEntityAdapter<Contact>({
    selectId: contact => contact.id
});

const initialState = contactsAdapter.getInitialState({})


const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
                contactsAdapter.addMany(state, action.payload);
            })
            .addCase(changeContact.fulfilled, (state, action:PayloadAction<Contact>)=>{
                contactsAdapter.upsertOne(state, action.payload);
            })
            .addCase(deleteContact.fulfilled, (state, action)=>{
                contactsAdapter.removeOne(state, action.meta.arg )
            })
            .addCase(newContact.fulfilled, (state, action:PayloadAction<Contact>)=>{
                contactsAdapter.addOne(state, action.payload )
            })
    }

})


export default contactsSlice