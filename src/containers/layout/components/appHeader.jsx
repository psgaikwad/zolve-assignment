import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Menu, ArrowBack} from '@material-ui/icons/'
import { Link }  from 'react-router-dom'
import SideMenu from './sideMenu'

const menuItems = [
    {displayName: '3rd Party API & Visualization', link: '/'},
    {displayName: 'Copy to clipboard', link: '/clipboard'},
		{displayName: 'Selfie', link: '/selfie'},
]
    
export default class AppHeader extends React.PureComponent{
    constructor(props){
        super(props);

        this.state = {
            open: false
        }
    }

    toggleMenu = () => {
        this.setState({
            open : !this.state.open
        })
    }

    navigateBack = () => {
        window.history.back()
    }

    render(){
        return(
            <React.Fragment>
                {/* app header  */}
                <AppBar position="static" className="app-header" color="#fff">
                    <Toolbar variant="dense">
												{!this.props.showBackArrow &&
                            <Menu onClick={this.toggleMenu}/>
                        }
                        {this.props.showBackArrow &&
                            <ArrowBack onClick={this.navigateBack}/>
                        }
                        <Typography variant="h6" className="app-header-text" sx={{ flexGrow: 1}}>
                            { this.props.link ? (
                                <Link to={link} className="app-header-link">{this.props.headerText?this.props.headerText:`Zolve`}</Link>
                            ):(
                                <div className="app-header-link">{this.props.headerText?this.props.headerText:`Zolve`}</div>
                            )}
                            
                        </Typography>
                        {!this.props.showBackArrow &&
                            <SideMenu open = {this.state.open} handleClose={this.toggleMenu} menuItems={menuItems}/>
                        }
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        )
    }

}
