import React from 'react';
import styled from '@emotion/styled';
import {upperCase} from "../helper";

const ResumeContainer = styled.div`
padding: 1rem;
text-align: center;
background-color: #00838F;
color: #FFF;
margin-top: 1rem;
`;

const Resume = ({data}) => {
    const {brand, year, plan} = data;
    if (brand === '' || year === '' || plan === '') return null;

    return (
        <ResumeContainer>
            <h2>Resumen de cotización</h2>
            <ul>
                <li>Marca: {upperCase(brand)}</li>
                <li>Plan: {upperCase(plan)}</li>
                <li>Año del Auto: {year}</li>
            </ul>
        </ResumeContainer>
    );
}
export default Resume;