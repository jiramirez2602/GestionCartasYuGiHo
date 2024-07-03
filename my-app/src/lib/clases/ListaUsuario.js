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
import Notiflix from "notiflix";



export const ListaUsuario = class {

    constructor() {
        this.listaUsuario = [];
    }

    async agregarUsuario(nombre, contraseña, idKonami, users) {
        try {
            const regexUsers = /^[a-z0-9]{5,}$/;
            let usernames = [];
            let idsKonami = [];
            for (let index = 0; index < users.length; index++) {
                let element = users[index];
                usernames.push(element.username);
                idsKonami.push(element.idKonami);
            }
            if (usernames.includes(nombre)) {
                Notiflix.Notify.failure("Nombre de usuario ya existe");
            } else if (idsKonami.includes(idKonami)) {
                Notiflix.Notify.failure("ID Konami ya existe");
            } else if (nombre == "" || contraseña == "" || idKonami == "") {
                Notiflix.Notify.failure("Debe llenar todos los campos");
            } else if (nombre.length < 5 || nombre.length > 10) {
                Notiflix.Notify.failure("Username debe tener al menos 5 caracteres y maximo 10");
            } else if (!regexUsers.test(nombre)) {
                Notiflix.Notify.failure("Username solo puede contener letras minúsculas y dígitos");
            } else if (contraseña.length < 5 || contraseña.length > 15) {
                Notiflix.Notify.failure("Contraseña debe tener al menos 5 caracteres y maximo 10");
            } else {
                let newUser = new Usuario(nombre, contraseña, idKonami);
                await addDoc(collection(db, "users"), newUser.getUser());
                Notiflix.Notify.success("Usuario creado con exito!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async actualizarUsuario(id, nombre, contraseña, idKonami, users) {
        try {
            const regexUsers = /^[a-z0-9]{5,}$/;
            if (nombre == "" || contraseña == "" || idKonami == "") {
                Notiflix.Notify.failure("Debe llenar todos los campos");
            } else if (nombre.length < 5 || nombre.length > 10) {
                Notiflix.Notify.failure("Username debe tener al menos 5 caracteres y maximo 10");
            } else if (!regexUsers.test(nombre)) {
                Notiflix.Notify.failure("Username solo puede contener letras minúsculas y dígitos");
            } else if (contraseña.length < 5 || contraseña.length > 15) {
                Notiflix.Notify.failure("Contraseña debe tener al menos 5 caracteres y maximo 10");
            } else {
                let updatedUser = new Usuario(nombre, contraseña, idKonami);
                await updateDoc(doc(db, "users", id), updatedUser.getUser());
                Notiflix.Notify.success("Usuario actualizado con exito!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async eliminarUsuario(id) {
        try {
            await deleteDoc(doc(db, "users", id)); 
            Notiflix.Notify.success("Usuario eliminado con exito!");
        } catch (error) {
            console.log(error);
        }
    }

    consultarUsuario(datoBuscado) {
        return this.listaUsuario = [];
    }
}