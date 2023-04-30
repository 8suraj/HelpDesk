import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);
const ValidationSchemaLogIn = Yup.object().shape({
	email: Yup.string().required('required'),
	password: Yup.string().required('required'),
});

export default ValidationSchemaLogIn;
