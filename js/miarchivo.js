
//Filtro en galería

const carManufacterBtn = document.querySelector('#carManufacter');
const carModelBtn = document.querySelector('#carModel');
const aplicarFiltro = document.querySelector('#enterData');
const borrarFiltro = document.querySelector('#eraseData');
const galeria = document.querySelector('#carGalery');



aplicarFiltro.addEventListener('click', () => {
    cargarAutos();
})
async function cargarAutos() {
    const respuesta = await fetch('../data.json')
    const data = await respuesta.json();
    createHTML(filtrarMarca(data))
}

function filtrarMarca(array) {
    let marca = carManufacterBtn.value;
    if (!marca) {
        return array;
    } else {
        result = array.filter((e) => e.marca == marca);
        return result;
    }
}

function createHTML(array) {
    galeria.innerHTML = ''
    array.forEach((auto) => {
        const card = `
        <div>
        <h3>${auto.marca}</h3>
        <h4>${auto.modelos}</h4>
        <h5>${auto.precio}</h5>
        <div>${auto.imagen}</div>
        </div>`
        galeria.innerHTML += card
    })
}


//Card de recibir información

const name = document.querySelector('#name');
const lastName = document.querySelector('#lastname');
const email = document.querySelector('#email');
const carManufacterClient = document.querySelector('#carManufacterClient');
const carModelClient = document.querySelector('#carModelClient');
const cardClient = document.querySelector('#clientCard');

class clienteAuto {
    constructor(name, lastName) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.carManufacterClient = carManufacterClient;
    }
}

function cargarCliente() {
    const clientenuevo = new clienteAuto(name.value, lastName.value, email.value, carManufacterClient.value);
    return clientenuevo;
}

function guardarClienteNuevoenStorage(clienteAuto) {
    localStorage.setItem('clientenuevo', JSON.stringify(clienteAuto));
}


const enterData = document.querySelector("#enterDato")

enterData.addEventListener('click', () => {
    Swal.fire ({
        title: '¿Está seguro de haber completado correctamente los campos y querer recibir información sobre el producto?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
        denyButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire('Excelente, pronto recibirá un email.')
        const datosCliente = cargarCliente(clienteAuto);
        guardarClienteNuevoenStorage (datosCliente);
        cardClient.innerHTML = ''
        const cardCliente = `
        <div>
        <h3>${name.value}</h3>
        <h4>${lastName.value}</h4>
        <h5>${email.value}</h5>
        <h5>${carManufacterClient.value}</h5>
        </div>`;
        galeria.innerHTML += cardCliente

        } else if (result.isDenied) {
        Swal.fire('Vuelva cuando desee recibir información sobre un producto')
        }})
    });