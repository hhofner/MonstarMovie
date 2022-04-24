const getMoviePath = (backdrop: string) => {
  const base = "https://image.tmdb.org/t/p/";
  const size = "original/";
  return base + size + backdrop;
};

export { getMoviePath };
