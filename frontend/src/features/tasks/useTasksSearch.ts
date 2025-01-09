import { useCallback, useState } from "react";

import debounce from "lodash.debounce";

import useTasksSearchParams from "@/hooks/useTasksSearchParams";

const useTasksSearch = () => {
  const { status, searchParams, setSearchParams } = useTasksSearchParams();

  const [searchTerm, setSearchTerm] = useState("");

  const request = debounce((searchKeyword: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("keyword", searchKeyword);
    newSearchParams.set("status", status);

    setSearchParams(newSearchParams);
  }, 500);

  const debounceRequest = useCallback(
    (searchTerm: string) => request(searchTerm),
    [searchParams]
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
