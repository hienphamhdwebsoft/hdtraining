import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import studentApi from '../../../api/studentApi';
import { Student } from '../../../models';



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

    console.log('st', student)
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
        </Box>
    );
}
