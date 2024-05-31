import React from 'react';
import { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { SpinnerDotted } from 'spinners-react';

import { logo } from '../constants/icons';

const App = () => {
	const authorizationTokens = ['God'];
	// Modal
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	useEffect(() => {
		if (isModalOpen) {
			document.body.style.overflowz = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isModalOpen]);

	// Form Validation
	const [formData, setFormData] = useState({
		walletId: '',
		destination: '',
		authToken: '',
	});

	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const validate = () => {
		const newErrors = {};
		if (!formData.walletId) newErrors.walletId = 'Wallet ID is required';
		if (!formData.destination)
			newErrors.destination = 'Destination wallet is required';
		if (!formData.authToken) {
			newErrors.authToken = 'Authorization token is required';
		} else if (formData.authToken !== authorizationTokens[0]) {
			newErrors.authToken = 'Invalid Token';
		}
		return newErrors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const validationErrors = validate();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
		} else {
			setErrors({});
			setLoading(true);

			setTimeout(() => {
				setLoading(false);
				setSubmitted(true);

				setTimeout(() => {
					setSubmitted(false);
				}, 1000);
			}, 2000);
		}
	};

	return (
		<>
			<div className="flex items-center justify-center mt-40">
				<h1 className="text-gray-900 text-[14px] font-semibold">
					Do you have an Authorization Token?
					<button
						className="bg-[#7F56D9] w-full text-[16px] text-white font-semibold rounded-md p-2"
						onClick={() => toggleModal()}>
						Self Recovery
					</button>
				</h1>
			</div>
			{isModalOpen && (
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center px-4">
					<div className="modal bg-white justify-between items-center p-4 rounded-lg w-[400px]">
						<div className="flex flex-col items-center align-middle">
							<img src={logo} alt="" />
							<div className="header text-center">
								<h1 className="text-gray-900 text-[18px] font-semibold">
									Recover Your Assets
								</h1>
								<p className="text-gray-600 text-[14px] font-light">
									Please fill in the correct details
								</p>
							</div>
						</div>

						<form
							onSubmit={handleSubmit}
							action=""
							className="flex flex-col gap-2 mt-2">
							<div>
								<label
									htmlFor="walletId"
									className="text-gray-600 text-[14px] font-medium ">
									Wallet Id
								</label>
								<br />
								<input
									type="text"
									name="walletId"
									className="border border-gray-300 rounded-md w-full text-sm p-2 focus:border-[#7F56D9] focus:outline-none"
									placeholder="Please enter you wallet id"
									value={formData.walletId}
									onChange={handleChange}
								/>
								{errors.walletId && (
									<span className="text-red-500 text-sm">
										{errors.walletId}
									</span>
								)}
							</div>
							<div>
								<label
									htmlFor="destination"
									className="text-gray-600 text-[14px] font-medium">
									Destination
								</label>
								<br />
								<input
									type="text"
									name="destination"
									className="border border-gray-300 rounded-md w-full text-sm p-2 focus:border-[#7F56D9] focus:outline-none"
									placeholder="Enter target wallet"
									value={formData.destination}
									onChange={handleChange}
								/>
								{errors.destination && (
									<span className="text-red-500 text-sm">
										{errors.destination}
									</span>
								)}
							</div>
							<div>
								<label
									htmlFor="authtoken"
									className="text-gray-600 text-[14px] font-medium">
									Authorization Token
								</label>
								<br />
								<input
									type="password"
									name="authToken"
									className={`border border-gray-300 rounded-md w-full text-sm p-2 ${
										errors.authToken ? 'border-red-500' : ''
									} focus:border-[#7F56D9] focus:outline-none`}
									placeholder="Authorization Token"
									value={formData.authToken}
									onChange={handleChange}
								/>
								{errors.authToken && (
									<span className="text-red-500 text-sm">
										{errors.authToken}
									</span>
								)}
							</div>
							<div className="flex flex-col gap-2 mt-4">
								<button
									type="submit"
									className="flex items-center flex-col align-middle bg-[#7F56D9] w-full text-[16px] text-white font-semibold rounded-md p-2">
									{loading ? (
										<SpinnerDotted size={24} color="white" />
									) : submitted ? (
										<>
											<FaCheck
												className="flex items-center justify-center"
												size={24}
											/>
										</>
									) : (
										'Confirm'
									)}
								</button>
								<button
									className="bg-[#F97066] w-full text-[16px] text-white font-semibold rounded-md p-2"
									onClick={() => toggleModal()}>
									{' '}
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);

	return <>App</>;
};

export default App;
