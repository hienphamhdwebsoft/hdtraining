import { Box, Button, CircularProgress } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../app/hooks';
import { InputField, RadioGroupField, SelectField } from '../../../components/FormField';
import { Student } from '../../../models';
import { selectCityOptions } from '../../city/citySlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
export interface StudentFormProps {
    initialValues?: Student,
    onSubmit?: (formValues: Student) => void,
}

const schema = yup.object().shape({
    name: yup
        .string()
        .required('Please enter name.'),
    age: yup
        .number()
        .positive('Please enter a positive number.')
        .min(18, 'Min is 18')
        .max(60, 'Max is 60')
        .integer('Please enter an integer.')
        .required('Please enter age.')
        .typeError('Please enter a valid number.'),
    mark: yup
        .number()
        .min(0, 'Min is 0')
        .max(10, 'Max is 10')
        .required('Please enter mark.')
        .typeError('Please enter a valid number.'),
    gender: yup
        .string()
        .oneOf(['male', 'female'], 'Please select either male or female.')
        .required('Please select gender.'),
    city: yup.string().required('Please select city.'),
});

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
    const cityOptions = useAppSelector(selectCityOptions);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<Student>({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });
    const handleFormSubmit = async (formValues: Student) => {
        try {
            await onSubmit?.(formValues);
        } catch (error) {
            console.log('Failed to submit: ', error)
        }
    };

    return (
        <Box maxWidth={500}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name="name" control={control} label="Full Name" />
                <RadioGroupField name="gender" control={control} label="Gender" options={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                ]} />
                <InputField name="age" control={control} label="Age" type="number" />
                <InputField name="mark" control={control} label="Mark" type="number" />
                <SelectField name="city" control={control} label="City" options={cityOptions} />
                <Box>
                    <Button fullWidth type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                        {isSubmitting && <CircularProgress size={16} color="primary" />}
                        &nbsp;Save
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
