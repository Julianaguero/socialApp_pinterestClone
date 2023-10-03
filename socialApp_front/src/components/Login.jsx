import shareVideo from '../assets/share.mp4';
import logo from '../assets/socialApp-LogoFull-white.png';
import { GoogleLogin } from '@react-oauth/google';
import { createOrGetUser } from '../utils/createOrGetUser';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video
                    src={shareVideo}
                    type='video/mp4'
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className='w-full h-full object-cover'
                />
                <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                    <div className='p-5'>
                        <img src={logo} width='170' alt='logo' />
                    </div>
                    <div className='shadow-2xl'>
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                createOrGetUser(credentialResponse)
                                navigate('/', { replace: false })
                            }}
                            onError={() => { console.log('Login Failed') }}
                        />
                    </div>
                    <p className='text-center text-white my-4'>- or -</p>
                    <button
                        type='button'
                        onClick={() => {
                            navigate('/', { replace: false })
                        }}
                        className='bg-gray-50 rounded-sm py-2 px-6 hover:bg-slate-100 text-md'
                    >Guest access</button>

                </div>
            </div>

        </div>
    )
}

export default Login