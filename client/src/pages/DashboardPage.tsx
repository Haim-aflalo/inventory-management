import ItemsTable from '../components/ItemsTable';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { InventoryProvider } from '../contexts/InventoryContext';


const DashboardPage = () => {
  return (
    <InventoryProvider>
      <div className="dashboard-page">
        <Navbar />
        <div className="dashboard-content">
          <Sidebar />
          <ItemsTable />
        </div>
      </div>
    </InventoryProvider>
  );
};

export default DashboardPage;

