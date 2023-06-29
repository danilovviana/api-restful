const API_URL = 'http://localhost:8080/api/products'

const edit = document.querySelector('#edit')
const form = document.querySelector('#form')
const formEdit = document.querySelector('#formEdit')
const productsList = document.querySelector('#products-list')


// ADICIONA EVENTO DE CLIQUE NO BOTÃO EXCLUIR
function adicionaEventoBotaoExcluir() {
    const botoesExcluir = document.querySelectorAll('.botao-excluir')
    botoesExcluir.forEach(botao => {
        botao.onclick = function(e) {
            e.preventDefault()

            const id = this.dataset.id

            fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            }).then(response => {
                response.json().then(data => {
                    if (data.message === 'success') {
                        obterLista()
                        alert('Produto excluido com sucesso!')
                    } else {
                        alert('ops, ocorreu um erro. Tente novamente.')
                    }
                })
            })
        }
    })
}

// ADICIONA EVENTO DE CLIQUE NO BOTÃO EDITAR

function adicionaEventoBotaoEditar() {
    const botoesEditar = document.querySelectorAll('.botao-editar')
    botoesEditar.forEach(botao => {
        botao.onclick = function(e) {
            e.preventDefault()

            edit.classList.remove('hidden')

            const id = this.dataset.id
            const name = this.dataset.name
            const brand = this.dataset.brand
            const price = this.dataset.price

            document.forms['formEdit'].id.value = id
            document.forms['formEdit'].name.value = name
            document.forms['formEdit'].brand.value = brand
            document.forms['formEdit'].price.value = price
        }
    })

}


// OBTEM A LISTA DE PRODUTOS
function obterLista() {
    fetch(API_URL).then(response => {
        response.json().then(data => {
            const productsHtml = data.map(product => `
                <li>
                    ${product.name} - ${product.brand} - ${product.price} -
                    <a 
                        href="#" 
                        class="botao-editar"
                        data-id="${product._id}"
                        data-name="${product.name}" 
                        data-brand="${product.brand}" 
                        data-price="${product.price}"
                    >
                        [editar]
                    </a>
                    <a 
                        href="#" 
                        class="botao-excluir" 
                        data-id="${product._id}" 
                    >
                        [excluir]
                    </a>
                </li>
            `).join('')

            productsList.innerHTML = productsHtml

            adicionaEventoBotaoExcluir()
            adicionaEventoBotaoEditar()
        })
    })
}

obterLista()

// AO CADASTRAR UM PRODUTO
form.onsubmit = function(e) {
    e.preventDefault()

    const name = document.forms['form'].name.value
    const brand = document.forms['form'].brand.value
    const price = document.forms['form'].price.value

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            brand,
            price,
        })
    }).then(response => {
        response.json().then(data => {
            if (data.message === 'success') {
                form.reset()
                obterLista()
                alert('Cadastro realizado com sucesso!')
            } else {
                alert('ops, ocorreu um erro. Tente novamente.')
            }
        })
    })

}

// AO EDITAR UM PRODUTO
formEdit.onsubmit = function(e) {
    e.preventDefault()

    const id = document.forms['formEdit'].id.value
    const name = document.forms['formEdit'].name.value
    const brand = document.forms['formEdit'].brand.value
    const price = document.forms['formEdit'].price.value

    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            brand,
            price,
        })

    }).then(response => {
        response.json().then(data => {
            if (data.message === 'success') {
                formEdit.reset()
                edit.classList.add('hidden')
                obterLista()
                alert('Produto alterado com sucesso!')
            } else {
                alert('ops, ocorreu um erro. Tente novamente.')
            }
        })
    })
}