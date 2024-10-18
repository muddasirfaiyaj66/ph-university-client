import { useState } from "react";
import { TQueryParam } from "../../../types";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import dayjs from "dayjs";
export type TTableData = Pick<
  TAcademicFaculty,
  "_id" | "name" | "createdAt" | "updatedAt"
>;

const AcademicFaculty = () => {
  const [params, setParam] = useState<TQueryParam[] | undefined>(undefined);
  const { data: academicFacultyData, isFetching } =
    useGetAllAcademicFacultyQuery(params);
  const tableData = academicFacultyData?.data?.map(
    ({ _id, name, createdAt, updatedAt }) => ({
      key: _id,
      _id: _id,
      name,
      createdAt: dayjs(createdAt).format("DD/MM/YYYY"),
      updatedAt: dayjs(updatedAt).format("DD/MM/YYYY"),
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Id",
      key: "_id",
      dataIndex: "_id",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "CreatedAt",
      key: "createdAt",
      dataIndex: "createdAt",
    },
    {
      title: "UpdatedAt",
      key: "updatedAt",
      dataIndex: "updatedAt",
    },
    {
      title: "Action",
      key: "X",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];
 
  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    _filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      setParam(queryParams);
    }
  };
  return (
    <Table<TTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default AcademicFaculty;
