import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
	const [lang, setLang] = useState('en');

	const toggleLanguage = () => {
		setLang((prevLang) => (prevLang === 'en' ? 'ar' : 'en'));
	};

	return (
		<LanguageContext.Provider value={{ lang, toggleLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => {
	return useContext(LanguageContext);
};