import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import studentApi from '../../../api/studentApi';
import { Student } from '../../../models';
import StudentForm from '../components/StudentForm';
import { useHistory } from 'react-router-dom'



export default function AddEditStudent() {
    const history = useHistory();
    const { studentId } = useParams<{ studentId: string }>();
    const isEdit = Boolean(studentId); // Is edit when sudentId have data.
    const [student, setStudent] = useState<Student>();

    useEffect(() => {
        if (!studentId) return;

        // IFFE
        (async () => {
            try {
                const response: Student = await studentApi.getById(studentId);
                setStudent(response);
            } catch (error) {
                console.log('Failed to fetch student id: ', error);
            }
        })();
    }, [studentId]);

    const handleStudentFormSubmit = async (formValues: Student) => {
        // TODO: Handle submit here, call API  to add/update student
        if (isEdit) {
            await studentApi.update(formValues);
        } else {
            await studentApi.add(formValues);
        }
        // Redirect back to student list
        history.push('/admin/student');
    };

    const initialValues: Student = {
        name: '',
        age: '',
        mark: '',
        gender: 'male',
        city: '',
        ...student,
    } as Student;



    return (
        <Box>
            <Link to="/admin/student">
                <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
                    <ChevronLeft /> Back to student list
                </Typography>
            </Link>
            <Typography variant="h4">
                {isEdit ? "Edit student" : " Add new student"}
            </Typography>
            <Box mt={3}>
                {(!isEdit || Boolean(student)) && (
                    <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
                )}
            </Box>
        </Box>
    );
}
