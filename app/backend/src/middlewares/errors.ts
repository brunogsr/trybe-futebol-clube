type ErrorType = { [key:string]: number };

const errorType: ErrorType = {
  'string.empty': 400,
  'string.email': 401,
  'number.min': 400,
  'string.min': 401,
  'string.base': 400,
  'any.required': 400,
};

const errorMap = (error: string): number => errorType[error] || 500;

export default errorMap;
