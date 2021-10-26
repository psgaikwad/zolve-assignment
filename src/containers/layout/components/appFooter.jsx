import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons/'

const AppFooter = ({ showFooter }) => {
	return(
	
			<React.Fragment>
					{/* app footer  */}
							{showFooter && 
							<div className="app-footer">
									App Footer
							</div>
					}
			</React.Fragment>

	)
}

export default AppFooter;