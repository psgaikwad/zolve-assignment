import React from 'react'

const AppFooter = ({ showFooter }) => {
	return (
		<React.Fragment>
			{showFooter &&
				<div className="app-footer">
					App Footer
				</div>
			}
		</React.Fragment>
	)
}

export default AppFooter;