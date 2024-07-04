import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
export const ListaRecord = class {

    constructor() {

        this.records = new Array();
    }

    async insertarRecord(record, db) {

        await addDoc(collection(db, "records"), record.getRecord());
    }

    async agregarVictoria(indice, db, id){

        this.records[indice].ganadas += 1;
        await updateDoc(doc(db, "records", id), this.records[indice].getRecord());
    }

    async agregarDerrota(indice, db, id){

        this.records[indice].perdidas += 1;
        await updateDoc(doc(db, "records", id), this.records[indice].getRecord());
    }

    async agregarEmpate(indice, db, id){

        this.records[indice].empatadas += 1;
        await updateDoc(doc(db, "records", id), this.records[indice].getRecord());
    }

    getRecords() {

        return this.records;
    }

    setRecords(records) {

        this.records = [];
        for(let i = 0; i<records.length; i++){

            this.records.push(records[0].record);
        }
    }

    buscarRecordUsuario(formato, usuario) {

        for (let i = 0; i < this.records.length; i++)
            if (this.records[i].getUsuario() === usuario && this.records[i].getFormato() === formato) return i;
        return -1;
    }

    getRecordsUsuario(usuario){

        let lista = [];

        for(let i = 0; i<this.records.length; i++){

            if(this.records[i].getUsuario() === usuario) lista.push(this.records[i]);
        }

        return lista;
    }
}