'use client';
import { Moon, SunDim } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import { cn } from '@/lib/utils';

export const AnimatedThemeToggler = ({ className }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const buttonRef = useRef(null);

	// Initialize from current DOM state so icon matches
	useEffect(() => {
		const hasDarkClass = document.documentElement.classList.contains('dark');
		const isDataDark =
			document.documentElement.getAttribute('data-theme') === 'dark';
		const dark = hasDarkClass || isDataDark;
		if (dark) {
			document.documentElement.classList.add('dark');
			document.documentElement.setAttribute('data-theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			document.documentElement.setAttribute('data-theme', 'light');
		}
		setIsDarkMode(dark);
	}, []);

	const changeTheme = async () => {
		if (!buttonRef.current) return;

		const toggleDom = () => {
			const dark = !(
				document.documentElement.classList.contains('dark') ||
				document.documentElement.getAttribute('data-theme') === 'dark'
			);
			if (dark) {
				document.documentElement.classList.add('dark');
				document.documentElement.setAttribute('data-theme', 'dark');
			} else {
				document.documentElement.classList.remove('dark');
				document.documentElement.setAttribute('data-theme', 'light');
			}
			setIsDarkMode(dark);
		};

		if (document.startViewTransition) {
			await document.startViewTransition(() => {
				flushSync(toggleDom);
			}).ready;
		} else {
			toggleDom();
		}

		const { top, left, width, height } =
			buttonRef.current.getBoundingClientRect();
		const y = top + height / 2;
		const x = left + width / 2;

		const right = window.innerWidth - left;
		const bottom = window.innerHeight - top;
		const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

		document.documentElement.animate(
			{
				clipPath: [
					`circle(0px at ${x}px ${y}px)`,
					`circle(${maxRad}px at ${x}px ${y}px)`,
				],
			},
			{
				duration: 700,
				easing: 'ease-in-out',
				pseudoElement: '::view-transition-new(root)',
			}
		);
	};
	return (
		<button ref={buttonRef} onClick={changeTheme} className={cn(className)}>
			{isDarkMode ? <SunDim /> : <Moon />}
		</button>
	);
};
