import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoaderButton from './LoaderButton';
import { useFormFields } from '../lib/hooksLib';
import { Token } from '@stripe/stripe-js';

interface BillingFormProps {
  isLoading: boolean;
  onSubmit: (storage: string, token: Token | undefined, error: any) => void;
}

export default function BillingForm(props: BillingFormProps) {
  const { isLoading, onSubmit } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [fields, handleFieldChange] = useFormFields({
    name: '',
    storage: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const isLoadingUpdated = isProcessing || isLoading;

  function validateForm() {
    return stripe && elements && fields.name !== '' && fields.storage !== '' && isCardComplete;
  }

  async function handleSubmitClick(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const cardElement = elements.getElement(CardElement);
    if (cardElement) {
      const { token, error } = await stripe.createToken(cardElement);
      setIsProcessing(false);
      onSubmit(fields.storage, token, error);
    }
  }

  return (
    <Form className='BillingForm' onSubmit={handleSubmitClick}>
      <Form.Group controlId='storage'>
        <Form.Label>Storage</Form.Label>
        <Form.Control
          min='0'
          type='number'
          value={fields.storage}
          onChange={handleFieldChange}
          placeholder='Number of notes to store'
        />
      </Form.Group>
      <hr />
      <Form.Group controlId='name'>
        <Form.Label>Cardholder&apos;s name</Form.Label>
        <Form.Control
          type='text'
          value={fields.name}
          onChange={handleFieldChange}
          placeholder='Name on the card'
        />
      </Form.Group>
      <Form.Label>Credit Card Info</Form.Label>
      <CardElement
        className='card-field'
        onChange={(e) => setIsCardComplete(e.complete)}
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#495057',
              fontFamily: "'Open Sans', sans-serif",
            },
          },
        }}
      />
      <LoaderButton
        block='true'
        size='lg'
        type='submit'
        isLoading={isLoadingUpdated}
        disabled={!validateForm()}
      >
        Purchase
      </LoaderButton>
    </Form>
  );
}
