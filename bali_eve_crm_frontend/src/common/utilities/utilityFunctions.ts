export function formatDate(date: string) {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options as object).format(
    new Date(date)
  );
}

export function formatDateToShortForm(date: string) {
  const shortDate = new Date(date);
  const year = shortDate.getFullYear();
  const month = String(shortDate.getMonth() + 1).padStart(2, '0');
  const day = String(shortDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatIdFromName(element: string): string {
  return element.toLowerCase().replace(/\s/g, '');
}

export function calculatePercentages(element: any[]) {
  return (
    (element.filter((item) => item.completed === 'true').length /
      element.length) *
    100
  );
}
