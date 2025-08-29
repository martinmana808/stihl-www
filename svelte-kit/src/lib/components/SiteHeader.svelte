<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  let update: (() => void) | null = null;

  onMount(() => {
    update = () => {
      if (window.scrollY >= 100) {
        document.body.classList.add('is-scrolled');
      } else {
        document.body.classList.remove('is-scrolled');
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  });

  onDestroy(() => {
    if (update) window.removeEventListener('scroll', update);
  });
</script>

<header class="header bg-bg spacing-x relative">
  <div class="mw-container mx-auto">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <img class="logo-img" src="/images/logo.png" alt="STIHL Shop logo" />
          <div class="franchise">TAURANGA</div>
          <span class="visuallyhidden">STIHL SHOP TAURANGA</span>
        </div>
        <div class="header-right">
          <nav class="nav">
            <ul class="nav-list">
              <li class="nav-item">
                <a class="nav-link" href="/services">Services</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/products">Products</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/about">About Us</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/blog">Our Blog</a>
              </li>
            </ul>
          </nav>
          <a class="btn btn-body" href="/">Shop now</a>
        </div>
      </div>
    </div>
  </div>
</header> 
