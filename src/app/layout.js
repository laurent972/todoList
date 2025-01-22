import Header from "./_components/Header";
import { TasksProvider } from "./_context/Tasks";
import "./globals.css";


export default function RootLayout({ children }) {

  
  return (
    
    <html lang="fr">
      <body>
      <Header />
        <TasksProvider>
          <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content text-center flex-col">
            {children}
           </div>
           </div>
        </TasksProvider>
      </body>
    </html>
  );
}
