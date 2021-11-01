import React, { createRef, useState } from 'react';
import layoutWrapper from '../../containers/layout/layoutWrapper';
import { Warning } from '@material-ui/icons';
import './styles.scss';
import { Button } from '@material-ui/core';

const Selfie = () => {
	const [error, setError] = useState(false);
	const [open, setOpen] = useState(false);
	const [selfie, setSelfie] = useState(false);
	const cameraRef = createRef();
	const canvasRef = createRef();

	const getListOfVideoInputs = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === "videoinput");
  };

	const openCamera = async () => {
		const listOfVideoInputs = await getListOfVideoInputs();
		if (!listOfVideoInputs) {
			setError('No camera present on this device. Please try another..!');
		}
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });
			if (cameraRef && cameraRef.current) {
				cameraRef.current.srcObject = stream;
			}
			setOpen(true);
		} catch (err) {
			// handle permission for camera dennied case
			setError(err);
		}
	}

	const closeCamera = async () => {
		const stream = cameraRef.current.srcObject;
		const allVideoTracks = stream.getTracks();
		allVideoTracks.forEach(track => track.stop());
		setOpen(false);
	}

	const takeSelfie = async () => {
		const width = cameraRef.current.videoWidth;
		const height = cameraRef.current.videoHeight;

		// get canvas context to draw image
		const ctx = canvasRef && canvasRef.current.getContext('2d');
		canvasRef.current.width = width;
		canvasRef.current.height = height;

		ctx.drawImage(cameraRef.current, 0, 0, width, height);

		const imageData = canvasRef.current.toDataURL('image/png');

		setSelfie(imageData);
}


	return (
		<div className="selfie-page">
			<div className="media">
				<video
					ref={cameraRef}
					autoPlay={true}
					className="camera-stream"
				/>
				{selfie ?
					<img src={selfie} width="100%"/>
				:
					<div className="selfie-portrait">
						Clicked Selfie will appear here
					</div>
				}
			</div>
			<canvas ref={canvasRef} style={{ display: 'none' }} />
			<div className="selfie-page-controls">
				{!open ?
					<Button variant="contained" onClick={openCamera}> Open camera </Button>
				:
					<Button variant="contained" onClick={closeCamera}> Close camera </Button>
				}
				<Button variant="contained" onClick={takeSelfie} disabled={!open}> Click selfie </Button>
			</div>
			{error ?
				<div className="error-div">
					<Warning color="error" />
					<span className="error-text">{error.message}</span>
				</div>
			:
				null
			}
		</div>
	)
}

export default layoutWrapper(Selfie, { headerText: 'Selfie', showBackArrow: true })