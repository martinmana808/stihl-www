<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css" />
  <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
  <script src="https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js"></script>
</svelte:head>

<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const el = document.querySelector('.js-reviews') as HTMLElement | null;
    if (!el || !window.Flickity) return;
    const flkty = new window.Flickity(el, {
      cellAlign: 'left',
      contain: true,
      pageDots: false,
      prevNextButtons: true,
      setGallerySize: true,
      imagesLoaded: true
    });
    function setTallestViewport() {
      if (!el) return;
      const cells = el.querySelectorAll('.carousel-cell');
      if (!cells.length) return;
      const maxH = Math.max(...[...cells].map((c) => (c as HTMLElement).offsetHeight || (c as HTMLElement).getBoundingClientRect().height));
      const viewport = el.querySelector('.flickity-viewport') as HTMLElement | null;
      if (viewport) viewport.style.height = `${maxH}px`;
    }
    window.addEventListener('load', () => flkty.resize());
    flkty.on('ready', setTallestViewport);
    flkty.on('cellSelect', setTallestViewport);
    window.addEventListener('resize', setTallestViewport);
    const prev = document.querySelector('.reviews-arrow--prev') as HTMLButtonElement | null;
    const next = document.querySelector('.reviews-arrow--next') as HTMLButtonElement | null;
    prev && prev.addEventListener('click', () => flkty.previous());
    next && next.addEventListener('click', () => flkty.next());
    function updateArrows() {
      const i = (flkty as any).selectedIndex;
      const last = (flkty as any).slides.length - 1;
      prev && prev.toggleAttribute('disabled', i === 0);
      next && next.toggleAttribute('disabled', i === last);
    }
    (flkty as any).on('select', updateArrows);
    updateArrows();
  });

  onMount(() => {
    if (!window.Flickity) return;
    const galleryEl = document.querySelector('.js-gallery') as HTMLElement | null;
    const navEl = document.querySelector('.js-gallery-nav') as HTMLElement | null;
    if (!galleryEl || !navEl) return;

    // Build slides from nav items (image + caption)
    const items = Array.from(navEl.querySelectorAll('.gallery-nav-item')) as HTMLElement[];
    if (items.length) {
      const slidesHtml = items.map((li) => {
        const img = li.querySelector('img') as HTMLImageElement | null;
        // Extract caption text: any non-empty text node inside the li
        let caption = '';
        li.childNodes.forEach((n) => {
          if (n.nodeType === 3) {
            const t = (n.textContent || '').trim();
            if (t) caption = t;
          }
        });
        const src = img?.src || '';
        const alt = img?.alt || 'slide';
        const capHtml = caption ? `<div class="gallery-caption spacing-x"><div class="mw-container mx-auto"><figcaption class="">${caption}</figcaption></div></div>` : '';
        return `<div class="carousel-cell gallery-cell"><figure class="gallery-figure"><img class="bradius--section overflow-hidden" src="${src}" alt="${alt}" />${capHtml}</figure></div>`;
      }).join('');
      galleryEl.innerHTML = slidesHtml;
    }

    const gallery = new window.Flickity(galleryEl, {
      cellAlign: 'left',
      contain: true,
      pageDots: false,
      prevNextButtons: true,
      setGallerySize: true,
      imagesLoaded: true
    });

    // Optional: make nav a synced carousel of thumbs
    const nav = new window.Flickity(navEl, {
      asNavFor: galleryEl,
      contain: true,
      pageDots: false,
      prevNextButtons: false
    });

    // Click thumbnails to select
    navEl.addEventListener('click', (e) => {
      const li = (e.target as HTMLElement).closest('.gallery-nav-item');
      if (!li) return;
      const listItems = Array.from(navEl.querySelectorAll('.gallery-nav-item'));
      const index = listItems.indexOf(li as HTMLElement);
      if (index >= 0) (gallery as any).select(index);
      e.preventDefault();
    });

    // Sync active state
    const syncActive = () => {
      const listItems = Array.from(navEl.querySelectorAll('.gallery-nav-item'));
      const activeIndex = (gallery as any).selectedIndex;
      listItems.forEach((it, idx) => it.classList.toggle('is-active', idx === activeIndex));
    };
    (gallery as any).on('select', syncActive);
    syncActive();
  });
</script>

