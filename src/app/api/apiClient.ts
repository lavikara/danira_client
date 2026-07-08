import { NextResponse } from 'next/server';

export const post = async (endpoint: string, payload: unknown) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return response.json();
};

export const get = async (endpoint: string) => {
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
};

export const patch = async (endpoint: string, payload: unknown) => {
  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return response.json();
};

export async function forwardServerRequest(
  path: string,
  method: string,
  body?: Record<string, unknown>,
) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => null);
  console.log(data);
  if (!response.ok) {
    return NextResponse.json(
      { error: data?.message ?? 'Request failed' },
      { status: response.status || 500 },
    );
  }

  return NextResponse.json(data);
}
