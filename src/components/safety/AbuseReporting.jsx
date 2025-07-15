import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import Card from '../shared/Card';

const reportSchema = Yup.object().shape({
  type: Yup.string().required('Please select the type of incident'),
  description: Yup.string().required('Please provide a description'),
  location: Yup.string(),
  anonymous: Yup.boolean(),
});

function AbuseReporting() {
  const handleSubmit = (values, { resetForm }) => {
    // In a real application, this would send the report to the appropriate authorities
    console.log('Report submitted:', values);
    resetForm();
  };

  return (
    <Card>
      <h2 className="text-2xl font-semibold mb-6">Report Abuse</h2>
      <Formik
        initialValues={{
          type: '',
          description: '',
          location: '',
          anonymous: false,
        }}
        validationSchema={reportSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <Field
                as="select"
                name="type"
                className="w-full p-2 border rounded"
              >
                <option value="">Select Type of Incident</option>
                <option value="domestic">Domestic Violence</option>
                <option value="workplace">Workplace Harassment</option>
                <option value="public">Public Safety Incident</option>
                <option value="other">Other</option>
              </Field>
              {errors.type && touched.type && (
                <div className="text-red-500 text-sm">{errors.type}</div>
              )}
            </div>

            <div>
              <Field
                as="textarea"
                name="description"
                placeholder="Describe the incident..."
                className="w-full p-2 border rounded h-32"
              />
              {errors.description && touched.description && (
                <div className="text-red-500 text-sm">{errors.description}</div>
              )}
            </div>

            <div>
              <Field
                type="text"
                name="location"
                placeholder="Location (optional)"
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex items-center">
              <Field
                type="checkbox"
                name="anonymous"
                className="mr-2"
              />
              <label>Submit anonymously</label>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
            >
              Submit Report
            </button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default AbuseReporting;