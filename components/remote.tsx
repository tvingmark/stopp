import React, { useEffect } from 'react'
import WorkSVG from './svg/work'
import HomeSVG from './svg/home'
import AddSVG from './svg/add'


interface ButtonProps {
	children: React.ReactNode
	inverse?: boolean | false
}


const Button: React.FC<ButtonProps> = ({children, inverse}) => {
	if (inverse) {
		return (
			<div
				className="flex justify-center items-center h-10 w-10 rounded-full mx-1"
			>
				{children}
			</div>
		)
	} else {
		return (
			<div
				className="flex justify-center items-center h-10 w-10 rounded-full bg-green-100 mx-1"
			>
				{children}
			</div>			
		)
	}
}


// height: 45px;
// 	width: 45px;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;">

export default function Remote({
	children
}: {
	children?: React.ReactNode
}) {

	useEffect(() => {
		console.log("Remote useEffect")
	}, [])

	return(
		<div 
			className="w-full rounded-xl p-2 bg-red-100 flex overflow-hidden">
				<div className="flex flex-col py-1 px-2 justify-center">
					<div className="text-sm">
						Welcome Milio
					</div>
					<div className="text-gray-500 text-xs">
						Last update: 13:49
					</div>
				</div>
				<div className="flex-grow flex items-center justify-end">
					<Button inverse={true}>
						<AddSVG/>
					</Button>					
					<Button>
						<WorkSVG/>
					</Button>
					<Button>
						<HomeSVG/>
					</Button>
				</div>
		</div>
	)
}