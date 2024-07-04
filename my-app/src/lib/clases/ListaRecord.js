import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { Record } from "./Record.js"
export const ListaRecord = class {

    constructor() {

        this.records = new Array();
    }

    async insertarRecord(record, db) {

        await addDoc(collection(db, "records"), record.getRecord());
    }

    async agregarPunto(indice, db, id, tipo) {

        if (tipo == 1) {
            this.records[indice].ganadas = this.records[indice].ganadas + 1;
            await updateDoc(doc(db, "records", id), this.records[indice].getRecord());
        }
        else if (tipo == 2) {
            this.records[indice].perdidas += 1;
            await updateDoc(doc(db, "records", id), this.records[indice].getRecord());
        }
        else if (tipo == 3) {
            this.records[indice].empatadas += 1;
            await updateDoc(doc(db, "records", id), this.records[indice].getRecord());
        }
    }

    getRecords() {

        return this.records;
    }

    setRecords(records) {

        this.records = [];
        let record = new Record();

        for (let i = 0; i < records.length; i++) {

            record.usuario = records[i].usuario;
            record.formato = records[i].formato;
            record.ganadas = records[i].ganadas;
            record.perdidas = records[i].perdidas;
            record.empatadas = records[i].empatadas;
            this.records[i] = record;
            record = new Record();
        }
    }

    buscarRecordUsuario(formato, usuario) {

        for (let i = 0; i < this.records.length; i++)
            if (this.records[i].usuario == usuario && this.records[i].formato == formato) return i;
        return -1;
    }

    getRecordsUsuario(listaRecord, usuario) {

        let lista = [];

        for (let i = 0; i < listaRecord.length; i++) {
            if (listaRecord[i].usuario == usuario) lista.push(listaRecord[i]);
        }

        return lista;
    }

    buscarID(formato, usuario, lista){
        for(let i = 0; i<lista.length; i++) if(lista[i].usuario == usuario && lista[i].formato == formato) return lista[i].id;
        return -1;
    }
}