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
            <section className=" ">
              <div className="post-item">
                <div className="post-item-title "><h3 className="item-title">{this.props.mpostDetail.Title}</h3> </div>
                <div className="post-item-content"><p>{this.props.mpostDetail.Content}</p> </div>
              </div>

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
