//3.1 Definimos constante global con la url base a consumir
const URL_BASE = "https://swapi.dev/api/"

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
                        <p>Estatura: ${this.estatura} mts</p>
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

function * generadorPersonaje(id) {
    yield traerPersonaje(id);
    id++
    yield traerPersonaje(id);
    id++
    yield traerPersonaje(id);
    id++
    yield traerPersonaje(id);
    id++
    yield traerPersonaje(id);
    id++
}

