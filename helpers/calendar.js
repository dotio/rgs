export const getDays = (start, count, selectedDate, days = []) => {
  if (count === days.length) {
    return days
  }

  const mDate = start.clone().add(days.length, 'days')
  return getDays(start, count, selectedDate, [
    ...days,
    {
      title: mDate.format('dd, D MMM'),
      value: mDate.format('YYYY-MM-DD'),
      selected: mDate.format('YYYY-MM-DD') === selectedDate
    }
  ])
}