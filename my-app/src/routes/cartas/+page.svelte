<script>
  let menu = "Cartas";
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
