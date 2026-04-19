const Card = ({ srcImg }: { srcImg: string }) => {
  return (
    <div className={`w-22.5 h-50`}>
      <img
        className="w-full h-full object-cover rounded-[20px]"
        src={srcImg}
        alt=""
        draggable={false}
      />
    </div>
  );
};
export default Card;
