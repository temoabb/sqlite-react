import debounce from "lodash.debounce";

import useTasksSearchParams from "@/hooks/useTasksSearchParams";
import { useCallback, useState } from "react";

const useTasksSearch = () => {
  const { searchParams, setSearchParams } = useTasksSearchParams();

  const [searchTerm, setSearchTerm] = useState("");

  const request = debounce((searchKeyword: string) => {
    searchParams.set("keyword", searchKeyword);
    setSearchParams(searchParams);
  }, 500);

  const debounceRequest = useCallback(
    (searchTerm: string) => request(searchTerm),
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debounceRequest(e.target.value);
  };

  return {
    searchTerm,
    onChange,
    setSearchTerm,
  };
};

export default useTasksSearch;
