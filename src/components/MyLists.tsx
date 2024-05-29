'use client';

import Link from 'next/link';
import classNames from 'classnames';
import { CreateList } from '@/components/CreateList';
import { randomColor } from '@/utils/randomColor';
import { useState } from 'react';
import { gql } from 'graphql-request';
import { client } from '@/lib/client';
import { Trashcan } from './icons/Trashcan';

export type TodoList = {
  id: number;
  created_at: string;
  name: string;
  email: string;
};

type MyListsProps = {
  list: TodoList[];
};

const REMOVE_TODO_LIST = gql`
  mutation Mutation($deleteTodoListId: Int!) {
    deleteTODOList(id: $deleteTodoListId)
  }
`;

export const MyLists = ({ list = [] }: MyListsProps) => {
  const [todoLists, setTodoLists] = useState<TodoList[]>(list);

  const onCreateHandler = (newTodoList: TodoList) => {
    setTodoLists([...todoLists, newTodoList]);
  };

  const onDeletedHandler = async (id: number) => {
    // TODO: delete list with query
    // Update state with new list
    const { deleteTODOList } = await client.request<{ deleteTODOList: boolean }>(REMOVE_TODO_LIST, {
      deleteTodoListId: id,
    });

    const newTodoLists = todoLists.filter(list => list.id !== id)

    setTodoLists(newTodoLists)
  };

  return (
    <div className="flex flex-col gap-8 text-center">
      <h1 className="text-4xl">{todoLists.length > 0 ? 'My TODO lists' : 'No lists yet!'}</h1>
      <ul>
        {todoLists.map((item) => (
          <li className='mb-4 flex gap-2' key={item.id}>
            <Link
              href={item.id.toString()}
              className={classNames(
                'py-2 pl-4 pr-2 bg-gray-900 w-full rounded-lg flex justify-between items-center min-h-16 text-black hover:scale-[1.02] transform transition duration-300 ease-in-out',
                randomColor(),
              )}
            >
              {item.name}
            </Link>
            <button
              onClick={() => { onDeletedHandler(item.id) }}
              className='rounded-lg flex justify-center items-center min-h-16 hover:scale-110 transform transition duration-300 ease-in-out'
            >
              <Trashcan className={'h-10 w-10 hover:fill-current hover:text-red-600'} />
            </button>
          </li>
        ))}
      </ul>
      <CreateList onCreate={onCreateHandler} />
    </div>
  );
};
