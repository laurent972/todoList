export default async function listesTodos() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks`);
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const tasks = await response.json();
        return tasks.sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
  }
 
