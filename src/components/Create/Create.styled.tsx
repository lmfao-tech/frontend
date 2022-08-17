import styled from "styled-components";
import { HTMLMotionProps } from "framer-motion";
import React from "react";

export function Container(props: HTMLMotionProps<"div">) {
	
	let p: any = {...props};
	delete p.className;

	return (
		<div {...p} className={`${props.className} dark:bg-[#242424] text-black dark:text-white max-w-[1100px] p-4 [&>input]:text-[16px] snap-always`}></div>
	)
}

export const _Container = styled.div`
	color: var(--text-dark);
	max-width: 1100px;
	padding: 1rem;

	input {
		font-size: 16px;
	}
`;

export function HomeCategory(props: HTMLMotionProps<"section">) {

	let p: any = {...props};
	delete p.className;

	return (
		<section
			{...p}
			className={`
				${props.className}

				max-w-[1100px] 
				p-4 
				[&>.categoryHeader]:flex
				[&>.categoryHeader]:items-center
				[&>.categoryHeader]:justify-between
				[&>.categoryHeader]:mb-2
				
				[&>.categoryHeader>.category]:border
				[&>.categoryHeader>.category]:border-[#73707e4f]
				[&>.categoryHeader>.category]:outline-none
				[&>.categoryHeader>.category]:box-border
				[&>.categoryHeader>.category]:py-2
				[&>.categoryHeader>.category]:px-3
				
				[&>.memeTemplates]:grid
				[&>.memeTemplates]:grid-cols-[repeat(100,1fr)]
				[&>.memeTemplates]:grid-rows-[100%]
				[&>.memeTemplates]:flex-nowrap
				[&>.memeTemplates]:overflow-auto

				[&>.memeTemplates>.card]:flex
				[&>.memeTemplates>.card]:flex-col
				[&>.memeTemplates>.card]:items-center
				[&>.memeTemplates>.card]:justify-between
				[&>.memeTemplates>.card]:text-center
				[&>.memeTemplates>.card]:no-underline
				[&>.memeTemplates>.card]:w-[150px]
				[&>.memeTemplates>.card]:rounded-md
				[&>.memeTemplates>.card]:my-0
				[&>.memeTemplates>.card]:border
				[&>.memeTemplates>.card]:border-[#73707e4f]
				[&>.memeTemplates>.card]:cursor-pointer
				
				[&>.memeTemplates>.card>img]:rounded-t-md
				[&>.memeTemplates>.card>img]:w-full
				[&>.memeTemplates>.card>img]:h-[150px]
				[&>.memeTemplates>.card>img]:object-cover

				[&>.memeTemplates>.card>.tab]:py-1
				[&>.memeTemplates>.card>.tab]:px-[0.1rem]
				[&>.memeTemplates>.card>.tab]:font-medium
				[&>.memeTemplates>.card>.tab]:text-xs
				[&>.memeTemplates>.card>.tab]:tracking-[-0.5px]
			`}
		>
		</section>
	)
}

export const _HomeCategory = styled.section`
	max-width: 1100px;
	padding: 1rem;

	.categoryHeader {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;

		.category {
			border: var(--border-medium);
			outline: none;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			padding: 0.4rem 0.8rem;
		}
	}

	.memeTemplates {
		display: grid;
		grid-template-columns: repeat(100, 1fr);
		grid-template-rows: 100%;
		flex-wrap: nowrap;
		overflow: auto;

		.card {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			text-align: center;
			text-decoration: none;
			width: 150px;
			border-radius: 5px;
			margin: 0 0.1rem;
			border: var(--border-medium);
			cursor: pointer;

			img {
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
				width: 100%;
				height: 150px;
				object-fit: cover;
			}

			.tag {
				padding: 0.5rem 0.1rem;
				color: var(--text-priamry);
				font-weight: 500;
				font-size: 0.7rem;
				letter-spacing: -0.5px;
			}
		}
	}
`;

