const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = process.env.NEXT_PUBLIC_BUSINESS_TOKEN;

export async function api(path, options = {}) {
  const res = await fetch(BASE_URL + path, {
    ...options,
    headers: {
      Authorization: TOKEN,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  if (!res.ok) throw new Error('API error ' + res.status);
  return res.json();
}