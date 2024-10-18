import { useState } from "react";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { TQueryParam } from "../../../types";
import dayjs from "dayjs";
import { Button, Table, TableColumnsType, TableProps } from "antd";


export type TTableData = {
  key:string,
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  academicFaculty: string;  
} ;

const AcademicDepartment = () => {
    const [params, setParam] = useState<TQueryParam[] | undefined>(undefined);
    const { data: academicFacultyData, isFetching } =
      useGetAllAcademicDepartmentQuery(params);
      console.log(academicFacultyData);
      
      const tableData = academicFacultyData?.data?.map(
        ({ _id, name, createdAt, updatedAt, academicFaculty }) => ({
          key: _id,
          _id: _id,
          name,
          academicFaculty: academicFaculty.name,
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
        title: "Academic Faculty",
        key: "academicFaculty",
       dataIndex: "academicFaculty",
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
      <Table<TTableData >
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
      />
    );
};

export default AcademicDepartment;