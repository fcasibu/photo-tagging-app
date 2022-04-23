const getPosition = (event) => {
  const { left, top } = event.target.getBoundingClientRect();
  const posX = Math.floor(event.clientX - left);
  const posY = Math.floor(event.clientY - top);

  return { left, top, posX, posY };
};

export default getPosition;
