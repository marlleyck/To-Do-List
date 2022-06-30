const banco = [
    {tarefa: 'ler', status: ''},
    {tarefa: 'estudar', status: 'checked'}
]


// Funções
function openModal() {
    let newItem = document.querySelector('.modal-new-item')
    newItem.classList.add('active')
}

function closeModal(event) {
    clearValues()
    let newItem = document.querySelector('.modal-new-item')
    newItem.classList.remove('active')
}


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

const addItem = (event) => {
    const elemen = document.getElementById('add-item').value
    const tecla = event.key
    if (tecla == 'Enter' || event.target.type == 'button') {
        banco.push({tarefa: elemen, status: ''})
        closeModal()
    }
}

const clearValues = () => {
    document.getElementById('add-item').value = ''
}

const render = () => {
    banco.forEach((item, index) => {
        createItem(item.tarefa, item.status, index)
    })
}

render()

// Events Listeners
document.getElementById('add-item-btn')
    .addEventListener('click', openModal)

document.getElementById('close-modal')
    .addEventListener('click', closeModal)

document.getElementById('add-item')
    .addEventListener('keydown', addItem)

document.querySelector('.modal-new-item')
    .addEventListener('click', addItem)
