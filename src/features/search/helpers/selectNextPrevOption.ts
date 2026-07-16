export const selectNextPrevOption = (
  offset: number,
  suggestions: string[],
  links: string[],
  current: string,
) => {
  const options = [...suggestions, ...links];
  if (options.length === 0) return;
  const index = options.indexOf(current, 0);
  const newOption = options.at(index + offset) || options.at(offset > 0 ? 0 : -1);
  return newOption;
};

// const selectNextOption = () => {
//   const options = [...suggestions, ...resultOptions];
//   if (options.length === 0) return;

//   const selectedIndex = options.indexOf(selected, 0);
//   const nextOption = options.at(selectedIndex + 1) || options.at(0);

//   setOpen(true);
//   setSelected(nextOption ?? "");
// };

// const selectPrevOption = () => {
//   const options = [...suggestions, ...resultOptions];
//   if (options.length === 0) return;

//   const selectedIndex = options.indexOf(selected, 0);
//   const prevOption = options.at(selectedIndex - 1) || options.at(-1);

//   setOpen(true);
//   setSelected(prevOption ?? "");
// };
