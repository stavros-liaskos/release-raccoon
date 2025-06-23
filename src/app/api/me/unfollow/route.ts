import { NextResponse } from 'next/server';

// TODO implement dynamic path matcher
export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json('ok');
}
