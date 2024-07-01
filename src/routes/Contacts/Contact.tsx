import {
  Form,
  Link,
  Params,
  useFetcher,
  useLoaderData,
} from 'react-router-dom';
import { getContact, updateContact } from '../../services/Contacts';
import { RouteParams } from '../Root';

export type Contact = {
  id: string;
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
  createdAt: Date;
};

export async function loader({ params }: { params: Params<RouteParams> }) {
  const contact = await getContact(params.contactId!);
  return { contact };
}

export async function action({
  request,
  params,
}: {
  request: Request;
  params: Params<RouteParams>;
}) {
  const formData = await request.formData();
  return updateContact(params.contactId!, {
    favorite: formData.get('favorite') === 'true',
  });
}

export default function Contact() {
  const { contact } = useLoaderData() as { contact: Contact };

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={
            contact.avatar ||
            `https://robohash.org/${contact.id}.png?size=200x200`
          }
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
              rel="noreferrer"
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Link to={'edit'}>Edit</Link>

          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this record.')) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }: { contact: Contact }) {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get('favorite') === 'true'
    : contact.favorite;

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
}
