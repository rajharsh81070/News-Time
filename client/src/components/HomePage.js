import React, { useState } from 'react';
import NavBar from './NavBar';
import userStore from '../stores/userStore';

function HomePage(props) {
  const [name, setName] = useState(userStore.getName());

  return (
    <div>
      <NavBar name={name} />
      HomePage
    </div>
  );
}

export default HomePage;