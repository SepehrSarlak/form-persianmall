import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
} from "@material-ui/core";
import axios from "axios";
import {
  Field,
  Form,
  Formik,
  FormikConfig,
  FormikValues,
  useField,
} from "formik";
import { CheckboxWithLabel, TextField, RadioGroup } from "formik-material-ui";
import React, { useEffect, useRef, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { boolean, object, string } from "yup";

import * as Yup from "yup";
import { hook } from "./hook";

export default function Home() {
  const fileRef = useRef(null);
  const { completed, setCompleted, done, setDone } = hook();
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
    NationalCardPicture: string;
    BirthCertificatePicture: string;
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
    NationalCardPicture: "",
    BirthCertificatePicture: "",
  };
  const phoneRegExp =
    /(0|\+98)?([ ]|-|[()]){0,2}9[0|1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/gi;

  const validationSchema = object({
    FirstName: string().required(" نام را به درستی وارد کنید"),
    LastName: string().required(" نام خانوادگی را به درستی وارد کنید"),
    NationalCode: string()
      .required("کد ملی را به درستی وارد کنید")
      .matches(/^[0-9]{10}$/, "کد ملی را به درستی وارد کنید"),
    PhoneNumber: string()
      .required("شماره تماس را به درستی وارد کنید")
      .matches(phoneRegExp, "شماره تماس را به درستی وارد کنید"),

    PostalCode: string()
      .required("کد پستی را به درستی وارد کنید")
      .matches(
        /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
        "کد پستی را به درستی وارد کنید"
      ),
    Address: string().required("آدرس را به درستی وارد کنید"),
    Email: string()
      .email("آدرس ایمیل را به درستی وارد کنید")
      .required("آدرس ایمیل را به درستی وارد کنید")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      ),
    BankName: string().required("نام بانک را به درستی وارد کنید"),
    Sheba: string().required("شماره شبا را به درستی وارد کنید"),
    // .matches(/^(?=.{24}$)[0-9]*$/, "شماره شبا را به درستی وارد کنید"),
  });
  const validationSchemaSecondStep = object({
    TelegramPhoneNumber: string()
      .required("شماره ی تلگرام فروشنده را به درستی وارد کنید")
      .matches(phoneRegExp, "شماره ی تلگرام فروشنده را به درستی وارد کنید"),
    EbayVendorName: string()
      .required("نام فروشنده را به درستی وارد کنید")
      .matches(/^[a-z-0-9\s'&]*$/i, "نام فروشنده را به لاتین وارد کنید"),
    StoreEnglishName1: string(),
    StoreEnglishName2: string(),
    StoreEnglishName3: string(),
    HasParticipant: string(),
  });
  const validationSchemaThirdStep = object({
    SelectedSalesBranch: string(),
    ProductName1: string(),
    ProductName2: string(),
    ProductName3: string(),
    ProductName4: string(),
    ProductName5: string(),
    ProductName6: string(),
    ProductName7: string(),
    ProductName8: string(),
    ProductName9: string(),
  });
  const handleSubmit = async (values: ContactFormData) => {
    console.log("values", values);

    try {
      await axios.post(
        "https://nopline.com/api/pm/v1/SaveRegistration",
        values
      );
      setDone(true);
    } catch (error) {
      console.error(error);
    }
  };
  const formValidateFile = Yup.object().shape({
    NationalCardPicture: Yup.mixed()
      .required("لطفا تصویر مدرک را آپلود کنید")
      .test("is-file-too-big", "محدودیت حجم عکس 10 مگ", () => {
        let valid = true;
        const files = fileRef?.current?.files;
        if (files) {
          const fileArr = Array.from(files);
          fileArr.forEach((file) => {
            const size = file.size / 1024 / 1024;
            if (size > 10) {
              valid = false;
            }
          });
        }
        return valid;
      })
      .test(
        "is-file-of-correct-type",
        "فایل های مجاز :‌jpg , jpeg , png",
        () => {
          let valid = true;
          const files = fileRef?.current?.files;
          if (files) {
            const fileArr = Array.from(files);
            fileArr.forEach((file) => {
              const type = file.type.split("/")[1];
              const validTypes = ["jpeg", "png", "jpg"];
              if (!validTypes.includes(type)) {
                valid = false;
              }
            });
          }
          return valid;
        }
      ),
    BirthCertificatePicture: Yup.mixed()
      .required("لطفا تصویر مدرک را آپلود کنید")
      .test("is-file-too-big", "محدودیت حجم عکس 10 مگ", () => {
        let valid = true;
        const files = fileRef?.current?.files;
        if (files) {
          const fileArr = Array.from(files);
          fileArr.forEach((file) => {
            const size = file.size / 1024 / 1024;
            if (size > 10) {
              valid = false;
            }
          });
        }
        return valid;
      })
      .test(
        "is-file-of-correct-type",
        "فایل های مجاز :‌jpg , jpeg , png",
        () => {
          let valid = true;
          const files = fileRef?.current?.files;
          if (files) {
            const fileArr = Array.from(files);
            fileArr.forEach((file) => {
              const type = file.type.split("/")[1];
              const validTypes = ["jpeg", "png", "jpg"];
              if (!validTypes.includes(type)) {
                valid = false;
              }
            });
          }
          return valid;
        }
      ),
  });
  const FileUpload = ({ fileRef, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <div className='uploadFile'>
          {/* <label htmlFor="files" className="fileLabel">
            بارگذاری تصویر کارت ملی
          </label> */}
          <input
            id='file'
            ref={fileRef}
            multiple={true}
            type='file'
            {...field}
          />
          {meta.touched && meta.error ? (
            <div style={{ color: "red", paddingTop: "10px" }}>{meta.error}</div>
          ) : null}
        </div>
      </>
    );
  };
  const StyledTextField = withStyles({
    root: {
      "& label": {
        transformOrigin: "top right",
        right: 30,
        left: "auto",
        textAlign: "right",
        minWidth: "150px",
      },
      "& legend": {
        textAlign: "right",
      },
    },
  })(TextField);

  return (
    <div className='container'>
      <div className='container-form'>
        <div className='form-right-side'>
          {!done == true ? (
            <>
              <FormikStepper
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                <FormikStep
                  label='Personal Data'
                  // validationSchema={validationSchema}
                >
                  <div className='title-right-side'>
                    <span>مرحله 1 از 3</span>
                    <span className='title'>اطلاعات شخصی</span>
                  </div>
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
                        className='input-left'
                      />
                    </div>
                    <div className='input mr'>
                      <Field
                        fullWidth
                        name='NationalCode'
                        variant='outlined'
                        component={StyledTextField}
                        label='کد ملی'
                        className='input-left'
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
                        className='input-left'
                      />
                    </div>
                    <div className='input mr' dir='rtl'>
                      <Field
                        fullWidth
                        name='Email'
                        variant='outlined'
                        className='input-left'
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
                  <div className='special-input'>
                    <div className='row-input'>
                      <div className='input'>
                        <Field
                          label='شماره شبا بانکی'
                          className='input-left'
                          helperText='حساب باید به نام طرف قرارداد باشد'
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>IR</InputAdornment>
                            ),
                          }}
                          name='Sheba'
                          variant='outlined'
                          component={StyledTextField}
                        />
                      </div>
                    </div>
                  </div>
                </FormikStep>
                <FormikStep
                  label='Bank Accounts'
                  // validationSchema={validationSchemaSecondStep}
                >
                  <div className='title-right-side'>
                    <span>مرحله 2 از 3</span>
                    <span className='title'>اطلاعات شخصی</span>
                  </div>
                  <div className='row-input'>
                    <div className='input'>
                      <Field
                        fullWidth
                        name='TelegramPhoneNumber'
                        variant='outlined'
                        component={StyledTextField}
                        label='شماره ی تلگرام فروشنده *'
                      />
                    </div>
                    <div className='input mr'>
                      <Field
                        fullWidth
                        name='EbayVendorName'
                        variant='outlined'
                        component={StyledTextField}
                        label='نام فروشنده به لاتین (برای حساب کاربری Bay)'
                      />
                    </div>
                  </div>
                  <div className='flex-col text-right'>
                    <div className='text-right'>
                      نام مورد نظر برای فروشگاه به لاتین (لطفا بنا به الویت 3
                      نام را انتخاب کنید)
                    </div>
                    <div className='text-center-align flex-between mt-3'>
                      <div className='input'>
                        <Field
                          fullWidth
                          name='StoreEnglishName1'
                          variant='outlined'
                          component={StyledTextField}
                        />
                      </div>

                      <div className='input mr w-30'>
                        <Field
                          fullWidth
                          name='StoreEnglishName2'
                          variant='outlined'
                          component={StyledTextField}
                        />
                      </div>
                      <div className='input mr w-30'>
                        <Field
                          fullWidth
                          name='StoreEnglishName3'
                          variant='outlined'
                          component={StyledTextField}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='text-center-align'>
                    <div className=''>آیا شریک دارید؟</div>

                    <div
                      className='input-radio mr'
                      role='group'
                      aria-labelledby='my-radio-group'
                    >
                      <label className='text-center-align'>
                        <Field
                          type='radio'
                          name='HasParticipant'
                          value='true'
                        />
                        بله
                      </label>
                      <label className='text-center-align mr'>
                        <Field
                          type='radio'
                          name='HasParticipant'
                          value='false'
                          variant='outlined'
                        />
                        خیر
                      </label>
                    </div>
                  </div>

                  <div className='mt-3'>
                    <span>
                      در صورت داشتن شریک لطفا اطلاعات زیر را تکمیل کنید
                    </span>
                    <div className='row-input my-3'>
                      <div className='input'>
                        <Field
                          fullWidth
                          name='ParticipantFullName1'
                          variant='outlined'
                          component={StyledTextField}
                          label='نام و نام خانوادگی شریک اول'
                        />
                      </div>
                      <div className='input mr'>
                        <Field
                          fullWidth
                          name='ParticipantPhoneNumber1'
                          variant='outlined'
                          component={StyledTextField}
                          label='شماره موبایل'
                        />
                      </div>
                    </div>
                    <div className='row-input'>
                      <div className='input'>
                        <Field
                          fullWidth
                          name='ParticipantFullName2'
                          variant='outlined'
                          component={StyledTextField}
                          label='نام و نام خانوادگی شریک دوم'
                        />
                      </div>
                      <div className='input mr'>
                        <Field
                          fullWidth
                          name='ParticipantPhoneNumber2'
                          variant='outlined'
                          component={StyledTextField}
                          label='شماره موبایل'
                        />
                      </div>
                    </div>
                  </div>
                </FormikStep>
                <FormikStep
                  label='Bank Accounts'
                  validationSchema={validationSchemaThirdStep}
                >
                  <div className='title-right-side'>
                    <span>مرحله 3 از 4</span>
                    <span className='title'>اطلاعات</span>
                  </div>

                  <div className='form-step-third'>
                    <div>
                      <div className=''>
                        الف) در کدام طبقه میخواهید فروشگاه اینترنتی خود را راه
                        اندازی کنید؟ (لطفا فقط یک مورد را انتخاب کنید)
                      </div>

                      <div className='mt-2'>
                        <div
                          className='input-radio'
                          role='group'
                          aria-labelledby='my-radio-group'
                        >
                          <label className='text-center-align'>
                            <Field
                              type='radio'
                              name='SelectedSalesBranch'
                              value='1'
                            />
                            طبقه ی اول: محصولات مرتبط با نوزاد، کودک و نوجوان
                            (شامل پوشاک و سایر موارد)
                          </label>
                          <label className='text-center-align'>
                            <Field
                              type='radio'
                              name='SelectedSalesBranch'
                              value='2'
                              variant='outlined'
                            />
                            طبقه ی دوم: محصولات مرتبط با بانوان (شامل پوشاک و
                            سایر موارد)
                          </label>
                          <label className='text-center-align'>
                            <Field
                              type='radio'
                              name='SelectedSalesBranch'
                              value='3'
                              variant='outlined'
                            />
                            طبقه ی سوم: محصولات مرتبط با آقایان (شامل پوشاک و
                            سایر موارد)
                          </label>
                          <label className='text-center-align'>
                            <Field
                              type='radio'
                              name='SelectedSalesBranch'
                              value='4'
                              variant='outlined'
                            />
                            طبقه ی سوم: محصولات مرتبط با آقایان (شامل پوشاک و
                            سایر موارد)
                          </label>
                          <label className='text-center-align'>
                            <Field
                              type='radio'
                              name='SelectedSalesBranch'
                              value='5'
                              variant='outlined'
                            />
                            طبقه ی چهارم: محصولات اکسسوری، هنری و صنایع دستی
                            (بجز پوشاک)
                          </label>
                          <label className='text-center-align'>
                            <Field
                              type='radio'
                              name='SelectedSalesBranch'
                              value='0'
                              variant='outlined'
                            />
                            مایلم پرشین مال با توجه به نیاز بازار ایرانیان خارج
                            از کشور، طبقه ی فروشگاه من را مشخص کند.
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className='mt-3 w-full my-3'>
                      <div>
                        ب) با توجه به طبقه ی انتخاب شده، مایل به فروش چه محصولی
                        هستید؟
                      </div>
                      <div className='row-input my-3'>
                        <div className='input w-30'>
                          <Field
                            fullWidth
                            name='ProductName1'
                            variant='outlined'
                            component={StyledTextField}
                            label='الویت اول'
                          />
                        </div>
                        <div className='input mr w-30'>
                          <Field
                            fullWidth
                            name='ProductName2'
                            variant='outlined'
                            component={StyledTextField}
                            label='الویت دوم'
                          />
                        </div>
                      </div>
                      <div className='row-input my-3'>
                        <div className='input w-30'>
                          <Field
                            fullWidth
                            name='ProductName3'
                            variant='outlined'
                            component={StyledTextField}
                            label='الویت سوم'
                          />
                        </div>
                        <div className='input mr w-30'>
                          <Field
                            fullWidth
                            name='ProductName4'
                            variant='outlined'
                            component={StyledTextField}
                            label='الویت چهارم'
                          />
                        </div>
                      </div>
                      <div className='row-input'>
                        <div className='input w-30'>
                          <Field
                            fullWidth
                            name='ProductName5'
                            variant='outlined'
                            component={StyledTextField}
                            label='الویت پنجم'
                          />
                        </div>
                        <div className='input mr w-30'>
                          <Field
                            fullWidth
                            name='ProductName6'
                            variant='outlined'
                            component={StyledTextField}
                            label='الویت ششم'
                          />
                        </div>
                      </div>
                      <div className='text-center-align flex-between mt-3 flex-wrap'>
                        <div className='input w-30'>
                          <Field
                            fullWidth
                            name='ProductName7'
                            variant='outlined'
                            component={StyledTextField}
                            label='الویت هفتم'
                          />
                        </div>
                        <div className='input mr w-30'>
                          <Field
                            fullWidth
                            name='ProductName8'
                            variant='outlined'
                            component={StyledTextField}
                            label='الویت هشتم'
                          />
                        </div>
                        <div className='input mr w-30'>
                          <Field
                            fullWidth
                            name='ProductName9'
                            variant='outlined'
                            component={StyledTextField}
                            label='الویت نهم'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </FormikStep>

                <FormikStep label='photos' validationSchema={formValidateFile}>
                  <div className='title-right-side'>
                    <span>مرحله 4 از 4</span>
                    <span className='title'>اطلاعات</span>
                  </div>
                  <div className='file-parent flex'>
                    {/* <Field
                  type="file"
                  name="NationalCardPicture"
                  accept="image/*"
                /> */}
                    <div className='fileLabel'>انتخاب تصویر شناسنامه</div>
                    <FileUpload name='NationalCardPicture' fileRef={fileRef} />
                  </div>
                  <div className='file-parent flex'>
                    {/* <Field
                  type="file"
                  name="NationalCardPicture"
                  accept="image/*"
                /> */}
                    <div className='fileLabel'>انتخاب تصویر شناسنامه</div>
                    <FileUpload
                      name='BirthCertificatePicture'
                      fileRef={fileRef}
                    />
                  </div>
                </FormikStep>
              </FormikStepper>
            </>
          ) : (
            <div className='form-done'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                width={32}
                height={32}
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>

              <div className='done-text'>اطلاعات با موفقیت ثبت شد</div>
            </div>
          )}
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

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  const { completed, setCompleted } = hook();

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          // setDone(true);
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
          <Grid
            container
            direction='row-reverse'
            justifyContent='flex-end'
            spacing={2}
          >
            {step > 0 ? (
              <Grid item className='btn-back'>
                <Button
                  disabled={isSubmitting}
                  variant='text'
                  color='inherit'
                  onClick={() => {
                    setStep((s) => s - 1);
                  }}
                >
                  مرحله قبل
                </Button>
              </Grid>
            ) : null}
            <>
              {!completed == true ? (
                <Grid item className='confirm-btn'>
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
              ) : (
                <>
                  <div className=''>اطلاعات با موفقیت ثبت شد</div>
                </>
              )}
            </>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
