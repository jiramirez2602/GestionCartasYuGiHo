

export const Usuario = class{

    constructor(){

        this.nombre = "";
        this.password = "";
        this.konamiID = "";
    }

    getNombre(){

        return this.nombre;
    }

    getPassword(){

        return this.password;
    }

    getKonamiID(){

        return this.konamiID;
    }

    setNombre(nombre){

        this.nombre = nombre;
    }
    
    setPassword(password){

        this.password = password;
    }

    setKonamiID(id){

        this.konamiID = id;
    }
}