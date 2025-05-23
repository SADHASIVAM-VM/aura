import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
  } from '@heroicons/react/24/outline'
import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

  
  export default function Footer() {
    return (
      <footer className="bg-black border-t border-white/50 text-gray-300 px-6 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 place-content-center">
          
          {/* Logo / Description */}
          <div>
            
             <Link to="/" className="text-3xl logo text-white ">
              aura<span className=" text-red-400 text-6xl">.</span>
            </Link>
            <p className="text-sm">
              <span className='text-white/40'>by ~ SADHASIVAM </span> <br />
              Your favorite destination for quality gear and fashion. Fast shipping, secure payments.
            </p>
          </div>
  
          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Men</a></li>
              <li><a href="#" className="hover:underline">Women</a></li>
              <li><a href="#" className="hover:underline">Accessories</a></li>
              <li><a href="#" className="hover:underline">Sale</a></li>
            </ul>
          </div>
  
          {/* Help / Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">Returns</a></li>
              <li><a href="#" className="hover:underline">Shipping</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
            </ul>
          </div>
  
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                support@aura.com
              </li>
              <li className="flex items-start gap-2">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-2">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
                123 Ecom St, San Francisco, CA
              </li>
            </ul>
          </div>
        </div>
  
        {/* Bottom Line */}
        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; 2025 aura. All rights reserved.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
  <img
    src="https://cdn-icons-png.flaticon.com/512/349/349221.png" 
    alt="Visa"
    className="h-8 w-auto object-contain"
  />
  <img
    src="https://cdn-icons-png.flaticon.com/512/196/196561.png"
    alt="Mastercard"
    className="h-8 w-auto object-contain"
  />
  <img
    src="https://cdn-icons-png.flaticon.com/512/196/196578.png"
    alt="PayPal"
    className="h-8 w-auto object-contain"
  />
  <img
    src="https://cdn-icons-png.flaticon.com/512/349/349230.png"
    alt="American Express"
    className="h-8 w-auto object-contain"
  />
  <img
    src="https://cdn-icons-png.flaticon.com/512/825/825454.png"
    alt="Apple Pay"
    className="h-8 w-auto object-contain"
  />
  <img
    src="https://cdn-icons-png.flaticon.com/512/6124/6124994.png"
    alt="Google Pay"
    className="h-8 w-auto object-contain"
  />
</div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Replace these with actual icon components or images */}
            <a href="#" className="hover:text-white" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" className="hover:text-white" aria-label="Twitter"><TwitterIcon /></a>
            <a href="#" className="hover:text-white" aria-label="Instagram"><InstagramIcon /></a>
          </div>
        </div>
      </footer>
    )
  }
  