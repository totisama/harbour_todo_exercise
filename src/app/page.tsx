import { MyList, MyLists } from '@/components/MyLists';
import { gql } from 'graphql-request';
import { client } from '@/lib/client';

const GET_TODO_LISTS_QUERY = gql`
  query GetTODOLists($email: String!) {
    getTODOLists(email: $email) {
      id
      created_at
      name
    }
  }
`;

export default async function Home() {
  const { getTODOLists } = await client.request(GET_TODO_LISTS_QUERY, {
    // TODO use you own email here
    email: 'snaer@aranja.com',
  });

  return (
    <div className="p-8 flex items-center flex-col">
      <div className="w-full max-w-[500px]">
        <MyLists list={(getTODOLists as MyList[]) ?? []} />
      </div>
    </div>
  );
}
