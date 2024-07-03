export const Record = class{

    constructor(){

        this.usuario = "";
        this.formato = "";
        this.ganadas = 0;
        this.perdidas = 0;
        this.empatadas = 0;
    }

    getUsuario(){

        return this.usuario;
    }

    getFormato(){

        return this.formato;
    }

    getGanadas(){

        return this.ganadas;
    }

    getPerdidas(){

        return this.perdidas;
    }

    getEmpatadas(){

        return this.empatadas;
    }

    setUsuario(usuario){

        this.usuario = usuario;
    }

    setFormato(formato){

        this.formato = formato;
    }

    setGanadas(ganadas){

        this.ganadas = ganadas;
    }

    setPerdidas(perdidas){

        this.perdidas = perdidas;
    }

    setEmpatadas(empatadas){

        this.empatadas = empatadas;
    }
}