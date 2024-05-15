<script>

    let date = new Date();
    export let preFormato;
    let formato = new Array();
    let fecha = fechaActual();

    function token(input){

        for (let i = 0; i < input.length; i += 8){

            formato.push(input.slice(i,i+7));
        }
    }

    token(preFormato);

    function fechaActual(){

        let fecha = new Date().getFullYear().toString()+"-";

        if (new Date().getMonth().toString().localeCompare("9")==-1){

            let mes = parseInt(new Date().getMonth().toString()) + 1;
            fecha += "0"+ mes.toString();
        }
        else if (new Date().getMonth().toString().localeCompare("9")==-1){

            fecha += "10";
        }
        else{

            fecha += new Date().getMonth().toString();
        }

        return fecha;
    }

    function buscarFormato(formato, fecha){

        for (let i = 0; i < formato.length; i++){

            if (formato[i]==fecha){

                return i;
            }
        }
        return -1;
    }

    function handle(e){

        const target = e.target;
        if (target.id=="fecha"){

            fecha = target.value;
        }
    }

    function nuevoFormato(){

        if(buscarFormato(formato, fecha) < 0){

            if (window.confirm("Esta seguro de crear el formato [" + fecha + "]")){

                formato.push(fecha);
                window.alert("El formato [" + fecha + "] fue creado con exito");
            }
            else{

                window.alert("No fue creado el formato [" + fecha + "]");
            }
        }
        else{

            window.alert("El formato que intenta insartar ya existe");
        }
    }

</script>

<button type="submit" class="btn btn-primary">Regresar</button>
<div class="container">
    <div class="abs-center">
      <form action="#" class="border p-3 form">
        <div class="form-group">
            <div class="mb-3">
                <label for="calendario">Introduzca la fecha del nuevo formato</label>
                <input type="month" value = {fecha} class="form-control" id = "calendario" min = "1999-07" on:change={handle}>
            </div>
        </div>
        <button type="submit" class="btn btn-primary" on:click={nuevoFormato}>Insertar</button>
      </form>
    </div>
  </div>

<style>

    .abs-center {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    }

    .form {
    width: 450px;
    }

</style>
