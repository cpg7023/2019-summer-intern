import { Link, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import './header'
import { StaticQuery } from "gatsby";


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

const Header = () => {
  return (

    <header style={{ background: `white`, marginBottom: `1.45rem`, }}>
      <div style={{ margin: `0 auto`, maxWidth: 960, padding: `1.45rem 1.0875rem`, }}>
        <h1 style={{ margin: 0 }}>
          <section>
            <div className="container" style={{ 'margin-left': 10 }}>
              <a className="navbar-brand" href="/">
                <img className="logo-white" src={require('../../assets/img/logo-dark.png')} alt="logo"></img>
              </a>
            </div>
          </section>

          <section className="bg-gray" style={{ "background-color": "white", "border-bottom": "4px solid black" }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Link to="/blog">
              <h1 className="fw-600">Signal<span className="text-warning">9</span></h1>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <h1 className="fw-600">Blo<span className="text-warning">g</span></h1>
              </div>
              </Link>
            </div>
          </section>
          <StaticQuery query={graphql`
    query { 
      site {
        siteMetadata {

          description
        }
      }
    }
  `}
            render={data => <TitleAndDescription data={data} />} />

        </h1>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
