<script lang="ts">
  import { getPostBySlug } from '$lib/posts';
  let { data } = $props<{ data: { slug: string } }>();
  const post = getPostBySlug(data.slug);
</script>

{#if post}
  <article class="cards">
    <div class="card">
      <h1>{post.title}</h1>
      <small>{new Date(post.date).toLocaleDateString()}</small>
    </div>
    {#if post.cover}
      <img class="responsive" src={post.cover} alt={post.title} />
    {/if}
    <div class="card">{@html post.content}</div>
  </article>
{:else}
  <div class="card"><p>Post not found.</p></div>
{/if} 
