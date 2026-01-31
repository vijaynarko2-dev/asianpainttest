import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'
import App from './App.jsx'


import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51SvbPa4SWAlC6gq5naAEe01v8vtmbZQ5FGbUahhD3m8fdXRJVvChWzfy2qCCt0vyRj9ERyHctZaspo9gpDFuRZ3S004hB0Uuje");

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </AuthProvider>
  </BrowserRouter>

) 
