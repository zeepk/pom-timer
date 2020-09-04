import React, { useState, useEffect } from 'react';
import 'primeflex/primeflex.css';
import '../style/dashboard.css';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
const Dashboard = () => {
	const [seconds, setSeconds] = useState('0');
	const [minutes, setMinutes] = useState('0');
	const [isActive, setIsActive] = useState(false);
	console.log(minutes, seconds, isActive);
	console.log(isActive && +seconds === 0 && +minutes === 0);
	if (isActive && +seconds === 0 && +minutes === 0) {
		reset();
		alert('done!');
	}

	const decrement = () => {
		if (seconds === 0) {
			setSeconds(59);
			setMinutes(minutes - 1);
		} else {
			setSeconds(seconds - 1);
		}
	};

	function toggle() {
		setIsActive(!isActive);
	}

	function reset() {
		setMinutes(0);
		setSeconds(0);
		setIsActive(false);
	}

	useEffect(() => {
		let interval = null;
		if (isActive) {
			interval = setInterval(() => {
				decrement();
			}, 100);
		} else if (!isActive && minutes !== 0 && seconds !== 0) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isActive, minutes, seconds]);

	return (
		<div className="dashboard">
			<h1 className="title">Pom Timer 🍅</h1>
			<div className="p-grid">
				<div className="p-col-2">
					<InputText
						value={minutes < 10 && isActive ? `0${minutes}` : minutes}
						onChange={(e) => {
							setMinutes(e.target.value);
						}}
						disabled={isActive}
						style={{
							background: 'transparent',
							color: 'white',
							border: 'none',
							padding: '10px 0 10px 10px',
							fontSize: '50px',
							borderRadius: '5px',
							width: '80px',
						}}
					/>
				</div>
				<div
					className="p-col-1"
					style={{
						color: 'white',
						padding: '10px 0',
						margin: '0',
						fontSize: '50px',
					}}
				>
					:
				</div>
				<div className="p-col-2">
					<InputText
						value={seconds < 10 && isActive ? `0${seconds}` : seconds}
						onChange={(e) => setSeconds(e.target.value)}
						disabled={isActive}
						style={{
							background: 'transparent',
							color: 'white',
							border: 'none',
							padding: '10px 10px 10px 0',
							margin: 0,
							fontSize: '50px',
							borderRadius: '5px',
							width: '80px',
						}}
					/>
				</div>
				<div className="p-col-4">
					<Button label="Secondary" className="p-button-secondary" />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
