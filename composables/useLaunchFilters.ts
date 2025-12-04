export const useLaunchFilters = () => {
	const selectedYear = useState<number | null>('selectedYear', () => null)

	const filterByYear = (launches: any[]) => {
		if (!selectedYear.value) return launches

		return launches.filter((l) => new Date(l.launch_date_utc).getFullYear() === selectedYear.value)
	}

	return {
		selectedYear,
		filterByYear,
	}
}
