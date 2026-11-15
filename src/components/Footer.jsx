import { ArrowUpRight, Instagram } from 'lucide-react'
import { navigation, contact } from '../data/siteData'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="wordmark wordmark-footer" href="#home" aria-label="TriCoff home">
            TRI<span>COFF</span><i>.</i>
          </a>
          <p>Your little place to recharge.</p>
          <span className="footer-aside">Good coffee. Cozy space. Better moments.</span>
        </div>
        <div className="footer-links">
          <span className="footer-label">TAKE A LOOK AROUND</span>
          <div className="footer-nav">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-social">
          <span className="footer-label">LET’S BE FRIENDS</span>
          <a href={contact.instagram} target="_blank" rel="noreferrer">
            <Instagram size={16} /> Instagram <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} TriCoff Coffee Co.</span>
        <span>Made with a little extra love <span aria-hidden="true">♥</span></span>
        <a href="#home">Back to the top ↑</a>
      </div>
    </footer>
  )
}
