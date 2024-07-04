export const Carta = class{

    constructor(nombre,tipo,cantidad){

        this.nombre = nombre;
        this.tipo = tipo;
        this.cantidad = cantidad;
        this.prestadas = 0;
    }

    getCarta(){
        const newCarta = {
            nombre: this.nombre,
            tipo: this.tipo,
            cantidad: this.cantidad,
            prestadas: this.prestadas
          };
        return newCarta
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