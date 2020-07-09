import React from "react";

export default function Pagination({
  next,
  previous,
  changeToPrevious,
  changeToNext,
}) {
  return (
    <div className="pagination">
      {previous && (
        <div>
          <button className="page-link" onClick={changeToPrevious}>
            prev
          </button>
        </div>
      )}
      {next && (
        <div>
          <button className="page-link" onClick={changeToNext}>
            next
          </button>
        </div>
      )}
    </div>
  );
}
