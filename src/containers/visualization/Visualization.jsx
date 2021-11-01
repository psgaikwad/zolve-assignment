import { TextField, InputLabel, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import Chart from 'react-google-charts';
import apiClient from '../../api/source'
import './styles.scss';
import ReactJson from 'react-json-view';

const Visualization = ({ getData, items }) => {
	const [page, setPage] = useState('');
	const [pagesize, setPageSize] = useState('');
	const [fromdate, setFromDate] = useState('');
	const [todate, setTodate] = useState('');
	const queryPrefix ='2.2/tags?order=desc&sort=popular&site=stackoverflow';
	const [query, setQuery] = useState(`${queryPrefix}${pagesize ? `&pagesize=${pagesize}` : ''}${page ? `&page=${page}`:''}${fromdate ? `&fromdate=${fromdate}` : ''}${todate ? `&todate=${todate}` : ''}`);
	const [jsonResp, setJsonResp] = useState({});

	useEffect(() => {
		getData();
	}, [])

	let dataToRender = [['Language', 'Tags count']];
	if (items && items.data && items.data.length) {
		items.data.forEach(item => dataToRender.push([item.name, item.count]));
	}

	useEffect(() => {
		setQuery(`${queryPrefix}${pagesize ? `&pagesize=${pagesize}` : ''}${page ? `&page=${page}`:''}${fromdate ? `&fromdate=${fromdate}` : ''}${todate ? `&todate=${todate}` : ''}`);
	}, [page, pagesize, fromdate, todate])

	const handlePageSizeChange = (e) => {
		setPageSize(e.target.value);
	};
	const handlePageChange = (e) => {
		setPage(e.target.value);
	};
	const handleFromDateChange = (e) => {
		setFromDate(e.target.value);
	};
	const handleToDateChange = (e) => {
		setTodate(e.target.value);
	};

	const handleRun = () => {
		apiClient.getFilteredData(query, function(data){
			setJsonResp(data);
		})
	}

	return(
		<div>
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
						<InputLabel className="input-label"> 
							Page Size
						</InputLabel>
						<TextField
							variant="outlined"
							value={pagesize}
							onChange={handlePageSizeChange}
						/>
					</div>

					<div className="input-section">
						<InputLabel className="input-label"> 
							Page Number
						</InputLabel>
						<TextField
							variant="outlined"
							value={page}
							onChange={handlePageChange}
						/>
					</div>

					<div className="input-section">
						<InputLabel className="input-label"> 
							From Date
						</InputLabel>
						<TextField
							variant="outlined"
							value={fromdate}
							type="date"
							onChange={handleFromDateChange}
						/>
					</div>

					<div className="input-section">
						<InputLabel className="input-label"> 
							To Date
						</InputLabel>
						<TextField
							variant="outlined"
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

					<Button variant="contained" onClick={handleRun}>
						Run
					</Button>
				</div>

				<div className="query-results">
					<ReactJson src={jsonResp} />
				</div>

		</div>
	)
}

export default Visualization;
