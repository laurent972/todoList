export default async function listesTodos() {
    const reponse = await fetch("https://todo-list-72pe.vercel.app/tasks/");
    const tasks = await reponse.json();
    return tasks.sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
  }
 
