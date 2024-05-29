import React from 'react';
import { useState, useEffect } from 'react';
import { logo } from '../constants/icons';

const App = () => {
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

						<form action="" className="flex flex-col gap-2 mt-2">
							<div>
								<label
									htmlFor="walletId"
									className="text-gray-600 text-[14px] font-medium">
									Wallet Id
								</label>
								<br />
								<input
									type="text"
									name="walletId"
									className="border border-gray-300 rounded-md w-full text-sm p-2"
									placeholder="Please enter you wallet id"
								/>
							</div>
							<div>
								<label
									htmlFor="walletId"
									className="text-gray-600 text-[14px] font-medium">
									Destination
								</label>
								<br />
								<input
									type="text"
									name="walletId"
									className="border border-gray-300 rounded-md w-full text-sm p-2"
									placeholder="Enter target wallet"
								/>
							</div>
							<div>
								<label
									htmlFor="walletId"
									className="text-gray-600 text-[14px] font-medium">
									Authorization Token
								</label>
								<br />
								<input
									type="text"
									name="walletId"
									className="border border-gray-300 rounded-md w-full text-sm p-2"
									placeholder="Authorization Token"
								/>
							</div>
						</form>

						<div className="flex flex-col gap-2 mt-4">
							<button className="bg-[#7F56D9] w-full text-[16px] text-white font-semibold rounded-md p-2">
								Confirm
							</button>
							<button
								className="bg-[#F97066] w-full text-[16px] text-white font-semibold rounded-md p-2"
								onClick={() => toggleModal()}>
								{' '}
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);

	return <>App</>;
};

export default App;
