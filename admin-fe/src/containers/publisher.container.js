import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../actions/food.action";
import Publisher from "../components/publisher/publisher";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
class PublisherContainer extends Component {
  constructor() {
    super();
  }
  async componentWillMount() {
    this.props.productActions.getPublisher();
    let res = await this.props.userActions.auth()
        if (res === false)
            this.props.history.push('/login')
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.islogin !== this.props.islogin &&
      nextProps.islogin === false
    ) {
      this.props.history.push("/login");
    }
    if (nextProps.page !== this.props.page) {
      this.props.productActions.getPublisher();
    }
  }
  render() {
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider />
        <Publisher
          publisher={this.props.publisher}
          isadd={this.props.isadd}
          addPublisher={name => this.props.productActions.addPublisher(name)}
          updatePublisher={(id, name) =>
            this.props.productActions.updatePublisher(id, name)
          }
          isupdate={this.props.isupdate}
          page={this.props.page}
          totalpage={this.props.totalpage}
          backPage={() => this.props.productActions.publisherBackPage()}
          nextPage={() => this.props.productActions.publisherNextPage()}
          setPage={page => this.props.productActions.publisherSetPage(page)}
        />
      </section>
    );
  }
}
const mapStateToProps = state => ({
  publisher: state.productReducers.publisher.data,
  isadd: state.productReducers.publisher.isadd,
  isupdate: state.productReducers.publisher.isupdate,
  totalpage: state.productReducers.publisher.totalpage,
  page: state.productReducers.publisher.page,
  islogin: state.userReducers.user.islogin
});

const mapDispatchToProps = dispatch => {
  return {
    productActions: bindActionCreators(productActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublisherContainer);
