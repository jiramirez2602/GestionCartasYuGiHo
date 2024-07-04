<script>
  import Notiflix from "notiflix";
  import { ListaPrestamos } from "./../../lib/clases/ListaPrestamo.js";
  import { Prestamo } from "./../../lib/clases/Prestamo.js";
  import { admin, usuario } from "./../../lib/store/Store.js";
  import { onDestroy } from "svelte";
  import { Usuario } from "../../lib/clases/Usuario.js";
  import { Carta } from "../../lib/clases/Carta.js";
  import { db } from "../firebase";
  import {
    addDoc,
    collection,
    onSnapshot,
    where,
    deleteDoc,
    doc,
    updateDoc,
    QuerySnapshot,
    connectFirestoreEmulator,
    query,
  } from "firebase/firestore";

  let menu = "Prestamo de cartas";
  let cartas = [];
  let loans = [];
  let users = [];
  let userselec = [];
  let finali = [];
  let vista = 0;
  let historia = 0;
  let adminstrar = 0;
  let nuevoPrestamo = new Prestamo();
  let ListaPrestamo = new ListaPrestamos();

  function handle(e) {
    if (
      e.target.id.slice(0, 4) === "btna" &&
      e.target.id.slice(0, 4) === "btnb"
    ) {
      let a = e.target.parentNode.children[0].id;
      let b = e.target.parentNode.children[1].id;

      const btna = document.getElementById(a);
      const btnb = document.getElementById(b);

      btna.disabled = true;
      btnb.disabled = true;
    } else if (e.target) {
      let c = e.target.parentNode.children[0].id;

      const btnc = document.getElementById(c);

      btnc.disabled = true;
    }
  }

  const onsub = onSnapshot(
    collection(db, "cartaBiblioteca"),
    (QuerySnapshot) => {
      cartas = QuerySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    },
    (err) => {
      console.log(err);
    }
  );

  const onsub1 = onSnapshot(
    collection(db, "loans"),
    (QuerySnapshot) => {
      loans = QuerySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      ListaPrestamo = new ListaPrestamos();
      loans.forEach((loans) => {
        nuevoPrestamo = new Prestamo();
        nuevoPrestamo.setUsuario(loans.usuario);
        nuevoPrestamo.setCarta(loans.carta);
        nuevoPrestamo.setEstado(loans.estado);
        nuevoPrestamo.setFecha(loans.fecha);
        nuevoPrestamo.setCantidad(loans.cantidad);
        ListaPrestamo.insertarPrestamo(nuevoPrestamo);
      });
    },
    (err) => {
      console.log(err);
    }
  );

  const onsub2 = onSnapshot(
    collection(db, "users"),
    (querySnapshot) => {
      users = querySnapshot.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      });
    },
    (err) => {
      console.log(err);
    }
  );

  onDestroy(onsub);
  onDestroy(onsub1);
  onDestroy(onsub2);

  function generarListaFinalizacion() {
    finali = [];
    loans.forEach((e) => {
      if (e.estado == 1) {
        finali.push(e);
      }
    });
    console.log(finali);
  }

  function cambiarSeleccion(event) {
    let seleccionado = event.target.value;
    userselec = [];
    loans.forEach((e) => {
      if (e.usuario == seleccionado) {
        userselec.push(e);
      }
    });
  }

  function notifi() {
    return new Promise((resolve, reject) => {
      Notiflix.Confirm.prompt(
        "Hola",
        "Por favor, ingresa la cantidad de préstamos (1, 2 o 3)",
        "",
        "Pedir prestamo",
        "Cancel",
        (clientAnswer) => {
          try {
            const cantidad = parseInt(clientAnswer);
            resolve(cantidad); // Resuelve la promesa con la cantidad
          } catch (e) {
            Notiflix.Notify.failure("Cantidad Invalida");
            reject(new Error("Cantidad Invalida")); // Rechaza la promesa
          }
        },
        () => {
          Notiflix.Notify.failure("Solicitud de préstamo cancelada");
          reject(new Error("Solicitud de préstamo cancelada")); // Rechaza la promesa
        },
        {}
      );
    });
  }

  async function pedirPrestamo(ID) {
    let cantidad = await notifi();
    if (cantidad == -1) {
      return;
    } else {
      try {
        let total =
          parseInt(cartas.find((carta) => carta.id === ID).prestadas) +
          parseInt(cantidad);
        if (cantidad > cartas.find((carta) => carta.id === ID).cantidad) {
          throw new Error("No hay suficientes cartas en la biblioteca");
        } else if (parseInt(cantidad) < 1 || parseInt(cantidad) > 3) {
          throw new Error("Cantidad no válida");
        } else if (
          total > parseInt(cartas.find((carta) => carta.id === ID).cantidad)
        ) {
          throw new Error("No hay suficientes cartas en la biblioteca");
        }
        nuevoPrestamo.setUsuario($usuario);
        nuevoPrestamo.setCarta(cartas.find((carta) => carta.id === ID).nombre);
        nuevoPrestamo.setEstado(0);
        nuevoPrestamo.setFecha(new Date().toLocaleString());
        nuevoPrestamo.setCantidad(parseInt(cantidad));
        let np = {
          usuario: nuevoPrestamo.getprestamo().usuario,
          carta: nuevoPrestamo.getprestamo().carta,
          estado: nuevoPrestamo.getprestamo().estado,
          fecha: nuevoPrestamo.getprestamo().fecha,
          cantidad: nuevoPrestamo.getprestamo().cantidad,
          cartaid: ID,
        };
        ListaPrestamo.insertarPrestamo(nuevoPrestamo);
        await addDoc(collection(db, "loans"), np);
        Notiflix.Notify.success("Solicitud de préstamo enviada");
      } catch (e) {
        Notiflix.Notify.failure(
          "Solicitud de préstamo cancelada por " + e.message
        );
      }
    }
  }

  function cambiarvista(x) {
    if (x == 0) {
      vista = 0;
    } else if (x == 1) {
      vista = 1;
    } else if (x == 2) {
      vista = 2;
    }
  }

  function historial(y) {
    if (y == 0) {
      historia = 0;
    } else if (y == 1) {
      historia = 1;
    } else if (y == 2) {
      historia = 2;
    } else if (y == 3) {
      historia = 3;
    } else if (y == 4) {
      historia = 4;
    } else if (y == 5) {
      historia = 5;
    }
  }

  function administrarPrestamo(z) {
    if (z == 0) {
      adminstrar = 0;
    } else if (z == 1) {
      adminstrar = 1;
    }
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
          <button class="btn btn-primary" on:click={() => cambiarvista(0)}
            >Pedir Prestamo</button
          >
          {#if $admin == 1}
            <button class="btn btn-primary" on:click={() => cambiarvista(1)}
              >Administracion de prestamos</button
            >
          {/if}
          <button class="btn btn-primary" on:click={() => cambiarvista(2)}
            >Historial de prestamos</button
          >
        </div>
        <!-- /.container-fluid -->
        {#if vista == 0}
          <table
            id="Table"
            class="table table-striped m-3"
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
                <th>ID</th>
                <th>Acción</th>
              </tr>
            </thead>
            {#each cartas as carta (carta.id)}
              <tbody>
                <tr>
                  <td>{carta.nombre}</td>
                  <td>{carta.tipo}</td>
                  <td>{carta.cantidad}</td>
                  <td>{carta.id}</td>
                  <td>
                    <button
                      class="btn btn-primary m-1 p-0"
                      on:click={pedirPrestamo(carta.id)}>Pedir prestamo</button
                    >
                  </td>
                </tr>
              </tbody>
            {/each}
          </table>
        {/if}
        {#if vista == 1}
          <p></p>
          <button
            class="btn btn-primary"
            on:click={() => administrarPrestamo(0)}
            >Aceptar/Rechazar Prestamo</button
          >
          <button
            class="btn btn-primary"
            on:click={() => administrarPrestamo(1)}
            on:click={generarListaFinalizacion}
            >Finalizacion de prestamos</button
          >
          {#if adminstrar == 0}
            <table
              id="Table"
              class="table table-striped"
              style="width:100%"
              data-toggle="table"
              data-seach="true"
              data-searchable="true"
              data-pagination="true"
            >
              <thead>
                <tr>
                  <th>Nombre de la carta</th>
                  <th>Cantidad a prestamo</th>
                  <th>Fecha de la solicitud</th>
                  <th>Estado</th>
                  <th>Usuario</th>
                  <th>Aceptar/Rechazar</th>
                </tr>
              </thead>
              {#each ListaPrestamo.listaPres as e, num}
                {#if e.estado == 0}
                  <tbody>
                    <tr>
                      <td>{e.carta}</td>
                      <td>{e.cantidad}</td>
                      <td>{e.fecha}</td>
                      {#if e.estado == 0}
                        <td>En espera</td>
                      {:else if e.estado == 1}
                        <td>Aceptado</td>
                      {:else}
                        <td>Rechazado</td>
                      {/if}
                      <td>{e.usuario}</td>
                      <td>
                        <button
                          id={"btna" + num}
                          on:click={handle}
                          on:click={ListaPrestamo.cambiarEstadoPrestamo(
                            loans,
                            cartas,
                            1,
                            num,
                            db,
                            e.cantidad
                          )}>Aceptar</button
                        >
                        <button
                          id={"btnb" + num}
                          on:click={handle}
                          on:click={ListaPrestamo.cambiarEstadoPrestamo(
                            loans,
                            cartas,
                            2,
                            num,
                            db,
                            e.cantidad
                          )}>Rechazar</button
                        >
                      </td></tr
                    >
                  </tbody>
                {/if}
              {/each}
            </table>
          {/if}
          {#if adminstrar == 1}
            <p></p>
            <table
              id="Table"
              class="table table-striped"
              style="width:100%"
              data-toggle="table"
              data-seach="true"
              data-searchable="true"
              data-pagination="true"
            >
              <thead>
                <tr>
                  <th>Nombre de la carta</th>
                  <th>Cantidad a prestamo</th>
                  <th>Fecha de la solicitud</th>
                  <th>Estado</th>
                  <th>Usuario</th>
                  <th>Finalizar</th>
                </tr>
              </thead>
              {#each finali as e, num}
                <tbody>
                  <tr>
                    <td>{e.carta}</td>
                    <td>{e.cantidad}</td>
                    <td>{e.fecha}</td>
                    <td>Aceptado</td>
                    <td>{e.usuario}</td>
                    <td>
                      <button
                        id={"btnc" + num}
                        on:click={handle}
                        on:click={ListaPrestamo.cambiarEstadoPrestamo(
                          loans,
                          cartas,
                          3,
                          num,
                          db,
                          e.cantidad,
                          e.cartaid,
                          e.id
                        )}>Finalizar</button
                      >
                    </td>
                  </tr>
                </tbody>
              {/each}
            </table>
          {/if}
        {/if}
        {#if vista == 2}
          <p></p>
          <button class="btn btn-primary" on:click={() => historial(0)}
            >Principal</button
          >
          <button class="btn btn-primary" on:click={() => historial(1)}
            >Aprobados</button
          >
          <button class="btn btn-primary" on:click={() => historial(2)}
            >Rechazados</button
          >
          <button class="btn btn-primary" on:click={() => historial(3)}
            >Pendiente</button
          >
          <button class="btn btn-primary" on:click={() => historial(5)}
            >Finalizados</button
          >
          {#if $admin == 1}
            <button class="btn btn-primary" on:click={() => historial(4)}
              >Historial por Usuario</button
            >
          {/if}
        {/if}
        <p></p>
        {#if historia == 0 && vista == 2}
          <table
            id="Table"
            class="table table-striped"
            style="width:100%"
            data-toggle="table"
            data-seach="true"
            data-searchable="true"
            data-pagination="true"
          >
            <thead>
              <tr>
                <th>Nombre de la carta</th>
                <th>Cantidad a prestamo</th>
                <th>Fecha de la solicitud</th>
                <th>Estado</th>
                <th>Usuario</th>
              </tr>
            </thead>
            {#each ListaPrestamo.listaPres as e}
              {#if e.usuario == $usuario}
                <tbody>
                  <tr>
                    <td>{e.carta}</td>
                    <td>{e.cantidad}</td>
                    <td>{e.fecha}</td>
                    {#if e.estado == 0}
                      <td>En espera</td>
                    {:else if e.estado == 1}
                      <td>Aceptado</td>
                    {:else if e.estado == 2}
                      <td>Rechazado</td>
                    {:else}
                      <td>Finalizado</td>
                    {/if}
                    <td>{e.usuario}</td>
                  </tr>
                </tbody>
              {:else if $admin == 1}
                <tbody>
                  <tr>
                    <td>{e.carta}</td>
                    <td>{e.cantidad}</td>
                    <td>{e.fecha}</td>
                    {#if e.estado == 0}
                      <td>En espera</td>
                    {:else if e.estado == 1}
                      <td>Aceptado</td>
                    {:else if e.estado == 2}
                      <td>Rechazado</td>
                    {:else}
                      <td>Finalizado</td>
                    {/if}
                    <td>{e.usuario}</td>
                  </tr>
                </tbody>
              {/if}
            {/each}
          </table>
        {/if}
        {#if historia == 1 && vista == 2}
          <table
            id="Table"
            class="table table-striped"
            style="width:100%"
            data-toggle="table"
            data-seach="true"
            data-searchable="true"
            data-pagination="true"
          >
            <thead>
              <tr>
                <th>Nombre de la carta</th>
                <th>Cantidad a prestamo</th>
                <th>Fecha de la solicitud</th>
                <th>Estado</th>
                <th>Usuario</th>
              </tr>
            </thead>
            {#each ListaPrestamo.listaPres as e}
              {#if e.usuario == $usuario}
                {#if e.estado == 1}
                  <tbody>
                    <tr>
                      <td>{e.carta}</td>
                      <td>{e.cantidad}</td>
                      <td>{e.fecha}</td>
                      <td>Aceptado</td>
                      <td>{e.usuario}</td>
                    </tr>
                  </tbody>
                {/if}
              {:else if $admin == 1}
                {#if e.estado == 1}
                  <tbody>
                    <tr>
                      <td>{e.carta}</td>
                      <td>{e.cantidad}</td>
                      <td>{e.fecha}</td>
                      <td>Aceptado</td>
                      <td>{e.usuario}</td>
                    </tr>
                  </tbody>
                {/if}
              {/if}
            {/each}
          </table>
        {/if}
        {#if historia == 2 && vista == 2}
          <table
            id="Table"
            class="table table-striped"
            style="width:100%"
            data-toggle="table"
            data-seach="true"
            data-searchable="true"
            data-pagination="true"
          >
            <thead>
              <tr>
                <th>Nombre de la carta</th>
                <th>Cantidad a prestamo</th>
                <th>Fecha de la solicitud</th>
                <th>Estado</th>
                <th>Usuario</th>
              </tr>
            </thead>
            {#each ListaPrestamo.listaPres as e}
              {#if e.usuario == $usuario}
                {#if e.estado == 2 && vista == 2}
                  <tbody>
                    <tr>
                      <td>{e.carta}</td>
                      <td>{e.cantidad}</td>
                      <td>{e.fecha}</td>
                      <td>Rechazado</td>
                      <td>{e.usuario}</td>
                    </tr>
                  </tbody>
                {/if}
              {:else if $admin == 1}
                {#if e.estado == 2 && vista == 2}
                  <tbody>
                    <tr>
                      <td>{e.carta}</td>
                      <td>{e.cantidad}</td>
                      <td>{e.fecha}</td>
                      <td>Rechazado</td>
                      <td>{e.usuario}</td>
                    </tr>
                  </tbody>
                {/if}
              {/if}
            {/each}
          </table>
        {/if}
        {#if historia == 3 && vista == 2}
          <table
            id="Table"
            class="table table-striped"
            style="width:100%"
            data-toggle="table"
            data-seach="true"
            data-searchable="true"
            data-pagination="true"
          >
            <thead>
              <tr>
                <th>Nombre de la carta</th>
                <th>Cantidad a prestamo</th>
                <th>Fecha de la solicitud</th>
                <th>Estado</th>
                <th>Usuario</th>
              </tr>
            </thead>
            {#each ListaPrestamo.listaPres as e}
              {#if e.usuario == $usuario}
                {#if e.estado == 0}
                  <tbody>
                    <tr>
                      <td>{e.carta}</td>
                      <td>{e.cantidad}</td>
                      <td>{e.fecha}</td>
                      <td>En Espera</td>
                      <td>{e.usuario}</td>
                    </tr>
                  </tbody>
                {/if}
              {:else if $admin == 1}
                {#if e.estado == 0}
                  <tbody>
                    <tr>
                      <td>{e.carta}</td>
                      <td>{e.cantidad}</td>
                      <td>{e.fecha}</td>
                      <td>En Espera</td>
                      <td>{e.usuario}</td>
                    </tr>
                  </tbody>
                {/if}
              {/if}
            {/each}
          </table>
        {/if}
        {#if historia == 5 && vista == 2}
          <table
            id="Table"
            class="table table-striped"
            style="width:100%"
            data-toggle="table"
            data-seach="true"
            data-searchable="true"
            data-pagination="true"
          >
            <thead>
              <tr>
                <th>Nombre de la carta</th>
                <th>Cantidad a prestamo</th>
                <th>Fecha de la solicitud</th>
                <th>Estado</th>
                <th>Usuario</th>
              </tr>
            </thead>
            {#each ListaPrestamo.listaPres as e}
              {#if e.usuario == $usuario}
                {#if e.estado == 3}
                  <tbody>
                    <tr>
                      <td>{e.carta}</td>
                      <td>{e.cantidad}</td>
                      <td>{e.fecha}</td>
                      <td>Finalizado</td>
                      <td>{e.usuario}</td>
                    </tr>
                  </tbody>
                {/if}
              {:else if $admin == 1}
                {#if e.estado == 3}
                  <tbody>
                    <tr>
                      <td>{e.carta}</td>
                      <td>{e.cantidad}</td>
                      <td>{e.fecha}</td>
                      <td>Finalizado</td>
                      <td>{e.usuario}</td>
                    </tr>
                  </tbody>
                {/if}
              {/if}
            {/each}
          </table>
        {/if}
        {#if historia == 4 && vista == 2}
          <select on:change={cambiarSeleccion}>
            <option value="">Seleccione un usuario a consultar...</option>
            {#each users as user}
              <option value={user.username}>{user.username}</option>
            {/each}
          </select>
          <p></p>
          <table
            id="Table"
            class="table table-striped"
            style="width:100%"
            data-toggle="table"
            data-seach="true"
            data-searchable="true"
            data-pagination="true"
          >
            <thead>
              <tr>
                <th>Nombre de la carta</th>
                <th>Cantidad a prestamo</th>
                <th>Fecha de la solicitud</th>
                <th>Estado</th>
                <th>Usuario</th>
              </tr>
            </thead>
            {#each userselec as e}
              <tbody>
                <tr>
                  <td>{e.carta}</td>
                  <td>{e.cantidad}</td>
                  <td>{e.fecha}</td>
                  {#if e.estado == 0}
                    <td>En espera</td>
                  {:else if e.estado == 1}
                    <td>Aceptado</td>
                  {:else if e.estado == 2}
                    <td>Rechazado</td>
                  {:else}
                    <td>Finalizado</td>
                  {/if}
                  <td>{e.usuario}</td>
                </tr>
              </tbody>
            {/each}
          </table>
        {/if}
        <!-- End of Main Content -->
        <!-- End of Footer -->
      </div>
      <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->
  </div>
</body>

<style>
  .sidebar {
    background-color: rgb(242, 91, 44);
  }
  button:hover {
    cursor: pointer;
    background-color: rgb(175, 123, 45);
    color: black;
  }
</style>
