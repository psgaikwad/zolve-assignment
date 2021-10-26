import { TextField, InputLabel, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import Chart from 'react-google-charts';
import source from '../../api/source';
import './styles.scss';

const Visualization = ({ getData, items }) => {
	const [page, setPage] = useState('');
	const [pagesize, setPageSize] = useState('');
	const [fromdate, setFromDate] = useState('');
	const [todate, setTodate] = useState('');
	const [query, setQuery] = useState(`2.2/tags?order=desc&sort=popular&site=stackoverflow${pagesize ? `&pagesize=${pagesize}` : ''}${page ? `&page=${page}`:''}${fromdate ? `&fromdate=${fromdate}` : ''}${todate ? `&todate=${todate}` : ''}`);

	useEffect(() => {
		getData();
	}, [])

	let dataToRender = [['Language', 'Tags count']];
	if (items && items.data && items.data.length) {
		items.data.forEach(item => dataToRender.push([item.name, item.count]));
	}

	const handlePageSizeChange = (e) => {
		setPageSize(e.target.value);
		setQuery(`2.2/tags?order=desc&sort=popular&site=stackoverflow${pagesize ? `&pagesize=${e.target.value}` : ''}${page ? `&page=${page}`:''}${fromdate ? `&fromdate=${fromdate}` : ''}${todate ? `&todate=${todate}` : ''}`);
	};
	const handlePageChange = (e) => {
		setPage(e.target.value);
		setQuery(`2.2/tags?order=desc&sort=popular&site=stackoverflow${pagesize ? `&pagesize=${pagesize}` : ''}${page ? `&page=${e.target.value}`:''}${fromdate ? `&fromdate=${fromdate}` : ''}${todate ? `&todate=${todate}` : ''}`);
	};
	const handleFromDateChange = (e) => {
		setFromDate(e.target.value);
		setQuery(`2.2/tags?order=desc&sort=popular&site=stackoverflow${pagesize ? `&pagesize=${pagesize}` : ''}${page ? `&page=${page}`:''}${fromdate ? `&fromdate=${e.target.value}` : ''}${todate ? `&todate=${todate}` : ''}`);
	};
	const handleToDateChange = (e) => {
		setTodate(e.target.value);
		console.log('to date', e.target.value);
		setQuery(`2.2/tags?order=desc&sort=popular&site=stackoverflow${pagesize ? `&pagesize=${pagesize}` : ''}${page ? `&page=${page}`:''}${fromdate ? `&fromdate=${fromdate}` : ''}${todate ? `&todate=${e.target.value}` : ''}`);
	};

	return(
		<div>
				<p>Visualization Page</p>
				{items && items.data && items.data.length ?
					<Chart
						width={'100%'}
						height={300}
						chartType="ColumnChart"
						loader={<div>Loading Chart</div>}
						data={dataToRender}
						options={{
							title: 'Data',
							chartArea: { width: '70%' },
							hAxis: {
								title: 'Languages',
								minValue: 0,
							},
							vAxis: {
								title: 'Count',
							},
						}}
						legendToggle
					/>
				:
					null
				}
				<div className="inputs-grid">
					<div className="input-section">
						<InputLabel>
							Page Size
						</InputLabel>
						<TextField
							variant="standard"
							value={pagesize}
							onChange={handlePageSizeChange}
						/>
					</div>

					<div className="input-section">
						<InputLabel>
							Page Number
						</InputLabel>
						<TextField
							variant="standard"
							value={page}
							onChange={handlePageChange}
						/>
					</div>

					<div className="input-section">
						<InputLabel>
							From Date
						</InputLabel>
						<TextField
							variant="standard"
							value={fromdate}
							type="date"
							onChange={handleFromDateChange}
						/>
					</div>

					<div className="input-section">
						<InputLabel>
							To Date
						</InputLabel>
						<TextField
							variant="standard"
							value={todate}
							type="date"
							onChange={handleToDateChange}
						/>
					</div>
				</div>

				<div className="query-section">
					<TextField
						variant="standard"
						value={query}
						fullWidth={true}
					/>

					<Button variant="contained">Run</Button>
				</div>

		</div>
	)
}

export default Visualization;
