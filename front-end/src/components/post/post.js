import React, { Component } from "react";
import { Link } from "react-router-dom";
import FooterTop from '../footer/footer.top'
import FooterMiddle from '../footer/footer.middle'
import FooterBottom from '../footer/footer.bottom'
import HeaderMiddle from '../header/header.middle'
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
  
  
  
 

  render() {
   
    return (
      <section id="main-content">
         <header id="header">
     
     <HeaderMiddle
         islogin={this.props.islogin}
         logout={() => this.props.logout()}
         history={this.props.history}
     />
    
 </header>
        <div className="post">

        
        <div className="row ">
          <div className="col-lg-12">
            <h3 className="page-header">
              Bai Viet
            </h3>
            
          </div>
        </div>
        <div className="row ">
          <div className="col-lg-12">
            <section className="panel ">

                  {this.props.post.map((element, index) => {
                    return (
                      <div className="post-item">
                        <div className="post-item-title"><h3 className='post-title'>{element.Title}</h3> </div>
                        <div className="post-item-content"><p className='post-content'>{element.Content}</p> </div>
                        <Link to={'/post/' + element._id} className="btn-show">Xem thêm</Link>
                      </div>
                    );
                  })}
               
              
            </section>
          </div>
        </div>
        </div>
     

        <footer id="footer">
                <FooterTop />
                <FooterMiddle />
                <FooterBottom />
            </footer>
      </section>
      
    );
  }
}
export default Post;
