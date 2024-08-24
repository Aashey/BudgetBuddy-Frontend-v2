import { Button, DatePicker, Select } from "antd";
import { useState } from "react";
import {
  disableAfterToday,
  getThisMonth,
  getThisWeek,
  getToday,
} from "../../../utils/helper";
import dayjs from "dayjs";
import { TbSettingsSearch } from "react-icons/tb";

const FilterDate = ({ setFilter }) => {
  const { RangePicker } = DatePicker;

  const [generateLoading, setGenerateLoading] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState("this_month");
  const [dateRange, setDateRange] = useState({
    from_date: null,
    to_date: null,
  });

  const filterOptions = [
    { label: "Today", value: "today" },
    { label: "This Week", value: "this_week" },
    { label: "This Month", value: "this_month" },
    { label: "Period", value: "period" },
  ];

  const handleFilter = () => {
    setGenerateLoading(true);
    const filterMap = {
      today: getToday(),
      this_week: getThisWeek(),
      this_month: getThisMonth(),
      period: { from_date: dateRange.from_date, to_date: dateRange.to_date },
    };

    const selectedOption = filterMap[selectedFilter];
    setFilter(selectedOption);
    setGenerateLoading(false);
  };
  return (
    <div>
      <Select
        placeholder="Filter"
        className="w-[150px]"
        onChange={(value) => {
          setDateRange({
            from: null,
            to: null,
          });
          setSelectedFilter(value);
        }}
        options={filterOptions}
        defaultValue={selectedFilter}
      />
      {selectedFilter === "period" && (
        <span className="mt-4">
          <RangePicker
            className="ml-4"
            disabledDate={disableAfterToday}
            onChange={(value) => {
              setDateRange({
                from_date: dayjs(value[0]).format("YYYY-MM-DD"),
                to_date: dayjs(value[1]).format("YYYY-MM-DD"),
              });
            }}
          />
        </span>
      )}
      <Button
        loading={generateLoading}
        className="ml-4"
        onClick={handleFilter}
        icon={<TbSettingsSearch icon={22} />}
      >
        Generate
      </Button>
    </div>
  );
};

export default FilterDate;
