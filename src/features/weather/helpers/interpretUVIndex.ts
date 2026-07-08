// Docs: https://www.who.int/news-room/questions-and-answers/item/radiation-the-ultraviolet-(uv)-index
export const interpretUvIndex = (index: number) => {
  switch (index) {
    case 0:
    case 1:
    case 2:
      return "low";
    case 3:
    case 4:
    case 5:
      return "moderate";
    case 6:
    case 7:
      return "high";
    case 8:
    case 9:
    case 10:
      return "very-high";
    default:
      return "extreme";
  }
};
