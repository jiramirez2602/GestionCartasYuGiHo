

export const Usuario = class{

    constructor(nombre, contraseña, idKonami){
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.idKonami = idKonami;
        this.permisos = "";
    }

    getUser(){
        const newUser = {
            idKonami: this.idKonami,
            username: this.nombre,
            password: this.contraseña
          };
        return newUser
    }

    getPermisos(){
        return this.permisos;
    }

    getNombre(){
        return this.nombre;
    }

    getContraseña(){
        return this.contraseña;
    }

    getKonamiID(){
        return this.konamiID;
    }

    setNombre(nombre){

        this.nombre = nombre;
    }
    
    setContraseña(password){
        this.password = password;
    }

    setKonamiID(id){
        this.konamiID = id;
    }

    setPermisos(permisos){
        this.permisos = permisos;
    }
}