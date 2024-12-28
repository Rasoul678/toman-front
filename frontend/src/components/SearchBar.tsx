import { statusOptions, typeOptions } from "@/constants";
import { useQueryChangeHandle } from "@/hooks";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { PayStatusType } from "@/types";
import React from "react";
import { Input } from "./shadcn-ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./shadcn-ui/select";

type IProps = {};

const SearchBar: React.FC<IProps> = () => {
  const { query } = useTypedSelector((state) => state.payments);
  const setQueryItem = useQueryChangeHandle();

  /**
   * Handles changes to the search input in the search bar.
   *
   * Trims and converts the search input to lowercase, then updates the `page` and `search` query parameters.
   * This ensures the search results start from the beginning and the search query is updated.
   *
   * @param e - The React change event for the search input.
   */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.trim().toLowerCase();

    setQueryItem("page", "1");
    setQueryItem("search", search);
  };

  /**
   * Handles changes to the type filter in the search bar.
   *
   * If the selected type is "*", it is set to an empty string to indicate that all types should be shown.
   * Otherwise, the `type` query parameter is updated with the selected type.
   * The `page` query parameter is also reset to 1 to ensure the search results start from the beginning.
   *
   * @param type - The selected type value from the dropdown.
   */
  const handleTypeChange = (type: string) => {
    setQueryItem("page", "1");

    if (type === "*") {
      type = "";
    }

    setQueryItem("type", type);
  };

  /**
   * Handles changes to the status filter in the search bar.
   *
   * If the selected status is "*", it is set to an empty string to indicate that all statuses should be shown.
   * Otherwise, the `status` query parameter is updated with the selected status.
   * The `page` query parameter is also reset to 1 to ensure the search results start from the beginning.
   *
   * @param status - The selected status value from the dropdown.
   */
  const handleStatusChange = (status: string) => {
    setQueryItem("page", "1");

    if (status === "*") {
      status = "";
    }

    setQueryItem("status", status);
  };

  return (
    <div className="flex flex-col sm:flex-row w-full items-center justify-end gap-2 bg-background">
      <Input
        type="text"
        value={query.search}
        onChange={handleSearch}
        placeholder="Search by description"
        className="flex-1 w-full sm:w-auto min-w-sm"
      />
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Select value={query.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="capitalize w-full sm:w-[10rem]">
            <SelectValue placeholder="All Types">{query.type}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="capitalize" value="*">
              All Types
            </SelectItem>
            {typeOptions.map((option) => (
              <SelectItem
                className="capitalize"
                key={option}
                value={String(option)}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={query.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="capitalize w-full sm:w-[10rem]">
            <SelectValue placeholder="All Statuses">{query.status}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="capitalize" value="*">
              All Statuses
            </SelectItem>
            {statusOptions.map((option) => {
              let color = "text-green-400";
              if (option === PayStatusType.FAILED) {
                color = "text-red-500";
              } else if (option === PayStatusType.PENDING) {
                color = "text-yellow-400";
              }

              return (
                <SelectItem
                  className={`capitalize ${color}`}
                  key={option}
                  value={String(option)}
                >
                  {option}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchBar;
