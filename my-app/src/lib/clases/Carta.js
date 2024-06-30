export const Carta = class{

    constructor(){

        this.nombre = "";
        this.tipo = "";
        this.cantidad = 0;
        this.prestadas = 0;
    }

    getNombre(){

        return this.nombre;
    }

    getTipo(){

        return this.tipo;
    }

    getCantidad(){

        return this.cantidad;
    }

    getPrestadas(){

        return this.prestadas;
    }

    setNombre(nombre){

        this.nombre = nombre;
    }

    setTipo(tipo){

        this.tipo = tipo;
    }

    setCantidad(cantidad){

        this.cantidad = cantidad;
    }
    
    setPrestadas(prestadas){

        this.prestadas = prestadas;
    }
}