<!-- Hero Section -->
<section class="hero spacing-x relative">
  <div class="mw-container mx-auto">
    <img class="hero-image " src="/images/hero.png" alt="Stihl Shop" />
    <div class="hero-overlay "></div>
    <div class="container">
      <div class="hero-content spacing-y--block">
        <div class="hero-content__text">
          <h1 class="text--hero">Tauranga's STIHL experts since 1998</h1>
          <p class="text--block mw-640 mb-0">
            Trusted for sales, for expert service, for in-house servicing, and for quality gear
            for every job.
          </p>
        </div>
        <div class="hero-content__buttons buttons">
          <a class="btn btn-bg--outline" href="/">Book a service</a>
          <a class="btn btn-bg" href="/">Shop now</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Products Section -->
<section class="products spacing-x spacing-y--section bg-orange c-bg bradius--section relative" id="products">
  <div class="mw-container mx-auto">
    <img class="products-deco" src="/images/products-deco.svg" alt="" aria-hidden="true" />
    <div class="container">
      <div class="section-header">
        <h3 class="text--eyebrow">Our products</h3>
        <div class="section-title">
          <h2 class="text--section mb-0">Everything you need</h2>
          <a href="/products" class="section-link link--w-icon">
            View all products
            <img src="/images/icon--arrow-bg.svg" alt="arrow right" aria-hidden="true" />
          </a>
        </div>
      </div>
      <div class="products-grid">
        <div class="product-card">
          <div class="product-image">
            <img src="/images/productplaceholder.png" alt="Ride-on Mower" />
          </div>
          <div class="product-text">
            <h3 class="product-name">Ride-on Mower</h3>
            <div class="product-price">
              <span class="product-price__from">from</span>
              $222
            </div>
          </div>
        </div>
        <div class="product-card">
          <div class="product-image">
            <img src="/images/productplaceholder.png" alt="String Trimmer" />
          </div>
          <div class="product-text">
            <h3 class="product-name">String Trimmer</h3>
            <div class="product-price">
              <span class="product-price__from">from</span>
              $222
            </div>
          </div>
        </div>
        <div class="product-card">
          <div class="product-image">
            <img src="/images/productplaceholder.png" alt="Chainsaw" />
          </div>
          <div class="product-text">
            <h3 class="product-name">Chainsaw</h3>
            <div class="product-price">
              <span class="product-price__from">from</span>
              $222
            </div>
          </div>
        </div>
        <div class="product-card">
          <div class="product-image">
            <img src="/images/productplaceholder.png" alt="Pressure Washer" />
          </div>
          <div class="product-text">
            <h3 class="product-name">Pressure Washer</h3>
            <div class="product-price">
              <span class="product-price__from">from</span>
              $222
            </div>
          </div>
        </div>
        <div class="product-card">
          <div class="product-image">
            <img src="/images/productplaceholder.png" alt="Hedge Trimmer" />
          </div>
          <div class="product-text">
            <h3 class="product-name">Hedge Trimmer</h3>
            <div class="product-price">
              <span class="product-price__from">from</span>
              $222
            </div>
          </div>
        </div>
        <div class="product-card">
          <div class="product-image">
            <img src="/images/productplaceholder.png" alt="Hand Saw" />
          </div>
          <div class="product-text">
            <h3 class="product-name">Hand Saw</h3>
            <div class="product-price">
              <span class="product-price__from">from</span>
              $222
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="products-description spacing-x spacing-y--section">
  <div class="mw-container mx-auto">
    <div class="container">
      <div class="flex-column items-center">
        <h3 class="text--block mb-0">
          We stock the full STIHL range - including battery gear, ride ons, and arborist tools.
        </h3>
        <div class="buttons">
          <a class="btn btn-body" href="/">Shop all products</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- About Section -->
<section class="about spacing-x" id="about">
  <div class="mw-container mx-auto">
    <div class="container">
      <div class="about-content grid bradius--section overflow-hidden">
        <figure class="about-image col-6 relative">
          <img class="object-fit" src="/images/repairs.png" alt="Expert technician working on equipment" />
        </figure>
        <div class="about-text spacing-y--section col-6 bg-green">
          <h3 class="text--eyebrow">Done Right Here</h3>
          <h2 class="text--section">We live and breathe outdoor power gear.</h2>
          <h3 class="text--block">
            With whether you're a farmer, arborist, lifestyle block owner or home DIYer - we'll
            help you find the tool that gets the job done right.
          </h3>
          <div>
            We stock new as well as pre-owned, and we are the only specialists in Tauranga to
            service, repair, and sell both petrol and battery gear.
          </div>
          <div class="buttons">
            <a href="/" class="btn btn-bg">View our services</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Services Section -->
