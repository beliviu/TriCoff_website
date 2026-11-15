import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Instagram,
  MapPin,
  MoveUpRight,
  Sparkles,
  X,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Reveal from './components/Reveal'
import {
  contact,
  galleryImages,
  menuCategories,
  menuItems,
  promotions,
} from './data/siteData'

function SectionHeading({ eyebrow, title, note, centered = false }) {
  return (
    <div className={`section-heading ${centered ? 'is-centered' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {note && <p>{note}</p>}
    </div>
  )
}

function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0])
  const reduceMotion = useReducedMotion()
  const items = menuItems.filter((item) => item.category === activeCategory)

  return (
    <section className="menu-section section-pad" id="menu">
      <div className="menu-top">
        <Reveal>
          <SectionHeading
            eyebrow="A FEW OF OUR FAVORITES"
            title="A Taste of TriCoff."
            note="A little something for every mood."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="menu-aside">
            Thoughtfully sourced, made fresh, and always best enjoyed right here.
          </p>
        </Reveal>
      </div>

      <div className="menu-tabs" role="tablist" aria-label="Menu categories">
        {menuCategories.map((category) => (
          <button
            key={category}
            id={`tab-${category.replaceAll(' ', '-').toLowerCase()}`}
            className={activeCategory === category ? 'active' : ''}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div
        className="menu-grid"
        role="tabpanel"
        aria-labelledby={`tab-${activeCategory.replaceAll(' ', '-').toLowerCase()}`}
        key={activeCategory}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
      >
        {items.map((item, index) => (
          <article className="menu-item" key={item.name}>
            <div className="menu-image-wrap">
              <img src={item.image} alt={item.alt} loading="lazy" />
              {item.tag && <span className="menu-tag">{item.tag}</span>}
            </div>
            <div className="menu-item-heading">
              <h3>{item.name}</h3>
              <span>{item.price}</span>
            </div>
            <p>{item.description}</p>
            <span className="menu-number">0{index + 1}</span>
          </article>
        ))}
      </motion.div>
      <p className="menu-footnote">
        Prices shown in thousands of IDR · Oat and almond milk available
      </p>
    </section>
  )
}

function GallerySection() {
  const [activeImage, setActiveImage] = useState(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!activeImage) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setActiveImage(null)
    }

    document.body.classList.add('lightbox-open')
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.classList.remove('lightbox-open')
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [activeImage])

  return (
    <section className="gallery-section section-pad" id="gallery">
      <Reveal>
        <SectionHeading
          eyebrow="LITTLE MOMENTS, KEPT CLOSE"
          title="Stay Awhile."
          note="Take a peek at the little world we call ours."
          centered
        />
      </Reveal>
      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <Reveal className={`gallery-tile ${image.shape}`} key={image.src} delay={index * 0.045}>
            <button
              className="gallery-button"
              type="button"
              onClick={() => setActiveImage(image)}
              aria-label={`View photo: ${image.caption}`}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
              <span className="gallery-caption">{image.caption}</span>
              <span className="gallery-expand" aria-hidden="true">
                <MoveUpRight size={17} />
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={activeImage.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={() => setActiveImage(null)}
          >
            <button
              className="lightbox-close"
              type="button"
              aria-label="Close image"
              onClick={() => setActiveImage(null)}
            >
              <X size={22} />
            </button>
            <motion.img
              src={activeImage.src}
              alt={activeImage.alt}
              initial={reduceMotion ? false : { scale: 0.97 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            />
            <p>{activeImage.caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default function App() {
  const reduceMotion = useReducedMotion()

  return (
    <>
      <Navbar />
      <main>
        <section className="hero-section" id="home">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=2400&q=90"
            alt="A warm, welcoming coffee shop filled with soft natural light"
            fetchpriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <motion.div
              className="hero-copy"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.75,
                delay: reduceMotion ? 0 : 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="hero-kicker">
                <span className="hero-kicker-dot" /> YOUR NEIGHBORHOOD COFFEE SPOT
              </span>
              <h1>
                Find Your
                <br />
                Little <em>Happy</em>
                <br />
                Place.
              </h1>
              <p>Good coffee. Cozy space. Better moments.</p>
              <div className="hero-actions">
                <a className="button button-light" href="#menu">
                  Explore our menu <ArrowRight size={16} />
                </a>
                <a className="button button-outline" href="#about">
                  Discover our space <ArrowDown size={16} />
                </a>
              </div>
            </motion.div>
            <motion.div
              className="hero-stamp"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.85, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: reduceMotion ? 0 : 0.55,
              }}
            >
              <span>GOOD DAYS</span>
              <Sparkles size={17} strokeWidth={1.5} />
              <span>START HERE</span>
              <small>SINCE ALWAYS</small>
            </motion.div>
          </div>
          <div className="hero-bottom">
            <span>TAKE A BREATH. YOU’RE HERE.</span>
            <a href="#about" aria-label="Scroll to learn about TriCoff">
              SCROLL A LITTLE <span>↓</span>
            </a>
            <span>01 — 06</span>
          </div>
        </section>

        <section className="intro-strip" aria-label="TriCoff's promise">
          <span>GOOD COFFEE</span>
          <i>✳</i>
          <span>UNHURRIED MOMENTS</span>
          <i>✳</i>
          <span>A PLACE TO BE YOU</span>
          <i>✳</i>
          <span>GOOD COFFEE</span>
        </section>

        <section className="about-section section-pad" id="about">
          <Reveal className="about-photo about-photo-main">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1300&q=85"
              alt="Carefully poured coffee in a bright, relaxed cafe"
              loading="lazy"
            />
            <span className="photo-caption">MADE WITH TIME, NOT TAKEN BY IT.</span>
          </Reveal>
          <Reveal className="about-photo about-photo-detail" delay={0.12}>
            <img
              src="https://images.unsplash.com/photo-1511081692775-05d0f180a065?auto=format&fit=crop&w=800&q=85"
              alt="A cozy coffee shop table ready for a catch-up"
              loading="lazy"
            />
          </Reveal>
          <Reveal className="about-copy" delay={0.08}>
            <span className="eyebrow">A LITTLE ABOUT US</span>
            <h2>
              More Than
              <br />
              Just <em>Coffee.</em>
            </h2>
            <p>
              Some days call for a good cup. Some days call for a place to land.
              We made TriCoff for both.
            </p>
            <p>
              Come to get a little work done, catch up with your people, or just
              take a minute for yourself. We’ll save you the sunny seat.
            </p>
            <a className="text-link" href="#location">
              A little more about our place <ArrowUpRight size={16} />
            </a>
          </Reveal>
          <div className="about-note">YOUR PLACE TO PAUSE <span>✳</span> YOUR WAY TO RECHARGE</div>
        </section>

        <MenuSection />

        <section className="promotions-section section-pad" id="promotions">
          <div className="promotions-heading">
            <Reveal>
              <SectionHeading
                eyebrow="A GOOD THING OR TWO"
                title="Good Things Are Happening."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <p>Little reasons to make your day a bit more lovely.</p>
            </Reveal>
          </div>
          <div className="promotion-feature">
            <Reveal className="promotion-feature-image">
              <img src={promotions[0].image} alt={promotions[0].alt} loading="lazy" />
              <span>01 / THE MIDWEEK PICK-ME-UP</span>
            </Reveal>
            <Reveal className="promotion-feature-copy" delay={0.1}>
              <span className="eyebrow">{promotions[0].eyebrow}</span>
              <h3>{promotions[0].title}</h3>
              <p>{promotions[0].description}</p>
              <span className="promotion-date">{promotions[0].date}</span>
              <a className="text-link" href="#location">
                Make an afternoon of it <ArrowRight size={16} />
              </a>
            </Reveal>
          </div>
          <div className="promotion-list">
            {promotions.slice(1).map((promotion, index) => (
              <Reveal
                className="promotion-row"
                key={promotion.title}
                delay={index * 0.08}
              >
                <img src={promotion.image} alt={promotion.alt} loading="lazy" />
                <div className="promotion-row-copy">
                  <span className="eyebrow">{promotion.eyebrow}</span>
                  <h3>{promotion.title}</h3>
                  <p>{promotion.description}</p>
                  <span className="promotion-date">{promotion.date}</span>
                </div>
                <span className="promotion-arrow" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </span>
              </Reveal>
            ))}
          </div>
        </section>

        <GallerySection />

        <section className="visit-section" id="location">
          <div className="visit-image">
            <img
              src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1500&q=85"
              alt="An inviting neighborhood coffee shop interior"
              loading="lazy"
            />
            <span className="visit-image-note">A LITTLE SPACE, JUST FOR YOU.</span>
          </div>
          <div className="visit-content">
            <Reveal>
              <span className="eyebrow">WHENEVER YOU NEED A LITTLE PAUSE</span>
              <h2>
                We’ll Save
                <br />
                You a <em>Seat.</em>
              </h2>
              <p className="visit-lede">
                The door’s open, the coffee’s on, and there’s always room for one more.
              </p>
              <div className="visit-details">
                <div className="visit-detail">
                  <span className="detail-icon"><MapPin size={17} /></span>
                  <div>
                    <span className="detail-label">FIND OUR LITTLE CORNER</span>
                    <p>{contact.address}</p>
                    <small>{contact.addressNote}</small>
                    <a href={contact.maps} target="_blank" rel="noreferrer">
                      Open in Maps <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
                <div className="visit-detail">
                  <span className="detail-icon"><Clock3 size={17} /></span>
                  <div>
                    <span className="detail-label">WHEN WE’RE AROUND</span>
                    {contact.hours.map((hour) => (
                      <p className="hours-row" key={hour.days}>
                        <span>{hour.days}</span>
                        <span>{hour.time}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="visit-actions">
                <a className="button button-dark" href={contact.whatsapp} target="_blank" rel="noreferrer">
                  Say hello on WhatsApp <ArrowUpRight size={15} />
                </a>
                <a
                  className="visit-instagram"
                  href={contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow TriCoff on Instagram"
                >
                  <Instagram size={17} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="closing-note" aria-label="Come visit TriCoff">
          <span>WHEN THE DAY GETS A LITTLE LOUD</span>
          <p>There’s always <em>TriCoff.</em></p>
          <a href="#location">Come find us <ArrowRight size={15} /></a>
          <span>GOOD THINGS TAKE A LITTLE TIME</span>
        </section>
      </main>
      <Footer />
    </>
  )
}
