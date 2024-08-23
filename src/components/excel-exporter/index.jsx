import { Button, message } from "antd";
import { exportToExcel } from "../../utils/helper";
import { RiFileExcel2Line } from "react-icons/ri";

const ExcelExport = ({
  error,
  columnName,
  checkedList,
  filteredData,
  data,
  fileName,
}) => {
  const handleExport = () => {
    if (!error) {
      const columnsToExport = columnName.filter(
        (col) => checkedList.includes(col.key) && col.title !== "Action"
      );

      const dataToExport = (filteredData ?? data?.data?.data)?.map(
        (item, index) => {
          const newItem = {};
          columnsToExport.forEach((col) => {
            if (col.key === "sn") {
              newItem["S.N."] = index + 1;
            } else if (col.key === "action") {
              newItem[""] = "";
            } else {
              newItem[col.dataIndex] = item[col.dataIndex];
            }
          });
          return newItem;
        }
      );

      exportToExcel(dataToExport, `${fileName}.xlsx`);
    } else {
      message.error("Failed to export.");
    }
  };
  return (
    <div>
      <Button onClick={handleExport} icon={<RiFileExcel2Line size={18} />}>
        Excel
      </Button>
    </div>
  );
};

export default ExcelExport;