<section class="services spacing-x spacing-y--section" id="services">
  <div class="mw-container mx-auto">
    <div class="container">
      <div class="section-header">
        <h3 class="text--eyebrow">Done Right Here</h3>
        <div class="section-title">
          <h2 class="text--section c-orange mb-0">Repairs, Servicing, Diagnostics & Sharpening</h2>
          <a href="/services" class="section-link link--w-icon">
            View all services
            <img src="/images/icon--arrow-body.svg" alt="arrow right" aria-hidden="true" />
          </a>
        </div>
        <div class="section-subtitle">
          Our full workshop handles everything from basic tune-ups to major repairs. We offer:
        </div>
      </div>
      <div class="services-grid">
        <div class="service-item">
          <div class="service-icon">
            <img src="/images/icon--blade.svg" alt="" aria-hidden="true" />
          </div>
          <h3 class="text--service">In-house sharpening for reel mowers</h3>
          <a class="service-text link--w-icon" href="/services">
            Book sharpening
            <img src="/images/icon--arrow-orange.svg" alt="arrow" />
          </a>
        </div>
        <div class="service-item">
          <div class="service-icon">
            <img src="/images/icon--rideon.svg" alt="" aria-hidden="true" />
          </div>
          <h3 class="text--service">Scheduled ride-on mower servicing</h3>
          <a class="service-text link--w-icon" href="/services">
            Schedule a mower
            <img src="/images/icon--arrow-orange.svg" alt="arrow" />
          </a>
        </div>
        <div class="service-item">
          <div class="service-icon">
            <img src="/images/icon--chainsaw.svg" alt="" aria-hidden="true" />
          </div>
          <h3 class="text--service">Machine pickup & drop-off (by request)</h3>
          <a class="service-text link--w-icon" href="/services">
            Request machinery
            <img src="/images/icon--arrow-orange.svg" alt="arrow" />
          </a>
        </div>
        <div class="service-item">
          <div class="service-icon">
            <img src="/images/icon--gear.svg" alt="" aria-hidden="true" />
          </div>
          <h3 class="text--service">STIHL diagnostic tools & genuine parts</h3>
          <a class="service-text link--w-icon" href="/services">
            Read more
            <img src="/images/icon--arrow-orange.svg" alt="arrow" />
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Battery Section -->
<section class="gallery relative">
  <div class="js-gallery ">
  </div>
  <div class="gallery-nav spacing-x">
    <div class="mw-container mx-auto">
      <div class="js-gallery-nav spacing-y--block">
        <div class="gallery-nav-item">
          <a href="/products" class="gallery-nav-link">
            <img src="/images/gallery.png" alt="nav" />
          </a>
          Our full workshop handles everything from basic tune-ups to major repairs
        </div>
        <div class="gallery-nav-item">
          <a href="/products" class="gallery-nav-link">
            <img src="/images/hero.png" alt="nav" />
          </a>
          With whether you're a farmer, arborist, lifestyle block owner or home DIYer
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Why Choose Us Section -->
<section class="why-choose-us spacing-x spacing-y--section">
  <div class="mw-container mx-auto">
    <div class="container">
      <div class="section-header">
        <h3 class="text--eyebrow">Our experience</h3>
        <div class="section-title">
          <h2 class="text--section mb-0">Why choose us</h2>
        </div>
        <div class="section-subtitle mw-800">
          When you buy from us, you’re not just getting STIHL’s world-class gear — you’re
          getting expert advice, hands-on demos, and ongoing service from people who know the
          tools and the trade.
        </div>
      </div>
      <ul class="why-choose-us-list list-reset">
        <li class="why-choose-us-item">
          <figure class="why-choose-us-image">
            <img src="/images/why-choose-us-1.png" alt="STIHL - Certified Workshop On Site" />
          </figure>
          <div class="why-choose-us-text">
            <h3 class="">STIHL - Certified Workshop On Site</h3>
          </div>
        </li>
        <li class="why-choose-us-item">
          <figure class="why-choose-us-image">
            <img src="/images/why-choose-us-2.png" alt="Ride-On Mower Servicing & Diagnostics" />
          </figure>
          <div class="why-choose-us-text">
            <h3 class="">Ride-On Mower Servicing & Diagnostics</h3>
          </div>
        </li>
        <li class="why-choose-us-item">
          <figure class="why-choose-us-image">
            <img src="/images/why-choose-us-3.png" alt="Reel Mower Sharpening In-House" />
          </figure>
          <div class="why-choose-us-text">
            <h3 class="">Reel Mower Sharpening In-House</h3>
          </div>
        </li>
        <li class="why-choose-us-item">
          <figure class="why-choose-us-image">
            <img src="/images/why-choose-us-4.png" alt="Machine Collection Available (via Booking)" />
          </figure>
          <div class="why-choose-us-text">
            <h3 class="">Machine Collection Available (via Booking)</h3>
          </div>
        </li>
        <li class="why-choose-us-item">
          <figure class="why-choose-us-image">
            <img src="/images/why-choose-us-5.png" alt="Experts in Battery, Petrol & Pro Gear" />
          </figure>
          <div class="why-choose-us-text">
            <h3 class="">Experts in Battery, Petrol & Pro Gear</h3>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>
