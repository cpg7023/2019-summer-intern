import React from 'react'

import { injectIntl, FormattedMessage, IntlProvider, Link } from "gatsby-plugin-intl";
const Footer = () => {
    return (
        <React.Fragment>
            <footer className="footer bg-gray" style={{ bottom: 0, width: '100%', position: 'absolute', 'font-family': 'sans-serif'}}>
                <div className="container">
                    <div className="row gap-y align-items-center">
                        <div className="col-md-12 text-center text-md-left">
                            <p><a href="#"><img src={require("../../assets/img/logo-dark.png")} alt="logo"></img></a></p>
                            <p><FormattedMessage id="footer_info1" /> <br /><FormattedMessage id="footer_info2" /></p>
                        </div>
                    </div>

                    <div className="row gap-y align-items-center">
                        <div className="col-md-3 text-center text-md-left">
                            <small>© 2019 Signal9. All rights reserved.</small>
                        </div>
                    </div>
                </div>
            </footer>

            <script src="/js/page.min.js"></script>
            <script src="/js/script.js"></script>
        </React.Fragment>
    )
}

export default injectIntl(Footer)