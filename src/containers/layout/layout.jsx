import React from 'react'
import AppHeader from './components/appHeader'
import AppFooter from './components/appFooter'
import MuiContainer from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core'

const Container = withStyles({
	root: {
		marginTop: '16px'
	}
})(MuiContainer);


const Layout = ({ link, children, showBackArrow, headerText }) => {
	return (
		<React.Fragment>
			{/* app header  */}
			<AppHeader
				headerText={headerText ? headerText : ""}
				showBackArrow={showBackArrow ? true : false}
				link={link}
			/>
			<Container className="app-container">
				<div>
					{/* component to be rendered inside container */}
					{children}
				</div>
			</Container>
			<AppFooter />

		</React.Fragment>
	)

}

export default Layout;