import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty } from "../../../types/academicManagement.type";

const CreateAcademicFaculty = () => {
    const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    
    const toastId = toast.loading('Creating...');
    const academicFacultyData = {
        name:data.name
    };

    try {
        const res = (await addAcademicFaculty(academicFacultyData)) as TResponse<TAcademicFaculty>;
        
        if (res.error) {
          toast.error(res.error.data.message, { id: toastId });
        } else {
          toast.success('Semester created', { id: toastId });
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast.error(`Something went wrong: ${err}`, { id: toastId });
      }

  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(
            z.object({
              name: z.string({ message: "Academic Faculty is Required" }),
            })
          )}
        >
          <PHInput type="text" name="name" label="Name" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
