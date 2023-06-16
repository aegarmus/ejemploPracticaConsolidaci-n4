//3.1 Definimos constante global con la url base a consumir
const URL_BASE = "https://swapi.dev/api/"

//1- Definir Clase consrtructura
class Personaje {
    constructor(nombre, estatura, peso) {
        this.nombre = nombre
        this.estatura = estatura
        this.peso = peso
    }
} 

//2. Funcion que creara objetos de personajes automaticamente
const crearPersonaje = (data) => {
    let personaje = new Personaje (data.name, data.height, data.mass)
    return personaje
}

//3. Consumo API

const traerPersonaje = async(id) => {
    try{
        let resultado = await fetch(`${URL_BASE}people/${id}`)
        let respuesta = await resultado.json();
        let personaje = crearPersonaje(respuesta)
        console.log(personaje)
    }catch (err){
        throw new Error (err)
    }

} 



