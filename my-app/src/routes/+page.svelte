<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    onMount(() => {
        // Redireccionar a la página de inicio de sesión
        goto('/login');
    });
</script>

<!-- svelte-ignore a11y-missing-content -->
<h1></h1>