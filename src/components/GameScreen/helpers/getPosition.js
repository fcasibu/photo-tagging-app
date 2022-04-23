const getPosition = (event) => {
  const { left, top, width, height } = event.target.getBoundingClientRect();
  const scaleX = width / event.target.width;
  const scaleY = height / event.target.height;
  const posX = Math.floor((event.clientX - left) * scaleX);
  const posY = Math.floor((event.clientY - top) * scaleY);

  return { left, top, posX, posY };
};

export default getPosition;
