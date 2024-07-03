<script>
  import Notiflix from "notiflix";
  import { admin, usuario, formatoActual } from "./../../lib/store/Store.js";
  import { ListaFormato } from "./../../lib/clases/ListaFormato.js";
  import { ListaRecord } from "./../../lib/clases/ListaRecord.js";
  import { Record } from "./../../lib/clases/Record.js";
  import { db } from "../firebase";
  import { addDoc, collection, onSnapshot } from "firebase/firestore";

  let pagina = 0;
  let fecha = fechaActual();
  let formatos = new ListaFormato();
  let formato = {
    fecha: "",
  };
  let lista = [];
  let listaRecord = new ListaRecord();

  Notiflix.Confirm.init({
    okButtonBackground: "#F25B2C",
    titleColor: "#F25B2C",
  });

  function fechaActual() {
    let fecha = new Date().getFullYear().toString() + "-";

    if (new Date().getMonth().toString().localeCompare("9") == -1) {
      let mes = parseInt(new Date().getMonth().toString()) + 1;
      fecha += "0" + mes.toString();
    } else if (new Date().getMonth().toString().localeCompare("9") == 1) {
      fecha += "10";
    } else {
      fecha += new Date().getMonth().toString();
    }

    return fecha;
  }

  function cambiarMPorY(input) {
    input = input.slice(5, input.length) + "-" + input.slice(0, 4);

    return input;
  }

  function cambiarVistaInsertar() {
    pagina = 1;
  }

  function cambiarVistaInsertarRecord() {
    pagina = 2;
  }

  function cambiarVistaLista() {
    pagina = 0;
    fecha = fechaActual();
  }

  function handle(e) {
    const target = e.target;
    if (target.id == "calendario") {
      fecha = target.value;
    } else if (
      target.id == "botonVictoria" ||
      target.id == "botonDerrota" ||
      target.id == "botonEmpate"
    ) {

      let indice = listaRecord.buscarRecordUsuario($formatoActual,$usuario);

      if ($usuario == "")
        Notiflix.Notify.info("Debe iniciar sesion para usar esta opcion");
      else if (listaRecord.records[indice] == null) {
        let record = new Record();
        record.setUsuario($usuario);

        if (target.id == "botonVictoria") record.setGanadas(1);
        else if (target.id == "botonDerrota") record.setPerdidas(1);
        else if (target.id == "botonEmpate") record.setEmpatadas(1);

        record.setFormato($formatoActual);

        listaRecord.insertarRecord(record);
      }

    }
  }

  const nuevoFormato = async () => {
    let numero = formatos.buscarformatos(formatos.formatos, fecha);
    if (numero < 0) {
      formato.fecha = fecha;
      await addDoc(collection(db, "formatos"), formato);
      Notiflix.Notify.success(
        "El formato [" + cambiarMPorY(fecha) + "] fue creado con exito",
      );
      cambiarVistaLista();
      fecha = fechaActual();
    } else {
      Notiflix.Notify.failure("El formato que intenta insertar ya existe");
    }
  };

  onSnapshot(collection(db, "formatos"), (querySnapshot) => {
    lista = querySnapshot.docs.map((doc) => {
      return { ...doc.data() };
    });
    lista.sort(function (a, b) {
      if (a.fecha > b.fecha) {
        return -1;
      }
      if (a.fecha < b.fecha) {
        return 1;
      }
      return 0;
    });
    formatos.setFormatos(lista);
    cambiarFormato(formatos.formatos[0].fecha);
  });

  function notifi() {
    Notiflix.Confirm.prompt(
      "Hello",
      "How are you feeling?",
      "",
      "Answer",
      "Cancel",
      (clientAnswer) => {
        alert("Client answer is: " + clientAnswer);
      },
      (clientAnswer) => {
        alert("Client answer was: " + clientAnswer);
      },
      {},
    );
  }

  function cambiarFormato(x) {
    formatoActual.set(x);
  }
</script>

