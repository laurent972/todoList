export default async function listesTodos() {
    const reponse = await fetch("http://localhost:5500/tasks");
    const tasks = await reponse.json();
    return tasks.sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
  }
 
