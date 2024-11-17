import { Link } from "react-router-dom";
const Signin = () => {
    return (
        <div className="pt-2 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-screen-md mt-20 bg-sky-100 rounded-3xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl text-sky-800 font-bold sm:text-3xl">Get started today!</h1>
                </div>

                <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">Reg No</label>

                        <div className="relative">
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter Reg No"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>

                        <div className="relative">
                            <input
                                type="password"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-sky-800">
                            No account?
                           <Link to="/signup"> <a className="underline hover:text-sky-400" href="#">Sign up</a></Link>
                        </p>

                     <Link to="/student"> <button
                            type="submit"
                            className="inline-block rounded-lg bg-sky-800 px-5 py-3 text-sm font-medium text-white hover:bg-white hover:text-sky-800"
                        >
                            Sign in
                        </button>
                        </Link> 
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
