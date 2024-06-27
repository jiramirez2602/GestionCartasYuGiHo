export const Carta = class{

    constructor(){

        this.nombreCarta = "";
        this.tipoCarta = "";
        this.cantidadCarta = 0;
    }

    getNombreCarta(){

        return this.nombreCarta;
    }

    getTipoCarta(){

        return this.tipoCarta;
    }

    getCantidadCarta(){

        return this.cantidadCarta;
    }

    setNombreCarta(nombre){

        this.nombreCarta = nombre;
    }

    setTipoCarta(tipo){

        this.tipoCarta = tipo;
    }

    setCantidadCarta(cantidad){

        this.cantidadCarta = cantidad;
    }
}