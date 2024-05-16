<script>
  //Libreria de notificaciones
  import Notiflix from "notiflix";

  //Importaciones para db
  import { db } from "../firebase";
  import {
    addDoc,
    collection,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
  } from "firebase/firestore";

  import { onDestroy } from "svelte";

  //Variable vacia donde se guardan los usuarios
  let users = [];

  //Variable para buscar usuarios
  let search = "";

  $: visibleUsers = search
    ? users.filter((user) => {
        return user.username.match(`${search}.*`);
      })
    : users;

  let menux = "Jugadores"; //nombre del menú

  //Actualizaciones de data en timpo real
  const onsub = onSnapshot(
    collection(db, "users"),
    (querySnapshot) => {
      users = querySnapshot.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      });
      console.log(users);
    },
    (err) => {
      console.log(err);
    }
  );

  //Dejar de solicitar actualización al salir de ventana
  onDestroy(onsub);

  //Variable para editar y crear usuarios
  let editStatus = false;

  //Objeto usuario nuevo
  let usuario = {
    idKonami: "",
    username: "",
    password: "",
  };

  //Variable para guardar nombre de usuario a modificar aux
  let usernameToUpdate = "";

  //Funcion para crear usuario
  const createUser = async () => {
    try {
      const newUser = {
        idKonami: usuario.idKonami,
        username: usuario.username,
        password: usuario.password,
      };
      //Validar nombre de usuario existente
      // Expresión regular que verifica letras minúsculas y dígitos (al menos 5 caracteres, maximo 10)
      const regexUsers = /^[a-z0-9]{5,}$/;
      if (users.find((usuario) => usuario.username === newUser.username)) {
        throw new Error("Username ya existe");
      } else if (
        users.find((usuario) => usuario.idKonami === newUser.idKonami)
      ) {
        throw new Error("ID Konami ya existe");
      } else if (
        usuario.password == "" ||
        usuario.username == "" ||
        usuario.idKonami == ""
      ) {
        throw new Error("Debe llenar todos los campos");
      } else if (usuario.username.length < 5 || usuario.username.length > 10) {
        throw new Error(
          "Username debe tener al menos 5 caracteres y maximo 10"
        );
      } else if (!regexUsers.test(usuario.username)) {
        throw new Error(
          "Username solo puede contener letras minúsculas y dígitos"
        );
      } else if (usuario.password.length < 5 || usuario.password.length > 15) {
        throw new Error(
          "Contraseña debe tener al menos 5 caracteres y maximo 10"
        );
      }

      //Enviar a DB si no hay errores
      await addDoc(collection(db, "users"), newUser); //Conectar a la db y crear data
      limpiarFormulario();
      Notiflix.Notify.success("Usuario creado con exito!");
    } catch (e) {
      Notiflix.Notify.failure("Usuario no pudo ser creado: " + e.message);
    }
  };

  /*  Funciones para actualizar usuario */

  //Actualizar datos en formulario
  const updateDataToUpdateUser = (usuarioEdited) => {
    usuario = usuarioEdited;
    editStatus = true;
    usernameToUpdate = usuarioEdited.username;
  };

  //Actualizar datos en db
  const updateUser = () => {
    try {
      let updatedUser = {
        idKonami: usuario.idKonami,
        username: usuario.username,
        password: usuario.password,
      };

      
      if (true) {
        throw new Error("Username ya existe");
      } 

      updateDoc(doc(db, "users", usuario.id), updatedUser); //Conectar a la db y enviar data
      Notiflix.Notify.info("Usuario modificado con exito!");
      users = [];
    } catch (error) {
      Notiflix.Notify.failure("Usuario no pudo ser modificado: " + error);
    }
  };

  //Funcion para eliminar usuario
  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id)); //Conectar a la db y enviar data
      Notiflix.Notify.success("Usuario eliminado con exito!");
    } catch (error) {
      Notiflix.Notify.failure("Usuario no pudo ser eliminado" + error);
    }
  };

  //Manejador de eventos para guardar usuario en db
  const onSubmitHadler = () => {
    if (!editStatus) {
      createUser();
    } else {
      updateUser();
    }
    limpiarFormulario();
    editStatus = false;
  };

  //Funcion para limpiar formulario del front
  const limpiarFormulario = () => {
    usuario = {
      idKonami: "",
      username: "",
      password: "",
    };
  };
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
        <a class="nav-link" href="/dame">
          <i class="fas fa-fw fa-chart-area"></i>
          <span style="font-size:larger;">Dame cartas</span></a
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
                href="/login"
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
                  <h1 class="h3 mb-0 text-gray-800 mb-1">{menux}</h1>
                  <input
                    type=""
                    bind:value={search}
                    class="form-control"
                    placeholder="Buscar"
                  />
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
                            id="idKonami"
                            bind:value={usuario.idKonami}
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
                              src="https://firebasestorage.googleapis.com/v0/b/omegaproxy-4abfe.appspot.com/o/no_encontrado.png?alt=media&token=8dc8d728-7577-4a8f-a1e5-c7480a381dc4"
                              alt=""
                              class="img-fluid mx-auto"
                              width="200px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  {/if}
                  {#each visibleUsers as user}
                    <div class="card mt-2">
                      <div class="row">
                        <div class="col-md-8 m-3">
                          <h5><strong>{user.username}</strong></h5>
                          <h5>{user.password}</h5>
                          <h5>{user.idKonami}</h5>

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
