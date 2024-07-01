import {
  Form,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import { getContacts, createContact } from '../services/Contacts';
import { Contact } from './Contacts/Contact';
import { useEffect } from 'react';

export type RouteParams = 'contactId';

export async function loader({ request }: { request: Request }) {
  const query = new URL(request.url).searchParams.get('q') || '';
  const contacts = await getContacts(query);

  return { contacts, query };
}

export async function action() {
  const contact = await createContact();

  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts, query } = useLoaderData() as {
    contacts: Contact[];
    query: string;
  };
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  useEffect(() => {
    (document.getElementById('q') as HTMLInputElement).value = query;
  }, [query]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={query}
              onChange={(event) => {
                const isFirstSearch = query == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
              className={searching ? 'loading' : ''}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact: Contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? 'active' : isPending ? 'pending' : ''
                    }
                    title={contact.notes}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.id} {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        {navigation.state === 'loading' ? 'loading' : <Outlet />}
      </div>
    </>
  );
}
