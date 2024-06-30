<script>
  let menu = "Cartas";
  let cartas = [];
  async function LoadCards() {
    const response = await fetch(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php",
    );
    const data = await response.json();
    cartas = data.data;
    console.log(data);
  }
  LoadCards();

  import Notiflix from "notiflix";
  import { addDoc, collection, onSnapshot } from "firebase/firestore";
  import { db } from "../firebase";
  let editStatus = false;

  let cartones = [];
  onSnapshot(
    collection(db, "cartaBiblioteca"),
    (querySnapshot) => {
      cartones = querySnapshot.docs.map((doc) => {
        return { ...doc.data() };
      });
      console.log(cartones);
    },
    (err) => {
      console.log(err);
    },
  );

  let cartasBiblioteca = [
    {
      nombre: "Ash Blossom",
      tipo: "Monstruo",
      cantidad: 3,
    },
    {
      nombre: "Clock Wyvern",
      tipo: "Monstruo",
      cantidad: 5,
    },
  ];

  let cartaBiblioteca = [
    {
      nombre: "",
      tipo: "",
      prestadas: 0,
      cantidad: 0,
    },
  ];

  const createcartaBiblioteca = () => {
    const newcartaBiblioteca = {
      nombre: cartasBiblioteca.nombre,
      tipo: cartasBiblioteca.tipo,
      cantidad: cartasBiblioteca.cantidad,
      prestadas: 0,
    };

    cartaBiblioteca = newcartaBiblioteca;

    limpiarFormulario();
    Notiflix.Notify.success("Carta ingresada exitosamente!");
  };
  let foundElement;
  let tipo_carta;

  const onSubmitHadler = async () => {
    if (!editStatus) {
      if (laCartaExisteAPI(cartasBiblioteca.nombre)) {
        cartasBiblioteca.tipo = tipoExiste(cartasBiblioteca.nombre);
        cartasBiblioteca.cantidad = cantidadCorrecta(cartaBiblioteca.cantidad);
        if (laCartaExiste(cartasBiblioteca.nombre)) {
          Notiflix.Notify.failure("la carta ya existe dentro de la biblioteca");
        } else {
          if (cantidadCorrecta(cartasBiblioteca.nombre)) {
            createcartaBiblioteca();
            await addDoc(collection(db, "cartaBiblioteca"), cartaBiblioteca);
          }
        }
      } else {
        if (!laCartaExisteAPI(cartasBiblioteca.nombre)) {
          Notiflix.Notify.failure("la carta no existe");
        }
      }
    } else {
      console.log("h");
      updateUser();
    }
    limpiarFormulario();
    editStatus = false;
  };

  const limpiarFormulario = () => {
    cartasBiblioteca = {
      nombre: "",
      tipo: "",
      cantidad: 0,
    };
  };

  function laCartaExisteAPI(nombre) {
    for (let i = 0; i < cartas.length; i++) {
      if (cartas[i].name === nombre) return 1;
    }
    return 0;
  }

  function laCartaExiste(nombre) {
    for (let i = 0; i < cartones.length; i++) {
      if (cartones[i].nombre === nombre) return 1;
    }
    return 0;
  }

  function tipoExiste(nombre) {
    for (let i = 0; i < cartas.length; i++) {
      if (cartas[i].name === nombre) return cartas[i].type;
    }
    return "";
  }

  function cantidadCorrecta() {
    if (cartasBiblioteca.cantidad > 0 && cartasBiblioteca.cantidad < 27) {
      return cartasBiblioteca.cantidad;
    } else {
      Notiflix.Notify.failure("ha ingresado demasiadas cartas!");
      return false;
    }

    return false;
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
          <div
            class="d-sm-flex align-items-center justify-content-between mb-4"
          >
            <h1 class="h3 mb-0 text-gray-800">{menu}</h1>
          </div>

          <!--  comienzo a trabajar desde aqui   -->

          <div class="card mt-2 p-3">
            <h5 class="ml-2">Introduzca el nombre exacto de la carta</h5>
            <div class="card-body p-1">
              <form on:submit|preventDefault={onSubmitHadler}>
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Nombre de la carta"
                    id="username"
                    bind:value={cartasBiblioteca.nombre}
                    class="form-control"
                  />
                </div>

                <h5>
                  Introduzca la cantidad de copias de la carta (debe ser menor a
                  27 copias)
                </h5>
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Cantidad"
                    id="password"
                    bind:value={cartasBiblioteca.cantidad}
                    class="form-control"
                  />
                </div>

                <button class="btn btn-primary" id="save">
                  {#if editStatus}
                    Modificar
                  {:else}
                    Guardar
                  {/if}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          {#if cartasBiblioteca === 0}
            <div class="conatainer" style="text-align: center;">
              <div class="row">
                <div class="card">
                  <div class="card-body">
                    <h2>No hay cartas en el sistema</h2>

                    <img
                      src="../../src/assets/img/no_encontrado.png"
                      alt=""
                      class="img-fluid mx-auto"
                      width="200px"
                    />
                  </div>
                </div>
              </div>
            </div>
          {/if}

          <table
            id="Table"
            class="table table-striped ml-3 mt-3"
            style="width:100%"
            data-toggle="table"
            data-seach="true"
            data-searchable="true"
            data-pagination="true"
          >
            <thead>
              <tr>
                <th>Nombre de la carta</th>
                <th>Tipo</th>
                <th>Cantidad en biblioteca</th>
                <th>Cantidad prestadas</th>
              </tr>
            </thead>
            {#each cartones as e}
              <tbody>
                <tr>
                  <td>{e.nombre}</td>
                  <td>{e.tipo}</td>
                  <td>{e.cantidad}</td>
                  <td>{e.prestadas}</td>
                </tr>
              </tbody>
            {/each}
          </table>
          <!-- 
                  {#each cartones as e }
                    <div class="card mt-2">
                      <div class="row">
                        <div class="col-md-8 m-3">
                          <h5><strong>{e.nombre}</strong></h5>
                          <h5>{e.tipo}</h5>
                          <h5>{e.cantidad}</h5>
                          
                          
                         <button
                            on:click={() => deleteUser(user.id)} 
                            class="btn btn-danger"
                          > 
                            Eliminar
                          </button>
                          <button
                            on:click={() => updateDataToUpdateUser(user)}
                            class="btn btn-secondary"
                          >
                            Modificar
                          </button>
                        </div>
                      </div>
                    </div>
                  {/each}-->
        </div>

        <!------------------------------------------------------------------------------------------------------------->

        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->

      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->
  </div>
  <!-- End of Page Wrapper -->
</body>

<style>
  .sidebar {
    background-color: rgb(242, 91, 44);
  }
</style>
