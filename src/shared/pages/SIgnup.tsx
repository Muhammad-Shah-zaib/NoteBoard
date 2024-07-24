const Signup = () => {
    return (
        <div className={`h-screen w-screen flex items-center justify-center  bg-primary`}>
            <div className={`h-[400px] w-[500px] shadow-lg shadow-secondary px-8 py-4 space-y-8`}>
                <h1 className="flex w-full justify-center"><span className="px-4 py-2 shadow-lg shadow-secondary rounded-lg text-xl text-primary-200 font-bold">Sign Up</span></h1>
                {/* form container */}
                    {/* FORM */}
                    <form className="space-y-8">
                        {/* FIRSTNAME */}
                        <div className={`w-full grid grid-cols-3 items-center`}>
                            <label className="font-mono font-bold text-lg">Firstname: <strong className="font-bold text-red-500 text-xl">*</strong></label>
                            <input type="text" className={`px-4 py-1 w-full col-span-2 bg-transparent outline-none border-b-2 border-primary-700 focus:border-blue-700 transition-all duration-300`} />
                        </div>
                        {/* Lastname */}
                        <div className={`w-full grid grid-cols-3 items-center`}>
                            <label className="font-mono font-bold text-lg">Lastname:</label>
                            <input type="text" className={`px-4 py-1 w-full col-span-2 bg-transparent outline-none border-b-2 border-primary-600 focus:border-blue-700 transition-all duration-300`} />
                        </div>
                        {/* Username */}
                        <div className={`w-full grid grid-cols-3 items-center`}>
                            <label className="font-mono font-bold text-lg">Username: <strong className="font-bold text-red-500 text-xl">*</strong></label>
                            <input type="text" className={`px-4 py-1 w-full col-span-2 bg-transparent outline-none border-b-2 border-primary-600 focus:border-blue-700 transition-all duration-300`} />
                        </div>
                        {/* EMAIL */}
                        <div className={`w-full grid grid-cols-3 items-center`}>
                            <label className="font-mono font-bold text-lg">Email: <strong className="font-bold text-red-500 text-xl">*</strong></label>
                            <input type="text" className={`px-4 py-1 w-full col-span-2 bg-transparent outline-none border-b-2 border-primary-600 focus:border-blue-700 transition-all duration-300`} />
                        </div>
                    </form>
            </div>
        </div>
    )
}
export default Signup;