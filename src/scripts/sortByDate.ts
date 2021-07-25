interface withDate {
  date: string;
}

export const sortByDateDesc = (a: withDate, b: withDate) => {
  if (a.date > b.date) {
    return -1;
  }
  if (b.date > a.date) {
    return 1;
  }
  return 0;
};

export const sortByDateAsc = (a: withDate, b: withDate) => {
  if (a.date > b.date) {
    return -1;
  }
  if (b.date > a.date) {
    return 1;
  }
  return 0;
};
