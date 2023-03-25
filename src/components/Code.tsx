"use client"

import { FC, useState, useEffect } from 'react';
import Highlight, {defaultProps, type Language} from "prism-react-renderer";
import { useTheme } from 'next-themes';
import darkTheme from "prism-react-renderer/themes/nightOwl";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";

interface CodeProps {
  code: string;
  show: boolean;
  language: Language;
  animationDelay?: number;
  animated?: boolean;
}
const Code: FC<CodeProps> = ({
	code, show, language, animationDelay, animated
}) => {
	const {theme: applicationTheme} = useTheme();
	const [text, setText] = useState(animated ? '' : code);

	useEffect(() => {
		if(show && animated){
			let i = 0;
			setTimeout(() => {
				const intervaldId = setInterval(() => {
					setText(code.slice(0, i));
					i++;
					if(i > code.length){
						clearInterval(intervaldId);
					}
				}, 15);

				return () => clearInterval(intervaldId);
			}, animationDelay || 150);
		}
	}, [code, show, animated, animationDelay]);

	// number of line
	const lines = text.split(/\r\n|\r|\n/);
	const theme = applicationTheme === 'light' ? lightTheme : darkTheme;

  return (
    <Highlight
			{...defaultProps}
			code={text}
			language={language}
			theme={theme}
		>
			{({className, tokens, getLineProps, getTokenProps}) => (
				<pre
					className={className + 'transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar'}
					style={{
						maxHeight: show ? lines.length * 24 : 0,
						opacity: show ? 1 : 0
					}}
				>
					{tokens.map((line, index) => {
						const {key, ...rest} = getLineProps({line, key: index});

						return (
							<div
								key={`line-${index}`}
								style={{position: 'relative'}}
								{...rest}
							>
								{line.map((token, idx) => {
									const {key, ...props} = getTokenProps({token, key: idx});
									
									return (
										<span
											key={idx}
											{...props}
										>
										</span>
									)
								})}
							</div>
						)
					})}
				</pre>
			)}
		</Highlight>
  )
}

export default Code;