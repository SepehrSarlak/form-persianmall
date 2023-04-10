import {
  Box,
  Button,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import axios from "axios";
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { CheckboxWithLabel, TextField, RadioGroup } from "formik-material-ui";
import React, { useState } from "react";
import { object, string } from "yup";

export default function Home() {
  const sleep = (time: any) => new Promise((acc) => setTimeout(acc, time));

  interface ContactFormData {
    FirstName: string;
    LastName: string;
    NationalCode: string,
    Email: string,
    PhoneNumber: string,
    Address: string,
    PostalCode: string,
    BankName: string,
    Sheba: string,
    TelegramPhoneNumber: string,
    EbayVendorName: string,
    StoreEnglishName1: string,
    StoreEnglishName2: string,
    StoreEnglishName3: string,
    HasParticipant: boolean,
    ParticipantFullName1: string,
    ParticipantFullName2: string,
    ParticipantPhoneNumber1: string,
    ParticipantPhoneNumber2: string,
    SelectedSalesBranch: number,
    ProductName1: string,
    ProductName2: string,
    ProductName3: string,
    ProductName4: string,
    ProductName5: string,
    ProductName6: string,
    ProductName7: string,
    ProductName8: string,
    ProductName9: string,
    AutoSelectedSaleBranch: boolean,
    IsPaymentDone: boolean,
    PaymentTrackingCode: string,
  }

  const initialValues: ContactFormData = {
    FirstName: "",
    LastName: "",
    NationalCode: "",
    Email: "",
    PhoneNumber: "",
    Address: "",
    PostalCode: "",
    BankName: "",
    Sheba: "",
    TelegramPhoneNumber: "",
    EbayVendorName: "",
    StoreEnglishName1: "",
    StoreEnglishName2: "",
    StoreEnglishName3: "",
    HasParticipant: false,
    ParticipantFullName1: "",
    ParticipantFullName2: "",
    ParticipantPhoneNumber1: "",
    ParticipantPhoneNumber2: "",
    SelectedSalesBranch: 0,
    ProductName1: "",
    ProductName2: "",
    ProductName3: "",
    ProductName4: "",
    ProductName5: "",
    ProductName6: "",
    ProductName7: "",
    ProductName8: "",
    ProductName9: "",
    AutoSelectedSaleBranch: false,
    IsPaymentDone: false,
    PaymentTrackingCode: ""
  };

  const handleSubmit = async (values: ContactFormData) => {
    console.log("values", values);
    try {
      await axios.post(
        "https://nopline.com/api/pm/v1/SaveRegistration",
        values
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormikStepper initialValues={initialValues} onSubmit={handleSubmit}>
    <FormikStep
      label="Personal Data"
      validationSchema={object({
        FirstName: string().required("FirstName").max(10),
        LastName: string().required("LastName").min(3).max(10),
      })}
    >
      <Box paddingBottom={2}>
        <Field
          fullWidth
          name="FirstName"
          variant="outlined"
          component={TextField}
          label="نام"
        />
      </Box>
      <Box paddingBottom={2}>
        <Field
          fullWidth
          name="LastName"
          variant="outlined"
          component={TextField}
          label="Last Name"
        />
      </Box>
      <Box paddingBottom={2}>
        <Field
          name="millionaire"
          type="checkbox"
          variant="outlined"
          component={CheckboxWithLabel}
          Label={{ label: "I am a millionaire" }}
        />
      </Box>
    </FormikStep>
    <FormikStep
      label="Bank Accounts"
    >
      <Box paddingBottom={2}>
        <Field
          variant="outlined"
          fullWidth
          name="money"
          type="number"
          component={TextField}
          label="All the money I have"
        />
      </Box>
      <div role="group" aria-labelledby="my-radio-group">
        <label>
          <Field type="radio" name="picked" value="One" />
          One
        </label>
        <label>
          <Field
            type="radio"
            name="picked"
            value="Two"
            variant="outlined"
          />
          Two
        </label>
      </div>
    </FormikStep>
    <FormikStep
      label="Bank Accounts"
  
    >
      <Box paddingBottom={2}>
        <Field
          variant="outlined"
          fullWidth
          name="description"
          component={TextField}
          label="Description"
        />
      </Box>
    </FormikStep>
    <FormikStep label="test">
      test
    </FormikStep>
  </FormikStepper>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
    
          {currentChild}
          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  مرحله قبل
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting ? "ثبت" : isLastStep() ? "ثبت" : "مرحله بعد"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
