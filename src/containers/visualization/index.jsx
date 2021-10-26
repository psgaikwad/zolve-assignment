import React from 'react'
import { connect } from 'react-redux'
import {getData} from '../../actions'
import layoutWrapper from '../layout/layoutWrapper'
import Visualization from './Visualization'

const mapStateToProps = state => ({
  items: state.items
})

const mapDispatchToProps = (dispatch)=>{
    return{
			getData: ()=>{dispatch(getData())}
    }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(layoutWrapper(Visualization, {headerText: 'Zolve'}))
