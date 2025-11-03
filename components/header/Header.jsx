// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './Header.css';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

const Header = () => {
	const [Toggle, showMenu] = useState(false);
	const [activeNav, setActiveNav] = useState('#home');

	useEffect(() => {
		const handleScrollHeader = () => {
			const headerEl = document.querySelector('.header');
			if (!headerEl) return;
			if (window.scrollY >= 80) headerEl.classList.add('scroll-header');
			else headerEl.classList.remove('scroll-header');
		};

		window.addEventListener('scroll', handleScrollHeader, { passive: true });
		handleScrollHeader();

		const sectionIds = [
			'home',
			'projects',
			'skills',
			'experience',
			'about',
			'contact',
		];
		const sections = sectionIds
			.map((id) => document.getElementById(id))
			.filter(Boolean);

		let activeId = '#home';
		const observerOptions = {
			root: null,
			rootMargin: '0px 0px -60% 0px',
			threshold: 0.25,
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					activeId = `#${entry.target.id}`;
				}
			});

			setActiveNav(activeId);
		}, observerOptions);

		sections.forEach((section) => observer.observe(section));

		return () => {
			window.removeEventListener('scroll', handleScrollHeader);
			observer.disconnect();
		};
	}, []);

	return (
		<header className='header'>
			<nav className='nav container'>
				<a href='index.html ' className='nav__logo'>
					&lt;Sumaira Shaikh
				</a>

				<div className={Toggle ? 'nav__menu show-menu' : 'nav__menu'}>
					<ul className='nav__list'>
						<li className='nav__item'>
							<a
								href='#home'
								onClick={() => setActiveNav('#home')}
								className={
									activeNav === '#home' ? 'nav__link active-link' : 'nav__link'
								}
							>
								<i className='uil uil-estate nav__icon'></i> Home
							</a>
						</li>

						<li className='nav__item'>
							<a
								href='#projects'
								onClick={() => setActiveNav('#projects')}
								className={
									activeNav === '#projects'
										? 'nav__link active-link'
										: 'nav__link'
								}
							>
								<i className='uil uil-scenery nav__icon'></i> Projects
							</a>
						</li>

						<li className='nav__item'>
							<a
								href='#skills'
								onClick={() => setActiveNav('#skills')}
								className={
									activeNav === '#skills'
										? 'nav__link active-link'
										: 'nav__link'
								}
							>
								<i className='uil uil-file-alt nav__icon'></i> Skills
							</a>
						</li>

						<li className='nav__item'>
							<a
								href='#experience'
								onClick={() => setActiveNav('#experience')}
								className={
									activeNav === '#experience'
										? 'nav__link active-link'
										: 'nav__link'
								}
							>
								<i className='uil uil-bag-alt nav__icon'></i> Experience
							</a>
						</li>

						<li className='nav__item'>
							<a
								href='#about'
								onClick={() => setActiveNav('#about')}
								className={
									activeNav === '#about' ? 'nav__link active-link' : 'nav__link'
								}
							>
								<i className='uil uil-user nav__icon'></i> About
							</a>
						</li>

						<li className='nav__item'>
							<a
								href='#contact'
								onClick={() => setActiveNav('#contact')}
								className={
									activeNav === '#contact'
										? 'nav__link active-link'
										: 'nav__link'
								}
							>
								<i className='uil uil-message nav__icon'></i> Contact Me
							</a>
						</li>

						<li className='nav__item theme-toggle-desktop'>
							<AnimatedThemeToggler className='theme-toggle-button' />
						</li>
					</ul>
				</div>

				{!Toggle && (
					<div className='theme-toggle-mobile'>
						<AnimatedThemeToggler className='theme-toggle-button' />
					</div>
				)}

				<div className='nav__toggle' onClick={() => showMenu(!Toggle)}>
					<i className='uil uil-apps'></i>
				</div>
			</nav>
		</header>
	);
};

export default Header;
