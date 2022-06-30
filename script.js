

// Funções
function openModal() {
    let newItem = document.querySelector('.modal-new-item')
    newItem.classList.add('active')
}

function closeModal() {
    let newItem = document.querySelector('.modal-new-item')
    newItem.classList.remove('active')
}



// Events Listeners
document.getElementById('add-item-btn')
    .addEventListener('click', openModal)

document.getElementById('close-modal')
    .addEventListener('click', closeModal)