export const ListaRecord = class{

    constructor(){

        this.records = new Array();
    }

    insertarRecord(record){

        this.records.push(record);
    }

    getRecords(){

        return this.records;
    }

    setRecords(records){

        this.records = records;
    }

    buscarRecordUsuario(formato, usuario){

        for(let i = 0; i<this.records.length; i++) 
        if (this.records[i].getUsuario == usuario && this.records[i].getFormato == formato) return i;
        return -1;
    }
}