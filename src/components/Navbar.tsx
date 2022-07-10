import React from 'react';
import { useNavigate } from 'react-router';

export const Navbar = () => {

    const navigate = useNavigate();
  
    return (
        <div className='navbar'>
            <h2 className='navbar-h'>GitHub Gists</h2>
            <div className='navbar-item' onClick={() => {
                navigate("/");
            }}>
                Home
            </div>
            <div className='navbar-item' onClick={() => {
                navigate("/gists");
            }}>
                Gists
            </div>
        </div>
    )

}
