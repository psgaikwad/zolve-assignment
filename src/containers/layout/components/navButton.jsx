import React from 'react';
import { Link } from 'react-router-dom';

const NavButton = ({ text, isSelected, slug}) => (
	<Link
		color="primary"
		variant="text"
		className={`app-header-menu-link ${isSelected ? `selected`:''}`}
		to={`${slug}`}
	>
		{text}
	</Link>
);

export default NavButton;