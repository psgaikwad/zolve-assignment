import React from 'react'

import layoutWrapper from '../../containers/layout/layoutWrapper'

const ClipBoard = () => {
	return(
		<div>
				<div>ClipBoard Page</div>
		</div>
	)
}

export default layoutWrapper(ClipBoard, {headerText:'Copy To Clipboard', showBackArrow: true})