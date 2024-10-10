import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Form } from "formik"
import { object, string } from "yup"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export const registerSchema = object({
  firstName: string()
    .max(20, "First name must be less than 20 characters.")
    .required("First name is required"),
  lastName: string()
    .max(20, "Last name must be less than 20 characters.")
    .required("Last name is required"),
  email: string()
    .email("Please enter a valid email.")
    .required("Email is required"),
  phone: string()
    .required("Phone number is required")
    .matches(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be no more than 20 characters long")
    .matches(/\d+/, "Password must contain a number")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]+/, "Password must contain a special character"),
});

const RegisterForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
  setFieldValue
}) => {
  return (
    <Form>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        
        <TextField
          label="First Name"
          name="firstName"
          id="firstName"
          type="text"
          variant="outlined"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={errors.firstName}
        />
        <TextField
          label="Last Name"
          name="lastName"
          id="lastName"
          type="text"
          variant="outlined"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={errors.lastName}
        />
        <TextField
          label="Email"
          name="email"
          id="email"
          type="email"
          variant="outlined"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={errors.email}
        />
        <PhoneInput
          country={'tr'}
          value={values.phone}
          onChange={phone => setFieldValue('phone', phone)}
          inputStyle={{ 
            width: '100%', 
            height: '56px', 
            fontSize: '16px', 
            borderRadius: '5px',
            border: '1px solid #ccc',
            padding: '0 14px',
            paddingLeft: '48px'
          }}
          containerStyle={{ width: '100%', marginTop: '16px', marginBottom: '16px' }}
          inputProps={{
            name: 'phone',
            required: true,
            autoFocus: false
          }}
        />
        {touched.phone && errors.phone && (
          <div style={{ color: 'red', marginTop: '5px' }}>{errors.phone}</div>
        )}
        <TextField
          label="Password"
          name="password"
          id="password"
          type="password"
          variant="outlined"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={errors.password}
        />
        <Button type="submit" variant="contained" size="large" color="primary" sx={{ mt: 2, backgroundColor: '#0CC0DF' }}>
          Submit
        </Button>
      </Box>
    </Form>
  )
}

export default RegisterForm
