import { graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import './header'
import { StaticQuery } from "gatsby";
import Blogtransbtn from './blogtransbtn'
import { injectIntl, FormattedMessage, IntlProvider, Link } from "gatsby-plugin-intl";


const TitleAndDescription = ({ data }) => {
  const title = data.site.siteMetadata.title
  const description = data.site.siteMetadata.description

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'avenir' }}>
      <h2 style={{ marginBottom: 0 }}>{title}</h2>
      <h3 style={{ marginTop: 0, opacity: 0.5 }}>
        {description}
      </h3>
    </div>
  )
}

//const Header = () => {
class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark navbar-stick-dark" data-navbar="sticky">
          <div className="container">
            <section className="navbar-mobile">
              <div className="navbar-left mr-4">
                <button className="navbar-toggler navbar-nav dropdown-menu" type="button">&#9776;</button>
                <a className="navbar-brand-img" href="/">
                  <img className="logo-dark" src={require('../../assets/img/logo-dark.png')} alt="logo"></img>
                  <img className="logo-light" src={require('../../assets/img/logo-light.png')} alt="logo"></img>
                </a>
              </div>
          
                <nav className="nav nav-navbar nav-text-normal mr-auto" style={{'font-family': 'sans-serif'}}>
                  <Link className="nav-link" to="/#Services">Services</Link>
                  <Link className="nav-link" to="/#Audit">Audit</Link>
                  <Link className="nav-link" to="/#apigateway">Blockchain Gateway</Link>
                  <Link className="nav-link" to="/#Contact">Contact Us</Link>
                  <Link className="nav-link" to="/blog">Blog</Link>
                </nav>
                <Blogtransbtn/>
            </section>
          </div>
        </nav>

        <header className="header" >
          
        </header>
      </React.Fragment>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default injectIntl(Header)
