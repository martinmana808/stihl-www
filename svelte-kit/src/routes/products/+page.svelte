<script lang="ts">
  const products = [
    { name: 'Chainsaw', image: '/images/icon--chainsaw.svg' },
    { name: 'Ride-on mower', image: '/images/icon--rideon.svg' },
    { name: 'Blades', image: '/images/icon--blade.svg' }
  ];
</script>

<section class="cards">
  <div class="card">
    <h1>Products</h1>
  </div>
  {#each products as p}
    <div class="card">
      <h3>{p.name}</h3>
      <img class="responsive" src={p.image} alt={p.name} />
    </div>
  {/each}
</section> 
