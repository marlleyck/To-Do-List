

// Funções
const getBanco = () => JSON.parse(localStorage.getItem('db_tarefa')) ?? []
const setBanco = (db_tarefa) => localStorage.setItem('db_tarefa', JSON.stringify(db_tarefa))

function openModal() {
    let newItem = document.querySelector('.modal-new-item')
    newItem.classList.add('active')
}

function closeModal(event) {
    clearValues()
    let newItem = document.querySelector('.modal-new-item')
    newItem.classList.remove('active')
}

let addCheck = ''


const insertDate = () => {
    const date = new Date()
    const month = date.getMonth() + 1 
    const day = date.getDate() 

    if (month < 10) {
        document.getElementById('day-mon').textContent = `/0${month}`
    } else {
        document.getElementById('day-mon').textContent = `/${month}`
    }
    
    if (day < 10) {
        document.getElementById('day').textContent = `0${day}`
    } else {
        document.getElementById('day').textContent = `${day}`
    }
}


const createItem = (tarefa, status, index) => {
    const div = document.createElement('div')
    div.classList.add('tarefa')
    div.dataset.index = `${index}`


    div.innerHTML = `
                <input type="checkbox" ${status} data-index="${index}">
                <div id="espec" data-Sindex="${index}">${tarefa}</div>
                <input type="button" value="X" data-index="${index}">
            `
    document.querySelector('.todoList').appendChild(div)

    if (status == 'checked') {
        document.querySelector(`[data-Sindex="${index}"]`).classList.add('checking')
    } else {
        document.querySelector(`[data-Sindex="${index}"]`).classList.remove('checking')
    }
}



const addItem = (event) => {
    const elemen = document.getElementById('add-item').value
    const tecla = event.key
    if (tecla == 'Enter' || event.target.type == 'button') {
        const banco = getBanco()
        banco.push({tarefa: elemen, status: ''})
        setBanco(banco)
        render()
        closeModal()
    }
}

const clearValues = () => {
    document.getElementById('add-item').value = ''
}

const clearList = () => {
    const todoList = document.querySelector('.todoList')
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}



const attItem = (index) => {
    const banco = getBanco()
    if (banco[index].status == '') {
        banco[index].status = 'checked'
        setBanco(banco)
    } else {
        banco[index].status = ''
        addCheck = ''
        setBanco(banco)
    }
}

const deleteItem = (index) => {
    const banco = getBanco()
    banco.splice(index, 1)
    setBanco(banco)
}

const clickItem = (event) => {
    let index = event.target.dataset.index
    if (event.target.type == 'checkbox') {
        attItem(index)
        render()
    } else if (event.target.type == 'button') {
        deleteItem(index)
        render()
    }
}  



const search = (event) => {
    const todoList = document.querySelectorAll('.todoList .tarefa')
    const banco = getBanco()
    let search_box = document.getElementById('search')


    const tecla = event.key
    if (tecla == 'Enter' || event.target.id == 'search-svg') {
        banco.map((item, index) => {
            if (item.tarefa == search_box.value) {
                search_box.value = ''
                todoList[index].classList.add('div-hover')
                setTimeout(() => {
                    todoList[index].classList.remove('div-hover')
                }, 1600)
            }
        })
    } 
}

const render = () => {
    clearList()
    const banco = getBanco()
    banco.forEach((item, index) => {
        createItem(item.tarefa, item.status, index)
        setBanco(banco)
    })
}

render()
insertDate()

// Events Listeners
document.getElementById('add-item-btn')
    .addEventListener('click', openModal)

document.getElementById('close-modal')
    .addEventListener('click', closeModal)

document.getElementById('add-item')
    .addEventListener('keydown', addItem)

document.querySelector('.modal-new-item')
    .addEventListener('click', addItem)

document.querySelector('.todoList')
    .addEventListener('click', clickItem)

document.getElementById('search-icon')
    .addEventListener('click', search)

document.getElementById('search')
    .addEventListener('keypress', search)