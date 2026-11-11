document.addEventListener("DOMContentLoaded",function(){

  const boton = document.querySelector("#boton");
  const detalle = document.querySelector("#detalle");

 boton.addEventListener("click", function(){

    detalle.classList.toggle("oculto");

    if(detalle.classList.contains("oculto")){
        boton.textContent = "Mostrar más";
    }else{
        boton.textContent = "Mostrar menos";
    }

 });   

/* CREAR UNA CLASE */
class Mascota {
    constructor(nombre, edad,tipo){
        this.nombre = nombre;
        this.edad = edad;
        this.tipo = "";
    }
    comer(){
        console.log(`La mascota ${this.nombre} está comiendo`); /*ES6*/ 
    }
    generarHTML(){
        const card = document.createElement("div");
        card.className = `card-mascota ${this.tipo}`;
        card.innerHTML = `
            <h3>${this.nombre}</h3>
            <p>Especie: ${this.tipo}</p>
            <p>Edad: ${this.edad} años </p>
            <div class="contenedor-acciones">
                <button class="btn-accion">Hacer sonido</button>
            </div>
        `;
        const contenedorAcciones = card.querySelector(".contenedor-acciones");
        const boton = card.querySelector(".btn-accion");
        let tagActivo = null;

        boton.addEventListener("click", function(){
            if(tagActivo){
                tagActivo.remove();
            }

            const tag = document.createElement("span");
            tag.className = "tag-sonido";
        })


        return card;
    }
}

class Gato extends Mascota{
    constructor(nombre,edad){
        super(nombre,edad);
        this.tipo = "Gato";
    }
    hacerSonido(){
       return "Miauuuuu"
    }

}
class Perro extends Mascota{
     constructor(nombre,edad){
        super(nombre,edad);
        this.tipo = "Perro";
    }
    hacerSonido(){
        return "Guau guau"
    }
}
const contenedor = document.querySelector('#contenedor-mascotas');

const kali = new Gato("Kali",3);
const ishtar = new Gato("Ishtar",8);
const samir = new Gato("Samir",7);

if(contenedor){
    contenedor.appendChild(kali.generarHTML());
    contenedor.appendChild(ishtar.generarHTML());
    contenedor.appendChild(samir.generarHTML());
}



});




