import PasswordResetEmail from '../organisms/PasswordResetEmail';
import useLoginState from '../../hooks/useLogin';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Form from '../molecules/Form';
import LoginTemplate from '../templates/LoginTemplate';

export default function Login() {
  const {
    loginError,
    showPasswordResetEmail,
    togglePasswordResetEmail,
    handleLogin,
    email,
    handleInputChange,
    loginAttempted,
    password,
    isLoggingIn,
  } = useLoginState();

  return (
    <LoginTemplate>
      {showPasswordResetEmail ? (
        <PasswordResetEmail
          togglePasswordResetEmail={togglePasswordResetEmail}
        />
      ) : (
        <Form onSubmit={handleLogin} className=' gap-4 w-full'>
          <div className='space-y-[2px]'>
            <div>
              <Input
                type='email'
                name='email'
                value={email}
                onChange={handleInputChange}
                className={`w-full rounded-t-xl p-[10px] bg-white/70 transition-all 
                    ${
                      loginAttempted && loginError
                        ? 'border-[1px] border-red-500'
                        : ''
                    }
                    focus:outline-none focus:ring-2 focus:ring-black focus:border-black
                    active:ring-2 active:ring-black active:border-black`}
                placeholder='Email'
              />
            </div>
            <div>
              <Input
                type='password'
                name='password'
                value={password}
                onChange={handleInputChange}
                className={`w-full rounded-b-xl p-[10px] bg-white/70 transition-all 
                    ${
                      loginAttempted && loginError
                        ? 'border-[1px] border-red-500'
                        : ''
                    }
                    focus:outline-none focus:ring-2 focus:ring-black focus:border-black
                    active:ring-2 active:ring-black active:border-black`}
                placeholder='Password'
              />
            </div>
            <div className='text-center'>
              <span
                onClick={togglePasswordResetEmail}
                className='text-blue-800 cursor-pointer hover:underline text-xs'
              >
                Forgot your password?
              </span>
            </div>
          </div>

          <div>
            {loginError && <p className='text-red-500'>{loginError}</p>}
          </div>

          <div className='w-44'>
            <Button
              type='submit'
              disabled={isLoggingIn}
              className='w-full rounded-3xl h-12 text-xl'
            >
              {isLoggingIn ? (
                <span className='loading-spinner'></span>
              ) : (
                'Login'
              )}
            </Button>
          </div>
        </Form>
      )}
    </LoginTemplate>
  );
}