<body id="page-top">
  <!-- Page Wrapper -->
  <div id="wrapper">
    <!-- Sidebar -->
    <ul class="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">
      <!-- Sidebar - Brand -->
      <a
        class="sidebar-brand d-flex align-items-center justify-content-center"
        href="/cartas"
      >
        <div class="sidebar-brand-icon mt-4">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/omegaproxy-4abfe.appspot.com/o/isotipo.png?alt=media&token=55b51f65-c906-4427-ba2b-39bfea66ada9"
            alt="Descripción de la imagen"
            style="width: 120px;"
          />
        </div>
      </a>
      <br />
      <!-- Divider -->
      <hr class="sidebar-divider my-0" />

      <!-- Divider -->
      <hr class="sidebar-divider" />

      <!-- Heading -->
      <div
        style="font-size:larger; color:white; text-align:center"
        class="sidebar-heading"
      >
        Menu
      </div>

      <!-- Nav Item - Charts -->
      <li class="nav-item">
        <a class="nav-link" href="/cartas">
          <i class="fas fa-fw fa-chart-area"></i>
          <span style="font-size:larger;">Cartas</span></a
        >
      </li>

      <!-- Nav Item - Charts -->
      <li class="nav-item">
        <a class="nav-link" href="/prestamos">
          <i class="fas fa-fw fa-chart-area"></i>
          <span style="font-size:larger;">Prestamos</span></a
        >
      </li>

      <!-- Nav Item - Tables -->
      <li class="nav-item">
        <a class="nav-link" href="/jugadores">
          <i class="fas fa-fw fa-clipboard-list"></i>
          <span style="font-size:larger;">Jugadores</span></a
        >
      </li>

      <!-- Nav Item - Charts -->
      <li class="nav-item">
        <a class="nav-link" href="/records">
          <i class="fas fa-fw fa-chart-area"></i>
          <span style="font-size:larger;">Records</span></a
        >
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider d-none d-md-block" />
    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <!-- Topbar -->
        <nav
          class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
        >
          <!-- Sidebar Toggle (Topbar) -->
          <button
            id="sidebarToggleTop"
            class="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i class="fa fa-bars"></i>
          </button>

          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">
            <li class="nav-item mt-2">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/omegaproxy-4abfe.appspot.com/o/logotipo.png?alt=media&token=8e737513-5251-42be-b83f-efaeb59edf79"
                alt="Navbar Logo"
                class="img-fluid"
                width="200px"
                style="margin-top: 10px;"
              />
            </li>
            <!-- User Info -->
            <li class="nav-item dropdown no-arrow">
              <a
                class="nav-link dropdown-toggle"
                href="/"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="mr-2 d-none d-lg-inline text-gray-600 small"
                ></span>
                <button type="button" class="btn btn-outline-danger">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    ></path>
                  </svg>
                  Salir
                </button>
              </a>
              <!-- logout -->
              <div
                class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <a
                  class="dropdown-item"
                  href="/"
                  data-toggle="modal"
                  data-target="#logoutModal"
                >
                  <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"
                  ></i>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">
          <!-- Page Heading -->
          {#if pagina == 0}
            <div
              class="d-sm-flex align-items-center justify-content-between mb-4"
            >
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css"
                integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA="
                crossorigin="anonymous"
              />
              <div class="container mt-3 mb-4">
                <div class="col-lg-9 mt-4 mt-lg-0">
                  <div class="row">
                    <div class="col-md-12">
                      <div
                        class="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm"
                      >
                        {#if lista[0] && pagina == 0}
                          <table class="table manage-candidates-top mb-0">
                            <thead>
                              <tr>
                                <th>formato</th>
                                <th class="text-center">Estado</th>
                                <th class="action text-right">Acciones</th>
                              </tr>
                            </thead>
                            <tbody>
                              {#each formatos.formatos as e, num}
                                {#if num + 1 <= 6 && $admin == 1}
                                  <tr class="candidates-list">
                                    <td class="title">
                                      <div class="candidate-list-details">
                                        <div class="candidate-list-info">
                                          <div class="candidate-list-title">
                                            <span
                                              class="candidate-list-time order-1"
                                              >{cambiarMPorY(e.fecha)}</span
                                            >
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      class="candidate-list-favourite-time text-center"
                                    >
                                      {#if num == 0}
                                        <i
                                          class="candidate-list-favourite order-2 text-danger"
                                        ></i><i class="fas fa-heart"></i>
                                        <span
                                          class="candidate-list-time order-1"
                                          >Actual</span
                                        >
                                      {:else}
                                        <span
                                          class="candidate-list-time order-1"
                                          >Legado</span
                                        >
                                      {/if}
                                    </td>
                                    <td>
                                      <ul
                                        class="list-unstyled mb-0 d-flex justify-content-end"
                                      >
                                        <li>
                                          <i
                                            class="text-danger"
                                            data-toggle="tooltip"
                                            title=""
                                            data-original-title="Delete"
                                            ><i class="far fa-trash-alt"></i></i
                                          >
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                {:else if num + 1 <= 6 && $admin == 0}
                                  <tr class="candidates-list">
                                    <td class="title">
                                      <div class="candidate-list-details">
                                        <div class="candidate-list-info">
                                          <div class="candidate-list-title">
                                            <span
                                              class="candidate-list-time order-1"
                                              >{cambiarMPorY(e.fecha)}</span
                                            >
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      class="candidate-list-favourite-time text-center"
                                    >
                                      {#if num == 0}
                                        <i
                                          class="candidate-list-favourite order-2 text-danger"
                                        ></i><i class="fas fa-heart"></i>
                                        <span
                                          class="candidate-list-time order-1"
                                          >Actual</span
                                        >
                                      {:else}
                                        <span
                                          class="candidate-list-time order-1"
                                          >Legado</span
                                        >
                                      {/if}
                                    </td>
                                    <td>
                                      <ul
                                        class="list-unstyled mb-0 d-flex justify-content-end"
                                      >
                                        <li>
                                          <i
                                            href="#"
                                            class="text-primary"
                                            data-toggle="tooltip"
                                            title=""
                                            data-original-title="view"
                                            ><i class="far fa-eye"></i></i
                                          >
                                        </li>
                                        <li>
                                          <i
                                            class="text-info"
                                            data-toggle="tooltip"
                                            title=""
                                            data-original-title="Edit"
                                            ><i class="fas fa-pencil-alt"
                                            ></i></i
                                          >
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                {/if}
                              {/each}
                            </tbody>
                          </table>
                          {#if $admin == 1}
                            <div class="text-center mt-3 mt-sm-3">
                              <button
                                class="btn btn-primary"
                                on:click={cambiarVistaInsertar}
                                >Insertar nuevo formato</button
                              >
                            </div>
                          {:else if $admin == 0}
                            <div class="text-center mt-3 mt-sm-3">
                              <button
                                class="btn btn-primary"
                                on:click={cambiarVistaInsertarRecord}
                                >Insertar nuevo record</button
                              >
                            </div>
                          {/if}
                        {:else if formatos[0] == null && pagina == 0}
                          {#if $admin == 0}
                            <div class="text-center mt-3 mt-sm-3">
                              <span class="candidate-list-time order-1"
                                >Usted no ha jugado en ningun formato</span
                              >
                              <br /><br />
                            </div>
                          {:else if $admin == 1}
                            <div class="text-center mt-3 mt-sm-3">
                              <button
                                class="btn btn-primary"
                                on:click={cambiarVistaInsertar}
                                >Insertar nuevo formato</button
                              >
                              <br /><br />
                            </div>
                          {/if}
                        {/if}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {:else if pagina == 1}
            <div class="container">
              <button class="btn btn-primary" on:click={cambiarVistaLista}
                >Regresar</button
              >
              <div class="abs-center">
                <form action="#" class="border p-3 form">
                  <div class="form-group">
                    <div class="mb-3">
                      <label for="calendario"
                        >Introduzca la fecha del nuevo formato</label
                      >
                      <input
                        type="month"
                        value={fecha}
                        class="form-control"
                        id="calendario"
                        min="1999-07"
                        on:change={handle}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    on:click={nuevoFormato}>Insertar</button
                  >
                </form>
              </div>
            </div>
          {:else if pagina == 2}
            <div class="container">
              <button class="btn btn-primary" on:click={cambiarVistaLista}
                >Regresar</button
              >
              <div class="abs-center">
                <form id="botones" action="#" class="border p-3 form">
                  <button
                    id="botonVictoria"
                    type="submit"
                    class="btn btn-primary"
                    on:click={handle}>Victoria</button
                  >
                  <button
                    id="botonDerrota"
                    type="submit"
                    class="btn btn-primary">Derrota</button
                  >
                  <button id="botonEmpate" type="submit" class="btn btn-primary"
                    >Empate</button
                  >
                </form>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</body>

<style>
  .sidebar {
    background-color: rgb(242, 91, 44);
  }
  .p-4 {
    padding: 1.5rem !important;
  }
  .mb-0,
  .my-0 {
    margin-bottom: 0 !important;
  }
  .shadow-sm {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  }

  .candidate-list-details ul li {
    margin: 5px 10px 5px 0px;
    font-size: 13px;
  }

  .bg-white {
    background-color: #ffffff !important;
  }
  .p-4 {
    padding: 1.5rem !important;
  }
  .mb-0,
  .my-0 {
    margin-bottom: 0 !important;
  }
  .shadow-sm {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  }
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

  .user-dashboard-info-box
    .candidate-list-favourite-time
    .candidate-list-favourite {
    margin-bottom: 10px;
  }

  .table.manage-candidates-top {
    min-width: 650px;
  }

  .user-dashboard-info-box .candidate-list-details ul {
    color: #969696;
  }

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
  .candidate-list
    .candidate-list-favourite-time
    .candidate-list-favourite:hover {
    background: #ffffff;
    color: #e74c3c;
  }
  .abs-center {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
  }

  .form {
    width: 450px;
  }

  #botones {
    text-align: center;
  }
</style>
