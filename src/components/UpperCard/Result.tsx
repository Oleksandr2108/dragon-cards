const Result = () => {
  return(
        <div style={containerStyle}>
      <div style={innerStyle}>
        <div
          style={faceBase}
          className="bg-white dark:bg-[#1f2937]"
        >
          {front}
        </div>
        <div
          style={backStyle}
          className="bg-white dark:bg-[#1f2937]"
        >
          {back}
        </div>
      </div>
    </div>
  )
}

export default Result;
