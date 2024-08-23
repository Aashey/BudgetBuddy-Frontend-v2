import { useGetDropdown } from "../getDropdown";

const useCategoryData = (method, type) => {
  let data, error, isLoading;
  if (type === "income" || type === "expense") {
    const {
      data: dropdownData,
      error: dropdownError,
      isLoading: dropdownIsLoading,
    } = useGetDropdown(method, `${type}-${method}`);

    data = dropdownData;
    error = dropdownError;
    isLoading = dropdownIsLoading;
  } else {
    data = null;
    error = null;
    isLoading = null;
  }

  return { data, error, isLoading };
};

export default useCategoryData;
