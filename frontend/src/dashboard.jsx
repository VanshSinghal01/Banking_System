// Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './dashboard.css';
import logo from './vlogo1.png';
import '@fortawesome/fontawesome-free/css/all.css';

const Dashboard = () => {
  const [accountData, setAccountData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const userData = location.state;
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://bankbackend-mp91.onrender.com/');
        const data = await response.json();
        setAccountData(data);
        const userAccounts = data.filter(acc => acc.Email.toLowerCase() === userData?.email?.toLowerCase());
        setFilteredData(userAccounts);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [userData]);

  const handleFilter = (e) => {
    const type = e.target.value;
    const result = type === 'All' ? accountData : accountData.filter(acc => acc.AccType === type);
    setFilteredData(result);
    setSidebarOpen(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = accountData.filter(
      acc =>
        acc.ACcountNO.toLowerCase().includes(value) ||
        acc.Name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  return (
    <div className='dashboard'>
      <header className='dashboard-header'>
        <div className='header-left'>
          <img src={logo} alt='Logo' className='logo' />
          <button className='menu-btn' onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div className='welcome'>
          <h1>Welcome, {userData?.name}</h1>
          <p>Last login: {currentDate}</p>
        </div>
        <div className='header-actions'>
          <input
            type='text'
            placeholder='Search account...'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </header>


      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>

        <button value='All' onClick={handleFilter}>All Accounts</button>
        <button value='Saving Account' onClick={handleFilter}>Savings</button>
        <button value='Salary Account' onClick={handleFilter}>Salary</button>
        <button value='Current Account' onClick={handleFilter}>Current</button>
        <Link to='/signin'>+ Create Account</Link>
        <Link to='/Deposite'>Deposit</Link>
        <Link to='/Withdraw'>Withdraw</Link>
      </aside>

      <main className='content'>
        <h1>Account Summary: -</h1>
        <div className='cards'>
          {filteredData.length > 0 ? (
            filteredData.map((acc, idx) => (
              <div className='card' key={idx}>
                <h1>Name: {acc.Name}</h1>
              <h2>Age: {acc.Age}</h2>
              <p>Email:{acc.Email}</p>
              <p>Account Number: {acc.ACcountNO}</p>
              <p>Initial Amount: {acc.Amount}</p>
              <span>Account Type: {acc.AccType}</span>
              </div>
            ))
          ) : (
            <p>No account data found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
