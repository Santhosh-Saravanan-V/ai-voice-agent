import '../styles/globals.css'; // if your global styles are in styles/globals.css
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'AI Voice Agent for Education',
  description: 'An intelligent voice assistant for students',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-6 bg-gray-100 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