<section class="reasons spacing-b--section spacing-x">
  <div class="mw-container mx-auto">
    <div class="why-choose-us-cta">
      <h3 class="text--section mb-0 c-orange">
        40 years of reasons to come shop at STIHL Tauranga.
      </h3>
      <div class="buttons mt-0">
        <a href="/about" class="section-link link--w-icon">
          Read about us
          <img src="/images/icon--arrow-body.svg" alt="arrow right" aria-hidden="true" />
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Reviews Section -->
<section class="reviews spacing-x">
  <div class="mw-container mx-auto">
    <div class="container">
      <div class="reviews-content grid">
        <figure class="reviews-image col-6 relative">
          <img class="object-fit" src="/images/reviews.png" alt="Mike and Greg McLarnon" />
        </figure>
        <div class="reviews-text spacing-y--section col-6 bg-green">
          <h3 class="text--eyebrow">You get what you give</h3>
          <h2 class="text--section">Rated 4.3 on Google from over 46 reviews</h2>

          <ul
            class="reviews-list list-reset main-carousel js-reviews"
          >
            <li class="reviews-item carousel-cell">
              <div class="reviews-stars">★★★★★</div>
              <div class="reviews-quote">
                "Had a wonderful experience. The very friendly team were able to sort me out
                with the best gear suitable for my needs."
              </div>
              <div class="reviews-avatar">
                <img class="avatar" src="/images/avatar.png" alt="Mike McLarnon" />
                <div class="reviews-author">Corey Green</div>
              </div>
            </li>
            <li class="reviews-item carousel-cell">
              <div class="reviews-stars">★★★★★</div>
              <div class="reviews-quote">
                "Had a wonderful experience. The very friendly team were able to sort me out
                with the best gear suitable for my needs."
              </div>
              <div class="reviews-avatar">
                <img class="avatar" src="/images/avatar.png" alt="Mike McLarnon" />
                <div class="reviews-author">Corey Green</div>
              </div>
            </li>
            <li class="reviews-item carousel-cell">
              <div class="reviews-stars">★★★★★</div>
              <div class="reviews-quote">
                "Had a wonderful experience. The very friendly team were able to sort me out
                with the best gear suitable for my needs."
              </div>
              <div class="reviews-avatar">
                <img class="avatar" src="/images/avatar.png" alt="Mike McLarnon" />
                <div class="reviews-author">Corey Green</div>
              </div>
            </li>
          </ul>
          <div class="reviews-arrows">
            <button class="reviews-arrow reviews-arrow--prev">
              <img src="/images/icon--arrow-left-body.svg" alt="arrow left" />
            </button>
            <button class="reviews-arrow reviews-arrow--next">
              <img src="/images/icon--arrow-body.svg" alt="arrow right" />
            </button>
          </div>
          <div class="buttons">
            <a href="/" class="btn btn-body">Got your own story? Drop us a review</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="brands spacing-x spacing-y--section relative">
  <div class="brands-bg"></div> 
  <div class="mw-container mx-auto">
    <div class="brands-content">
      
      <div class="section-title">
        <h2 class="text--block ">Our brands</h2>
        <a href="/products" class="section-link link--w-icon">
          View all products
          <img src="/images/icon--arrow-body.svg" alt="arrow right" aria-hidden="true" />
        </a>
      </div>
      <ul class="brands-grid list-reset">
        <li class="brand-item">
          <img src="/images/brand-stihl.svg" alt="STIHL logo" />
        </li>
        <li class="brand-item">
          <img src="/images/brand-honda.svg" alt="honda logo" />
        </li>
        <li class="brand-item">
          <img src="/images/brand-masport.svg" alt="masport logo" />
        </li>
        <li class="brand-item">
          <img src="/images/brand-club-cadet.svg" alt="club-cadet logo" />
        </li>
        <li class="brand-item">
          <img src="/images/brand-hansa.svg" alt="hansa logo" />
        </li>
      </ul>
    </div>
  </div>
