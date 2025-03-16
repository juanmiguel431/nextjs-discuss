'use server';
import { redirect} from 'next/navigation';
import path from '@/path';

export async function search(formData: FormData) {
  const term = formData.get('term') ?? '';

  if (typeof term !== 'string' || !term) {
    redirect(path.home());
  }

  redirect(path.search(term));
}
