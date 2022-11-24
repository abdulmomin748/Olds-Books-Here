import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png'
const Footer = () => {
    return (
        <div>
            <footer className="footer text-base-content border-t pt-8">
                <div>
                <Link to='/' className="flex items-center text-2xl  font-bold"><img className=' w-20 mr-2' src={logo} alt="" srcset="" /></Link>
                    <p>ACME Industries Ltd.<br/>Providing reliable tech since 1992</p>
                </div> 
                <div>
                    <span className="footer-title">Services</span> 
                    <Link className="link link-hover">Branding</Link> 
                    <Link className="link link-hover">Design</Link> 
                    <Link className="link link-hover">Marketing</Link> 
                    <Link className="link link-hover">Advertisement</Link>
                </div> 
                <div>
                    <span className="footer-title">Company</span> 
                    <Link className="link link-hover">About us</Link> 
                    <Link className="link link-hover">Contact</Link> 
                    <Link className="link link-hover">Jobs</Link> 
                    <Link className="link link-hover">Press kit</Link>
                </div> 
                <div>
                    <span className="footer-title">Legal</span> 
                    <Link className="link link-hover">Terms of use</Link> 
                    <Link className="link link-hover">Privacy policy</Link> 
                    <Link className="link link-hover">Cookie policy</Link>
                </div>
            </footer>
        </div>
    );
};

export default Footer;