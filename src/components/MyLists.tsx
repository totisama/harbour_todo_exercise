'use client';

import Link from 'next/link';
import classNames from 'classnames';
import { CreateList } from '@/components/CreateList';
import { randomColor } from '@/utils/randomColor';
import { useState } from 'react';

export type MyList = {
  id: string;
  created_at: string;
  name: string;
  email: string;
};

type MyListsProps = {
  list: MyList[];
};

export const MyLists = ({ list = [] }: MyListsProps) => {
  const [todoLists, setTodoLists] = useState<MyList[]>(list);

  const onCreateHandler = (newTodoList: MyList) => {
    setTodoLists((prev) => [...prev, newTodoList]);
  };

  const onDeletedHandler = (id: string) => {
    // TODO: delete list
    // Update state
  };

  return (
    <div className="flex flex-col gap-8 text-center">
      <h1 className="text-4xl">My TODO lists</h1>
      <ul>
        {todoLists.map((item) => (
          <li key={item.id}>
            <Link
              href={item.id.toString()}
              className={classNames(
                'py-2 pl-4 pr-2 bg-gray-900 rounded-lg mb-4 flex justify-between items-center min-h-16 text-black hover:scale-[1.02] transform transition duration-300 ease-in-out',
                randomColor(),
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <CreateList onCreate={onCreateHandler} />
    </div>
  );
};
