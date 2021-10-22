import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import studentApi from '../../../api/studentApi';
import { Student } from '../../../models';
import StudentForm from '../components/StudentForm';



export default function AddEditStudent() {
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

    const initialValues: Student = {
        name: '',
        age: '',
        mark: '',
        gender: 'male',
        city: '',
        ...student,
    } as Student;

    const handleStudentFormSubmit = (formValues: Student) => {
        //  TODO: handle submit here, callAPI to add/update student 
    };

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
