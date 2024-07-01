export const ListaFormato = class{

    constructor(){

        this.formatos = new Array();
    }

    getFormatos(){

        return this.formatos;
    }

    setFormatos(formatos){

        this.formatos = formatos;
    }

    insertarFormato(formato){

        this.formatos.push(formato);
    }

    buscarformatos(formatos, fecha) {
        for (let i = 0; i < formatos.length; i++) {
            if (formatos[i].fecha == fecha) {
            return i;
            }
        }

        return -1;
    }

    listaVacia(){

        if(this.formatos[0] == null) return 0;
        return 1;
    }
}