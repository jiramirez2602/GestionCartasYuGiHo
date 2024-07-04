import { addDoc, collection, updateDoc, doc, deleteDoc } from "firebase/firestore";
export const ListaFormato = class{

    constructor(){

        this.formatos = new Array();
    }

    getFormatos(){

        return this.formatos;
    }

    setFormatos(formatos){

        this.formatos = [];

        for(let i = 0; i < formatos.length; i++){

            this.formatos[i] = formatos[i].fecha;
        }
    }

    insertarFormato(formato){

        this.formatos.push(formato);
    }

    buscarFormatos(formatos, fecha) {
        for (let i = 0; i < formatos.length; i++) {
            if (formatos[i].fecha == fecha) {
            return i;
            }
        }

        return -1;
    }

    cambiarMPorY(input) {
        input = input.slice(5, input.length) + "-" + input.slice(0, 4);
    
        return input;
    }

    async eliminarFormato(db, id){

        await deleteDoc(doc(db, "formatos", id));
        
    }
}