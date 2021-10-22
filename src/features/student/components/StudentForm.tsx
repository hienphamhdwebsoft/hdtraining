import { Box, Button } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '../../../components/FormField';
import { Student } from '../../../models';

export interface StudentFormProps {
    initialValues?: Student,
    onSubmit?: (formValues: Student) => void,
}

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
    const { control, handleSubmit } = useForm<Student>({
        defaultValues: initialValues,
    });

    const handleFormSubmit = (formValues: Student) => {
        console.log('Submit: ', formValues);
    };

    return (
        <Box>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name="name" control={control} label="Full Name" />
                <InputField name="age" control={control} label="Age" />
                <InputField name="mark" control={control} label="Mark" />
                <InputField name="city" control={control} label="City" />
                <Box>
                    <Button type="submit" variant="contained" color="primary">Save</Button>
                </Box>
            </form>
        </Box>
    );
}
