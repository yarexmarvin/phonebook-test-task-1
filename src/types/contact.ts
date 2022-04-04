

export interface Contact {
    id: number,
    user: string,
    name: string,
    phone: number,
    email: string,
}

export interface fetchContact {
    user: string;
}

export type updateContact = Partial<Contact>