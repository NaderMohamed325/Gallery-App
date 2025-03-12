import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { User, userZodSchema } from '../models/userModel';

const loginViewer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const errors = null;

  res.render('home', { errors });
});

const registerViewer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const errors = null;
  res.render('register', { errors });
});

const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password, passwordConfirmation } = req.body;
  const userData = { userName: username, email, password };
  const errors: string[] = [];

  if (!username || !email || !password || !passwordConfirmation) {
    errors.push('Please fill in all fields');
  } else if (password !== passwordConfirmation) {
    errors.push("Passwords don't match");
  } else {
    console.log(userData);
    const validationResult = userZodSchema.safeParse(userData);
    if (!validationResult.success) {
      const formattedErrors = Object.values(validationResult.error.format()).flat();
      formattedErrors.forEach((err) => {
        if (typeof err === 'string') {
          errors.push(err);
        } else {
          errors.push(...err._errors);
        }
      });
    } else {
      if (email) {
        const isStoredBefore = await User.find({ email });

        if (isStoredBefore.length > 0) {
          // Check if the array is not empty
          errors.push('This email is in use');
          console.log(isStoredBefore, errors);

          return res.render('register', { errors });
        }
      }

      try {
        const newUser = await User.create(userData);
        console.log(newUser || 'Not a user');
        return res.redirect('/api/v1/login');
      } catch (err) {
        errors.push('Error creating user');
        console.error('Error creating user:', err); // Log the detailed error message
      }
    }
  }

  res.render('register', { errors });
});

const Login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  let errors: string[] = [];
  if (!email || !password) {
    errors.push('Please fill the form');
    return res.render('home', { errors });
  }
  const user = await User.find({ email, password });
  if (!user) {
    errors.push('Invalid Password or email');
    return res.render('home', { errors });
  }
  req.session.isAuthenticated = true;
  return res.redirect('/api/v1/dashboard');
});

export { loginViewer, registerViewer, registerUser, Login };
