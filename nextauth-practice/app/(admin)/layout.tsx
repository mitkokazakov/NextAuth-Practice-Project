import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import "./globals.css";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body >
          <AuthContext>
            <NavBar />
            {children}
          </AuthContext>
        </body>
      </html>
    );
  }