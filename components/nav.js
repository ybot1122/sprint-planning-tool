import { connect } from 'react-redux'

import Head from './head'
import Link from 'next/link'
import { HOME, ABOUT } from '../constants/routes';
import { toggleShowCards } from '../actions/actions'

const links = [
  { href: 'https://github.com/segmentio/create-next-app', label: 'Github' },
  { href: ABOUT, label: 'About' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = (props) => {
  const { dispatch } = props
  return (
    <nav>
      <ul>
        <li>
          <Link prefetch href={HOME}>
            <a>Home</a>
          </Link>
        </li>
        <ul>
          <li>
            <a onClick={() => dispatch(toggleShowCards())}>Show/Hide</a>
          </li>
        </ul>
        <ul>
          {links.map(
            ({ key, href, label }) => (
              <li key={key}>
                <Link href={href}>
                  <a>{label}</a>
                </Link>
              </li>
            )
          )}
        </ul>
      </ul>

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: -apple-system,BlinkMacSystemFont,Avenir Next,Avenir,Helvetica,sans-serif;
        }
        nav {
          text-align: center;
        }
        ul {
          display: flex;
          justify-content: space-between;
        }
        nav > ul {
          padding: 4px 16px;
        }
        li {
          display: flex;
          padding: 6px 8px;
        }
        a {
          color: #067df7;
          text-decoration: none;
          font-size: 13px;
          cursor: pointer;
        }
      `}</style>
    </nav>
  )
}

export default connect(state => state)(Nav)
