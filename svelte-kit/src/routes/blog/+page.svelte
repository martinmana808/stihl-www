<script lang="ts">
  import { posts } from '$lib/posts';
</script>

<section class="cards">
  <div class="card">
    <h1>Blog</h1>
    <p>Latest posts and updates.</p>
  </div>
  {#each posts as post}
    <article class="card">
      {#if post.cover}
        <img class="responsive" src={post.cover} alt={post.title} />
      {/if}
      <h3><a href={'/blog/' + post.slug}>{post.title}</a></h3>
      <p>{post.excerpt}</p>
      <small>{new Date(post.date).toLocaleDateString()}</small>
    </article>
  {/each}
</section> 
