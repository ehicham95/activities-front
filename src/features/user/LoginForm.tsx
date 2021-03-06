import { FORM_ERROR } from 'final-form';
import React, { useContext } from 'react'
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { Button, Form, Header } from 'semantic-ui-react';
import ErrorMessages from '../../app/common/form/ErrorMessages';
import TextInput from '../../app/common/form/TextInput';
import { IUserFormValues } from '../../app/models/user';
import { RootStoreContext } from '../../app/stores/rootStore';

const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password'),
})

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {login} = rootStore.userStore;
    return (
        <FinalForm onSubmit={(values: IUserFormValues) => login(values).catch(error => ({[FORM_ERROR] : error}))} 
            validate={validate}
            render={({handleSubmit, submitting, form, submitError, invalid, pristine, dirtySinceLastSubmit}) => (
            <Form onSubmit={handleSubmit} error>
                <Header as='h2' content='Login to reactivites' color='teal' textAlign='center'/>
                <Field name='email' component={TextInput} placeholder='Email'/>
                <Field name='password' component={TextInput} placeholder='Password' type='password'/>
                {submitError && !dirtySinceLastSubmit && <ErrorMessages error={submitError} text='Invalid email or password'/>} <br/>
                <Button disabled={(invalid && !dirtySinceLastSubmit) || pristine} loading={submitting} color='teal' content='login' fluid/>
            </Form>
        )}>

        </FinalForm>
    )
}

export default LoginForm
