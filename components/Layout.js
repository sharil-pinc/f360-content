import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
            <h2>
              <span>Foundry 360</span>
            </h2>
            <h2>Transform on how you monitor your assets!</h2>
          </a>
        </Link>
      </header>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Copyright 2023</p>
      </footer>
    </div>
  )
}