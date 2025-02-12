import './globals.css';

export const metadata = {
  title: 'Liveheats - Coding Challenge',
  description: 'Enable your school to track the result of races!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
