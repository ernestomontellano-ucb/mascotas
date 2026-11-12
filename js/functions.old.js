
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
            <div class="contenedor_img"></div>
            <p>Especie: ${this.tipo}</p>
            <p>Edad: ${this.edad} años </p>
            <div class="contenedor-acciones">
                <button class="btn-accion">Hacer sonido</button>
            </div>
        `;
            const imagen = card.querySelector(".contenedor_img");
            const nombreArchivo = this.nombre.toLowerCase();
            imagen.style.backgroundImage = `url(images/${nombreArchivo}-aseo.png)`;
            const cambiarSprite = (accion) => {
                imagen.style.backgroundImage =
                    `url("images/${nombreArchivo}-${accion}.png")`;
                imagen.classList.toggle("caminando", accion === "caminata");

            };

            // Mientras presionamos
            imagen.addEventListener("pointerdown", () => {
                cambiarSprite("caminata");
            });

// Cuando soltamos
            imagen.addEventListener("pointerup", () => {
                cambiarSprite("aseo");
            });

// Si el cursor sale del elemento
            imagen.addEventListener("pointerleave", () => {
                cambiarSprite("aseo");
            });

// Si el navegador cancela la pulsación
            imagen.addEventListener("pointercancel", () => {
                cambiarSprite("aseo");
            });

            const contenedorAcciones = card.querySelector(".contenedor-acciones");
            const boton = card.querySelector(".btn-accion");
            let tagActivo = null;

            boton.addEventListener("click", () => {
                if(tagActivo){
                    tagActivo.remove();
                }

                const tag = document.createElement("span");
                tag.className = "tag-sonido";
                tag.innerText=this.hacerSonido();
                contenedorAcciones.appendChild(tag);
                tagActivo = tag;
                setTimeout(()=>{
                    if(tagActivo===tag){
                        tag.remove();
                        tagActivo=null;
                    }

                },3000);
            });


            return card;
        }
    }

    class Gato extends Mascota{
        constructor(nombre,edad, sonido){
            super(nombre,edad);
            this.tipo = "Gato";
            this.sonido = sonido;
        }
        hacerSonido(sonido){
            return sonido;
        }

    }
    class Perro extends Mascota{
        constructor(nombre,edad, sonido){
            super(nombre,edad);
            this.tipo = "Perro";
            this.sonido = sonido;
        }
        hacerSonido(sonido){
            return sonido;
        }
    }
    const contenedor = document.querySelector('#contenedor-mascotas');

    const kali = new Gato("Kali",3, "miauuu");
    const ishtar = new Gato("Ishtar",8, "prrrr prrr");
    const samir = new Gato("Samir",7, "meao");

    if(contenedor){
        contenedor.appendChild(kali.generarHTML());
        contenedor.appendChild(ishtar.generarHTML());
        contenedor.appendChild(samir.generarHTML());
    }



});