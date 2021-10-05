//==== variables==== y selectores   
const formulario = document.querySelector('#agregar-gasto');
const agostosLista = document.querySelector('#gastos ul');


//====eventos=======
addEventListeners();
function addEventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGastos);
}


//===== clases====
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante =Number(presupuesto);
        this.gastos = [];
    };
    nuevoGatos(obj){
        this.gastos = [...this.gastos, obj]
        console.log(this.gastos);
    };
};

class UI{
    insertarPresupuesto(cantida){
        const {presupuesto, restante }= cantida
       document.querySelector('#total').textContent= presupuesto
       document.querySelector('#restante').textContent= presupuesto
    }
    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
            if (tipo === 'error') {
             divMensaje.classList.add('alert-danger');
            }else{
                divMensaje.classList.add('alert-success');
            }
            divMensaje.textContent= mensaje;
            document.querySelector('.primario').insertBefore(divMensaje, formulario);

            setTimeout(() => {
                divMensaje.remove();
            }, 3000);
    }
};
//instaciar
let presupuesto;
const ui = new UI();
//====funcione========

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');
    
    if(presupuestoUsuario === ''|| presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload();
    }
    //presupueto valido    
    presupuesto = new Presupuesto(presupuestoUsuario);
    ui.insertarPresupuesto(presupuesto);


    
}


function agregarGastos(e) {
    e.preventDefault();
    //leer los input
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    if (nombre === '' || cantidad === '') {
       ui.imprimirAlerta('Ambos campos son Obligatorios', 'error');
       return;
    }else if (cantidad <= 0 || isNaN(cantidad )) {
        ui.imprimirAlerta('Cantidad no valida', 'error');     
        return;   
    }
    //agregar un obj-literal
    const obj ={
        nombre,
        cantidad,
        id: Date.now()
    }
    presupuesto.nuevoGatos(obj);
    ui.imprimirAlerta('Todo correcto');
    formulario.reset();
}