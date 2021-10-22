import * as React from 'react';
import { Student } from '../../../models';

export interface StudentFormProps {
    initialValues?: Student,
    onSubmit?: (formValues: Student) => void,
}

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
    return (
        <div>

        </div>
    );
}
