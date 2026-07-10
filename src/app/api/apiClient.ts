import { NextResponse } from 'next/server';
import { FetchPayload } from '@/types/definitions';

export const post = async (endpoint: string, payload: FetchPayload) => {
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

export const patch = async (endpoint: string, payload: FetchPayload) => {
  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return response.json();
};

export async function postServerRequest(
  path: string,
  method: string,
  body?: Record<string, FetchPayload>,
  headersOptions?: { Authorization: string },
) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headersOptions },
    body: body ? JSON.stringify(body) : null,
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    return NextResponse.json(
      { error: data?.message ?? 'Request failed' },
      { status: response.status || 500 },
    );
  }

  return NextResponse.json(data);
}

export async function getServerRequest(
  path: string,
  method: string,
  headersOptions?: { Authorization: string },
) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headersOptions },
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    return NextResponse.json(
      { error: data?.message ?? 'Request failed' },
      { status: response.status || 500 },
    );
  }

  return NextResponse.json(data);
}
