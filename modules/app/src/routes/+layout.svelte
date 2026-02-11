<script lang="ts">
  import '../app.css'
  import { setContext } from 'svelte'

  interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
  }

  let isPWAInstallable = $state(false)
  let deferredPrompt: BeforeInstallPromptEvent | null = $state(null)

  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    import('workbox-window').then(({ Workbox }) => {
      const wb = new Workbox('/sw.js')
      wb.register()
    })
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt = e as BeforeInstallPromptEvent
      isPWAInstallable = true
    })
  }

  const installPWA = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      deferredPrompt = null
      isPWAInstallable = false
    }
  }

  // Provide PWA context to child components
  setContext('pwa', {
    get isPWAInstallable() { return isPWAInstallable },
    installPWA
  })
</script>

<svelte:head>
  <meta name="description" content="A TypeScript monorepo template for Svelte PWA with Bun runtime" />
  <meta name="theme-color" content="#ff3e00" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <title>Bun Svelte PWA</title>
</svelte:head>

<slot />
