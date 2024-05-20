import { TasksProvider } from "./_context/Tasks";
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <TasksProvider>
          {children}
        </TasksProvider>
      </body>
    </html>
  );
}
