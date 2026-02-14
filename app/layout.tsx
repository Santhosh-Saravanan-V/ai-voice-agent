// app/// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600&display=swap" rel="stylesheet" />
export const metadata = {
  title: 'AI ChatBot',
  description: 'Chat with AI using voice and text',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600&display=swap" rel="stylesheet" />
        </head>
        
        <body className="font-orbitron">{children}</body>
      </html>
    </ClerkProvider>
  );
}



