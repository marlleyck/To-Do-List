const banco = [
    {tarefa: 'ler', status: ''},
    {tarefa: 'estudar', status: 'checked'}
]

const getBanco = () => JSON.parse(localStorage.getItem('db_tarefa')) ?? []
const setBanco = (db_tarefa) => localStorage.setItem('db_tarefa', JSON.stringify(db_tarefa))

const createItem = (tarefa, status, index) => {
    const div = document.createElement('div')
    div.classList.add('tarefa')

    div.innerHTML = `
                <input type="checkbox" ${status} data-index="${index}">
                <div>${tarefa}</div>
                <input type="button" value="X">
            `
    document.querySelector('.todoList').appendChild(div)
}

const addItem = () => {
    
}


const render = () => {
    banco.forEach((item, index) => {
        createItem(item.tarefa, item.status, index)
    })
}



render()

// Funções
function openModal() {
    let newItem = document.querySelector('.modal-new-item')
    newItem.classList.add('active')
}

function closeModal(event) {
    let newItem = document.querySelector('.modal-new-item')
    newItem.classList.remove('active')
}




// Events Listeners
document.getElementById('add-item-btn')
    .addEventListener('click', openModal)

document.getElementById('close-modal')
    .addEventListener('click', closeModal)
