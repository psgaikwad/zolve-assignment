import React, { useState } from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FileCopy } from '@material-ui/icons';

import layoutWrapper from '../../containers/layout/layoutWrapper'
import { Typography, TextField } from '@material-ui/core';
import './styles.scss';

const ClipBoard = ({
	location
}) => {
	const queryObject = queryString.parse(location.search);
	const [query, setQuery] = useState(queryObject.q || '');
	const [copied, setCopied] = useState(queryObject.q);

	const handleQueryChange = (e) => {
		setQuery(e.target.value);
	}

	const handleCopy = (val) => {
		setCopied(val);
	}
	return (
		<div className="clipboard-page">
			<CopyToClipboard
				text={query}
				onCopy={handleCopy}
			>
				<div className="input-wrapper">
					<TextField
						fullWidth
						variant="outlined"
						value={query}
						onChange={handleQueryChange}
					/>
					<FileCopy
						className="copy-icon"
						alt="copy text"
					/>
				</div>
			</CopyToClipboard>

			{copied &&
				<div className="copied-text">
					<Typography className="copied-text-icon">
						Copied Value:
					</Typography>
					<div className="copied-text-content">
						{copied}
					</div>
				</div>
			}
		</div>
	)
}

export default layoutWrapper(withRouter(ClipBoard), { showBackArrow: true })