import Header from "./_components/Header";
import { TasksProvider } from "./_context/Tasks";
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
      <Header />
        <TasksProvider>
          {children}
        </TasksProvider>
      </body>
    </html>
  );
}
