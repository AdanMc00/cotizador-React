import React, {useState} from 'react'
import Header from './components/Header'
import Form from './components/Form'
import Resume from './components/Resume'

import styled from '@emotion/styled';
import Result from "./components/Result";
import Spinner from "./components/Spinner";

const Container = styled.div`
max-width: 600px;
margin: 0 auto;
`;

const FormContainer = styled.div`
background-color: #FFF;
padding: 3rem;
;`

function App() {
    const [resume, setResume] = useState({
        quote: 0,
        data: {
            brand: '',
            year: '',
            plan: ''
        }
    })
    const [loading, setloading] = useState(false)
    //extrar data
    const {quote, data} = resume;

    return (
        <Container>
            <Header
                title='Cotizador de Seguros'
            />
            <FormContainer>
                <Form
                    setResume={setResume}
                    setLoading={setloading}
                />
                {loading ? <Spinner/> :
                    <Resume
                    data={data}/>}


                {!loading
                    ?
                    <Result
                        quote={quote}
                    /> : null
                }

            </FormContainer>
        </Container>
    );
}

export default App;