export function Flex(props: HTMLMotionProps<"div">) {
	
	let p: any = {...props};
	delete p.className;

	return (
		<div
			{...p}
			className={`
				${props.className}

				dark:bg-slate-700/30

				max-w-[1000px]
				mx-auto
				
				grid 
				md:grid-cols-[1fr,1.2fr]
				grid-cols-[1fr]
				
				gap-[15px]
				bg-white
				shadow-md
				rounded-md
				p-2
				md:p-6

				[&>.editContainer_.btn]:mt-6
			`}
		>
		</div>
	)
}

export const _Flex = styled.div`
	max-width: 1000px;
	margin-left: auto;
	margin-right: auto;
	display: grid;
	grid-template-columns: 1fr 1.2fr;
	gap: 15px;
	background: white;
	box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
		rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
	border-radius: 5px;
	border-radius: 3px;
	padding: 1.5rem;

	.editContainer .btn {
		margin-top: 1.5rem;
	}

	@media (max-width: 900px) {
		grid-template-columns: 1.2fr 1.2fr;
	}
	@media (max-width: 880px) {
		grid-template-columns: 1fr;
	}
`;

export function Actions(props: HTMLMotionProps<"div">) {
	
	let p: any = {...props};
	delete p.className;

	return (
		<div {...p} className={`${props.className} flex gap-[10px] pb-[10px]`}>
		</div>
	)
}

export const _Actions = styled.div`
	display: flex;
	gap: 10px;
	padding-bottom: 10px;
`;

export function ActionButton(props: any) {

	let p: any = {...props};
	delete p.className;

	return (
		<button
			{...p}
			className={`
				${props.className}

				p-2 w-1/2 
				rounded
				
				[&>i]:ml-1
				[&.delete]:border 
				[&.delete]:w-1/5
				[&.delete]:border-[#f85656]
				[&.delete]:text-[#f85656]
			`}
		>
		</button>
	)
}

export const _ActionButton = styled.button`
	padding: 0.5rem;
	width: 50%;
	border-radius: 3px;

	i {
		margin-left: 0.2rem;
	}

	&.delete {
		border: 1px solid #f85656;
		color: #f85656;
		width: 20%;
	}
`;

// eslint-disable-next-line react/display-name
export const EditView = React.forwardRef((props: any, ref) => {
	
	let p: any = {...props};
	delete p.className;
	delete p.style;
	delete p.ref;

	return (
		<div
			ref={ref}
			{...p}
			className={`
				
				${props.className} 
				
				flex-grow
				p-[10px]
				border border-[#f3f4f7]
				bg-no-repeat
				bg-[position:top_center]
				
				bg-contain
				lg:bg-[length:100%]

				[&>*]:absolute

				[&>[contenteditable]]:outline-none
				[&>[contenteditable]]:p-1
				[&>[contenteditable]]:border
				[&>[contenteditable]]:border-transparent
				[&>[contenteditable]]:font-bold
				[&>[contenteditable]]:text-[26px]
				[&>[contenteditable]]:text-black
				
				[&>[contenteditable]]:focus:border-[#73707e85]
				[&>[contenteditable>.justify-center]]:text-center
				[&>[contenteditable>.justify-left]]:text-left
				[&>[contenteditable>.justify-right]]:text-right

			`}
			style={{
				...props.style,
			}}
		>
		</div>
	)
})

export const _EditView = styled.div`
	flex-grow: 1;
	padding: 10px;
	border: var(--border-light);
	background-size: 100%;
	background-repeat: no-repeat;
	background-position: top center;

	@media (max-width: 900px) {
		background-size: contain;
	}

	> * {
		position: absolute;
	}

	[contenteditable] {
		outline: none;
		padding: 5px;
		border: 1px solid transparent;
		font-weight: bolder;
		font-size: 26px;
		text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.8);
		color: #fff;

		:focus {
			border: var(--border-dark);
		}

		.justify-center {
			text-align: center;
		}

		.justify-left {
			text-align: left;
		}

		.justify-right {
			text-align: right;
		}
	}
`;

