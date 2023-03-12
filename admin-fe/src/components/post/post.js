import React, { Component } from "react";
import { Link } from "react-router-dom";
class Post extends Component {
  constructor() {
    super();
    this.state = {
      pagination: [],
      post: null,
      title: "",
      content: '',
      noti: "",
      id: null,
    };
  }
  componentWillMount() {
    let tmp = [];
    for (let i = 1; i <= this.props.totalpage; i++) {
      tmp.push(i);
    }
    this.setState({ pagination: tmp });
    this.checkedCheckbox = new Set();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.totalpage !== this.props.totalpage) {
      let tmp = [];
      for (let i = 1; i <= nextProps.totalpage; i++) {
        tmp.push(i);
      }
      this.setState({ pagination: tmp });
    }
    if (nextProps.isadd === true) {
      this.reset()
    } 
  }
  reset = () => {
    this.setState({
     title:'',
     content: '',
    })
  }
  renderPagination() {
    if (this.state.pagination.length === 0) {
      return null;
    } else {
      return (
        <ul className="pagination pagination-custom col-md-6 offset-md-3">
          <li onClick={() => this.props.backPage()}>
            <a>&laquo;</a>
          </li>
          {this.state.pagination.map((element, index) => {
            if (this.props.page === element) {
              return (
                <li
                  className="active"
                  onClick={() => this.props.setPage(element)}
                >
                  <a>{element}</a>
                </li>
              );
            } else {
              return (
                <li onClick={() => this.props.setPage(element)}>
                  <a>{element}</a>
                </li>
              );
            }
          })}
          <li onClick={() => this.props.nextPage()}>
            <a>&raquo;</a>
          </li>
        </ul>
      );
    }
  }
  
  
  submitAddPost = () => {
    const {
      title,
      content,
    } = this.state;

    if (title === '') {
      this.setState({
        noti: "Name invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    
    if (content === "") {
      this.setState({
        noti: "Category invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    this.props.addPost(
      title,
      content,
    );
  };

  renderBtnSubmit = () => {
    
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button
              onClick={() => this.submitAddPost()}
              className="btn-custom"
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      );
  };
 

  render() {
    console.log(this.props.post);
    return (
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="page-header">
              <i className="fa fa-table" /> Table
            </h3>
            <ol className="breadcrumb">
              <li>
                <i className="fa fa-home" />
                <Link to="/">Home</Link>
              </li>
              <li>
                <i className="fa fa-table" />Table
              </li>
              <li>
                <i className="fa fa-th-list" />Post Manager
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">Advanced Table</header>
              <table className="table table-striped table-advance table-hover">
                <tbody>
                  <tr>
                    <th>
                      <i className="icon_profile" /> Title
                    </th>
                    <th>
                      <i className="icon_calendar" /> Content
                    </th>
                   
                  </tr>
                  {this.props.post.map((element, index) => {
                    return (
                      <tr>
                        <td>{element.Title}</td>
                        <td className="text-nowrap">{element.Content}</td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {this.renderPagination()}
            </section>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">Form validations</header>
              <div className="panel-body">
                <div className="form" id="from-book">
                  <div
                    className="form-validate form-horizontal"
                    id="feedback_form"
                    method="get"
                    action=""
                  >
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Title <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          onChange={e => {
                            this.setState({
                              title: e.target.value
                            });
                          }}
                          value={this.state.name}
                          className="form-control"
                          id="cname"
                          name="fullname"
                          minlength="5"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                 
                    <div className="form-group ">
                      <label for="curl" className="control-label col-lg-2">
                        Content
                      </label>
                      <div className="col-lg-10">
                        <textarea
                          value={this.state.price}
                          onChange={e =>
                            this.setState({
                              content: e.target.value
                            })
                          }
                          className="form-control "
                          id="curl"
                          type="text"
                          name="url"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <div className="col-lg-offset-2 col-lg-10">
                        <p>{this.state.noti}</p>
                      </div>
                    </div>
                    {this.renderBtnSubmit()}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    );
  }
}
export default Post;
