import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const headerElement = screen.queryAllByText(/contact form/i);
    // console.log(headerElement);

    expect(headerElement).toBeInTheDocument;
    expect(headerElement).toBeTruthy;
    expect(headerElement).toHaveTextContent;
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstNameField = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameField, "abc");

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitBtn = screen.getByRole('button');
    userEvent.click(submitBtn);

    await waitFor(() => {
        const errorMsg = screen.getAllByTestId('error');
        expect(errorMsg).toHaveLength(3);
    });

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first name*/i);
    userEvent.type(firstName, 'Ashish');

    const lastName = screen.getByLabelText(/last name*/i);
    userEvent.type(lastName, 'Desai');

    const submitBtn = screen.getByRole('button');
    userEvent.click(submitBtn);

    const errorMsg = await screen.findAllByTestId('error');
    expect(errorMsg).toHaveLength(1);

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

    render(<ContactForm />);
    const emailFld = screen.getByLabelText(/email*/i);
    userEvent.type(emailFld, 'desai@gmail');

    const errorMsg = await screen.findByText(/email must be a valid email address/i);
    expect(errorMsg).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

    render(<ContactForm />);

    const submitBtn = screen.getByRole('button');
    userEvent.click(submitBtn);

    const errorMsg = await screen.findByText(/email must be a valid email address/i);
    expect(errorMsg).toBeInTheDocument();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first name*/i);
    userEvent.type(firstName, 'Ashish');

    const lastName = screen.getByLabelText(/last name*/i);
    userEvent.type(lastName, 'Desai');

    const emailFld = screen.getByLabelText(/email*/i);
    userEvent.type(emailFld, 'desai@email.com');

    // const messageFld = screen.getByLabelText(/message/i);
    // userEvent.type(messageFld, '');

    const submitBtn = screen.getByRole('button');
    userEvent.click(submitBtn);

    await waitFor(() => {
        const firstNameDispay = screen.queryByText('Ashish');
        const lastNameDispay = screen.queryByText('Desai');
        const emailDispay = screen.queryByText('desai@email.com');
        const messageDispay = screen.queryByTestId('messageDisplay');

        expect(firstNameDispay).toBeInTheDocument('Ashish');
        expect(lastNameDispay).toBeInTheDocument('Desai');
        expect(emailDispay).toBeInTheDocument('desai@email.com');
        expect(messageDispay).not.toBeInTheDocument('messageDisplay');
    });

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first name*/i);
    userEvent.type(firstName, 'Ashish');

    const lastName = screen.getByLabelText(/last name*/i);
    userEvent.type(lastName, 'Desai');

    const emailFld = screen.getByLabelText(/email*/i);
    userEvent.type(emailFld, 'desai@email.com');

    const messageFld = screen.getByLabelText(/message/i);
    userEvent.type(messageFld, 'This is a message');

    const submitBtn = screen.getByRole('button');
    userEvent.click(submitBtn);

    await waitFor(() => {
        const firstNameDispay = screen.queryByText('Ashish');
        const lastNameDispay = screen.queryByText('Desai');
        const emailDispay = screen.queryByText('desai@email.com');
        const messageDispay = screen.queryByTestId('messageDisplay');

        expect(firstNameDispay).toBeInTheDocument('Ashish');
        expect(lastNameDispay).toBeInTheDocument('Desai');
        expect(emailDispay).toBeInTheDocument('desai@email.com');
        expect(messageDispay).toBeInTheDocument('This is a message');
    });

});
