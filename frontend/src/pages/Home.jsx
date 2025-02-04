import React from 'react';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Virtual Event Platform</h2>
      <div className="auth-forms"> {/* Add some styling classes */}
        <div>
          <h3>Login</h3>
          <Login />
        </div>
        <div>
          <h3>Register</h3>
          <Register />
        </div>
      </div>
    </div>
  );
};

export default Home;