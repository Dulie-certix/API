
import { DataTable } from '../src/components/customUi/data-table'
import { columns, type Payment } from './components/customUi/columns'

const data: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '629ed52f',
    amount: 200,
    status: 'success',
    email: 'user@test.com',
  },
];

function App() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default App;
