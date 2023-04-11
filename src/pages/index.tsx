import { Box, Button, CircularProgress, Grid, InputAdornment } from "@material-ui/core";
import axios from "axios";
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { CheckboxWithLabel, TextField, RadioGroup } from "formik-material-ui";
import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { object, string } from "yup";
import * as Yup from 'yup';



const StyledTextField = withStyles({
  root: {
    "& label": {
      transformOrigin: "top right",
      right: 30,
      left: "auto",
      textAlign: "right",
      minWidth: "150px"
    },
    "& legend": {
      textAlign: "right",
    },
  },
})(TextField);
export default function Home() {
  const sleep = (time: any) => new Promise((acc) => setTimeout(acc, time));

  interface ContactFormData {
    FirstName: string;
    LastName: string;
    NationalCode: string;
    Email: string;
    PhoneNumber: string;
    Address: string;
    PostalCode: string;
    BankName: string;
    Sheba: string;
    TelegramPhoneNumber: string;
    EbayVendorName: string;
    StoreEnglishName1: string;
    StoreEnglishName2: string;
    StoreEnglishName3: string;
    HasParticipant: boolean;
    ParticipantFullName1: string;
    ParticipantFullName2: string;
    ParticipantPhoneNumber1: string;
    ParticipantPhoneNumber2: string;
    SelectedSalesBranch: number;
    ProductName1: string;
    ProductName2: string;
    ProductName3: string;
    ProductName4: string;
    ProductName5: string;
    ProductName6: string;
    ProductName7: string;
    ProductName8: string;
    ProductName9: string;
    AutoSelectedSaleBranch: boolean;
    IsPaymentDone: boolean;
    PaymentTrackingCode: string;
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
    PaymentTrackingCode: "",
  };

  const validationSchema = Yup.object().shape({

      FirstName: Yup.string().required(" نام را به درستی وارد کنید"),
      LastName: Yup.string().required(
        " نام خانوادگی را به درستی وارد کنید"
      ),
      NationalCode: Yup.string()
        .max(11, "کد ملی را به درستی وارد کنید")
        .required("کد ملی را به درستی وارد کنید")
        .matches(
          /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
          "کد ملی را به درستی وارد کنید"
        ),
      PhoneNumber: Yup.string()
        .max(11, "شماره تماس را به درستی وارد کنید")
        .required("شماره تماس را به درستی وارد کنید")
        .matches(
          /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
          "شماره تماس را به درستی وارد کنید"
        ),
      PostalCode: Yup.string()
        .max(10, "کد پستی را به درستی وارد کنید")
        .required("کد پستی را به درستی وارد کنید")
        .matches(
          /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
          "کد پستی را به درستی وارد کنید"
        ),
      Address: Yup.string().required("آدرس را به درستی وارد کنید"),
      Email: Yup.string()
        .email("آدرس ایمیل را به درستی وارد کنید")
        .required("آدرس ایمیل را به درستی وارد کنید")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        ),
      BankName: Yup.string().required("نام بانک را به درستی وارد کنید"),
      Sheba: Yup.string()
        .required("شماره شبا را به درستی وارد کنید")
        .matches(
          /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
          "شماره شبا را به درستی وارد کنید"
        ),
        image: Yup.mixed().required('Image is required'),
  });

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
    <div className='container'>
      <div className='container-form'>
        <div className='form-right-side'>
          <div className='title-right-side'>
            <span>مرحله ۱ از ۳</span>
            <span className='title'>اطلاعات شخصی</span>
          </div>
          <FormikStepper initialValues={initialValues} onSubmit={handleSubmit}>
            <FormikStep
              label='Personal Data'
              validationSchema={validationSchema}
            >
              <div className='row-input'>
                <div className='input'>
                  <Field
                    fullWidth
                    name='FirstName'
                    variant='outlined'
                    component={StyledTextField}
                    label='نام'
                  />
                </div>
                <div className='input mr'>
                  <Field
                    fullWidth
                    name='LastName'
                    variant='outlined'
                    component={StyledTextField}
                    label='نام خانوادگی'
                  />
                </div>
              </div>
              <div className='row-input'>
                <div className='input'>
                  <Field
                    fullWidth
                    name='PhoneNumber'
                    variant='outlined'
                    component={StyledTextField}
                    label='شماره موبایل'
                    className="input-left"
                  />
                </div>
                <div className='input mr'>
                  <Field
                    fullWidth
                    name='NationalCode'
                    variant='outlined'
                    component={StyledTextField}
                    label='کد ملی'
                    className="input-left"
                  />
                </div>
              </div>
              <div className='row-input'>
                <div className='input'>
                  <Field
                    fullWidth
                    name='PostalCode'
                    variant='outlined'
                    component={StyledTextField}
                    label='کد پستی'
                    className="input-left"
                  />
                </div>
                <div className='input mr' dir='rtl'>
                  <Field
                    fullWidth
                    name='Email'
                    variant='outlined'
                    className="input-left"
                    component={StyledTextField}
                    label='آدرس ایمیل'
                  />
                </div>
              </div>
              <div className='row-input'>
                <div className='input'>
                  <Field
                    fullWidth
                    name='Address'
                    variant='outlined'
                    component={StyledTextField}
                    label='آدرس'
                  />
                </div>
                <div className='input mr'>
                  <Field
                    direction='rtl'
                    fullWidth
                    name='BankName'
                    variant='outlined'
                    component={StyledTextField}
                    label='نام بانک'
                  />
                </div>
              </div>
             <div className="special-input">
              <div className='row-input'>
                <div className='input'>
                  <Field
                  label="شماره شبا بانکی"
                  className="input-left"
                    helperText="حساب باید به نام طرف قرارداد باشد"
                    fullWidth
                    InputProps={{
                      endAdornment: <InputAdornment position="end">IR</InputAdornment>,
                    }}
                    name='Sheba'
                    variant='outlined'
                    component={StyledTextField}
                  />
                </div>
              </div>
             </div>
            </FormikStep>
            <FormikStep label='Bank Accounts'>
              <Field
                variant='outlined'
                fullWidth
                name='money'
                type='number'
                component={StyledTextField}
                label='All the money I have'
              />
              <div role='group' aria-labelledby='my-radio-group'>
                <label>
                  <Field type='radio' name='picked' value='One' />
                  One
                </label>
                <label>
                  <Field
                    type='radio'
                    name='picked'
                    value='Two'
                    variant='outlined'
                  />
                  Two
                </label>
              </div>
            </FormikStep>
            <FormikStep label='Bank Accounts'>
              <Field
                variant='outlined'
                fullWidth
                name='description'
                component={StyledTextField}
                label='Description'
              />
              
            </FormikStep>
            <FormikStep label='test'>test</FormikStep>
          </FormikStepper>
        </div>
        <div className='form-left-side'>
          <span>
            پاساژ یک مرکز خرید و فروش آنلاین پوشاک و آرایشی است که خدمات خود را
            به صورت رایگان (بدون کارمزد) ارائه می نماید. هم اکنون بیش از 15,000
            فروشگاه از سراسر ایران در حال فعالیت در پاساژ می باشند.
          </span>
          <div className='logo'></div>
        </div>
      </div>
    </div>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
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
        <Form autoComplete='off'>
          {currentChild}
          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant='contained'
                  color='primary'
                  onClick={() => setStep((s) => s - 1)}
                >
                  مرحله قبل
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size='1rem' /> : null
                }
                disabled={isSubmitting}
                variant='contained'
                color='primary'
                type='submit'
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
