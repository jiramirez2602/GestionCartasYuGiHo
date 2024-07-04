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

  cambiarEstadoPrestamo(loans, cartas, estado, num, db, prestadoa, idcam, id ) {
    let ID = loans[num].id;
    let cartaID = loans[num].cartaid;
    if (estado === 1) {
      updateDoc(doc(db, "loans", ID), {
        estado: estado,
      });
      let total = 
      parseInt(cartas.find((carta) => carta.id === cartaID).prestadas) +
        parseInt(prestadoa);   
      updateDoc(doc(db, "cartaBiblioteca", cartaID), {
        prestadas: total,
      });
    }
    else if(estado === 2){
      updateDoc(doc(db, "loans", ID), {
        estado: estado,});
    }
    else if(estado === 3){
      let total = parseInt(cartas.find((carta) => carta.id === idcam).prestadas) -
        parseInt(prestadoa);      
      updateDoc(doc(db, "loans", id), {
        estado: estado,
      });
      updateDoc(doc(db, "cartaBiblioteca", idcam), {
        prestadas: total,
      });
    }
  }
};
