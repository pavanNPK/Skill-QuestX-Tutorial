/** DTO schema file: Fastify uses these JSON schemas to validate request params and bodies before handlers run. */
const email = {
  // use of this is:
  // Reusable email validation shape used by login, register, OTP, and reset flows.
  type: 'string',
  minLength: 3,
  maxLength: 254,
  pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
};
// use of this is:
// Existing-login password validation allows current older 6+ character passwords.
const password = { type: 'string', minLength: 6, maxLength: 128 };
// use of this is:
// New passwords require a stronger minimum length for changed/reset/invited accounts.
const strongPassword = { type: 'string', minLength: 8, maxLength: 128 };
// use of this is:
// Shared person-name validation for firstName and lastName fields.
const name = { type: 'string', minLength: 1, maxLength: 128 };
const optionalProfileText = { type: 'string', maxLength: 256 };
const optionalLongProfileText = { type: 'string', maxLength: 512 };
const profileImageDataUrl = { type: 'string', maxLength: 3_000_000 };
const objectIdParam = {
  // use of this is:
  // Shared URL parameter schema for routes that receive /:id.
  type: 'object',
  required: ['id'],
  additionalProperties: false,
  properties: { id: { type: 'string', minLength: 1, maxLength: 64 } },
};

export const loginSchema = {
  // use of this is:
  // Validates POST /auth/login request body before AuthController.login receives it.
  body: {
    type: 'object',
    required: ['email', 'password'],
    additionalProperties: false,
    properties: { email, password },
  },
};

export const registerSchema = {
  // use of this is:
  // Validates public student registration data and strips unknown fields.
  body: {
    type: 'object',
    required: ['firstName', 'lastName', 'email', 'password'],
    additionalProperties: false,
    properties: {
      firstName: name,
      lastName: name,
      email,
      password,
      // Optional contact/profile fields are kept bounded to protect body size and database shape.
      phoneCountry: { type: 'string', maxLength: 16 },
      phoneNumber: { type: 'string', maxLength: 32 },
      underGraduate: { type: 'string', maxLength: 256 },
      profileImageUrl: { type: 'string', maxLength: 3_000_000 },
      resumeUrl: { type: 'string', maxLength: 512 },
      skills: { type: 'array', maxItems: 50, items: { type: 'string', maxLength: 80 } },
    },
  },
};

export const emailSchema = {
  // use of this is:
  // Validates endpoints that only need an email body, such as send-otp.
  body: {
    type: 'object',
    required: ['email'],
    additionalProperties: false,
    properties: { email },
  },
};

export const verifyOtpSchema = {
  // use of this is:
  // Validates email plus exactly six numeric OTP digits.
  body: {
    type: 'object',
    required: ['email', 'otp'],
    additionalProperties: false,
    properties: {
      email,
      otp: { type: 'string', pattern: '^[0-9]{6}$' },
    },
  },
};

export const resetPasswordSchema = {
  // use of this is:
  // Validates forgot-password reset payload before password update logic runs.
  body: {
    type: 'object',
    required: ['email', 'otp', 'newPassword'],
    additionalProperties: false,
    properties: {
      email,
      otp: { type: 'string', pattern: '^[0-9]{6}$' },
      newPassword: strongPassword,
    },
  },
};

export const setPasswordSchema = {
  // use of this is:
  // Validates invite-token password setup for admin/instructor accounts.
  body: {
    type: 'object',
    required: ['token', 'newPassword'],
    additionalProperties: false,
    properties: {
      token: { type: 'string', minLength: 16, maxLength: 512 },
      newPassword: strongPassword,
    },
  },
};

export const createUserSchema = {
  // use of this is:
  // Validates admin-created user payloads and blocks unsupported role values.
  body: {
    type: 'object',
    required: ['firstName', 'lastName', 'email', 'role'],
    additionalProperties: false,
    properties: {
      firstName: name,
      lastName: name,
      email,
      password: strongPassword,
      role: { type: 'string', enum: ['admin', 'instructor'] },
      phoneCountry: { type: 'string', maxLength: 16 },
      phoneNumber: { type: 'string', maxLength: 32 },
      courseIds: { type: 'array', maxItems: 100, items: { type: 'string', minLength: 1, maxLength: 64 } },
    },
  },
};

export const changePasswordSchema = {
  // use of this is:
  // Validates current/new password payload for authenticated password changes.
  body: {
    type: 'object',
    required: ['currentPassword', 'newPassword'],
    additionalProperties: false,
    properties: {
      currentPassword: password,
      newPassword: strongPassword,
    },
  },
};

export const updateProfileSchema = {
  // use of this is:
  // Allows only editable profile fields; role/email/password cannot be mass-assigned here.
  body: {
    type: 'object',
    additionalProperties: false,
    properties: {
      firstName: name,
      lastName: name,
      displayName: optionalProfileText,
      phoneNumber: { type: 'string', maxLength: 32 },
      dateOfBirth: { type: 'string', maxLength: 32 },
      nationality: optionalProfileText,
      address: optionalLongProfileText,
      profileImageUrl: profileImageDataUrl,
      coverImageUrl: profileImageDataUrl,
    },
  },
};

export const createCourseSchema = {
  // use of this is:
  // Validates a course create request from the admin/auth workflow.
  body: {
    type: 'object',
    additionalProperties: false,
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 160 },
    },
  },
};

export const setUserStatusSchema = {
  // use of this is:
  // Validates both target user id and requested active boolean for account status changes.
  params: objectIdParam,
  body: {
    type: 'object',
    required: ['active'],
    additionalProperties: false,
    properties: { active: { type: 'boolean' } },
  },
};

export const setHeadPermissionSchema = {
  // use of this is:
  // Validates both target user id and requested admin-head boolean for elevated permission changes.
  params: objectIdParam,
  body: {
    type: 'object',
    required: ['head'],
    additionalProperties: false,
    properties: { head: { type: 'boolean' } },
  },
};
