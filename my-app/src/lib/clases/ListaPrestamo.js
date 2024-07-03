import { Prestamo } from "./../../lib/clases/Prestamo.js";
import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  QuerySnapshot,
} from "firebase/firestore";

export const ListaPrestamos = class {
  constructor() {
    this.listaPres = [];
  }

  getlistaPrestamos() {
    return this.listaPres;
  }

  insertarPrestamo(prestamo) {
    this.listaPres.push(prestamo);
  }

  cambiarEstadoPrestamo(loans, cartas, estado, num, db, prestadoa) {
    let ID = loans[num].id;
    let cartaID = loans[num].cartaID;
    if (estado === 1) {
      updateDoc(doc(db, "loans", ID), {
        estado: estado,
      });
      let total =
        parseInt(prestadoa) +
        parseInt(cartas.find((carta) => carta.id === cartaID).prestadas);
      updateDoc(doc(db, "cartaBiblioteca", cartaID), {
        prestadas: total,
      });
    }
    else if(estado === 2){
      updateDoc(doc(db, "loans", ID), {
        estado: estado,});
    }
  }
};
