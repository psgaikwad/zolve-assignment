import React from 'react'
import { connect } from 'react-redux'
import {getAllProducts} from '../../actions'
import layoutWrapper from '../layout/layoutWrapper'
import Visualization from './Visualization'

const mapDispatchToProps = (dispatch)=>{
    return{
        getAllProducts: ()=>{dispatch(getAllProducts())}
    }
}
    
export default connect(null, mapDispatchToProps)(layoutWrapper(Visualization, {headerText: 'Zolve'}))
