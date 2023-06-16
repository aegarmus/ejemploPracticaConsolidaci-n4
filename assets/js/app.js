
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