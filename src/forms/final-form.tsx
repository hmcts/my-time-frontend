/* eslint-disable react/prop-types */
import type { FieldProps as FFFieldProps, FieldRenderProps } from 'react-final-form';

import React, { useState, useCallback } from 'react';
import * as GovUK from 'govuk-react';
import { Link } from 'react-router-dom';
import { Form, Field as FFField } from 'react-final-form';

import {
  validateNationality,
  validateMultiplePets,
  validateFirstName,
  validateDescription,
  validateDateOfBirth,
  validateAnimal,
  validatePetPhoto,
} from './validators/validators';

import Results from './components/results';

interface FieldProps<T, I> extends Omit<FFFieldProps<T, FieldRenderProps<T, HTMLElement>>, 'component'> {
  component: React.ComponentType<{
    name?: string;
    input?: I;
    meta?: { touched?: boolean };
  }>;
}

function Field<T, I>({ component: Component, name, ...props }: FieldProps<T, I>) {
  return (
    <FFField name={name} {...props}>
      {/*// @ts-ignore*/}
      {({ input, meta }: { input: I; meta: { touched?: boolean; submitFailed?: boolean } }) => (
          // @ts-ignore
          <Component
          name={name}
          {...props}
          input={input}
          meta={{ ...meta, touched: meta.touched && meta.submitFailed }}
        />
      )}
    </FFField>
  );
}

// @ts-ignore
const Checkbox = ({ input, ...props }) => <GovUK.Checkbox {...input} {...props} />;
const DateField: React.FC<
  React.ComponentProps<typeof GovUK.DateField> & { meta: { touched: boolean; error: string } }
> = ({ meta, ...props }) => (
  <GovUK.DateField errorText={meta.touched && meta.error ? meta.error : undefined} {...props} />
);
// @ts-ignore
const Radio = ({ input, ...props }) => <GovUK.Radio {...input} {...props} />;
const FileUpload: React.FC<
  React.ComponentProps<typeof GovUK.FileUpload> & { input: { value: string; onChange: (any: FileList) => void } }
> = ({ input: { value, onChange, ...input }, ...props }) => (
    // @ts-ignore
  <GovUK.FileUpload {...input} {...props} onChange={({ target }) => onChange(target.files)} />
);

const FinalForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState();
  const handleFormSubmit = useCallback(
      // @ts-ignore
    (values) => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      setTimeout(() => {
        // simulate async submission
        setSubmittedData(values);
        setHasSubmitted(true);
        setIsSubmitting(false);
      }, 1000);
    },
    [isSubmitting]
  );

  return (
    <>
      {!hasSubmitted && (
        <Form
          onSubmit={handleFormSubmit}
          initialValues={{ dob: { day: '', month: '', year: '' } }}
            // @ts-ignore
          render={({ handleSubmit: handleSubmitInner, errors, touched, form }) => {
            // @ts-ignore
            const errorsToShow = Object.keys(errors).filter((key) => touched[key]);
            form.pauseValidation();
            // @ts-ignore
            const handleSubmit = (e) => {
              form.resumeValidation();
              const res = handleSubmitInner(e);
              form.pauseValidation();
              return res;
            };
            return (
              <form onSubmit={handleSubmit}>
                <GovUK.LoadingBox loading={isSubmitting}>
                  <GovUK.BackLink as={Link} to="/forms">
                    Home
                  </GovUK.BackLink>
                  {!!errorsToShow?.length && (
                    <GovUK.ErrorSummary
                      heading="Error summary"
                      description="Please address the following issues"
                      errors={errorsToShow.map((key) => ({
                        targetName: key,
                        // @ts-ignore
                        text: errors[key],
                      }))}
                    />
                  )}
                  <GovUK.Fieldset>
                    <GovUK.Fieldset.Legend size="M">About you</GovUK.Fieldset.Legend>
                    <Field
                      name="firstName"
                      mb={4}
                      hint="You can find this on your passport"
                      validate={validateFirstName}
                        // @ts-ignore
                      component={GovUK.InputField}
                    >
                      First name
                    </Field>
                    <Field
                      mb={8}
                      name="description"
                      hint="Enter as many words as you like"
                      validate={validateDescription}
                        // @ts-ignore
                      component={GovUK.TextArea}
                    >
                      Description of what you saw
                    </Field>

                    <GovUK.FormGroup error={touched?.nationality && !!errors?.nationality}>
                      <GovUK.Label mb={4}>
                        <GovUK.LabelText>Nationality</GovUK.LabelText>
                        {touched?.nationality && errors?.nationality && (
                          <GovUK.ErrorText>{errors?.nationality}</GovUK.ErrorText>
                        )}
                        <Field
                          type="checkbox"
                          name="nationality"
                          value="british"
                          validate={validateNationality}
                            // @ts-ignore
                          component={Checkbox}
                          hint="including English, Scottish, Welsh and Northern Irish"
                        >
                          British
                        </Field>
                        {/*// @ts-ignore*/}
                        <Field type="checkbox" name="nationality" value="irish" component={Checkbox}>
                          Irish
                        </Field>
                        {/*// @ts-ignore*/}
                        <Field type="checkbox" name="nationality" value="other" component={Checkbox}>
                          Citizen of another country
                        </Field>
                      </GovUK.Label>
                    </GovUK.FormGroup>
                    {/*// @ts-ignore*/}
                    <Field name="dob" component={DateField} validate={validateDateOfBirth}>
                      Date of birth
                    </Field>
                  </GovUK.Fieldset>
                  <GovUK.Fieldset>
                    <GovUK.Fieldset.Legend size="M">About your pet</GovUK.Fieldset.Legend>
                    <Field
                        // @ts-ignore
                      component={GovUK.Select}
                      mb={8}
                      name="animal"
                      label="What animal is your pet"
                      hint="A cat for example"
                      validate={validateAnimal}
                    >
                      <option value="">Please select...</option>
                      <option value="cat">Cat</option>
                      <option value="other-feline">Other feline</option>
                      <option value="other-non-feline">Other non feline</option>
                    </Field>
                    {/*
                    TODO: need to be able to pass props to file input
                    https://github.com/final-form/react-final-form/issues/663
                    */}
                    <Field
                        // @ts-ignore
                      component={FileUpload}
                      mb={8}
                      acceptedFormats=".jpg, .png"
                      hint="This can be in either JPG or PNG format"
                      name="petPhoto"
                      validate={validatePetPhoto}
                    >
                      Please upload a recent photograph
                    </Field>
                    <GovUK.MultiChoice
                      mb={8}
                      label="Do you have more than one pet?"
                      meta={{ error: errors?.hasMultiplePets, touched: !!touched?.hasMultiplePets }}
                    >
                      <Field
                          // @ts-ignore
                        component={Radio}
                        type="radio"
                        name="hasMultiplePets"
                        inline
                        value="yes"
                        validate={validateMultiplePets}
                      >
                        Yes
                      </Field>
                      {/*// @ts-ignore*/}
                      <Field component={Radio} type="radio" name="hasMultiplePets" inline value="no">
                        No
                      </Field>
                    </GovUK.MultiChoice>
                  </GovUK.Fieldset>
                  <GovUK.Button onClick={handleSubmit} disabled={isSubmitting}>
                    Submit
                  </GovUK.Button>
                </GovUK.LoadingBox>
              </form>
            );
          }}
        />
      )}
      {hasSubmitted && (
          // @ts-ignore
          <Results backLink="/forms/final-form" onBackClick={() => setHasSubmitted(false)} {...submittedData} />
      )}
    </>
  );
};

export default FinalForm;