export const FileButtons = (props: HTMLMotionProps<"div">) => {
	
	let p: any = {...props};
	delete p.className;

	return (
		<div {...p} className={`${props.className}`}>

		</div>
	)

}

export function Controls(props: HTMLMotionProps<"div">) {

	let p: any = {...props};
	delete p.className;

	return (
		<div 
			{...p} 
			className={`
			
				${props.className} 
				
				[&>input]:border
				[&>input]:border-[#73707e4f]
				[&>input]:rounded
				[&>input]:p-1
				[&>input]:outline-none
				[&>input]:font-["Poppins",sans-serif]
				[&>input]:w-full
				[&>input]:focus:border-[#73707e85]
				
				[&>textarea]:border
				[&>textarea]:border-[#73707e4f]
				[&>textarea]:rounded
				[&>textarea]:p-1
				[&>textarea]:outline-none
				[&>textarea]:font-["Poppins",sans-serif]
				[&>textarea]:w-full
				[&>textarea]:focus:border-[#73707e85]
				
				[&>textarea]:resize-none

				[&>.text>input]:min-w-full
				[&>.text>input]:w-full

				[&>.formatting]:grid
				[&>.formatting]:py-2
				[&>.formatting]:px-0
				
				[&>.formatting]:grid-cols-[repeat(2,1fr)]
				[&>.formatting]:lg:grid-cols-[repeat(3,1fr)]
				
				[&>.formatting>input]:mt-2
				[&>.formatting>input]:bg-none
				[&>.formatting>input]:border
				[&>.formatting>input]:border-[#f3f4f7]
				[&>.formatting>input]:focus:bg-gray-600
				
				[&>.formatting>[type="text"]]:w-[80px]

				[&>.formatting>[type="color"]]:w-[50px]
				[&>.formatting>[type="color"]]:h-[35px]
				[&>.formatting>[type="color"]]:shadow-md

				[&>.formatting>[type="range"]]:w-full
				
				[&>.formatting>.styling>div>*]:m-[0.2rem]

				[&>.formatting>.styling>button]:bg-[#fff]
				[&>.formatting>.styling>button]:text-black
				[&>.formatting>.styling>button]:font-bold
				[&>.formatting>.styling>button]:font-["Times_New_Roman",Serif]
				[&>.formatting>.styling>button]:text-base
				[&>.formatting>.styling>button]:w-[35px]
				[&>.formatting>.styling>button]:h-[30px]
				[&>.formatting>.styling>button]:p-[0.3rem_0.5rem_0.5rem]

			`}
		>
		</div>
	)

}

export const _Controls = styled.div`
	input,
	textarea {
		border: var(--border-medium);
		border-radius: 3px;
		padding: 5px;
		outline: none;
		font-family: "Poppins", sans-serif;
		width: 100%;

		&:focus {
			border: var(--border-dark);
		}
	}

	textarea {
		resize: none;
	}

	.text {
		input {
			min-width: 100%;
			width: 100%;
		}
	}

	.formatting {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		padding: 8px 0;

		@media (max-width: 768px) {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
		}

		input {
			margin-top: 0.5rem;
			background: none;
			border: var(--border-light);

			&:focus {
				background: var(--bg-gray);
			}
		}

		[type="text"] {
			width: 80px;
		}

		[type="color"] {
			width: 50px;
			box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.1);
			height: 35px;
		}

		[type="range"] {
			width: 100%;
		}

		.styling {
			& > div * {
				margin: 0.2rem;
			}

			button {
				background: #fff;
				color: var(--text-dark);
				border: var(--border-light);
				border-radius: 3px;
				font-family: "Times New Roman", Serif;
				font-weight: bold;
				font-size: 1rem;
				width: 35px;
				height: 30px;
				padding: 0.3rem 0.5rem 0.5rem;
			}
		}
	}
`;
