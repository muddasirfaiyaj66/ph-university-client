import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { useAddAcademicDepartmentMutation, useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import { TResponse } from "../../../types";
import { TAcademicDepartment } from "../../../types/academicManagement.type";
type TFacultyOptions ={
  value: string;
  label: string ;
}[];
const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

 
  const { data: academicFacultyData } =
    useGetAllAcademicFacultyQuery(undefined);
    
    const facultyOptions: TFacultyOptions = academicFacultyData?.data
    ? academicFacultyData.data.map(({ _id, name }) => ({ value: _id, label: name }))
    : [];
  
    
    

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        const academicDepartmentData = {
            name: data.name,
            academicFaculty: data.academicFaculty
        }
        const toastId = toast.loading('Creating...');
        try{
         const  res = (await addAcademicDepartment(academicDepartmentData)) as TResponse<TAcademicDepartment>;
         if (res.error) {
          toast.error(res.error.data.message, { id: toastId });
        } else {
          toast.success('Department created', { id: toastId });
        }
      
      } catch (err) {
        toast.error(`Something went wrong: ${err}`, { id: toastId });
      }
        
       

        
    }
    return (
        <Flex justify="center" align="center">
        <Col span={6}>
          <PHForm
            onSubmit={onSubmit}
          
          >
            <PHInput label="Name" name="name" type="text" />
           
            <PHSelect
              label="Academic Faculty"
              name="academicFaculty"
              options={facultyOptions}
              
            />
            
  
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    );
};

export default CreateAcademicDepartment;