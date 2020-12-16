import { useEffect, useState, useRef } from "react";

const useOnClickOutside = (initialIsVisible: boolean) => {
	const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
	const ref = useRef<HTMLDivElement>(null);

	const handleHideDropdown = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			setIsComponentVisible(false);
		}
	};

	const handleClickOutside = (event: Event) => {
		if (ref.current) {
			if (!ref.current.contains(event.target as Node)) {
				setIsComponentVisible(false);
			} else {
				setIsComponentVisible(true);
			}
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleHideDropdown, true);
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("keydown", handleHideDropdown, true);
			document.removeEventListener("click", handleClickOutside, true);
		};
	});

	return { ref, isComponentVisible, setIsComponentVisible };
};

export default useOnClickOutside;
