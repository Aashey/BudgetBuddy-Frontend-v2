import { Input } from "antd";
import { CiSearch } from "react-icons/ci";

export const CustomSearchWithTitle = ({ setFilteredData, data }) => {
  const handleSearch = (value) => {
    console.log(value);
    const formattedKeySearch = value.toLowerCase();
    console.log(data?.data?.data);
    const searchData = data?.data?.data.filter((item) =>
      item.title.toLowerCase().includes(formattedKeySearch)
    );
    setFilteredData(searchData);
  };
  return (
    <>
      <Input
        allowClear
        prefix={<CiSearch />}
        type="search"
        onChange={(e) => handleSearch(e.target.value)}
        className="w-[200px]"
        placeholder="Search"
      />
    </>
  );
};

export const CustomSearchWithType = ({ setFilteredData, data }) => {
  const handleSearch = (value) => {
    console.log(value);
    const formattedKeySearch = value.toLowerCase();
    console.log(data?.data?.data);
    const searchData = data?.data?.data.filter((item) =>
      item.transaction_type.toLowerCase().includes(formattedKeySearch)
    );
    setFilteredData(searchData);
  };
  return (
    <>
      <Input
        allowClear
        prefix={<CiSearch />}
        type="search"
        onChange={(e) => handleSearch(e.target.value)}
        className="w-[200px]"
        placeholder="Search"
      />
    </>
  );
};
