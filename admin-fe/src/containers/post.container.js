import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "../actions/post.action";
import Post from "../components/post/post";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
import storeConfig from '../config/store.config'
import Modal from "react-modal";

class PostContainer extends Component {
  constructor() {
    super();
    this.state={
      isOpen:false,
    }
  }
  async componentWillMount() {
    this.props.postActions.getPost();

    let res = await this.props.userActions.auth();
    if (res === false) this.props.history.push("/login");
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      this.props.postActions.getPost();
    }
    if (
      nextProps.islogin !== this.props.islogin &&
      nextProps.islogin === false
    ) {
      this.props.history.push("/login");
    }
  }
  handleClickUser = () =>{
    if(storeConfig.getUser().is_admin) {
      this.props.history.push('/usermanager')
    }else{
      this.setState({
        isOpen:true,
      })
    }
  }
  render() {
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider handleClickUser = {()=>this.handleClickUser()} />
        <Post
          post={this.props.post}
          totalpage={this.props.totalpage}
          page={this.props.page}
          backPage={() => this.props.postActions.backPage()}
          nextPage={() => this.props.postActions.nextPage()}
          setPage={page => this.props.postActions.setPage(page)}
          isadd={this.props.isadd}
          addPost={(
            title,
            content,
           
          ) =>
            this.props.postActions.addPost(
              title,
              content,
             
            )
          }
        />
        <Modal
            isOpen={this.state.isOpen}
            contentLabel="Example Modal"
            className="modal-cart"
          >
            <div>
              <div className="modal-title">
              <i class="fas fa-exclamation-circle"></i>
                <h2>Thông báo</h2>
              </div>
              <div className="modal-content-cart">
                <div className="modal-content-title">
                  Bạn cần phải là Admin mới có thể truy cập
                </div>
                <div className="btn-close-modal">
                  <button
                    className="btn btn-modal-cart"
                    onClick={() => {
                      this.setState({
                        isOpen:false
                      });
                    }}
                  >
                    close
                  </button>
                </div>
              </div>
            </div>
          </Modal>
      </section>
    );
  }
}
const mapStateToProps = state => ({
  post: state.postReducers.post.data,
  totalpage: state.postReducers.post.totalpage,
  page: state.postReducers.post.page,
  islogin: state.userReducers.user.islogin,
  isadd: state.postReducers.post.isadd,

});

const mapDispatchToProps = dispatch => {
  return {
    postActions: bindActionCreators(postActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostContainer);
