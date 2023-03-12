import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import Post from '../components/post/post'
import * as userActions from '../actions/user.action'
import * as postActions from '../actions/post.action'

class PostContainer extends React.Component {
    constructor(props) {
        super(props)

    }
    componentWillMount() {
        this.props.actions.auth()
        this.props.postActions.getPost()
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.page !== this.props.page) {
            this.props.postActions.getPost()
        }
    }
    
    render() {
      
      
            return (
                <div>
                    <Post
                        history={this.props.history}
                        islogin={this.props.islogin}
                        logout={() => this.props.actions.logout()}
                        post={this.props.post}
                        totalpage={this.props.totalpage}
                        page={this.props.page}
                        backPage={() => this.props.postActions.backPage()}
                        nextPage={() => this.props.postActions.nextPage()}
                        setPage={page => this.props.postActions.setPage(page)}
                        isadd={this.props.isadd}
                    />
                </div>
            )
        
      
    }
}
const mapStateToProps = state => ({
    islogin: state.userReducers.login.islogin,
    post: state.postReducers.post.data, 
    totalpage: state.postReducers.post.totalpage,
    page: state.postReducers.post.page, 
    
})

const mapDispatchToProps = dispatch =>{
    return ({
        actions: bindActionCreators(userActions, dispatch),
        postActions: bindActionCreators(postActions, dispatch),
    })
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostContainer)