export const getRandomColor = () => {
  const bgColors = [
    "bg-pink-300",
    "bg-purple-300",
    "bg-indigo-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-orange-300",
    "bg-pink-300",
  ];

  const randomIndex = Math.floor(Math.random() * bgColors.length);

  return bgColors[randomIndex];
};
