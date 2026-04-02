import { useEffect } from 'react'
import AugustMoonDetails from './components/AugustMoonDetails'
import Banner from './components/Banner'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import GhostTownDetails from './components/GhostTownDetails'
import Hero from './components/Hero'
import Music from './components/Music'
import Navbar from './components/Navbar'
import News from './components/News'
import Newsletter from './components/Newsletter'
import Store from './components/Store'
import Tickets from './components/Tickets'

function HomePage() {
  return (
    <>
      <Hero />
      <Tickets />
      <Music />
      <Banner />
      <Gallery />
      <Store />
      <Newsletter />
      <Footer />
    </>
  )
}

function ContactPage() {
  return (
    <>
      <Contact />
      <Footer />
    </>
  )
}

function GhostTownPage() {
  return (
    <>
      <GhostTownDetails />
      <Footer />
    </>
  )
}

function AugustMoonPage() {
  return (
    <>
      <AugustMoonDetails />
      <Footer />
    </>
  )
}

function NewsPage() {
  return (
    <>
      <News />
      <Footer />
    </>
  )
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const isContactPage = path === '/contact'
  const isGhostTownPage = path === '/music/ghost-town'
  const isAugustMoonPage = path === '/music/august-moon'
  const isNewsPage = path === '/news'

  useEffect(() => {
    if (path !== '/') return undefined

    const scrollToHashTarget = () => {
      const hash = window.location.hash
      if (!hash) return

      const targetId = decodeURIComponent(hash.slice(1))
      const target = document.getElementById(targetId)
      if (!target) return

      const navHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 10
      window.scrollTo(0, Math.max(top, 0))
    }

    const timer = window.setTimeout(scrollToHashTarget, 80)
    window.addEventListener('hashchange', scrollToHashTarget)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('hashchange', scrollToHashTarget)
    }
  }, [path])

  return (
    <>
      <Navbar />
      {isContactPage ? <ContactPage /> : null}
      {isGhostTownPage ? <GhostTownPage /> : null}
      {isAugustMoonPage ? <AugustMoonPage /> : null}
      {isNewsPage ? <NewsPage /> : null}
      {!isContactPage && !isGhostTownPage && !isAugustMoonPage && !isNewsPage ? <HomePage /> : null}
    </>
  )
}

export default App
