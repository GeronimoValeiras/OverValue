
class auto {
    constructor(marca, modelo, version, valor) {
        this.marca = marca;
        this.modelo = modelo;
        this.version = version;
        this.valor = valor;
    }
}

const autos = [];
autos.push(new auto("toyota", "etios", "aibo", 1500000));
autos.push(new auto("toyota", "etios", "x", 1800000));
autos.push(new auto("toyota", "etios", "xls", 2500000));
autos.push(new auto("toyota", "corolla", "xli", 2500000));
autos.push(new auto("toyota", "corolla", "xei", 2800000));
autos.push(new auto("toyota", "corolla", "seg", 3500000));
autos.push(new auto("toyota", "hilux", "cc dx", 3500000));
autos.push(new auto("toyota", "hilux", "dc dx", 3800000));
autos.push(new auto("toyota", "hilux", "dc sr", 4500000));
autos.push(new auto("ford", "ka", "s", 1500000));
autos.push(new auto("ford", "ka", "se", 1800000));
autos.push(new auto("ford", "ka", "sel", 2500000));
autos.push(new auto("ford", "focus", "se", 2500000));
autos.push(new auto("ford", "focus", "sel+", 2800000));
autos.push(new auto("ford", "focus", "titanium", 3500000));
autos.push(new auto("ford", "ranger", "xl", 3500000));
autos.push(new auto("ford", "ranger", "xlt", 3800000));
autos.push(new auto("ford", "ranger", "limited", 4500000));
autos.push(new auto("volkswagen", "gol", "trendline", 1500000));
autos.push(new auto("volkswagen", "gol", "trendline at", 1800000));
autos.push(new auto("volkswagen", "gol", "highline", 2500000));
autos.push(new auto("volkswagen", "polo", "msi", 2500000));
autos.push(new auto("volkswagen", "polo", "highline", 2800000));
autos.push(new auto("volkswagen", "polo", "gts", 3500000));
autos.push(new auto("volkswagen", "amarok", "trendline", 3500000));
autos.push(new auto("volkswagen", "amarok", "comfortline", 3800000));
autos.push(new auto("volkswagen", "amarok", "highline", 4500000));
console.log(autos);

//const { marca , modelo } = autosReducido //Puede servirme más adelante para filtrar.

function buscarMarca(consecionario, marca) {
    const marcaAuto = consecionario.filter(objeto => objeto.marca == marca);
    return marcaAuto;
}

function buscarModelo(consecionario, auto) {
    return consecionario.filter(objeto => objeto.modelo == auto);
}

function buscarVersion(consecionario, auto) {
    return consecionario.filter(objeto => objeto.version == auto);
}

function buscarValor(consecionario, auto) {
    return consecionario.find(objeto => objeto.valor == auto);
}

const user = document.getElementById('user');
const email = document.getElementById('email');
const carManufacter = document.getElementById('carManufacter');
const carModel = document.getElementById('carModel');
const carVersion = document.getElementById('carVersion');



/* for (const Auto of autos) {
    let section = document.createElement("section");
    section.innerHTML = `<h2>${Auto.marca}</h2>
                         <p>${Auto.modelo} / ${Auto.version}</p>
                         <button id='${Auto.valor}'>Comprar: $${Auto.valor}</button>
                         <hr>`;
    document.body.appendChild(section);
} */

class clienteAuto {
    constructor(user, email) {
        this.user = user;
        this.email = email;
        this.carManufacter = carManufacter;
        this.carModel = carModel;
        this.carVersion = carVersion;
    }
}

//const { user, email } = clienteAutoReducido Mismo anterior, me puede servir apra armar una card.

window.onload = mostrarMarcas(elegirMarca(autos, carManufacter.value));


function cargarCliente() {

    const clientenuevo = new clienteAuto(user.value, email.value, carManufacter.value, carModel.value, carVersion.value);
    return clientenuevo;

}

function mostrarMarcas(autos) {
    for (const elemento of autos) {
        let option = `<option value="${elemento.marca}" id="marca${elemento.modelo}">${elemento.modelo} ${elemento.version}</option>`;
        carModel.innerHTML += option;
    }
    

}

function elegirMarca(autos, marca) {

    const cuentas = autos.filter(cuenta => cuenta.marca == marca);
    return cuentas;

}

carManufacter.onchange = () => {
    carModel.innerHTML = "";
    mostrarMarcas(elegirMarca(autos, carManufacter.value));

}

function guardarClienteNuevoenStorage(clienteAuto) {
    sessionStorage.setItem('clientenuevo', JSON.stringify(clienteAuto));
}

function recuperarClienteNuevoDeStorage(clienteAuto) {
    clientenuevo = JSON.parse(sessionStorage.getItem(clienteAuto));
    return clientenuevo;
}

function guardarAutoElegido(auto) {
    sessionStorage.setItem('auto elegido', JSON.stringify(auto));
}

function recuperarAutoElegidoDeStorage(auto) {
    autoElegido = JSON.parse(sessionStorage.getItem(auto));
    return autoElegido;
}

const iva = x => x * 0.21
/* const iva = (autos) => {
    const {value} = autos;
} */

const impuestos = x => x * 0.60

function adicionales(a, b) {
    let cargosAdicionales = a + b;
    return cargosAdicionales;
}

function costoFinal(a, b, c) {
    let precioFinal = a + b + c;
    return precioFinal;
}


function precioAuto (auto) {
    const impuestoAutoIVA = iva (auto.value);
    const impuestoAuto = impuestos(auto.value);
    const precioAutoFinal = costoFinal(auto.value, impuestoAuto, impuestoAutoIVA);
    return resultado = {
        'impuestos e iva = $': impuestoAuto + impuestoAutoIVA,
        'precio final del auto $': precioAutoFinal,
    };
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
        const objetoCalculos = precioAuto(auto);
        infoUsuario(datosCliente, objetoCalculos);
        } else if (result.isDenied) {
          Swal.fire('Vuelva cuando desee recibir información sobre un producto')
        }
      })
    

});

const container = document.querySelector('#cardCar');
const searchBtn = document.querySelector('#searchButton');
const carSelect = document.querySelector('#manufacterOption');

function filtrarMarca(array) {
    let marca = carSelect.value;
    if (!marca) {
        return array;
    } else {
        resultado = array.filter((e) => e.marcaAuto == marca);
        return resultado;
    }
}

function crearHTML(array) {
    container.innerHTML = '';
    array.forEach((auto) => {
        const card = `
            <section>
                <h5>${auto.marca}</h5>
                <p>Modelo: ${auto.modelo}</p>
                <p>Version: ${auto.version}</p>
                <p>Año: ${auto.anio}</p>
            </section>`;
        container.innerHTML += card;
    })
}

searchBtn.addEventListener('click', () => {
    fetch('https://https://carapi.herokuapp.com/')
        .then((response) => response.json())
        .then((data) => {
            crearHTML(filtrarMarca(data));
        })
})

/* function infoUsuario(datosCliente, precioAuto) {
    let section = document.createElement("ul");
    section.innerHTML = `<li>${datosCliente.carManufacter}</li>
                        <li>${datosCliente.carModel}</li>
                        <li>${datosCliente.carVersion}</li>
                        <li>${datosCliente.user}</li>
                        <li>${impuestoAutoIVA}</li>
                        <li>${impuestoAuto}</li>
                        <li>${precioAutoFinal}</li>
                         <hr>`;
    document.body.appendChild(section);
    ;

} */