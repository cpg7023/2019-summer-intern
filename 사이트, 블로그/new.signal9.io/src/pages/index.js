import React from "react"
import AOS from 'aos';
import GLink from 'gatsby-link';
import Background from '../../assets/img/bg/10.png';
import axios from "axios";
import Transbtn from "../components/transbtn"
import { injectIntl, FormattedMessage, IntlProvider, Link } from "gatsby-plugin-intl";
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

// const IndexPage = () => (
class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ' ',
      email: ' ',
      message: ' ',
     
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNewsFormSubmit = this.handleNewsFormSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleFormSubmit(event) {
    //페이지 리로딩 방지
    event.preventDefault();
    console.log(this.state);
    //post 요청 보내기
    try {
      const response = axios.post('https://xdft7qxutj.execute-api.us-east-1.amazonaws.com/v3/email/posted_data', { posted_data: this.state });
      console.log('Returned data:', response);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
    //상태 초기화
    this.setState({
      name: ' ',
      email: ' ',
      message: ' ',
    })
  }
  handleNewsFormSubmit(event) {
    //페이지 리로딩 방지
    event.preventDefault();
    console.log(this.state);
    //post 요청 보내기
    try {
      const response = axios.post('https://xdft7qxutj.execute-api.us-east-1.amazonaws.com/v3/email/newsletter/posted_data', { posted_data: this.state });
      console.log(response.posted_data)
      console.log('Returned data:', response);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
    //상태 초기화
    this.setState({
      email: ' ',
    })
  }

  componentDidMount() {
    AOS.init({ duration: 2000 })
  }
  componentWillReceiveProps() {
    AOS.refresh();
  }


  render() {
    return (
      <React.Fragment>
          <nav className="navbar navbar-expand-lg navbar-dark navbar-stick-dark" data-navbar="sticky">
            <div className="container">
              <section className="navbar-mobile">
                <div className="navbar-left mr-4">
                  <button className="navbar-toggler navbar-nav dropdown-menu" type="button">&#9776;</button>
                  <a className="navbar-brand-img" href="#">
                    <img className="logo-dark" src={require('../../assets/img/logo-dark.png')} alt="logo"></img>
                    <img className="logo-light" src={require('../../assets/img/logo-light.png')} alt="logo"></img>
                  </a>
                </div>

                <nav className="nav nav-navbar nav-text-normal mr-auto" style={{ 'font-family': 'sans-serif' }}>
                  <Link className="nav-link" to="#Services">Services</Link>
                  <Link className="nav-link" to="#Audit">Audit</Link>
                  {/*<Link className="nav-link" to="#apigateway">Blockchain Gateway</Link>*/}
                  <Link className="nav-link" to="#Plugin">Plugin</Link>
                  <Link className="nav-link" to="#Contact">Contact Us</Link>
                  <Link className="nav-link" to="/blog">Blog</Link>
                </nav>
                <Transbtn/>
              </section>
            </div>
          </nav>

          <header className="header h-fullscreen" style={{ "font-family": "Dosis", "background-image": "linear-gradient(135deg, #f9f7ff 0%, #fff 50%, #f6f3ff 100%)" }}>
            <div className="container">
              <div className="row align-items-center h-100">
                <div className="col-lg-6">
                  <h1 className="fw-600"><FormattedMessage id="company" /><span className="text-warning"> <FormattedMessage id="title" /></span><br /></h1>{/*시그널나인 블록체인 연구소*/}
                  <p className="lead mt-5 mb-8"><FormattedMessage id="head_description" /></p>{/*시그널나인은 블록체인에 대해 연구하고, 블록체인 활성화에 필요한 다양한 솔루션을 개발하고 있습니다.*/}
                  <p className="gap-xy">
                  </p>
                </div>
                <div className="col-lg-5 ml-auto d-none d-lg-block">
                  <img src={require('../../assets/img/vector/18.png')} alt="img"></img>
                </div>
              </div>
            </div>
          </header>

          <main className="main-content">
    
            <section id="Services" className="section" style={{ 'font-family': 'monospace', "background-color": "#8ea6e6" }}>
              <div className="container">
                <header className="section-header">
                  <small className="text-white"><FormattedMessage id="services_title" /></small>   {/*제공 서비스*/}
                  <h2 className="text-white"><FormattedMessage id="services_title_sum" /></h2>{/*시그널나인 제공 서비스 및 솔루션*/}
                  <hr style={{ width: '100%' }} />
                  <p className="lead text-white"><FormattedMessage id="services_title_description" /></p>{/*시그널나인에서 제공하는 서비스 및 솔루션 리스트입니다.*/}
                </header>

                <div className="row gap-y">

                  <div className="col-md-6 col-xl-3">
                    <div className="card card-body shadow-3 text-center" style={{ height: '100%' }}>
                      <p className="my-5"><i className="icon-browser lead-6"></i></p>
                      <h5 className="mb-5 fw-500"><a href="#"><FormattedMessage id="service_1" /></a></h5>{/*스마트계약 보안검증*/}
                      <p><FormattedMessage id="services_1_description" /></p>
                    </div>
                  </div>

                  <div className="col-md-6 col-xl-3">
                    <div className="card card-body shadow-3 text-center" style={{ height: '100%' }}>
                      <p className="my-5"><i className="icon-mobile lead-6"></i></p>
                      <h5 className="mb-5 fw-500"><a href="#"><FormattedMessage id="service_2" /></a></h5>{/*스마트계약 작성대행*/}
                      <p><FormattedMessage id="services_2_description" /></p>
                    </div>
                  </div>

                  <div className="col-md-6 col-xl-3">
                    <div className="card card-body shadow-3 text-center" style={{ height: '100%' }}>
                      <p className="my-5"><i className="icon-megaphone lead-6"></i></p>
                      <h5 className="mb-5 fw-500"><a href="#"><FormattedMessage id="service_3" /></a></h5>{/*스마트계약 개발자 툴*/}
                      <p><FormattedMessage id="services_3_description" /></p>
                    </div>
                  </div>

                  <div className="col-md-6 col-xl-3">
                    <div className="card card-body shadow-3 text-center" style={{ height: '100%' }}>
                      <p className="my-5"><i className="icon-linegraph lead-6"></i></p>
                      <h5 className="mb-5 fw-500"><a href="#"><FormattedMessage id="service_4" /></a></h5>{/*블록체인 API gateway*/}
                      <p><FormattedMessage id="services_4_description" /></p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            <section id="Audit" className="section" style={{ 'font-family': 'monospace', "background-color": "#ffffff" }}>
              <div className="container">
                <header className="section-header">
                  <small><FormattedMessage id="audit_title" /></small>{/*스마트 계약*/}
                  <h2><FormattedMessage id="audit_title_sum" /> </h2>{/*블록체인 스마트 계약 보안 검증*/}
                  <hr style={{ width: '100%' }} />
                  <p className="lead"><FormattedMessage id="audit_title_discription" /></p>{/*다양한 스마트 컨트랙트 기존 해킹 사건 분석 등의 연구를 통해 얻은 노하우들을 바탕으로 스마트 계약을 검증하고 있습니다.*/}
                </header>

                <div className="row gap-y">

                  <div className="col-md-8 mx-auto mb-7">
                    <img src={require("../../assets/img/preview/feature-tablet.png")} alt="..." data-aos="fade-up" data-aos-duration="2000"></img>
                  </div>

                  <div className="w-100"></div>

                  <div className="col-md-6 col-xl-4">
                    <div className="media">
                      <div className="lead-6 line-height-1 text-lighter w-70px"><i className="icon-mobile"></i></div>
                      <div className="media-body">
                        <h5><FormattedMessage id="audit_1" /></h5>
                        <p><FormattedMessage id="audit_1_description" /></p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-xl-4">
                    <div className="media">
                      <div className="lead-6 line-height-1 text-lighter w-70px"><i className="icon-gears"></i></div>
                      <div className="media-body">
                        <h5><FormattedMessage id="audit_2" /></h5>
                        <p><FormattedMessage id="audit_2_description" /></p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-xl-4">
                    <div className="media">
                      <div className="lead-6 line-height-1 text-lighter w-70px"><i className="icon-tools"></i></div>
                      <div className="media-body">
                        <h5><FormattedMessage id="audit_3" /></h5>
                        <p><FormattedMessage id="audit_3_description" /></p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-xl-4">
                    <div className="media">
                      <div className="lead-6 line-height-1 text-lighter w-70px"><i className="icon-layers"></i></div>
                      <div className="media-body">
                        <h5><FormattedMessage id="audit_4" /></h5>
                        <p><FormattedMessage id="audit_4_description" /></p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-xl-4">
                    <div className="media">
                      <div className="lead-6 line-height-1 text-lighter w-70px"><i className="icon-recycle"></i></div>
                      <div className="media-body">
                        <h5><FormattedMessage id="audit_5" /></h5>
                        <p><FormattedMessage id="audit_5_description" /></p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-xl-4">
                    <div className="media">
                      <div className="lead-6 line-height-1 text-lighter w-70px"><i className="icon-chat"></i></div>
                      <div className="media-body">
                        <h5><FormattedMessage id="audit_6" /></h5>
                        <p><FormattedMessage id="audit_6_description" /></p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* <div className="row">
            <div className="col-md-8 mx-auto">
              <h6 className="divider mt-8"><code>검증 실적</code></h6>
              <div className="rounded p-7">
                  <CountUp start={0} end={100} delay={0} duration={2.7} />
              </div>
            </div>
          </div> */}

              </div>
            </section>

           
            <section id="Plugin" className="section bg-gray overflow-hidden" style={{ 'font-family': 'sans-serif', "background-color": "#8ea6e6" }}>
              <div className="container">
                <header className="section-header">
                  <h3 className="text-white">ICON SCORE Support</h3>
                  <h4 className="text-white"><FormattedMessage id="plugin" /></h4>
                  <hr style={{ width: '100%' }} />
                </header>

                <div className="row offset-3 gap-x">


                  <div className="col-md-5 col-xl-4 position-center">
                    <div className="card card-body text-center">
                      <div className="align-self-center" style={{ "width": "100%" }}>
                        <img src={require("../../assets/img/VScode.png")} alt="VScode 로고"></img>
                      </div>
                      <p className="my-6"></p>
                      <h4 className="btn btn-lg btn-round btn-primary" style={{ "background-color": "#17a2b8" }}><a className="text-white" href="https://github.com/signal9dev/icon-vscode-plugin"><FormattedMessage id="plugin_vs" /></a></h4>
                      <p></p>
                    </div>
                  </div>

                  <div className="col-md-5 col-xl-4 align-self-center">
                    <div className="card card-body text-center" >
                      <div className="align-self-center" style={{ "width": "100%" }}>
                        <img src={require("../../assets/img/pycharm.png")} alt="파이참 로고"></img>
                      </div>
                      <p className="my-6"></p>
                      <h4 className="btn btn-lg btn-round btn-primary" style={{ "background-color": "#17a2b8" }}><a className="text-white" href="https://github.com/signal9dev/icon-pycharm-plugin"><FormattedMessage id="plugin_py" /></a></h4>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section bg-gray overflow-hidden py-7" style={{ 'font-family': 'sans-serif'}}>
              <div className="container">
                <div className="row gap-y align-items-center">
                  <div className="col-md-9">
                    <h4 className="mb-0 text-center text-md-left"><FormattedMessage id="audit_question" /></h4>
                  </div>

                  <div className="col-md-3 text-center text-md-right">
                    <a className="btn btn-lg btn-round btn-light text-white" style={{ "background-color": "#17a2b8" }} href="http://icon.signal9.io" ><FormattedMessage id="audit_use" /></a>
                  </div>
                </div>
              </div>
            </section>
           {/* <section id="apigateway" className="section bg-gray overflow-hidden" style={{ 'font-family': 'sans-serif' }}>
              <div className="container">
                <div className="row">

                  <div className="col-md-6 align-self-center text-center text-md-left">
                    <h2><FormattedMessage id="apigateway_title" /></h2><br />
                    <p><FormattedMessage id="apigateway_discription" /></p>
                    <br />
                    <a className="btn btn-lg btn-round btn-primary shadow-3" href="#apigateway"><FormattedMessage id="apigateway_ready" /></a>
                  </div>

                  <div className="col-md-5 mx-auto text-center mt-8 mt-md-0">
                    <img src={require("../../assets/img/preview/phone-2.png")} alt="..." data-aos="fade-up"></img>
                  </div>

                </div>
              </div>
        </section>*/}

            <section className="section bg-gray overflow-hidden py-7" style={{ 'font-family': 'sans-serif', "background-color": "#8ea6e6" }}>
              <div className="container">
                <div className="row gap-y align-items-center">
                  <div className="col-md-6 text-white text-center text-md-left">
                    <h3><FormattedMessage id="newsletter_title" /></h3>
                    <p><FormattedMessage id="newsletter_discription" /></p>
                  </div>

                  <div className="col-md-auto ml-auto text-center text-md-right">
                    <form onSubmit={this.handleNewsFormSubmit} className="form-inline justify-content-center">
                      <div>
                        <input id="email" className="form-control w-250 mb-2 mr-sm-2" type="email" name="email" placeholder="Email address"
                          value={this.state.email} onChange={this.handleChange}></input>
                      </div>
                      <button className="btn btn-lg btn-primary mb-2" type="submit" value="Submit"><FormattedMessage id="newsletter_submit" /></button>
                    </form>
                  </div>
                </div>
              </div>
            </section>

            <section class="section" style={{ 'font-family': 'sans-serif', "background-color": "#ffffff" }}>
              <div class="container">
                <header class="section-header">
                  <h2>Partners</h2>
                  <hr style={{ width: '100%' }} />
                  <p class="lead"><FormattedMessage id="partners_discription" /></p>
                </header>

                <div class="row gap-y partner">
                  <div class="col-6 col-md-3">
                    <img src={require("../../assets/img/partner/iconloop.png")} alt="icon loop"></img>
                  </div>
                  <div class="col-6 col-md-3">
                    <img src={require("../../assets/img/partner/nomad_connection.png")} alt="nomad connection"></img>
                  </div>
                  <div class="col-6 col-md-3">
                    <img src={require("../../assets//img/partner/uangel.png")} alt="Uangel"></img>
                  </div>
                  <div class="col-6 col-md-3">
                    <img src={require("../../assets/img/partner/ad4th.png")} alt="ad4th"></img>
                  </div>
                </div>

              </div>
            </section>

            <section id="Contact" className="section bg-img" style={{ 'font-family': 'sans-serif', "background-image": `url(${Background})` }} data-overlay="8">
              <div className="container">
                <div className="row gap-y">
                  <div className="col-11 col-md-6 mx-auto mx-md-0">
                    <div className="col-md-10 mx-auto bg-white p-6 rounded">
                      <div className="alert alert-success d-on-success"><FormattedMessage id="contact_notice1" /></div>
                      <div className="form-group">
                        <form onSubmit={this.handleFormSubmit}>
                          <input id="name" className="form-control form-control-lg" type="text" name="name" placeholder="Your Name"
                            value={this.state.name} onChange={this.handleChange}></input>
                          <p />
                          <input id="email" className="form-control form-control-lg" type="email" name="email" placeholder="Your Email Address"
                            value={this.state.email} onChange={this.handleChange}></input>
                          <p />
                          <textarea id="message" className="form-control form-control-lg" rows="4" placeholder="Your Message" name="message"
                            value={this.state.message} onChange={this.handleChange}></textarea>
                          <button className="btn btn-lg btn-block btn-primary" type="submit" value="Submit">Submit Inquiry</button>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="col-11 col-md-4 mx-auto text-white pt-6">
                    <p><FormattedMessage id="contact_notice2" /></p>
                    <br />
                    <h3>Email</h3>
                    <p>support@signal9.io</p>
                  </div>
                </div>
              </div>
            </section>
            <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
              <a className="btn" href="#"><h3>Top</h3></a>
            </div>
          </main>

          <footer className="footer bg-gray" style={{ 'font-family': 'sans-serif' }}>
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
}

// const IndexPage = () => (
//   <Layout>
//     <SEO title="Home" />
//     <h1>Hi people</h1>
//     <p>Welcome to your new Gatsby site.</p>
//     <p>Now go build something great.</p>
//     <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
//       <Image />
//     </div>
//     <Link to="/page-2/">Go to page 2</Link>
//   </Layout>
// )

// #components-layout-demo-top .logo {
//   width: 120px;
//   height: 31px;
//   background: rgba(255, 255, 255, 0.2);
//   margin: 16px 24px 16px 0;
//   float: left;
// }

export default injectIntl(IndexPage)
