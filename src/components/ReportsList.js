export default function ReportsList(props) {
  const { reports } = props;

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  return (
    <div id="report_list" className="h-full max-h-48 w-full overflow-y-auto">
      {reports.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {reports.map((report) => (
            <li key={report.report_id} className="rounded bg-white p-4 shadow">
              <p className="font-medium">{report.comment}</p>
              <p className="text-sm text-gray-500">{formatDate(report.date_reported)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay reportes disponibles.</p>
      )}
    </div>
  );
}
