'use client';

import { useState } from 'react';
import { Heart } from '@/components/icons/Heart';
import { Close } from '@/components/icons/Close';
import { AddTodo } from '@/components/AddTodo';
import { gql } from 'graphql-request';
import { client } from '@/lib/client';

export type Todo = {
  id: number;
  desc: string;
  finished: boolean;
};

type TodosProps = {
  listId: number;
  list: Todo[];
};

const CREATE_TODO = gql`
  mutation Mutation($listId: Int!, $desc: String!) {
    addTODO(listId: $listId, desc: $desc) {
      id
      desc
      finished
    }
  }
`;

const DELETE_TODO = gql`
  mutation Mutation($removeTodoId: Int!, $listId: Int!) {
    removeTODO(id: $removeTodoId, listId: $listId)
  }
`;

const MARK_TODO_AS_FINISHED = gql`
  mutation Mutation($finishTodoId: Int!, $finishTodoListId2: Int!) {
    finishTODO(id: $finishTodoId, listId: $finishTodoListId2) {
      desc
      finished
      id
    }
  }
`;

export const Todos = ({ list = [], listId }: TodosProps) => {
  const [todos, setTodos] = useState<Todo[]>(list);

  const onAddHandler = async (desc: string) => {
    const { addTODO } = await client.request<{ addTODO: Todo }>(CREATE_TODO, {
      listId: listId,
      desc: desc,
    });

    setTodos((prevState) => [...prevState, addTODO]);
  };

  const onRemoveHandler = async (id: number) => {
    const { removeTODO } = await client.request<{ removeTODO: boolean }>(
      DELETE_TODO,
      {
        listId: listId,
        removeTodoId: id,
      },
    );

    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
  };

  const onFinishHandler = async (id: number) => {
    const { finishTODO } = await client.request<{ finishTODO: Todo }>(
      MARK_TODO_AS_FINISHED,
      {
        finishTodoId: id,
        finishTodoListId2: listId,
      },
    );

    const todosList = todos.filter((todo) => todo.id !== id);
    todosList.push(finishTODO);

    setTodos(todosList);
  };

  return (
    <div>
      <h2 className="text-center text-5xl mb-10">My TODO list</h2>
      <ul>
        {todos.map((item) => (
          <li
            key={item.id}
            className="py-2 pl-4 pr-2 bg-gray-900 rounded-lg mb-4 flex justify-between items-center min-h-16"
          >
            <p className={item.finished ? 'line-through' : ''}>{item.desc}</p>
            {!item.finished && (
              <div className="flex gap-2">
                <button
                  className="btn btn-square btn-accent"
                  onClick={() => onFinishHandler(item.id)}
                >
                  <Heart />
                </button>
                <button
                  className="btn btn-square btn-error"
                  onClick={() => onRemoveHandler(item.id)}
                >
                  <Close />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <AddTodo onAdd={onAddHandler} />
    </div>
  );
};
