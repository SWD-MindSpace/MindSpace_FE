"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "react-toastify";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Button,
  Input,
  Pagination,
} from "@heroui/react";
import { format } from "date-fns";
import { AppointmentResponse, getPsychologistAppointments } from "../APIs";

const COLUMNS = [
  { name: "Student", uid: "studentName" },
  { name: "Date", uid: "date" },
  { name: "Time", uid: "time" },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" },
];

const LIMIT = 5;

export default function AppointmentList() {
  const [data, setData] = useState<AppointmentResponse[] | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [totalItems, setTotalItems] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize with a default date range of 1 month if no dates are provided
  useEffect(() => {
    if (!searchParams.has("startDate") && !searchParams.has("endDate")) {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setMonth(today.getMonth() - 1);

      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = today.toISOString().split("T")[0];

      const params = new URLSearchParams(searchParams.toString());
      params.set("startDate", formattedStartDate);
      params.set("endDate", formattedEndDate);
      params.set("pageIndex", "1");
      params.set("pageSize", LIMIT.toString());

      router.replace(`${pathname}?${params.toString()}`);
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      const params = Object.fromEntries(searchParams.entries());
      const result = await getPsychologistAppointments(params);

      if (result.status === "success") {
        const { data, count, pageSize } = result.data;
        setData(data);
        setTotalItems(count);
        setTotalPages(Math.ceil(count / pageSize));
      } else {
        setData([]);
        setTotalItems(0);
        setTotalPages(0);
        toast.error(result.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch appointments");
      setData([]);
      setTotalItems(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  // Debounced input handler for search/filter
  const handleInputChange = useDebouncedCallback((key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Reset page index when changing filters (except when changing page)
    if (key !== "pageIndex") {
      params.set("pageIndex", "1");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const renderCell = useCallback(
    (appointment: AppointmentResponse, columnKey: React.Key) => {
      switch (columnKey) {
        case "studentName":
          return <div>{appointment.studentName}</div>;

        case "date":
          return <div>{format(new Date(appointment.date), "PP")}</div>;

        case "time":
          return (
            <div>
              {appointment.startTime.substring(0, 5)} -{" "}
              {appointment.endTime.substring(0, 5)}
            </div>
          );

        case "status":
          return (
            <Chip
              className="capitalize"
              color={appointment.isUpcoming ? "primary" : "success"}
              size="sm"
              variant="flat"
            >
              {appointment.isUpcoming ? "Upcoming" : "Completed"}
            </Chip>
          );

        case "actions":
          return (
            <div className="flex gap-2 justify-center">
              <Tooltip content="View Details">
                <Button
                  size="sm"
                  variant="light"
                  onClick={() => {
                    // You can implement view details functionality
                  }}
                >
                  View
                </Button>
              </Tooltip>

              {appointment.meetUrl && (
                <Tooltip content="Join Meeting">
                  <Button
                    size="sm"
                    color="primary"
                    onClick={() => window.open(appointment.meetUrl!, "_blank")}
                  >
                    Join
                  </Button>
                </Tooltip>
              )}
            </div>
          );

        default:
          return <div>-</div>;
      }
    },
    []
  );

  const renderDateFilters = () => (
    <div className="flex gap-4 mb-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="startDate">Start Date</label>
        <Input
          id="startDate"
          type="date"
          defaultValue={searchParams.get("startDate") || ""}
          onChange={(e) => handleInputChange("startDate", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="endDate">End Date</label>
        <Input
          id="endDate"
          type="date"
          defaultValue={searchParams.get("endDate") || ""}
          onChange={(e) => handleInputChange("endDate", e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {renderDateFilters()}

      {loading && (
        <div className="text-center py-8">Loading appointments...</div>
      )}

      {!loading && data && (
        <>
          <Table
            aria-label="Appointments table"
            selectionMode="none"
            isHeaderSticky
          >
            <TableHeader columns={COLUMNS}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={
                    column.uid === "actions" || column.uid === "status"
                      ? "center"
                      : "start"
                  }
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>

            <TableBody
              items={data}
              emptyContent="No appointments found. Try adjusting your filters."
            >
              {(item) => (
                <TableRow
                  key={`${item.date}-${item.startTime}-${item.studentName}`}
                >
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>

          {totalPages && totalPages > 0 && (
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                Total: {totalItems} appointments
              </span>

              <Pagination
                total={totalPages}
                initialPage={parseInt(searchParams.get("pageIndex") || "1")}
                onChange={(page) =>
                  handleInputChange("pageIndex", page.toString())
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
