import { Todo, Todos } from '@/components/Todos';
import { gql } from 'graphql-request';
import { client } from '@/lib/client';

type MyListPageMetadata = {
  params: { listId: string };
}

export async function generateMetadata({ params }: MyListPageMetadata) {
  return {
    title: `TODO List ${params.listId}`,
  };
}

type MyListPageProps = MyListPageMetadata;

const GET_TODOs = gql`
  query GetTODOLists($listId: Int!) {
    getTODOs(listId: $listId) {
      desc
      finished
      id
      created_at
    }
  }
`;


export default async function MyListPage({ params: { listId } }: MyListPageProps) {
  const id = parseInt(listId)
  // TODO fetch list from server
  const { getTODOs } = await client.request<{ getTODOs: Todo[] }>(GET_TODOs, {
    listId: id,
  });


  return (
    <div className="flex align-center justify-center p-16 sm:p-8">
      <Todos
        listId={id}
        // TODO swap with real data from query and
        // make sure to make the query from the server
        list={getTODOs}
      />
    </div>
  );
}
