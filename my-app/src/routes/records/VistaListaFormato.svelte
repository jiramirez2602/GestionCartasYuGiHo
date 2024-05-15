<script>

    export let prePagina;
    let pagina = parseInt(prePagina);
    export let preFormato;
    let formato = new Array();

    function token(input){

        for (let i = 0; i < input.length; i += 8){

            formato.push(input.slice(i,i+7));
        }
    }

    token(preFormato);

    function cambiarVistaInsertar(){

        pagina = 1;
    }

</script>

<table class="table manage-candidates-top mb-0">
    <thead>
      <tr>
        <th>Formato</th>
        <th class="text-center">Estado</th>
        <th class="action text-right">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each formato as e, num}
      {#if num+1 <= 6}
      <tr class="candidates-list">
        <td class="title">
          <div class="candidate-list-details">
            <div class="candidate-list-info">
              <div class="candidate-list-title">
                <span class="candidate-list-time order-1">{e}</span>
              </div>
            </div>
          </div>
        </td>
        <td class="candidate-list-favourite-time text-center">
          {#if num==0}
          <a class="candidate-list-favourite order-2 text-danger"></a><i class="fas fa-heart"></i>
          <span class="candidate-list-time order-1">Actual</span>
          {:else}
          <span class="candidate-list-time order-1">Legado</span>
          {/if}
        </td>
        <td>
          <ul class="list-unstyled mb-0 d-flex justify-content-end">
            <li><a href="#" class="text-primary" data-toggle="tooltip" title="" data-original-title="view"><i class="far fa-eye"></i></a></li>
            <li><a href="#" class="text-info" data-toggle="tooltip" title="" data-original-title="Edit"><i class="fas fa-pencil-alt"></i></a></li>
            <li><a href="#" class="text-danger" data-toggle="tooltip" title="" data-original-title="Delete"><i class="far fa-trash-alt"></i></a></li>
          </ul>
        </td>
      </tr>
      {/if}
      {/each}
    </tbody>
</table>

<style>

  .user-dashboard-info-box .title {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding: 30px 0;
  }

  .user-dashboard-info-box .candidates-list td {
      vertical-align: middle;
  }

  .user-dashboard-info-box td li {
      margin: 0 4px;
  }

  .user-dashboard-info-box .table thead th {
      border-bottom: none;
  }

  .table.manage-candidates-top th {
      border: 0;
  }

  .user-dashboard-info-box .candidate-list-favourite-time .candidate-list-favourite {
      margin-bottom: 10px;
  }

  .table.manage-candidates-top {
      min-width: 650px;
  }

  .user-dashboard-info-box .candidate-list-details ul {
      color: #969696;
  }

  /* Candidate List */

  .candidate-list-title {
      margin-bottom: 5px;
  }

  .candidate-list .candidate-list-favourite-time span {
      display: block;
      margin: 0 auto;
  }
  .candidate-list .candidate-list-favourite-time .candidate-list-favourite {
      display: inline-block;
      position: relative;
      height: 40px;
      width: 40px;
      line-height: 40px;
      border: 1px solid #eeeeee;
      border-radius: 100%;
      text-align: center;
      -webkit-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
      margin-bottom: 20px;
      font-size: 16px;
      color: #646f79;
  }
  .candidate-list .candidate-list-favourite-time .candidate-list-favourite:hover {
      background: #ffffff;
      color: #e74c3c;
  }
</style>