import localforage from 'localforage';
import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';
import { Contact } from '../routes/Contacts/Contact';

export async function getContacts(query?: string) {
  await fakeNetwork(`getContacts:${query}`);
  let contacts = await localforage.getItem<Contact[]>('contacts');
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ['first', 'last', 'id'] });
  }

  return contacts.sort(sortBy('last', 'createdAt'));
}

export async function createContact() {
  await fakeNetwork();
  const id = Math.random().toString(36).substring(2, 9);
  const contact = {
    id,
    createdAt: new Date(),
    avatar: 'https://robohash.org/you.png?size=200x200',
    favorite: false,
    first: 'first',
    last: 'last',
    notes: 'notes',
    twitter: 'twitter',
  };
  const contacts = await getContacts();
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}

export async function getContact(id: string) {
  await fakeNetwork(`contact:${id}`);
  const contacts = await localforage.getItem<Contact[]>('contacts');
  const contact = contacts?.find((contact) => contact.id === id);
  return contact ?? null;
}

export async function updateContact(id: string, updates: Partial<Contact>) {
  await fakeNetwork();
  const contacts = await localforage.getItem<Contact[]>('contacts');
  const contact = contacts?.find((contact) => contact.id === id);
  if (!contact) throw new Error(`No contact found for ${id}`);
  Object.assign(contact, updates);
  await set(contacts || []);

  return contact;
}

export async function deleteContact(id: string) {
  const contacts = await localforage.getItem<Contact[]>('contacts');
  const index = contacts?.findIndex((contact) => contact.id === id) ?? -1;
  if (index > -1) {
    contacts?.splice(index, 1);
    await set(contacts || []);
    return true;
  }

  return false;
}

function set(contacts: Contact[]) {
  return localforage.setItem('contacts', contacts);
}

// fake a cache so we don't slow down stuff we've already seen
const fakeCache: Record<string, boolean> = {};

async function fakeNetwork(key?: string) {
  if (key && fakeCache[key]) {
    return;
  } else {
    if (key) fakeCache[key] = true;

    return new Promise((res) => {
      setTimeout(res, Math.random() * 800);
    });
  }
}
