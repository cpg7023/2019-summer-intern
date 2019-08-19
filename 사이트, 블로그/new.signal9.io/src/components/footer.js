import React from 'react'

const Footer = () => {
    return (
            <div className="container">
                <div className="row gap-y align-items-center">
                    <div className="col-md-12 text-center text-md-left">
                        <p><a href="#"><img src={require("../../assets/img/logo-dark.png")} alt="logo"></img></a></p>
                        <p><small>© {new Date().getFullYear()}, Signal9. All rights reserved</small></p>
                    </div>
                </div>
            </div>
    )
}

export default Footer