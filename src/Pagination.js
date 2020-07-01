import React from "react";

export default function Pagination({
  changeToPrev,
  changeToNext,
  prevPageUrl,
  nextPageUrl,
  page,
}) {
  return (
    <div className="buttons">
      {prevPageUrl && (
        <button onClick={changeToPrev} className="btn">
          Prev
        </button>
      )}
      <span className="page-number">{page}</span>
      {nextPageUrl && (
        <button onClick={changeToNext} className="btn">
          Next
        </button>
      )}
    </div>
  );
}
