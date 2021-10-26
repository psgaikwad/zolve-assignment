import React from 'react'

import layoutWrapper from '../../containers/layout/layoutWrapper'

const Selfie = () => {
	return(
		<div>
				<div>Selfie Page</div>
		</div>
	)
}

export default layoutWrapper(Selfie, {headerText:'Selfie', showBackArrow: true})