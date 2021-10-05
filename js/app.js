//==== variables==== y selectores   
const formulario = document.querySelector('#agregar-gasto');
const gastosListado = document.querySelector('#gastos ul');


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
        this.gastos = [...this.gastos, obj];
        this.calcularRestante();
    };
    calcularRestante(){
            const gastado = this.gastos.reduce((total, obj) => total + obj.cantidad, 0);
            this.restante = this.presupuesto - gastado;
            // console.log(this.restante);
    }
};

class UI{

    insertarPresupuesto(cantida){
        const {presupuesto, restante }= cantida
       document.querySelector('#total').textContent= presupuesto
       document.querySelector('#restante').textContent= restante
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
    //iterar sobre cada gasto
    agregarGastoListado(gastos){
        this.limpiarHtml();
            gastos.forEach(gasto => {
               const {nombre, cantidad, id}= gasto;
               //crear un li
               const li = document.createElement('li');
                li.className ='list-group-item d-flex justify-content-between aling-items-center';
                // li.setAttribute('data-id', id);
                li.dataset.id = id;
                //agregar gastos al HTML  
                li.innerHTML=`${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad}</span> `;
               //crear un boton
               const btn = document.createElement('button');
                btn.classList.add('btn' ,'btn-danger');
                btn.textContent= 'Borrar'
                li.appendChild(btn);
               // instar al html el gastos
               gastosListado.appendChild(li);

            })
    };
        //limpiar HTML
        limpiarHtml(){
            while (gastosListado.firstChild) {
                gastosListado.removeChild(gastosListado.firstChild);
            }
        };
    actulizarRestante(restante){

        document.querySelector('#restante').textContent = restante;

    };
    //mostar los porcentaje de gastos
    comprobarPresupuesto(presupuestoObj){
        const {presupuesto, restante} = presupuestoObj;
        const restanteDiv = document.querySelector('.restante');
        
        if ((presupuesto / 4)>restante ) {
           restanteDiv.classList.remove('alert-success', 'alert-warning');
           restanteDiv.classList.add('alert-danger');
        
        }else if ((presupuesto / 2) > restante ) {
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
         
        }
        //cuando el presupuesto esta agotado
        if (restante <= 0) {
         ui.imprimirAlerta('Presupuesto Agotado', 'error');
         formulario.querySelector('button[type="submit"]').disabled= true;
     }

 
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
    //añadir un nuevo gasto
    presupuesto.nuevoGatos(obj);
    //mostar un mensaje nuevo
    ui.imprimirAlerta('Todo correcto');
    //imprimir gastos
    const {gastos, restante }= presupuesto;
    ui.agregarGastoListado(gastos);
    ui.comprobarPresupuesto(presupuesto);
    ui.actulizarRestante(restante);
    //reiniciar el formulario
    formulario.reset();
}