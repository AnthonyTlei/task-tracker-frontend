import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux/redux-hooks";
import { fetchAllTasks } from "../../task/taskSlice";
import { CircularProgress } from "@mui/material";
import { useToken } from "../../../hooks/redux/useToken";

interface Column {
  id: "id" | "title" | "status" | "manager" | "assignee";
  label: string;
  minWidth?: number;
}

const columns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 20 },
  { id: "title", label: "TITLE", minWidth: 170 },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
  },
  {
    id: "manager",
    label: "Manager",
    minWidth: 100,
  },
  {
    id: "assignee",
    label: "Assignee",
    minWidth: 100,
  },
];

interface Data {
  id: string;
  title: string;
  status: string;
  manager: string;
  assignee: number;
}

function createData(
  id: string,
  title: string,
  status: string,
  manager: string,
  assignee: number
): Data {
  return { id, title, status, manager, assignee };
}

export default function TaskTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<Data[]>([]);
  const dispatch = useAppDispatch();
  const token = useToken();
  const { isSuccess, isLoading, tasks } = useAppSelector((state) => state.task);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const populateTable = () => {
    const newRows = tasks.map((task) =>
      createData(
        task.full_id,
        task.title,
        task.status,
        task.manager,
        task.user_id
      )
    );
    setRows(newRows);
  };

  useEffect(() => {
    // TODO: figure out a way to only fetch these once and store them in store then update locally.
    dispatch(fetchAllTasks(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (isSuccess) {
      populateTable();
    }
  }, [isSuccess]);

  if (isLoading) {
    return <CircularProgress sx={{ marginTop: "64px" }} color="primary" />;
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return <TableCell key={column.id}>{value}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
