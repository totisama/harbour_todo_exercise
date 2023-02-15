'use client';
import { Todos } from '@/components/Todos';

type MyListPageProps = {
  params: { listId: string };
};

export default function MyListPage({ params: { listId } }: MyListPageProps) {
  return (
    <div className="flex align-center justify-center p-16 sm:p-8">
      <Todos
        listId={parseInt(listId)}
        // TODO swap with real data from query
        list={[
          { id: 1, desc: 'Study hard', finished: true },
          {
            id: 2,
            desc: 'Clean house',
            finished: false,
          },
          {
            id: 3,
            desc: 'Clean house',
            finished: false,
          },
        ]}
      />
    </div>
  );
}
