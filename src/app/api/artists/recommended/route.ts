import recommended from '../../../../mocks/fixtures/responses/recommended.json';

export async function GET(): Promise<Response> {
  return Response.json(recommended);
}
