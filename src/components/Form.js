import React, {useState} from 'react';
import styled from '@emotion/styled'
import {getYearsDifference, brandCalculate, getPlan} from "../helper";

const Input = styled.div`
display:  flex;
margin-bottom: 1rem;
align-items: center;
`;
const Label = styled.div`
flex: 0 0 100px;
`;
const Select = styled.select`
display: block;
width: 100%;
padding: 1rem;
border: 1px solid #e1e1e1;
-webkit-appearance: none;
`;
const InputRadio = styled.input`
margin: 0 1rem;
`;
const Button = styled.button`
background-color: #00838F;
font-size: 16px;
width: 100%;
padding: 1rem;
color: #fff;
text-transform: uppercase;
font-weight: bold;
border: none;
transition: background-color .3s ease;
margin-top: 2rem;
&:hover {
background-color: #26C6DA;
cursor: pointer;
}
`;
const Error = styled.div`
background-color: red;
color: white;
padding:1%;
width:100%;
text-align: center;
margin-bottom: 2rem;
`;

const Form = ({setResume,setLoading}) => {

    const [data, setData] = useState({
        brand: '',
        year: '',
        plan: ''
    });
    const [error, setError] = useState(false);
    //extraer valores State

    const {brand, year, plan} = data
    //Leer los datos del formulario y colocarlos en el state

    const getFormInfo = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const quoteInsurance = e => {
        e.preventDefault();
        if (brand.trim() === '' || year.trim() === '' || plan.trim() === '') {
            setError(true)
            return;
        }
        setError(false);
        //Base de 2000
        let result = 2000
        //obtener la diferencia de años
        const difference = getYearsDifference(year)
        console.log(difference)
        //por cada año hay que restar el 3%
        result -= ((difference * 3) * result) / 100;
        console.log(result)
        //Americano 15
        //asiatico 5
        //europeo 30
        result = brandCalculate(brand) * result
        console.log(result)
        //basicoaumenta 20%
        //Completo 50%
        const incrementPlan = getPlan(plan);
        console.log(incrementPlan)
        result = parseFloat(incrementPlan * result).toFixed(2);
        setLoading(true);

        setTimeout(()=>{
            //elimina Spinner
            setLoading(false);
            //passainfo a componente principal
            setResume({
                quote: result,
                data
            })
        }, 3000)


    }
    return (
        <form
            onSubmit={quoteInsurance}>
            {error ? <Error>Todos los campos son obligatorios</Error> : null}
            <Input>
                <Label>Marca</Label>
                <Select
                    name="brand"
                    value={brand}
                    onChange={getFormInfo}
                >
                    <option value=""> --Seleccione--</option>
                    <option value="americano"> Americano</option>
                    <option value="europeo"> Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Input>
            <Input>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={getFormInfo}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Input>
            <Input>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    check={plan === "basico"}
                    onChange={getFormInfo}/> Basico

                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    check={plan === "completo"}
                    onChange={getFormInfo}/> Completo
            </Input>
            <Button type="submit">Cotizar</Button>
        </form>
    );
}

export default Form