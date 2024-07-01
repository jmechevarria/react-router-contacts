import { Params, redirect } from 'react-router-dom';
import { deleteContact } from '../../services/Contacts';
import { RouteParams } from '../Root';

export async function action({ params }: { params: Params<RouteParams> }) {
  if (!(await deleteContact(params.contactId!))) {
    throw new Error(`Unable to delete contact with id ${params.contactId!}`);
  }

  return redirect(`/`);
}
