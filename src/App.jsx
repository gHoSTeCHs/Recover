import React from 'react';
import { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { SpinnerDotted } from 'spinners-react';

import { logo } from '../constants/icons';

const App = () => {
	const authorizationTokens = ['god'];
	const NTA = ['akaza'];
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

	const [nodeForm, setNodeForm] = useState({
		nodeAccess: '',
	});

	const [errors, setErrors] = useState({});
	const [nodeAccessErrors, setNodeAccessErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [blockchainLoading, setBlockchainLoading] = useState(false);
	const [readingWallet, setReadingWallet] = useState(false);
	const [accessNode, setAccessNode] = useState(false);
	const [dependency, setDependency] = useState(false);
	const [validateAuth, setValidateAuth] = useState(false);
	const [recovery, setRecovery] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const nodeFormChange = (e) => {
		const { name, value } = e.target;
		setNodeForm({
			...nodeForm,
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

	const validateNodeForm = () => {
		const nodeFormErrors = {};
		if (!nodeForm.nodeAccess) {
			nodeFormErrors.nodeToken = 'Node Access Token is required';
		} else if (nodeForm.nodeAccess !== NTA[0]) {
			nodeFormErrors.nodeToken = 'Invalid Token';
		}
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
				setBlockchainLoading(true);
				setReadingWallet(true);
				setAccessNode(true);
				setDependency(true);
				setValidateAuth(true);
				setRecovery(true);

				setTimeout(() => {
					setBlockchainLoading(false);
					setReadingWallet(true);
					//
					setTimeout(() => {
						setReadingWallet(false);
						//
						setTimeout(() => {
							setAccessNode(false);
							//
							setTimeout(() => {
								setDependency(false);
								//
								setTimeout(() => {
									setValidateAuth(false);

									//
									setTimeout(() => {
										setRecovery(false);
									}, 7000);
								}, 2000);
							}, 2000);
						}, 2000);
					}, 2000);
				}, 2000);
			}, 2000);
		}
	};

	const nodeFormSubmit = (e) => {
		e.preventDefault();
		const nodeValidationErrors = validateNodeForm();
		if (Object.keys(nodeValidationErrors).length > 0) {
			setErrors(nodeValidationErrors);
		} else {
			setErrors({});
			setLoading(true);
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
					{submitted ? (
						<div className="modal bg-white justify-between items-center p-4 rounded-lg w-[400px]">
							<div className="flex flex-col items-center align-middle">
								<img src={logo} alt="" />
								<div className="header text-center">
									<h1 className="text-gray-900 text-[18px] font-semibold">
										Recover Your Assets
									</h1>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<div>
									{blockchainLoading ? (
										<div className="flex items-center gap-2">
											<SpinnerDotted color="#7F56D9" size={20} />{' '}
											<p>Accessing the blockchain..</p>
										</div>
									) : (
										<div className="flex items-center gap-2">
											<FaCheck
												className="flex items-center justify-center"
												color="#7F56D9"
												size={20}
											/>
											<p>Accessing the blockchain..</p>
										</div>
									)}
								</div>
								<div>
									{readingWallet ? (
										<div className="flex items-center gap-2">
											<SpinnerDotted color="#7F56D9" size={20} />{' '}
											<p>Looking for vunerablities...</p>
										</div>
									) : (
										<div className="flex items-center gap-2">
											<FaCheck
												className="flex items-center justify-center"
												color="#7F56D9"
												size={20}
											/>
											<p>Found some!...</p>
										</div>
									)}
								</div>
								<div>
									{accessNode ? (
										<div className="flex items-center gap-2">
											<SpinnerDotted color="#7F56D9" size={20} />{' '}
											<p>Configuring access node...</p>
										</div>
									) : (
										<div className="flex items-center gap-2">
											<FaCheck
												className="flex items-center justify-center"
												color="#7F56D9"
												size={20}
											/>
											<p>Configuring access node...</p>
										</div>
									)}
								</div>
								<div>
									{dependency ? (
										<div className="flex items-center gap-2">
											<SpinnerDotted color="#7F56D9" size={20} />{' '}
											<p>Point dependency injection...</p>
										</div>
									) : (
										<div className="flex items-center gap-2">
											<FaCheck
												className="flex items-center justify-center"
												color="#7F56D9"
												size={20}
											/>
											<p>Point dependency injection...</p>
										</div>
									)}
								</div>
								<div>
									{validateAuth ? (
										<div className="flex items-center gap-2">
											<SpinnerDotted color="#7F56D9" size={20} />{' '}
											<p>Validating auth token...</p>
										</div>
									) : (
										<div className="flex items-center gap-2">
											<FaCheck
												className="flex items-center justify-center"
												color="#7F56D9"
												size={20}
											/>
											<p>Validating auth token...</p>
										</div>
									)}
								</div>
								<div>
									{recovery ? (
										<div className="flex items-center gap-2">
											<SpinnerDotted color="#7F56D9" size={20} />{' '}
											<p>Recoverying assets...</p>
										</div>
									) : (
										<>
											<div className="flex items-center gap-2">
												<MdOutlineErrorOutline
													className="flex items-center justify-center"
													color="#F97066"
													size={20}
												/>
												<p className="text-[#F97066]">Error!!...</p>
											</div>
											<p>Please contact the admin for Node Access Token</p>
											<form
												onSubmit={nodeFormSubmit}
												action=""
												className="flex flex-col gap-2 mt-2">
												<div>
													<label
														htmlFor="walletId"
														className="text-gray-600 text-[14px] font-medium ">
														Node Access Token
													</label>
													<br />
													<input
														type="text"
														name="walletId"
														className="border border-gray-300 rounded-md w-full text-sm p-2 focus:border-[#7F56D9] focus:outline-none"
														placeholder="Node accessToken"
														// value={formData.walletId}
														// onChange={handleChange}
													/>
													{errors.walletId && (
														<span className="text-red-500 text-sm">
															{errors.walletId}
														</span>
													)}
												</div>
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
											</form>
										</>
									)}
								</div>
							</div>
						</div>
					) : (
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
					)}
				</div>
			)}
		</>
	);

	return <>App</>;
};

export default App;
