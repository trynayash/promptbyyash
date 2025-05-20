
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

const PUBLISHABLE_KEY = "pk_test_aW5jbHVkZWQtcGVyY2gtNTcuY2xlcmsuYWNjb3VudHMuZGV2JA"

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key")
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY}
    appearance={{
      elements: {
        formButtonPrimary: 
          "bg-promptp-purple hover:bg-promptp-deep-purple text-sm normal-case",
        footerActionLink: "text-promptp-purple hover:text-promptp-deep-purple",
        card: "rounded-xl shadow-md",
      },
    }}
  >
    <App />
  </ClerkProvider>
);
