export const Prestamo = class {
    constructor() {
        this.carta = "";
        this.fecha = new Date().toLocaleDateString();	
        this.usuario = "";
        this.estado = 0; 
        this.cantidad = 0;
    }

    getCarta() {
        return this.carta;
    }

    setCarta(value) {
        this.carta = value;
    }

    getFecha() {
        return this.fecha;
    }

    setFecha(value) {
        this.fecha = value;
    }

    getUsuario() {
        return this.usuario;
    }

    setUsuario(value) {
        this.usuario = value;
    }

    getEstado() {
        return this._stado;
    }

    setEstado(value) {
        this.estado = value;
    }

    getCantidad() {
        return this.cantidad;
    }

    setCantidad(value) {
        this.cantidad = value;
    }

    getprestamo() {
        let prestamo = {
            carta : this.carta,
            fecha : this.fecha,
            usuario : this.usuario,
            estado : this.estado,
            cantidad : this.cantidad,
        }
        return prestamo;
    }
}
