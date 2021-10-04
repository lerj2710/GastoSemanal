//==== variables==== y selectores   
const formulario = document.querySelector('#agregar-gasto');
const agostosLista = document.querySelector('#gastos ul');


//====eventos=======
addEventListeners();
function addEventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}


//===== clases====


//====funcione========

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');
    
    if(presupuestoUsuario === ''|| presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload();
    }
    console.log(presupuestoUsuario);
}
