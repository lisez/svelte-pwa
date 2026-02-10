<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import bunLogo from './assets/bun.svg'
  import Counter from './lib/Counter.svelte'
  import { formatDate, getEnvironment } from '@bun-svelte-pwa/shared'

  let isPWAInstallable = false
  let deferredPrompt: any
  
  const currentDate = formatDate(new Date())
  const environment = getEnvironment()

  if ('serviceWorker' in navigator) {
    import('workbox-window').then(({ Workbox }) => {
      const wb = new Workbox('/sw.js')
      wb.register()
    })
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    isPWAInstallable = true
  })

  const installPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      deferredPrompt = null
      isPWAInstallable = false
    }
  }
</script>

<main>
  <div>
    <a href="https://bun.sh" target="_blank" rel="noreferrer">
      <img src={bunLogo} class="logo bun" alt="Bun Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Bun + Svelte PWA</h1>
  <p class="subtitle">TypeScript Monorepo Template</p>
  <p class="info">Environment: {environment} | {currentDate}</p>

  <div class="card">
    <Counter />
  </div>

  {#if isPWAInstallable}
    <div class="install-pwa">
      <button on:click={installPWA}>
        📱 Install as App
      </button>
    </div>
  {/if}

  <p class="read-the-docs">
    Click on the Bun and Svelte logos to learn more
  </p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .logo.bun:hover {
    filter: drop-shadow(0 0 2em #fbf0dfaa);
  }
  .read-the-docs {
    color: #888;
  }
  .subtitle {
    font-size: 1.2em;
    color: #888;
    margin: -1em 0 0.5em 0;
  }
  .info {
    font-size: 0.9em;
    color: #666;
    margin: 0 0 2em 0;
  }
  .install-pwa {
    margin: 2em 0;
  }
  .install-pwa button {
    font-size: 1.1em;
    padding: 0.8em 1.5em;
    background: linear-gradient(135deg, #ff3e00 0%, #ff8a00 100%);
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: transform 0.2s;
  }
  .install-pwa button:hover {
    transform: scale(1.05);
  }
</style>
