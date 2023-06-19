//3.1 Definimos constante global con la url base a consumir
const URL_BASE = "https://swapi.dev/api/"

//8.1 Variables globales para manipular DOM

let rojo = document.getElementById("numeroRojo")
let verde = document.getElementById("numeroVerde")
let azul = document.getElementById("numeroAzul")

//1- Definir Clase consrtructura
class Personaje {
    constructor(nombre, estatura, peso, fila) {
        this.nombre = nombre
        this.estatura = estatura
        this.peso = peso
        this.fila = fila
    }

    //5. Agregamos tarjetas y propiedad fila a la clase
    cargarTarjeta = (color) => {

        document.getElementById(`${this.fila}`).innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
                    <div class="timeline-icon ${color}"></div>
                    <div class="timeline-text">
                        <h6>${this.nombre}</h6>
                        <p>Estatura: ${this.estatura} cms</p>
                        <p>Peso: ${this.peso} kg </p>
                    </div>
                </div>
            </div>
        `
    }
} 

//2. Funcion que creara objetos de personajes automaticamente
const crearPersonaje = (data, fila) => {
    let personaje = new Personaje (data.name, data.height, data.mass, fila)
    return personaje
}

//3. Consumo API

const traerPersonaje = async(id, fila, color) => {
    try{
        let resultado = await fetch(`${URL_BASE}people/${id}`)
        let respuesta = await resultado.json();
        let personaje = crearPersonaje(respuesta, fila)
        personaje.cargarTarjeta(color)
        console.log(personaje)
    }catch (err){
        throw new Error (err)
    }
} 

//4. Función Generadora

function * generadorPersonaje(id, fila, color) {
    yield traerPersonaje(id, fila, color);
    id++
    yield traerPersonaje(id, fila, color);
    id++
    yield traerPersonaje(id, fila, color);
    id++
    yield traerPersonaje(id, fila, color);
    id++
    yield traerPersonaje(id, fila, color);
    id++
}

//6. generar variables con generador

let generadorRojo = generadorPersonaje(1, "filaRojo", "rojo")
let generadorVerde = generadorPersonaje(6, "filaVerde", "verde")
let generadorAzul = generadorPersonaje(11, "filaAzul", "azul")

//7. Función que acciona los generadores
/* const listaGenerador = async (generador) => {
    let data = generador.next()

  Funciona, pero no es la mejor opción por buena practica   
    if(data.done){
        alert("no hay más personaje")
    }else{
        data.value
    } 

    if(!data.done){
        data.value
    }else{
        alert("no hay más personaje")
    }
} */

//8 cargar elementos en el DOM
rojo.addEventListener("click", async () => {
    let data = generadorRojo.next()

    /*
    Las más fácil pero la peor vista. Porque verifica estado final y no estado actual de la función

    if(data.done){
        alert("no hay más personajes")
    }else{
        data.value
    }

    */

    /*
    Mejor vista en el medio porque verifica el estado actual

    if(!data.done){
        data.value
    }else{
        alet("no hay más personajes")
    }

    */

    /*Operador ternario = verifico si el dato es verdadero. Todo lo que viene luego del ? corresponde a lo que hay que hacer
     si la condición es verdadera. Y luego, se pone un : todo lo que viene despues es lo que se hace si la condición es falsa*/
    !data.done ? data.value : alert("no hay más personaje")
})

verde.addEventListener("click", async () => {
    let data = generadorVerde.next()
    !data.done ? data.value : alert("no hay más personaje")
})

azul.addEventListener("click", async () => {
    let data = generadorAzul.next()
    !data.done ? data.value : alert("no hay más personaje")
})


/* verde.addEventListener("click",listaGenerador(generadorVerde))
azul.addEventListener("click",listaGenerador(generadorAzul)) */