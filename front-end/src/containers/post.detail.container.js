import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PostDetail from '../components/post.detail/post.detail'
import * as postActions from '../actions/post.action'
import * as homeActions from '../actions/home.action'
import * as userActions from '../actions/user.action'
import Loading from '../components/loading/loading'
class PostDetailContainer extends Component {
    constructor(props) {
        super(props)

    }
    componentWillMount() {
        this.props.actions.auth()
        this.props.postActions.getPostDetail(this.props.match.params.id)
        
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.page !== this.props.page) {
            this.props.postActions.getPost()
        }
    }
    
    render() {
      
        if(this.props.mpostDetail) {
            return (
                <div>
                    <PostDetail
                       
                        mpostDetail={this.props.mpostDetail}
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
        else {
            return (
                <Loading/>
            )
        }
        
    }
}

const mapStateToProps = state => ({
    mpostDetail: state.postReducers.post.postDetail,
    islogin: state.userReducers.login.islogin,
    post: state.postReducers.post.data, 
    totalpage: state.postReducers.post.totalpage,
    page: state.postReducers.post.page, 
})
const mapDispatchToProps = dispatch => {
    return ({
        actions: bindActionCreators(userActions, dispatch),
        postActions: bindActionCreators(postActions, dispatch)
    })
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PostDetailContainer)