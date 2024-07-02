import { Usuario } from "../../lib/clases/Usuario";
import {
    addDoc,
    collection,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../routes/firebase";


export const ListaUsuario = class {

    constructor() {
        this.listaUsuario = [];
    }

    async agregarUsuario(nombre, contraseña, idKonami) {
        try {
            let newUser = new Usuario(nombre, contraseña, idKonami);
            await addDoc(collection(db, "users"), newUser.getUser());
        } catch (error) {
            console.log(error);
        }
    }

    async actualizarUsuario(id, nombre, contraseña, idKonami) {
        try {
            let updatedUser = new Usuario(nombre, contraseña, idKonami);
            await updateDoc(doc(db, "users", id), updatedUser.getUser());
        } catch (error) {
            console.log(error);
        }
    }

    async eliminarUsuario(id) {
        try {
            await deleteDoc(doc(db, "users", id)); //Conectar a la db y enviar data
        } catch (error) {
            console.log(error);
        }
    }

    consultarUsuario(datoBuscado) {
        return this.listaUsuario = [];
    }
}