import React from 'react'
import { AppBar, Toolbar, Typography, Fade, Button, Icon } from '@material-ui/core'
import { Menu } from '@material-ui/icons/'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import {Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';

const SideMenu = ({ open, handleClose, menuItems }) => {
	return(
			<React.Fragment>
					{/* app sidemenu  */}
					<div className="app-menu">
							<SwipeableDrawer open = {open} onClose={handleClose} onOpen={handleClose}>
							<IconButton key="close" color="inherit" onClick={handleClose} id="close-button">
									<CloseIcon  />
							</IconButton>,
							<ul className="app-menu-items">
									{menuItems && menuItems.map(menu =>
											<li key={menu.displayName} className="app-menu-item"><Link to={menu.link?menu.link:"/"}>{menu.displayName}</Link></li>
									)}
									</ul>
							</SwipeableDrawer>
					</div>
			</React.Fragment>

	)
}

export default SideMenu;