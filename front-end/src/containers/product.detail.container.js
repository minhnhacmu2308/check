import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProductDetail from '../components/product.detail/product.detail'
import * as productActions from '../actions/product.action'
import * as homeActions from '../actions/home.action'
import * as userActions from '../actions/user.action'
import Loading from '../components/loading/loading'
class ProductDetailContainer extends Component {
    constructor(props) {
        super(props)

    }
    componentWillMount() {
        this.props.actions.auth()
        this.props.homeActions.getCategory()
        this.props.productActions.getProductDetail(this.props.match.params.id)
        this.props.productActions.getProductRelated(this.props.match.params.id)
        this.props.productActions.getCommentByIDProduct(this.props.match.params.id)
        
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.mproductDetail !== null ) {
            this.props.productActions.getNameCategoryByID(nextProps.mproductDetail.id_category)
            
        }
        if(nextProps.page !== this.props.page) {
            this.props.productActions.getCommentByIDProduct(this.props.match.params.id)
        }

    }
    
    render() {
        if(this.props.mproductDetail) {
            return (
                <div>
                    <ProductDetail
                        category={this.props.category}
                        publisher={this.props.publisher}
                        mproductDetail={this.props.mproductDetail}
                        nameCategory={this.props.nameCategory}
                        namePublicsher={this.props.namePublicsher}
                        islogin={this.props.islogin}
                        setSearchText={(value) => this.props.homeActions.setSearchText(value)}
                        sortType={this.props.sortType}
                        setSortType={(value) => this.props.homeActions.setSortType(value)}
                        searchTextSubmit={() => this.props.homeActions.searchTextSubmit()}
                        productrelated={this.props.productrelated}
                        logout={() => this.props.actions.logout()}
                        id_product={this.props.match.params.id}
                        submitComment={(name, email, comment, id_product) => this.props.productActions.submitComment(name, email, comment, id_product)}
                        comment={this.props.comment}
                        nameAuthor={this.props.nameAuthor}
                        addToCart={(product) => this.props.productActions.addToCart(product)}
                        totalpage={this.props.totalpage}
                        page={this.props.page}
                        backPage={() => this.props.productActions.backPage()}
                        nextPage={() => this.props.productActions.nextPage()}
                        setPage={(page) => this.props.productActions.setPage(page)}
                        history={this.props.history}
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
    category: state.homeReducers.category.data,
   
    mproductDetail: state.productReducers.product.productDetail,
    nameCategory: state.productReducers.product.nameCategory,
   
   
    islogin: state.userReducers.login.islogin,
    productrelated: state.productReducers.product.productrelated,
    comment: state.productReducers.product.comment,
    totalpage: state.productReducers.product.totalpage,
    page: state.productReducers.product.page,
})
const mapDispatchToProps = dispatch => {
    return ({
        actions: bindActionCreators(userActions, dispatch),
        homeActions: bindActionCreators(homeActions, dispatch),
        productActions: bindActionCreators(productActions, dispatch)
    })
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductDetailContainer)