<script>
  //TODO:Validar usuarios nuevo
  //TODO: agregar campos correo y id de juego
  //TODO: persistir datos en json
  //TODO: conectar a firebase
  

  let menux = "Jugadores";
  /***********************************************************************/
  import { v4 } from "uuid";
  import Notiflix from "notiflix";
  let editStatus = false;
  let users = [
    {
      konami_id: "qwe456",
      username: "Jorge",
      password: "admin",
    },
    {
      konami_id: "abc123",
      username: "Jorge",
      password: "admin",
    },
  ];
  let usuario = {
    konami_id: "",
    username: "",
    password: "",
  };
  const createUser = () => {
    const newUser = {
      konami_id: usuario.konami_id,
      username: usuario.username,
      password: usuario.password,
    };
    users = users.concat(newUser);
    limpiarFormulario();
    Notiflix.Notify.success("Usuario creado con exito!");
  };

  const updateDataToUpdateUser = (usuarioEdited) => {
    usuario = usuarioEdited;
    editStatus = true;
  };

  const updateUser = () => {
    let updatedProduct = {
      konami_id: usuario.konami_id,
      username: usuario.username,
      password: usuario.password,
    };
    users = users.map((user) =>
      user.konami_id === usuario.konami_id ? updatedProduct : user
    );
    Notiflix.Notify.info("Usuario modificado con exito!");
  };

  const onSubmitHadler = () => {
    if (!editStatus) {
      createUser();
    } else {
      updateUser();
    }
    limpiarFormulario();
    editStatus = false;
  };

  const limpiarFormulario = () => {
    usuario = {
      konami_id: "",
      username: "",
      password: "",
    };
  };

  const deleteUser = (id) => {
    users = users.filter((user) => user.konami_id !== id);
    Notiflix.Notify.warning("Usuario eliminado con exito!");
  };
  /************************************************************************/
</script>

<body id="page-top">
  <!-- Page Wrapper -->
  <div id="wrapper">
    <!-- Sidebar -->
    <ul class="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">
      <!-- Sidebar - Brand -->
      <a
        class="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div class="sidebar-brand-icon mt-4">
          <img
            src="../../src/assets/img/isotipo.png"
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

      <!-- Nav Item - Tables -->
      <li class="nav-item">
        <a class="nav-link" href="/prestamos">
          <i class="fas fa-fw fa-table"></i>
          <span style="font-size:larger;">Préstamos</span></a
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
                src="../../src/assets/img/logotipo.png"
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
                  href="/login"
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
            <!------------------------------------------------------------------------------------------------------------->

            <div class="container p-4">
              <div class="row">
                <div class="col-md-6">
                  <h1 class="h3 mb-0 text-gray-800 mb-1" >{menux}</h1>

                  <div class="card mt-2">
                    <div class="card-body">
                      <form on:submit|preventDefault={onSubmitHadler}>
                        <div class="form-group">
                          <input
                            type="text"
                            placeholder="Nombre de usuario"
                            id="username"
                            bind:value={usuario.username}
                            class="form-control"
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            placeholder="Contraseña"
                            id="password"
                            bind:value={usuario.password}
                            class="form-control"
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            placeholder="Konami ID"
                            id="konami_id"
                            bind:value={usuario.konami_id}
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
                  {#if users.length === 0}
                    <div class="conatainer" style="text-align: center;">
                      <div class="row">
                        <div class="card">
                          <div class="card-body">
                            <h2>No hay jugadores en el sistema</h2>

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
                  {#each users as user}
                    <div class="card mt-2">
                      <div class="row">
                        <div class="col-md-8 m-3">
                          <h5><strong>{user.username}</strong></h5>
                          <h5>{user.password}</h5>
                          <h5>{user.konami_id}</h5>
                          
                          <button
                            on:click={() => deleteUser(user.konami_id)}
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
                  {/each}
                </div>
              </div>
            </div>
            <!------------------------------------------------------------------------------------------------------------->
          </div>
        </div>
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
