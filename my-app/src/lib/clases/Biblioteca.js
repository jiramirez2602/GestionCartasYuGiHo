import {Carta} from "../../lib/clases/Carta";
import {
    addDoc,
    collection,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../routes/firebase";

export const Biblioteca = class{

    constructor(){

        this.cartas = new Array();
    }


    async agregarCarta(nombre, tipo, cantidad, prestadas) {
        try {
            let newCarta = new Carta(nombre, tipo, cantidad,prestadas);

            await addDoc(collection(db, "cartaBiblioteca"), newCarta.getCarta());
        } catch (error) {
            console.log(error);
        }
    }

    async eliminarCarta(id) {
        try {
            await deleteDoc(doc(db, "cartaBiblioteca", id)); //Conectar a la db y enviar data
        } catch (error) {
            console.log(error);
        }
    }

    async actualizarCarta(id,nombre, tipo, cantidad) {
        try {
            let updatedCarta = new Carta(nombre, tipo, cantidad,0);
            await updateDoc(doc(db, "cartaBiblioteca", id), updatedCarta.getCarta());
        } catch (error) {
            console.log(error);
        }
    }

    getCartas(){

        return this.cartas;
    }

    setCartas(cartas){

        this.cartas = cartas;
    }
}