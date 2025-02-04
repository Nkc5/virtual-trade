import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/AuthService';


const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'Guest',
    ABN: '',
    businessName: '',
    mobilePhone: '',
    landline: '',
    address: {
      street: '',
      city: '',
      country: '',
      postcode: '',
    },
    countryCode: '',
    termsAgreed: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'Guest');
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'street' || name === 'city' || name === 'country' || name === 'postcode'
        ? {
            address: {
              ...formData.address,
              [name]: value,
            },
          }
        : {}),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await register(formData);
      console.log(response);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };


  const renderFormFields = () => {
    if (userRole === 'SuperAdmin') {
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <input
                type="text"
                name="street"
                placeholder="Street"
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="country"
                placeholder="Country"
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="postcode"
                placeholder="Postcode"
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <input
              type="text"
              name="ABN"
              placeholder="ABN"
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="businessName"
              placeholder="Business Name"
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="tel"
              name="mobilePhone"
              placeholder="Mobile Phone"
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="tel"
              name="landline"
              placeholder="Landline"
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="text"
              name="countryCode"
              placeholder="Country Code"
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      );
    }

    else {
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
         
        </>
      );
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderFormFields()}

          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="termsAgreed"
                onChange={handleChange}
                className="mr-2"
              />
              <span>I agree to the terms and conditions</span>
            </label>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-md disabled:bg-gray-400"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
          <p className="text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );



  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gray-100 w-screen">
  //     <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3 overflow-y-auto"> {/* Added overflow-y-auto */}
  //       <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
  //       <form onSubmit={handleSubmit} className="space-y-4">
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //           <div>
  //             <input
  //               type="text"
  //               name="firstName"
  //               placeholder="First Name"
  //               onChange={handleChange}
  //               required
  //               className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>
  //           <div>
  //             <input
  //               type="text"
  //               name="lastName"
  //               placeholder="Last Name"
  //               onChange={handleChange}
  //               required
  //               className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>
  //         </div>

  //         <div>
  //           <input
  //             type="email"
  //             name="email"
  //             placeholder="Email"
  //             onChange={handleChange}
  //             required
  //             className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //           />
  //         </div>
  //         <div>
  //           <input
  //             type="password"
  //             name="password"
  //             placeholder="Password"
  //             onChange={handleChange}
  //             required
  //             className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //           />
  //         </div>

  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  //           <div>
  //             <input
  //               type="text"
  //               name="street"
  //               placeholder="Street"
  //               onChange={handleChange}
  //               className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>
  //           <div>
  //             <input
  //               type="text"
  //               name="city"
  //               placeholder="City"
  //               onChange={handleChange}
  //               className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>
  //           <div>
  //             <input
  //               type="text"
  //               name="country"
  //               placeholder="Country"
  //               onChange={handleChange}
  //               className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>
  //           <div>
  //             <input
  //               type="text"
  //               name="postcode"
  //               placeholder="Postcode"
  //               onChange={handleChange}
  //               className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>
  //         </div>

  //         <div>
  //           <input
  //             type="text"
  //             name="ABN"
  //             placeholder="ABN"
  //             onChange={handleChange}
  //             className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //           />
  //         </div>
  //         <div>
  //           <input
  //             type="text"
  //             name="businessName"
  //             placeholder="Business Name"
  //             onChange={handleChange}
  //             className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //           />
  //         </div>
  //         <div>
  //           <input
  //             type="tel"
  //             name="mobilePhone"
  //             placeholder="Mobile Phone"
  //             onChange={handleChange}
  //             className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //           />
  //         </div>
  //         <div>
  //           <input
  //             type="tel"
  //             name="landline"
  //             placeholder="Landline"
  //             onChange={handleChange}
  //             className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //           />
  //         </div>

  //         <div>
  //           <input
  //             type="text"
  //             name="countryCode"
  //             placeholder="Country Code"
  //             onChange={handleChange}
  //             className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //           />
  //         </div>

  //         <div>
  //           <label className="inline-flex items-center">
  //             <input
  //               type="checkbox"
  //               name="termsAgreed"
  //               onChange={handleChange}
  //               className="mr-2"
  //             />
  //             <span>I agree to the terms and conditions</span>
  //           </label>
  //         </div>

  //         {error && <p className="text-red-500">{error}</p>}
  //         <div>
  //           <button
  //             type="submit"
  //             disabled={loading}
  //             className="w-full bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-md disabled:bg-gray-400"
  //           >
  //             {loading ? 'Registering...' : 'Register'}
  //           </button>
  //         </div>
  //         <p className="text-center">
  //           Already have an account?{' '}
  //           <Link to="/login" className="text-blue-500 hover:underline">
  //             Login
  //           </Link>
  //         </p>
  //       </form>
  //     </div>
  //   </div>
  // );
};

export default Register;