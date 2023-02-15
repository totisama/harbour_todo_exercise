'use client';

import { client } from '@/lib/client';
import { gql } from 'graphql-request';
import { MyList } from '@/components/MyLists';

const CREATE_TODO_LIST_MUTATION = gql`
  mutation CreateList($input: CreateTODOListInput!) {
    createTODOList(input: $input) {
      id
      created_at
      name
      email
    }
  }
`;

type CreateListProps = {
  onCreate(list: MyList): void;
};

export const CreateList = ({ onCreate }: CreateListProps) => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const listName = formData.get('listName');
    const email = formData.get('email');

    const res = await client.request(CREATE_TODO_LIST_MUTATION, {
      input: {
        name: listName,
        email,
      },
    });

    onCreate(res.createTODOList);
  };

  return (
    <div className="w-full text-center">
      <h2 className="text-3xl mb-8">Create new List</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="listName"
          name="listName"
          className="input"
          placeholder="List name"
        />
        <input
          type="email"
          id="email"
          name="email"
          className="input"
          placeholder="Email"
        />
        <button type="submit" className="btn btn-primary">
          Create List
        </button>
      </form>
    </div>
  );
};
