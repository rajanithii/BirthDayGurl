import { memo, useCallback, useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Letters, ScrollWords } from './components/Text'
import Atmosphere from './components/Atmosphere'
import R from './components/R'
import { Garden, Flower } from './components/Flower'
import Kite from './components/Kite'
import Sun from './components/Sun'
import Puffy from './components/Puffy'
import Photo from './components/Photo'
import NoGame from './components/NoGame'
import Modal from './components/Modal'
import { childhood, growing, evidence, friends, traits, P } from './data'
import { burst } from './utils'

const StaticSection = memo(function StaticSection({ id, className, children }) {
  return <section id={id} className={className}>{children}</section>
})

const PageCounter = memo(function PageCounter({ index, total }) {
  return <span>{String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
})

export default function App() {
  const [page, setPage] = useState({ index: 1, total: 14 })
  const [lb, setLb] = useState(null), [egg, setEgg] = useState(false), [step, setStep] = useState(0), [showEgg, setShowEgg] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const smoothScrollY = useSpring(scrollY, { stiffness: 120, damping: 30, mass: 0.4 })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const sunY = useTransform(smoothScrollY, [0, 700], [0, -180])
  const tY = useTransform(smoothScrollY, [0, 600], [0, -90])
  const gY = useTransform(smoothScrollY, [0, 600], [0, 90])
  const onPage = useCallback((a, b) => {
    setPage(prev => {
      if (prev.index === a && prev.total === b) return prev
      return { index: a, total: b }
    })
  }, [])
  useEffect(() => { // little easter egg button appears after reaching the bottom
    const el = document.getElementById('fin'); if (!el) return
    let t
    const io = new IntersectionObserver(([e]) => { clearTimeout(t); if (e.isIntersecting) t = setTimeout(() => setShowEgg(true), 3000) }, { threshold: 0.9 })
    const sig = el.querySelector('.sig'); if (sig) io.observe(sig); return () => io.disconnect()
  }, [])
  const eggText = ['You actually went through the whole thing?', 'Respect. 😂', 'Happy Birthday again, Bernice. 🤍']
  return (<>
    <Atmosphere onPage={onPage} />
    <motion.i className="bar" style={{ scaleX: smoothProgress }} />
    <nav><span>✦ Bernice</span><PageCounter index={page.index} total={page.total} /></nav>
    <Puffy />
    <main>
      <StaticSection className="s hero">
        <motion.div className="sunw" style={{ y: sunY }}><Sun /></motion.div>
        <p className="a" style={{ '--d': '.4s' }}>A little something for you.</p>
        <Letters text="Bernice Angel" style={{ y: tY }} />
        <p className="a it" style={{ '--d': '2.8s' }}>on your birthday ✦</p>
        <p className="hw a" style={{ '--d': '3.8s' }}>yes,Im an AI student, so obviously… I used AI to wish you
.</p>
        <a className="bt a" style={{ '--d': '4.6s' }} href="#bday">enter your little world →</a>
        <motion.div className="edge" style={{ y: gY }}><Garden n={8} /></motion.div>
      </StaticSection>

      <StaticSection className="s" id="bday">
        <R as="h2" className="wob" onClick={() => burst(['🌸', '✨', '🎈', '🪁'])} style={{ cursor: 'pointer' }}>Happy Birthday, Angel. 🎈</R>
        <R as="p" className="lead">Another year older, same high, just a different age. 😂🎂
.</R>
        <R as="p">There are a million normal ways to say “Happy Birthday.”</R>
        <R as="p">A real present?...Too expensive.</R>
        <R className="big">So… enjoy my unemployed skills instead. 😂🎂</R>
        <R as="p" className="hw">For you, a thousand times over...</R>
        <R as="p" className="hw">hope its already 10.59pm.. (psst — tap the floating cloud...✨)</R>
        <R as="a" className="bt" href="#eat">okay, continue ✦</R>
      </StaticSection>

      <StaticSection className="s" id="eat">
        <R className="card"><div className="hw">IMPORTANT BIRTHDAY CHECK</div><h2>Did you eat?</h2><p><em>Be honest.</em></p><NoGame /></R>
      </StaticSection>

      <StaticSection className="s" id="eat2">
        <R className="big">Okay. Important historical timeline.</R>
        <R as="p" className="lead">Now let's go back a little.</R>
        <R><Kite className="kt" /></R>
        <R className="big">like humans..angel had an story too.</R>
      </StaticSection>

      <StaticSection className="s">
        <R><div className="hw">Chapter 01</div><h2 className="wob">Once upon a time...</h2><p><em>before all the stories that came later.</em></p></R>
        <div className="tl">{childhood.map(d => <Photo key={d.k} d={d} onOpen={setLb} />)}</div>
      </StaticSection>

      <StaticSection className="s">
        <R><h2 className="wob">And then...</h2><div className="big">she grew up.</div></R>
        <div className="tl">{growing.map(d => <Photo key={d.k} d={d} onOpen={setLb} />)}</div>
        <Garden n={5} />
      </StaticSection>

      <StaticSection className="s warm">
        <R><h2 className="wob">The Evidence 😂</h2><p className="lead">A carefully documented collection of questionable moments.</p></R>
        <div className="tl">{evidence.map(d => <Photo key={d.k} d={d} onOpen={setLb} />)}</div>
      </StaticSection>

      <StaticSection className="s">
        <R><h2 className="wob">Somewhere along the way...</h2><div className="big">making me as an Instagram User....though🙄</div></R>
        <div className="row">{friends.map(d => <Photo key={d.k} d={d} onOpen={setLb} style={d.up ? { marginTop: 30 } : undefined} />)}</div>
        <R as="p" className="lead">Different days, being watchman and batman.</R>
      </StaticSection>

      <StaticSection className="s">
        <R as="h2" className="wob">A few things that are very Bernice™</R>
        <div className="cards">{traits.map(([e, t, s]) => <R key={t} className="card"><h3>{e} {t}</h3><p>{s}</p><Flower size={34} stem={0} c={Math.floor(Math.random() * 5)} /></R>)}</div>
      </StaticSection>

      <StaticSection className="s kite" id="kite">
        <Kite className="kk" style={{ top: '25%', animationDuration: '50s' }} /><Kite color="#a9b8e6" className="kk" style={{ top: '60%', animationDuration: '70s', animationDelay: '-30s' }} />
        <ScrollWords text="Some people are like kites. 🪁" />
        <ScrollWords text="You don't always hold them close," />
        <ScrollWords text="but the string is still there." />
        <ScrollWords text="That's friendship. ✦" />
      </StaticSection>

      <StaticSection className="s">
        <R as="h2" className="wob">Then → Now</R>
        <R className="tn">
          <figure className="ph" style={{ '--r': '-2deg' }}><img src={P.c1} alt="Bernice as a little girl in a lilac dress" onClick={() => setLb({ src: P.c1, alt: 'Bernice as a little girl', cap: 'then' })} /><figcaption><span className="hw">then</span></figcaption></figure>
          <hr />
          <figure className="ph" style={{ '--r': '2deg' }}><img src={P.n1} alt="Bernice today, smiling in a pink t-shirt in a garden" onClick={() => setLb({ src: P.n1, alt: 'Bernice today', cap: 'now' })} /><figcaption><span className="hw">now</span></figcaption></figure>
        </R>
        <R className="big">A lot changed.</R><R as="p" className="lead">And somehow, you're still you.</R>
        <div className="tl"><Photo d={{ k: 'g2', r: -1, tag: 'a quiet moment', title: 'Fancy door, calm smile.', alt: 'Bernice in a white floral dress in front of a carved wooden door' }} onOpen={setLb} /></div>
      </StaticSection>

      <StaticSection className="s" id="letter">
        <R className="card paper"><Kite className="kt side" /><h2>A little note for you.</h2>
          <p><b>Happy Birthday, Bernice! 🎈</b></p>
          <p>Congratulations, you've successfully completed another year of being you. Somehow, we're all still surviving. 😂</p>
          <p>I hope this year brings you good memories, good laughs, fewer questionable decisions, and absolutely no sudden character development.</p>
          <p>Stay funny, stay chaotic, and please don't become too responsible. That would be suspicious.</p>
          <p><b>Anyway, Happy Birthday, Angel. ✦</b></p></R>
      </StaticSection>

      <StaticSection className="s fin" id="fin">
        <R as="h2">One more year.</R><R className="big">One more centimeter.</R><R as="p">becoming grandma</R>
        <R as="h1" className="wob">Happy Birthday, Angel. 🎈</R>
        <R as="p" className="lead">Stay happy. Stay healthy.</R>
        <R as="p" className="sig">— BATMAN <br /><small>Powered by Claude, Batman-level dedication, and absolutely no financial budget</small></R>
        <button className="bt" style={{ visibility: showEgg ? 'visible' : 'hidden', color: '#fff' }} onClick={() => { setStep(0); setEgg(true) }}>psst... one last thing</button>
        <p className="sig tiny">© 2026 · A completely unnecessary website for a completely necessary PERSON ✦
</p>
      </StaticSection>
    </main>

    <Modal open={!!lb} onClose={() => setLb(null)}>{lb && <><img src={lb.src} alt={lb.alt} /><p>{lb.cap}</p><button className="bt" onClick={() => setLb(null)}>close ✕</button></>}</Modal>
    <Modal open={egg} onClose={() => setEgg(false)}><div className="card"><p className="big">{eggText[step]}</p>
      <button className="bt" onClick={() => { if (step < 2) { setStep(step + 1); if (step === 1) burst(['🌸', '🤍', '✦']) } else setEgg(false) }}>{step === 0 ? 'yes 😌' : step === 1 ? 'thanks 😭' : 'close'}</button></div></Modal>
  </>)
}
