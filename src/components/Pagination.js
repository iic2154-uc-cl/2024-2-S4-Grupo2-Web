/* eslint-disable react/button-has-type */

export default function Pagination({
  handleNextPage,
  handlePreviousPage,
  nextPage,
  previousPage,
}) {
  return (
    <div className="mb-2 flex justify-center gap-3">
      {previousPage && (
        <button
          className="flex w-[130px] items-center rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-blue-500 focus:ring-2 focus:ring-gray-500"
          onClick={handlePreviousPage}
        >
          <svg
            aria-hidden="true"
            className="mr-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Anterior
        </button>
      )}
      {nextPage && (
        <button
          className="flex w-[130px] items-center rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-blue-500 focus:ring-2 focus:ring-gray-500"
          onClick={handleNextPage}
        >
          Siguiente
          <svg
            aria-hidden="true"
            className="ml-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
