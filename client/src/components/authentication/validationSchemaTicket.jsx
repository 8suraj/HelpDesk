import * as Yup from 'yup';
import YupPassword from 'yup-password';
import validator from 'validator';
YupPassword(Yup);
Yup.addMethod(
	Yup.string,
	'emailCheck',
	function (errorMessage) {
		return this.test(` `, errorMessage, function (value) {
			const { path, createError } = this;

			return (
				validator.isEmail(value) ||
				createError({ path, message: errorMessage })
			);
		});
	}
);
const ValidationSchemaTicket = Yup.object().shape({
	fullName: Yup.string().required('required'),
	email: Yup.string()
		.emailCheck('Invalid email')
		.required('Required'),
	ticketType: Yup.string().required('required'),
});

export default ValidationSchemaTicket;
