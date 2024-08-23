import { Form } from "antd";

const FormDebug = ({ form }) => {
  return (
    <Form.Item shouldUpdate>
      {() => <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>}
    </Form.Item>
  );
};

export default FormDebug;
