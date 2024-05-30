const todos = () =>{
    return[
        {
            title:"Acheter des fleurs",
            description: "Achter des fleurs pour ma maman, à interflora ",
            date:"12/02/2023",
            todo: true
        },
        {
            title:"Acheter du Jambon sec",
            description: " ",
            date:"12/02/2023",
            todo: false
        }
    ]
}

export default async function listesTodos(){
    return todos();
};