import { Suspense } from 'react';
import { api } from '@/lib/api';

async function Data() {
  const data = await api('/products/');
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default function TestPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Data />
    </Suspense>
  );
}