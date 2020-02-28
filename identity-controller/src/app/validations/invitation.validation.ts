import * as Joi from '@hapi/joi';

const invitationSchema = Joi.object({
  email: Joi.string().email()
});

const validateInvitation = (opts: {
  email: string;
  firstName: string;
  lastName: string;
}) => {
  return invitationSchema.validate(opts, { stripUnknown: true });
};

export { validateInvitation };
