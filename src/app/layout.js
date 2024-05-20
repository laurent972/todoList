import { TasksProvider } from "./_context/Tasks";
import "./globals.css";




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <h2>'tototototo'</h2>
        <TasksProvider>
          {children}
        </TasksProvider>
      </body>
    </html>
  );
}
