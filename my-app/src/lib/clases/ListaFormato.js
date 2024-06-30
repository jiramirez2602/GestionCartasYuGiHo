export const ListaFormato = class{

    constructor(){

        this.formatos = new Array();
    }

    getFormatos(){

        return this.formatos;
    }

    insertarFormato(formato){

        this.formatos.push(formato);
    }
}