import { useCallback, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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

export default function App() {
  const [pg, setPg] = useState([1, 14]), [lb, setLb] = useState(null), [egg, setEgg] = useState(false), [step, setStep] = useState(0), [showEgg, setShowEgg] = useState(false)
  const { scrollY, scrollYProgress } = useScroll(), sunY = useTransform(scrollY, [0, 700], [0, -180]), tY = useTransform(scrollY, [0, 600], [0, -90]), gY = useTransform(scrollY, [0, 600], [0, 90])
  const onPage = useCallback((a, b) => setPg([a, b]), [])
  useEffect(() => { // little easter egg button appears after reaching the bottom
    const el = document.getElementById('fin'); let t
    const io = new IntersectionObserver(([e]) => { clearTimeout(t); if (e.isIntersecting) t = setTimeout(() => setShowEgg(true), 3000) }, { threshold: 0.9 })
    io.observe(el.querySelector('.sig')); return () => io.disconnect()
  }, [])
  const eggText = ['You actually went through the whole thing?', 'Respect. 😂', 'Happy Birthday again, Bernice. 🤍']
  return (<>
    <Atmosphere onPage={onPage} />
    <motion.i className="bar" style={{ scaleX: scrollYProgress }} />
    <nav><span>✦ Bernice</span><span>{String(pg[0]).padStart(2, '0')} / {pg[1]}</span></nav>
    <Puffy />
    <main>
      <section className="s hero">
        <motion.div className="sunw" style={{ y: sunY }}><Sun /></motion.div>
        <p className="a" style={{ '--d': '.4s' }}>A little something for you.</p>
        <Letters text="Bernice Angel" style={{ y: tY }} />
        <p className="a it" style={{ '--d': '2.8s' }}>for your birthday ✦</p>
        <p className="hw a" style={{ '--d': '3.8s' }}>yes, I actually made an entire website.</p>
        <a className="bt a" style={{ '--d': '4.6s' }} href="#bday">enter your little world →</a>
        <motion.div className="edge" style={{ y: gY }}><Garden n={8} /></motion.div>
      </section>

      <section className="s" id="bday">
        <R as="h2" className="wob" onClick={() => burst(['🌸', '✨', '🎈', '🪁'])} style={{ cursor: 'pointer' }}>Happy Birthday, Angel. 🎈</R>
        <R as="p" className="lead">You have officially unlocked another year of being you.</R>
        <R as="p">There are a million normal ways to say “Happy Birthday.”</R>
        <R as="p">So naturally...</R>
        <R className="big">I made a website. 😂</R>
        <R as="p" className="hw">Please appreciate the unnecessary amount of effort. (psst — tap the heading for a surprise)</R>
        <R as="a" className="bt" href="#eat">okay, continue ✦</R>
      </section>

      <section className="s" id="eat">
        <R className="card"><div className="hw">IMPORTANT BIRTHDAY CHECK</div><h2>Did you eat?</h2><p><em>Be honest.</em></p><NoGame /></R>
      </section>

      <section className="s" id="eat2">
        <R className="big">Okay. Important business handled.</R>
        <R as="p" className="lead">Now let's go back a little.</R>
        <R><Kite className="kt" /></R>
        <R className="big">Because every person has a story.</R>
      </section>

      <section className="s">
        <R><div className="hw">Chapter 01</div><h2 className="wob">Once upon a time...</h2><p><em>before all the stories that came later.</em></p></R>
        <div className="tl">{childhood.map(d => <Photo key={d.k} d={d} onOpen={setLb} />)}</div>
      </section>

      <section className="s">
        <R><h2 className="wob">And then...</h2><div className="big">she grew up.</div></R>
        <div className="tl">{growing.map(d => <Photo key={d.k} d={d} onOpen={setLb} />)}</div>
        <Garden n={5} />
      </section>

      <section className="s warm">
        <R><h2 className="wob">The Evidence 😂</h2><p className="lead">A carefully documented collection of questionable moments.</p></R>
        <div className="tl">{evidence.map(d => <Photo key={d.k} d={d} onOpen={setLb} />)}</div>
      </section>

      <section className="s">
        <R><h2 className="wob">Somewhere along the way...</h2><div className="big">we became friends.</div></R>
        <div className="row">{friends.map(d => <Photo key={d.k} d={d} onOpen={setLb} style={d.up ? { marginTop: 30 } : undefined} />)}</div>
        <R as="p" className="lead">Different days, random conversations, a lot of good laughs.</R>
      </section>

      <section className="s">
        <R as="h2" className="wob">A few things that are very Bernice™</R>
        <div className="cards">{traits.map(([e, t, s]) => <R key={t} className="card"><h3>{e} {t}</h3><p>{s}</p><Flower size={34} stem={0} c={Math.floor(Math.random() * 5)} /></R>)}</div>
      </section>

      <section className="s kite" id="kite">
        <Kite className="kk" style={{ top: '25%', animationDuration: '50s' }} /><Kite color="#a9b8e6" className="kk" style={{ top: '60%', animationDuration: '70s', animationDelay: '-30s' }} />
        <ScrollWords text="Some people are like kites. 🪁" />
        <ScrollWords text="You don't always hold them close," />
        <ScrollWords text="but the string is still there." />
        <ScrollWords text="That's friendship. ✦" />
      </section>

      <section className="s">
        <R as="h2" className="wob">Then → Now</R>
        <R className="tn">
          <figure className="ph" style={{ '--r': '-2deg' }}><img src={P.c1} alt="Bernice as a little girl in a lilac dress" onClick={() => setLb({ src: P.c1, alt: 'Bernice as a little girl', cap: 'then' })} /><figcaption><span className="hw">then</span></figcaption></figure>
          <hr />
          <figure className="ph" style={{ '--r': '2deg' }}><img src={P.n1} alt="Bernice today, smiling in a pink t-shirt in a garden" onClick={() => setLb({ src: P.n1, alt: 'Bernice today', cap: 'now' })} /><figcaption><span className="hw">now</span></figcaption></figure>
        </R>
        <R className="big">A lot changed.</R><R as="p" className="lead">And somehow, you're still you.</R>
        <div className="tl"><Photo d={{ k: 'g2', r: -1, tag: 'a quiet moment', title: 'Fancy door, calm smile.', alt: 'Bernice in a white floral dress in front of a carved wooden door' }} onOpen={setLb} /></div>
      </section>

      <section className="s" id="letter">
        <R className="card paper"><Kite className="kt side" /><h2>A little note for you.</h2>
          <p><b>Happy Birthday, Bernice! 🎈</b></p>
          <p>I hope this year gives you plenty of reasons to laugh, moments you'll want to remember, and a lot of little things that make ordinary days better.</p>
          <p>I'm genuinely glad we're friends. Keep being funny, kind, a little chaotic, and completely yourself.</p>
          <p>Here's to another year of good memories.</p><p><b>Happy Birthday, Angel. ✦</b></p></R>
      </section>

      <section className="s fin" id="fin">
        <R as="h2">One more year.</R><R className="big">One more chapter.</R><R as="p">A lot more memories waiting to happen.</R>
        <R as="h1" className="wob">Happy Birthday, Angel. 🎈</R>
        <R as="p" className="lead">Stay happy. Stay weird.</R>
        <R as="p" className="sig">— Rajanithi<br /><small>made with too much effort and slightly questionable amounts of code ✦</small></R>
        <button className="bt" style={{ visibility: showEgg ? 'visible' : 'hidden', color: '#fff' }} onClick={() => { setStep(0); setEgg(true) }}>psst... one last thing</button>
        <p className="sig tiny">© 2026 Bernice's Birthday Universe · made for one very specific person ✦</p>
      </section>
    </main>

    <Modal open={!!lb} onClose={() => setLb(null)}>{lb && <><img src={lb.src} alt={lb.alt} /><p>{lb.cap}</p><button className="bt" onClick={() => setLb(null)}>close ✕</button></>}</Modal>
    <Modal open={egg} onClose={() => setEgg(false)}><div className="card"><p className="big">{eggText[step]}</p>
      <button className="bt" onClick={() => { if (step < 2) { setStep(step + 1); if (step === 1) burst(['🌸', '🤍', '✦']) } else setEgg(false) }}>{step === 0 ? 'yes 😌' : step === 1 ? 'thanks 😭' : 'close'}</button></div></Modal>
  </>)
}
