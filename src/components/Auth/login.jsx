import Input from './Input';

export default function Login({selectIsLogin}){
    return( 
        <div className='flex flex-col justify-center items-center gap-10 '>
            <div className='flex justify-center items-center flex-col gap-2'>
                <h2 className='text-4xl'>Bentornato</h2>
                <p className='text-sm'>Inserisci le credenziali per vedere il tuo passaporto !!!</p>
            </div>
            <form action="">
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-4'>
                        <Input 
                        label='Email'
                        type='email'
                        />
                        <Input 
                        label='Password'
                        type='password'
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button className='border border-[#6B4F4F]  px-2 py-1 rounded-xl' type='submit'>Accedi</button>
                    </div>
                    <div className='text-sm flex gap-2'>
                        <p>Non hai ancora un account?</p>
                        <button 
                            type='button'
                            onClick={selectIsLogin}
                            className='border-b-2 border-transparent hover:border-[#6B4F4F]'>Registrati</button>
                    </div>
                </div>
            </form>
        </div>
    )
}