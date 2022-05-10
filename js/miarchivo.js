
//Filtro en galería

const carManufacterBtn = document.getElementById('carManufacterer');
const carModelBtn = document.getElementById('carModel');
const aplicarFiltro = document.getElementById('enterData');
const borrarFiltro = document.getElementById('eraseData');
const galeria = document.getElementById('carGalery');


aplicarFiltro.addEventListener('click', () => {
    createHTML(filtrarMarca(array));
})

function filtrarMarca(array) {
    let marca = carManufacterBtn.value;
    if (!marca) {
        return array;
    } else {
        result = array.filter((e) => e.marcas.nombre == marca);
        return result;
    }
}

function createHTML(array) {
    fetch ('../data.json')
    .then ((response) => response.json())
    .then ((data) => {
    galeria.innerHTML = ''
    array.forEach((array) => {
        const card = `
        <div>
        <h3>${marcas.nombre}</h3>
        <h4>${marcas.nombre}</h4>
        <h5>${marcas.modelos.nombreModelo}</h5>
        <h5>${marcas.modelos.versiones.versionModelo}</h5>
        <h5>${marcas.modelos.versiones.precio}</h5>
        <hr/>
        </div>`;
        galeria.innerHTML += card
    })
})
}

function galeriaInicial (array){
    fetch ('../data.json')
    .then ((response) => response.json())
    .then ((data) => {
        console.log (data);
        console.log (data.marcas);
        galeria.innerHTML = ''
       array.forEach((marcas) => {
            const card = `
        <div>
        <h3>${marcas.nombre}</h3>
        <h4>${marcas.nombre}</h4>
        <h5>${marcas.modelos.nombreModelo}</h5>
        <h5>${marcas.modelos.versiones.versionModelo}</h5>
        <h5>${marcas.modelos.versiones.precio}</h5>
        <hr/>
        </div>`;
        galeria.innerHTML += card
        });
    })
}

window.onload = galeriaInicial();


//Card de recibir información

const name = document.getElementById('name');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const carManufacterClient = document.getElementById('carManufacterClient');
const carModelClient = document.getElementById('carModelClient');
const cardClient = document.getElementById('clientCard');

class clienteAuto {
    constructor(name, lastName) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.carManufacterClient = carManufacterClient;
        this.carModelClient = carModelClient;        
    }
}

function cargarCliente() {
    const clientenuevo = new clienteAuto(name.value, lastName.value, email.value, carManufacterClient.value, carModelClient.value);
    return clientenuevo;
}

function guardarClienteNuevoenStorage(clienteAuto) {
    sessionStorage.setItem('clientenuevo', JSON.stringify(clienteAuto));
}


const enterData = document.querySelector("#enterData")

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
        <h5>${carModelClient.value}</h5>
        <hr/>
        </div>`;
        galeria.innerHTML += cardCliente

        } else if (result.isDenied) {
        Swal.fire('Vuelva cuando desee recibir información sobre un producto')
        }
    })
    

});
