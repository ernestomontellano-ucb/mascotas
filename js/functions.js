document.addEventListener("DOMContentLoaded", () => {
    // 1. Interacción de mostrar/ocultar contenido
    const botonDetalle = document.querySelector("#boton");
    const detalle = document.querySelector("#detalle");

    if (botonDetalle && detalle) {
        botonDetalle.addEventListener("click", () => {
            detalle.classList.toggle("oculto");
            botonDetalle.textContent = detalle.classList.contains("oculto")
                ? "Mostrar más"
                : "Mostrar menos";
        });
    }

    // 2. Clase base: propiedades y comportamiento compartidos
    class Mascota {
        constructor(nombre, edad, tipo) {
            this.nombre = nombre;
            this.edad = edad;
            this.tipo = tipo;
        }

        comer() {
            console.log(`La mascota ${this.nombre} está comiendo`);
        }

        hacerSonido() {
            return "...";
        }

        // Una mascota sin sprites asociados no muestra este contenedor.
        // Gato sobrescribe este método.
        prepararImagen(imagen) {
            imagen.remove();
        }

        generarHTML() {
            const card = document.createElement("article");
            card.className = `card-mascota ${this.tipo.toLowerCase()}`;

            card.innerHTML = `
                <div class="contenedor_img"></div>
                <h3>${this.nombre}</h3>
            
                <p>Especie: ${this.tipo}</p>
                <p>Edad: ${this.edad} años</p>
                <div class="contenedor-acciones">
                    <button type="button" class="btn-accion">Hacer sonido</button>
                </div>
            `;

            this.prepararImagen(card.querySelector(".contenedor_img"));

            const contenedorAcciones = card.querySelector(".contenedor-acciones");
            const botonSonido = card.querySelector(".btn-accion");

            let tagActivo = null;
            let temporizadorSonido = null;

            botonSonido.addEventListener("click", () => {
                // Si se pulsa varias veces, se reemplaza la etiqueta anterior.
                if (temporizadorSonido !== null) {
                    clearTimeout(temporizadorSonido);
                }
                if (tagActivo !== null) {
                    tagActivo.remove();
                }

                const tag = document.createElement("span");
                tag.className = "tag-sonido";
                tag.textContent = this.hacerSonido();
                contenedorAcciones.appendChild(tag);
                tagActivo = tag;

                temporizadorSonido = setTimeout(() => {
                    tag.remove();
                    tagActivo = null;
                    temporizadorSonido = null;
                }, 3000);
            });

            return card;
        }
    }

    // 3. Gato: sonido y pausa de aseo propios de cada instancia
    class Gato extends Mascota {
        constructor(nombre, edad, sonido, pausaAseo) {
            super(nombre, edad, "Gato");
            this.sonido = sonido;
            this.pausaAseo = pausaAseo; // Milisegundos de descanso tras cada vuelta
        }

        hacerSonido() {
            return this.sonido;
        }

        prepararImagen(imagen) {
            const nombreArchivo = this.nombre.toLowerCase();

            let temporizadorPausa = null;
            let punteroActivo = null;

            // Si empieza otra acción, se cancela el descanso pendiente.
            const cancelarPausa = () => {
                if (temporizadorPausa !== null) {
                    clearTimeout(temporizadorPausa);
                    temporizadorPausa = null;
                }
                imagen.classList.remove("pausa-aseo");
            };

            const cambiarSprite = (accion) => {
                cancelarPausa();

                imagen.style.backgroundImage =
                    `url("images/${nombreArchivo}-${accion}.png")`;

                imagen.classList.toggle("caminando", accion === "caminata");
            };

            // Estado inicial: aseo.
            cambiarSprite("aseo");

            // Precargamos la caminata para reducir la espera del primer clic.
            const precargaCaminata = new Image();
            precargaCaminata.src = `images/${nombreArchivo}-caminata.png`;

            // Al completarse una vuelta de aseo, inmovilizar el primer cuadro.
            imagen.addEventListener("animationiteration", (evento) => {
                if (evento.animationName !== "animarAseo"
                    || imagen.classList.contains("caminando")) {
                    return;
                }

                imagen.classList.add("pausa-aseo");

                // Cada gata tiene su propio tiempo de descanso.
                temporizadorPausa = setTimeout(() => {
                    temporizadorPausa = null;
                    imagen.classList.remove("pausa-aseo");
                    // Al quitar la clase, el ciclo de aseo vuelve a empezar.
                }, this.pausaAseo);
            });

            // Comenzar a caminar mientras se mantiene presionado.
            imagen.addEventListener("pointerdown", (evento) => {
                if (evento.button !== 0 || punteroActivo !== null) {
                    return;
                }

                punteroActivo = evento.pointerId;
                imagen.setPointerCapture(evento.pointerId);
                cambiarSprite("caminata");
            });

            const finalizarPulsacion = (evento) => {
                if (evento.pointerId !== punteroActivo) {
                    return;
                }

                punteroActivo = null;
                cambiarSprite("aseo");
            };

            // La captura permite soltar incluso fuera del elemento.
            imagen.addEventListener("pointerup", finalizarPulsacion);
            imagen.addEventListener("pointercancel", finalizarPulsacion);
            imagen.addEventListener("lostpointercapture", finalizarPulsacion);

            // Si cambia de ventana mientras presiona, vuelve al aseo.
            window.addEventListener("blur", () => {
                if (punteroActivo !== null) {
                    punteroActivo = null;
                    cambiarSprite("aseo");
                }
            });
        }
    }

    // 4. Otra subclase: comparte la tarjeta, pero no usa sprites de gato.
    class Perro extends Mascota {
        constructor(nombre, edad, sonido) {
            super(nombre, edad, "Perro");
            this.sonido = sonido;
        }

        hacerSonido() {
            return this.sonido;
        }
    }

    // 5. Objetos: cada gata tiene sonido y descanso distintos.
    const kali = new Gato("Kali", 3, "miauuu", 1000);
    const ishtar = new Gato("Ishtar", 8, "prrrr prrr", 2000);
    const samir = new Gato("Samir", 7, "meao", 1400);

    const contenedor = document.querySelector("#contenedor-mascotas");

    if (contenedor) {
        contenedor.appendChild(kali.generarHTML());
        contenedor.appendChild(ishtar.generarHTML());
        contenedor.appendChild(samir.generarHTML());
    }
});
