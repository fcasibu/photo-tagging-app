const checkAdjacentPosition = (position, target) => {
  const x = Math.abs(position.x - target.x);
  const y = Math.abs(position.y - target.y);
  return x + y <= 20;
};

export default checkAdjacentPosition;
