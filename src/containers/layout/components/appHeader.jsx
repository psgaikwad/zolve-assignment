import React, { useState } from 'react'
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'
import { Menu, ArrowBack } from '@material-ui/icons/'
import { Link } from 'react-router-dom'
import SideMenu from './sideMenu'
import { useHistory, withRouter } from "react-router-dom";
import Logo from '../../../assets/icon.png';
import NavButton from './navButton'

const menuItems = [
	{ id: 1, displayName: 'API Visualization', link: '/' },
	{ id: 2, displayName: 'Copy to clipboard', link: '/clipboard' },
	{ id: 3, displayName: 'Selfie', link: '/selfie' },
]

const AppHeader = ({
	showBackArrow,
}) => {
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const toggleMenu = () => {
		setOpen(!open)
	};

	const navigateBack = () => {
		history.goBack();
	}
	return (
		<React.Fragment>
			<AppBar position="static" className="app-header" color="secondary">
				<Toolbar variant="dense">
						<Container>
							<div className="app-header-container">
								<div className="menu-container">
									{!showBackArrow &&
										<Menu onClick={toggleMenu} />
									}
									{showBackArrow &&
										<ArrowBack onClick={navigateBack} />
									}
									<Typography variant="h6" className="app-header-text" sx={{ flexGrow: 1 }}>
										<Link to={'/'} className="app-header-link">
											<img src={Logo} height={24} style={{ verticalAlign: 'text-bottom' }} />
										</Link>
									</Typography>
								</div>
								<div className="menu-container margin">
									{menuItems.map(({id, displayName, link}) => {
										return (
											<NavButton
												key={id}
												text={displayName}
												slug={link}
												isSelected={location.pathname === link}
											/>
										);
									})}
								</div>
								{!showBackArrow &&
									<SideMenu
										open={open}
										handleClose={toggleMenu}
										menuItems={menuItems}
									/>
								}
							</div>
						</Container>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	)
}

export default withRouter(AppHeader);
