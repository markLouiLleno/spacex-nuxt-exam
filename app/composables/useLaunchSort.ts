export const useLaunchSort = () => {
	const sortOrder = useState<string>('sortOrder', () => 'Descending')

	const sortLaunches = (launches: any[]) => {
		return [...launches].sort((a, b) => {
			const d1 = new Date(a.launch_date_utc)
			const d2 = new Date(b.launch_date_utc)

			return sortOrder.value === 'Ascending' ? d1.getTime() - d2.getTime() : d2.getTime() - d1.getTime()
		})
	}

	return { sortOrder, sortLaunches }
}
