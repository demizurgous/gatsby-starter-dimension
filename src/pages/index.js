import React from 'react'
import Layout from '../components/layout'
import Modal from '../components/Modal'

import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import {ModalContextProvider} from '../context/context'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isArticleVisible: false,
      timeout: false,
      articleTimeout: false,
      article: '',
      loading: 'is-loading'
    }
    this.handleOpenArticle = this.handleOpenArticle.bind(this)
    this.handleCloseArticle = this.handleCloseArticle.bind(this)
    this.handleOpenPortfolio = this.handleOpenPortfolio.bind(this)
    this.handleClosePortfolio = this.handleClosePortfolio.bind(this)
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount () {
    this.timeoutId = setTimeout(() => {
        this.setState({loading: ''});
    }, 100);
    this.wrapperRef.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount () {
    if (this.timeoutId) {
        clearTimeout(this.timeoutId);
    }
    this.wrapperRef.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleOpenArticle(article) {

    this.setState({
      isArticleVisible: !this.state.isArticleVisible,
      article
    })

    setTimeout(() => {
      this.setState({
        timeout: !this.state.timeout
      })
    }, 325)

    setTimeout(() => {
      this.setState({
        articleTimeout: !this.state.articleTimeout
      })
    }, 350)

  }

  handleCloseArticle() {

    this.setState({
      articleTimeout: !this.state.articleTimeout
    })

    setTimeout(() => {
      this.setState({
        timeout: !this.state.timeout
      })
    }, 325)

    setTimeout(() => {
      this.setState({
        isArticleVisible: !this.state.isArticleVisible,
        article: ''
      })
    }, 350)

  }

  handleOpenPortfolio() {

    this.setState({
      articleTimeout: false,
    })

    setTimeout(() => {
      this.setState({
        articleTimeout: true
      })
    }, 325)

  }

  handleClosePortfolio() {

    this.setState({
      articleTimeout: false,
    })

    setTimeout(() => {
      this.setState({
        articleTimeout: true
      })
    }, 325)

  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.state.isArticleVisible) {
        this.handleCloseArticle();
      }
    }
  }

  render() {
    return (
      <ModalContextProvider>
        <Layout location={this.props.location}>
          <div className={`body ${this.state.loading} ${this.state.isArticleVisible ? 'is-article-visible' : ''}`}>
            <div id="wrapper">
              <Header onOpenArticle={this.handleOpenArticle} timeout={this.state.timeout} />
              <Main
                isArticleVisible={this.state.isArticleVisible}
                timeout={this.state.timeout}
                articleTimeout={this.state.articleTimeout}
                article={this.state.article}
                onCloseArticle={this.handleCloseArticle}
                setWrapperRef={this.setWrapperRef}
                onClosePortfolio={this.handleClosePortfolio}
                onOpenPortfolio={this.handleOpenPortfolio}
              />
              <Footer timeout={this.state.timeout} />
            </div>
            <div id="bg"></div>
          </div>
        </Layout>
        <div id="modal">
          <Modal />
        </div>
      </ModalContextProvider>
    )
  }
}

export default IndexPage