</section>

<!-- Latest Articles Section -->
<section class="articles spacing-x spacing-y--section bg-orange bradius--section c-bg">
  <div class="mw-container mx-auto">
    <div class="container">
      <div class="section-header">
        <h3 class="text--eyebrow">Our blog</h3>
        <div class="section-title">
          <h2 class="text--section mb-0">Latest articles</h2>
          <a href="/blog" class="section-link link--w-icon">
            View all articles
            <img src="/images/icon--arrow-bg.svg" alt="arrow right" aria-hidden="true" />
          </a>
        </div>
      </div>
      <div class="articles-grid">
        <article class="article-card">
          <a href="/" class="article-link">
            <figure class="article-image">
              <img src="/images/blog1.png" class="object-fit" alt="Professional team in workshop" />
            </figure>
            <div class="article-content">
              <div class="text--eyebrow c-grey-dark">FRI 11 AUG 2025</div>
              <h3 class="text--service">Our Solutions for Professionals</h3>
              <p>
                Benefit now from the expertise of our experts - because you deserve advice and
                service just as much as high-performance appliances.
              </p>
            </div>
          </a>
        </article>
        <article class="article-card">
          <a href="/" class="article-link">
            <figure class="article-image">
              <img src="/images/blog1.png" class="object-fit" alt="Professional team in workshop" />
            </figure>
            <div class="article-content">
              <div class="text--eyebrow c-grey-dark">FRI 11 AUG 2025</div>
              <h3 class="text--service">Our Solutions for Professionals</h3>
              <p>
                Benefit now from the expertise of our experts - because you deserve advice and
                service just as much as high-performance appliances.
              </p>
            </div>
          </a>
        </article>
        <article class="article-card">
          <a href="/" class="article-link">
            <figure class="article-image">
              <img src="/images/blog1.png" class="object-fit" alt="Professional team in workshop" />
            </figure>
            <div class="article-content">
              <div class="text--eyebrow c-grey-dark">FRI 11 AUG 2025</div>
              <h3 class="text--service">Our Solutions for Professionals</h3>
              <p>
                Benefit now from the expertise of our experts - because you deserve advice and
                service just as much as high-performance appliances.
              </p>
            </div>
          </a>
        </article>
        <article class="article-card">
          <a href="/" class="article-link">
            <figure class="article-image">
              <img src="/images/blog1.png" class="object-fit" alt="Professional team in workshop" />
            </figure>
            <div class="article-content">
              <div class="text--eyebrow c-grey-dark">FRI 11 AUG 2025</div>
              <h3 class="text--service">Our Solutions for Professionals</h3>
              <p>
                Benefit now from the expertise of our experts - because you deserve advice and
                service just as much as high-performance appliances.
              </p>
            </div>
          </a>
        </article>
      </div>
    </div>
  </div>
</section>

<!-- Call to Action Section -->
<section class="cta spacing-x relative spacing-y--section bradius--section overflow-hidden c-bg">
  <div class="mw-container mx-auto">
    <img class="cta-image" src="/images/cta.png" alt="Stihl Shop" />
    <div class="cta-overlay"></div>
    <div class="container">
      <div class="section-header">
        <div class="section-title mw-800">
          <h2 class="text--section mb-0">Book your gear in for a check-up today.</h2>
        </div>
        <div class="section-subtitle mw-800">We will keep it running like new.</div>
      </div>
      <div class="buttons">
        <a href="/" class="btn btn-bg--outline">Book a check-up</a>
      </div>
    </div>
  </div>
</section>
