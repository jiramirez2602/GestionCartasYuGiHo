export const Biblioteca = class{

    constructor(){

        this.cartas = new Array();
    }

    insertarCarta(carta){

        this.cartas.push(carta);
    }

    getCartas(){

        return this.cartas;
    }

    setCartas(cartas){

        this.cartas = cartas;
    }
}